import { useEffect, useRef } from "react";
import "./CustomCursor.css";

/**
 * Adaptive Dual-Theme Custom Cursor
 * - Black/Dark Backgrounds: Phosphor Green (#00FF41) with green glow & trail
 * - White/Light Backgrounds: Deep Carbon Black (#0A0F0D) with subtle dark shadow & black trail
 * - Real-time background detection via target inspection + scroll tracking with smooth RGB lerp
 * - Expands into interactive targeting ring on links & buttons
 * - Touch & reduced-motion friendly
 */
export default function CustomCursor() {
  const cursorRef = useRef(null);
  const canvasRef = useRef(null);
  const headRef = useRef(null);

  useEffect(() => {
    // Only enable on desktop/laptop fine pointers with hover support
    const isFinePointer =
      window.matchMedia("(pointer: fine) and (hover: hover)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer) return;

    const cursor = cursorRef.current;
    const canvas = canvasRef.current;
    const head = headRef.current;
    if (!cursor || !canvas || !head) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    document.documentElement.classList.add("has-custom-cursor");

    // Colors:
    // Dark BG target: #00FF41 (Phosphor Green)
    const COLOR_DARK = { r: 0, g: 255, b: 65, glow: "rgba(0, 255, 65, 0.6)" };
    // Light BG target: #0A0F0D (Deep Carbon Black)
    const COLOR_LIGHT = { r: 10, g: 15, b: 13, glow: "rgba(10, 15, 13, 0.45)" };

    // Interpolated current color
    const currentColor = { r: 0, g: 255, b: 65 };
    let targetTheme = "dark"; // "dark" or "light"

    // Canvas sizing with Retina support (capped at 2x)
    let pixelRatio = 1;
    const resizeCanvas = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Trail and movement state
    const points = [];
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let hasMoved = false;
    let animFrameId = 0;

    const updateThemeFromElement = (element) => {
      if (!element) return;
      const lightSection = element.closest?.('[data-theme="light"], .theme-light');
      targetTheme = lightSection ? "light" : "dark";
    };

    const handlePointerMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        current.x = target.x;
        current.y = target.y;
        points.length = 0;
      }

      if (cursor.dataset.visible !== "true") {
        cursor.dataset.visible = "true";
      }

      updateThemeFromElement(e.target);
    };

    const handleScroll = () => {
      if (hasMoved) {
        const el = document.elementFromPoint(target.x, target.y);
        updateThemeFromElement(el);
      }
    };

    const handlePointerOver = (e) => {
      const interactiveEl = e.target?.closest(
        "a, button, [data-cursor], input, textarea, select, [role='button'], label[for]"
      );
      cursor.dataset.hover = interactiveEl ? "true" : "false";
      updateThemeFromElement(e.target);
    };

    const handlePointerLeave = () => {
      cursor.dataset.visible = "false";
    };

    // Main animation loop
    const render = (time) => {
      animFrameId = requestAnimationFrame(render);

      // Smooth lag interpolation
      current.x += (target.x - current.x) * 0.28;
      current.y += (target.y - current.y) * 0.28;

      head.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;

      // Smoothly interpolate RGB between dark and light themes (factor 0.12)
      const targetColor = targetTheme === "light" ? COLOR_LIGHT : COLOR_DARK;
      currentColor.r += (targetColor.r - currentColor.r) * 0.12;
      currentColor.g += (targetColor.g - currentColor.g) * 0.12;
      currentColor.b += (targetColor.b - currentColor.b) * 0.12;

      const r = Math.round(currentColor.r);
      const g = Math.round(currentColor.g);
      const b = Math.round(currentColor.b);

      const foregroundHex = `rgb(${r}, ${g}, ${b})`;
      cursor.style.setProperty("--foreground", foregroundHex);
      cursor.style.setProperty("--cursor-glow", targetColor.glow);

      // Add trail point if mouse moved sufficiently
      const lastPoint = points[points.length - 1];
      if (
        hasMoved &&
        (!lastPoint || Math.hypot(current.x - lastPoint.x, current.y - lastPoint.y) >= 1.5)
      ) {
        points.push({ x: current.x, y: current.y, t: time });
      }

      // Retain last 140ms of movement
      while (points.length > 0 && time - points[0].t > 140) {
        points.shift();
      }

      // Clear canvas
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (points.length < 3) return;

      const len = points.length;
      const leftPoints = [];
      const rightPoints = [];

      for (let i = 0; i < len; i++) {
        const pt = points[i];
        const prev = points[Math.max(0, i - 1)];
        const next = points[Math.min(len - 1, i + 1)];

        let dx = next.x - prev.x;
        let dy = next.y - prev.y;
        const dist = Math.hypot(dx, dy) || 1;
        dx /= dist;
        dy /= dist;

        const lifeRatio = Math.min(1, Math.max(0, 1 - (time - pt.t) / 140));
        const halfWidth = (1.2 + 6.5 * lifeRatio) / 2;

        leftPoints.push({ x: pt.x - dy * halfWidth, y: pt.y + dx * halfWidth });
        rightPoints.push({ x: pt.x + dy * halfWidth, y: pt.y - dx * halfWidth });
      }

      const tail = points[0];
      const headPt = points[len - 1];

      const dxGrad = headPt.x - tail.x;
      const dyGrad = headPt.y - tail.y;
      const gradEndX = dxGrad === 0 && dyGrad === 0 ? headPt.x + 0.1 : headPt.x;
      const gradEndY = dxGrad === 0 && dyGrad === 0 ? headPt.y + 0.1 : headPt.y;

      const gradient = ctx.createLinearGradient(tail.x, tail.y, gradEndX, gradEndY);
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${targetTheme === "light" ? 0.8 : 0.95})`);

      ctx.beginPath();
      ctx.moveTo(leftPoints[0].x, leftPoints[0].y);
      for (let i = 1; i < len; i++) {
        ctx.lineTo(leftPoints[i].x, leftPoints[i].y);
      }
      for (let i = len - 1; i >= 0; i--) {
        ctx.lineTo(rightPoints[i].x, rightPoints[i].y);
      }
      ctx.closePath();

      ctx.fillStyle = gradient;
      ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${targetTheme === "light" ? 0.3 : 0.8})`;
      ctx.shadowBlur = targetTheme === "light" ? 5 : 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerover", handlePointerOver, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
      <canvas ref={canvasRef} className="custom-cursor__canvas" />
      <div ref={headRef} className="custom-cursor__head" />
    </div>
  );
}
