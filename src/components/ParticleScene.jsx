import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./ParticleScene.css";

/**
 * Full-screen WebGL Particle Scene recreating Daniel Ingrassia's exact celestial constellation:
 * - 44,000 delicate stardust particles loaded from binary portrait format (PPT1)
 * - Edge-weighted silhouette: hair curls, jawline, and collar traced with sharp glowing points
 * - Airy negative space interior: translucent face & torso with faint stellar dusting
 * - Radiant star nexus: luminous focal star at the center of the chest
 * - Cosmic swirling entrance: particles swirl inward over 4.0s (swirl = (1 - ease) * 1.4)
 * - Interactive pointer physics: 3D head turning toward mouse with smooth damping & proximity bloom
 * - Scroll-driven morphing: smoothly transitions into a 3D Fibonacci globe and double helix on scroll
 */
export default function ParticleScene({
  formationDuration = 4.0,
  cameraDistance = 3.0,
  particleColor = "#ffffff",
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch (e) {
      console.error("WebGL initialization failed:", e);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = cameraDistance;

    let animFrameId;
    let geometry;
    let material;
    let particlePoints;
    let startTime = performance.now();

    // Mouse tracking with smooth spring lerp
    const pointer = { x: 0, y: 0 };
    const smoothedPointer = { x: 0, y: 0 };

    const handlePointerMove = (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // Scroll progress tracking
    let scrollProgress = 0;
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Resize handling
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      if (material) {
        material.uniforms.uPixelRatio.value = dpr;
        material.uniforms.uAspect.value = w / h;
        material.uniforms.uIsPortrait.value = h > w ? 1.0 : 0.0;
        // Daniel's dynamic point sizing based on viewport height:
        material.uniforms.uSize.value = Math.min(
          Math.max((h / 900) * 3.4, 2.2),
          4.2
        );
      }
    };
    window.addEventListener("resize", resize);
    resize();

    // Fetch and parse the binary 3D portrait data (PPT1 format)
    fetch("/hervin_portrait.bin")
      .then((res) => {
        if (!res.ok) throw new Error("Could not load portrait.bin");
        return res.arrayBuffer();
      })
      .then((buffer) => {
        const view = new DataView(buffer);
        const magic = String.fromCharCode(
          view.getUint8(0),
          view.getUint8(1),
          view.getUint8(2),
          view.getUint8(3)
        );
        if (magic !== "PPT1") {
          throw new Error(`Invalid format header: ${magic}`);
        }

        const count = view.getUint32(4, true);
        const scale = view.getFloat32(8, true);

        const positions = new Float32Array(count * 3);
        const aOrigin = new Float32Array(count * 3);
        const aGlobe = new Float32Array(count * 3);
        const aWaveX = new Float32Array(count);
        const aDelay = new Float32Array(count);
        const aSize = new Float32Array(count);
        const aPhase = new Float32Array(count);
        const aLuma = new Float32Array(count);

        const tmp = new THREE.Vector3();
        const goldenAngle = Math.PI * (3 - Math.sqrt(5));
        const globeRadius = 0.95;

        for (let i = 0; i < count; i++) {
          const off = 12 + i * 8;
          // Target 3D bust coordinates
          positions[i * 3] = view.getInt16(off, true) * scale;
          positions[i * 3 + 1] = view.getInt16(off + 2, true) * scale;
          positions[i * 3 + 2] = view.getInt16(off + 4, true) * scale;
          const luma = view.getUint8(off + 6) / 255.0;

          // 1. aOrigin: Random outer space sphere (swirling colliding origins)
          tmp.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
          if (tmp.lengthSq() === 0) tmp.set(0, 1, 0);
          tmp.normalize().multiplyScalar(2.0 + 4.5 * Math.random());
          aOrigin[i * 3] = tmp.x;
          aOrigin[i * 3 + 1] = tmp.y;
          aOrigin[i * 3 + 2] = tmp.z;

          // 2. aGlobe: Golden spiral on a 3D sphere
          const normY = 1.0 - (i / Math.max(count - 1, 1)) * 2.0;
          const rRing = Math.sqrt(Math.max(0, 1.0 - normY * normY));
          const theta = goldenAngle * i;
          aGlobe[i * 3] = Math.cos(theta) * rRing * globeRadius;
          aGlobe[i * 3 + 1] = normY * globeRadius;
          aGlobe[i * 3 + 2] = Math.sin(theta) * rRing * globeRadius;

          // 3. Waveform coordinate
          aWaveX[i] = (i / count) * 4.0 - 2.0;

          // 4. Stagger delay, sizes, phase, luma
          aDelay[i] = 0.55 * Math.random();
          // Crisp micro-point sizing:
          aSize[i] = 0.5 + 0.35 * luma + 1.2 * Math.pow(Math.random(), 3.0);
          aPhase[i] = Math.random() * Math.PI * 2.0;
          aLuma[i] = luma;
        }

        geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("aOrigin", new THREE.BufferAttribute(aOrigin, 3));
        geometry.setAttribute("aGlobe", new THREE.BufferAttribute(aGlobe, 3));
        geometry.setAttribute("aWaveX", new THREE.BufferAttribute(aWaveX, 1));
        geometry.setAttribute("aDelay", new THREE.BufferAttribute(aDelay, 1));
        geometry.setAttribute("aSize", new THREE.BufferAttribute(aSize, 1));
        geometry.setAttribute("aPhase", new THREE.BufferAttribute(aPhase, 1));
        geometry.setAttribute("aLuma", new THREE.BufferAttribute(aLuma, 1));

        // Vertex Shader directly implementing Daniel Ingrassia's GLSL physics
        const vertexShader = `
          uniform float uTime;
          uniform float uSize;
          uniform float uPixelRatio;
          uniform float uFormation;
          uniform float uMorphGlobe;
          uniform float uMorphWave;
          uniform vec2 uPointer;
          uniform float uGlow;
          uniform float uGlowRadius;
          uniform float uAspect;
          uniform float uIsPortrait;

          attribute vec3 aOrigin;
          attribute vec3 aGlobe;
          attribute float aWaveX;
          attribute float aDelay;
          attribute float aSize;
          attribute float aPhase;
          attribute float aLuma;

          varying float vAlpha;

          void main() {
            // Staggered arrival calculation
            float t = clamp((uFormation - aDelay) / max(1.0 - aDelay, 0.001), 0.0, 1.0);
            float formEase = 1.0 - pow(1.0 - t, 3.0);

            // Dynamic vortex swirl on formation
            float swirl = (1.0 - formEase) * 1.4;
            float cosS = cos(swirl);
            float sinS = sin(swirl);
            vec3 origin = vec3(
              aOrigin.x * cosS - aOrigin.z * sinS,
              aOrigin.y,
              aOrigin.x * sinS + aOrigin.z * cosS
            );

            // 1. Portrait shape (with interactive head turn)
            vec3 portraitPos = position;
            float turnY = uPointer.x * 0.22 * formEase;
            float turnX = -uPointer.y * 0.12 * formEase;
            float cosY = cos(turnY);
            float sinY = sin(turnY);
            portraitPos = vec3(
              portraitPos.x * cosY + portraitPos.z * sinY,
              portraitPos.y,
              -portraitPos.x * sinY + portraitPos.z * cosY
            );
            float cosX = cos(turnX);
            float sinX = sin(turnX);
            portraitPos = vec3(
              portraitPos.x,
              portraitPos.y * cosX - portraitPos.z * sinX,
              portraitPos.y * sinX + portraitPos.z * cosX
            );

            // 2. Rotating Globe shape
            float globeSpin = uTime * 0.25;
            float cosG = cos(globeSpin);
            float sinG = sin(globeSpin);
            vec3 globePos = vec3(
              aGlobe.x * cosG + aGlobe.z * sinG,
              aGlobe.y,
              -aGlobe.x * sinG + aGlobe.z * cosG
            );

            // 3. DNA / Double Helix Waveform shape
            float waveAngle = aWaveX * 8.0 + uTime * 1.2;
            vec3 wavePos = vec3(
              aWaveX,
              sin(waveAngle) * 0.5,
              cos(waveAngle) * 0.5
            );

            // Morphing between targets based on scroll
            vec3 target = mix(portraitPos, globePos, uMorphGlobe);
            target = mix(target, wavePos, uMorphWave);

            // Interpolate from cosmic origin to formed shape
            vec3 formed = mix(origin, target, formEase);

            // Ambient organic float / twinkle
            formed.z += sin(uTime * 0.7 + aPhase) * 0.012 * formEase;

            vec4 mvPosition = modelViewMatrix * vec4(formed, 1.0);
            vec4 clipPosition = projectionMatrix * mvPosition;
            gl_Position = clipPosition;

            // Proximity mouse glow
            vec2 ndc = clipPosition.xy / max(clipPosition.w, 0.001);
            vec2 toPointer = ndc - uPointer;
            toPointer.x *= uAspect;
            float glow = smoothstep(uGlowRadius, 0.0, length(toPointer)) * uGlow * formEase;

            // Twinkle effect
            float twinkle = 0.82 + 0.18 * sin(uTime * 1.4 + aPhase * 3.0);

            // Point size with perspective attenuation - Daniel's exact clamp:
            float pSize = aSize * uSize * uPixelRatio;
            gl_PointSize = min(pSize / max(-mvPosition.z, 0.001), 28.0 * uPixelRatio);

            vAlpha = (0.16 + 0.84 * aLuma) * (1.0 + glow) * twinkle * smoothstep(0.0, 0.12, t);
          }
        `;

        // Fragment Shader with soft circular Gaussian discs
        const fragmentShader = `
          uniform vec3 uColor;
          uniform float uExposure;

          varying float vAlpha;

          void main() {
            vec2 uv = gl_PointCoord - 0.5;
            float d = length(uv);
            if (d > 0.5) discard;

            float flatShade = smoothstep(0.5, 0.06, d);
            gl_FragColor = vec4(uColor, min(flatShade * vAlpha * uExposure, 1.0));
          }
        `;

        const initialSize = Math.min(
          Math.max((window.innerHeight / 900) * 3.4, 2.2),
          4.2
        );

        material = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms: {
            uTime: { value: 0 },
            uSize: { value: initialSize },
            uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
            uFormation: { value: 0 },
            uMorphGlobe: { value: 0 },
            uMorphWave: { value: 0 },
            uPointer: { value: new THREE.Vector2(0, 0) },
            uGlow: { value: 2.0 },
            uGlowRadius: { value: 0.45 },
            uAspect: { value: window.innerWidth / window.innerHeight },
            uIsPortrait: { value: window.innerHeight > window.innerWidth ? 1.0 : 0.0 },
            uColor: { value: new THREE.Color(particleColor) },
            uExposure: { value: 0.50 }, // Daniel Ingrassia's exact 0.50 exposure
          },
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });

        particlePoints = new THREE.Points(geometry, material);
        scene.add(particlePoints);

        if (containerRef.current) {
          containerRef.current.style.opacity = "1";
        }
      })
      .catch((err) => console.error("Error loading portrait particles:", err));

    // Animation frame render loop
    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      const now = performance.now();
      const elapsed = (now - startTime) / 1000;

      smoothedPointer.x += (pointer.x - smoothedPointer.x) * 0.08;
      smoothedPointer.y += (pointer.y - smoothedPointer.y) * 0.08;

      if (material) {
        material.uniforms.uTime.value = elapsed;
        material.uniforms.uFormation.value = Math.min(elapsed / formationDuration, 1.0);
        material.uniforms.uPointer.value.set(smoothedPointer.x, smoothedPointer.y);

        const morphGlobe = Math.max(0, Math.min(1, (scrollProgress - 0.15) / 0.25));
        const morphWave = Math.max(0, Math.min(1, (scrollProgress - 0.45) / 0.25));
        material.uniforms.uMorphGlobe.value = morphGlobe;
        material.uniforms.uMorphWave.value = morphWave;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resize);
      if (geometry) geometry.dispose();
      if (material) material.dispose();
      if (renderer) renderer.dispose();
    };
  }, [formationDuration, cameraDistance, particleColor]);

  return (
    <div
      ref={containerRef}
      className="particle-scene"
      aria-hidden="true"
      style={{ opacity: 0, transition: "opacity 1.2s ease-in-out" }}
    >
      <canvas ref={canvasRef} className="particle-canvas" />
    </div>
  );
}
