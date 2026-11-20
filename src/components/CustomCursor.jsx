import { useEffect, useRef } from "react";
import "./CustomCursor.css";

/**
 * Custom Cursor recreated from Daniel Ingrassia's portfolio (ingrassiadaniel.it)
 * Features:
 * - Fluid lerped cursor head (factor 0.28)
 * - Dynamic ribbon/comet trailing mesh generated on HTML5 canvas with linear gradient fade and glow
 * - Interactive hover state: 8px glowing filled dot expands into a 40px hollow ring on links & buttons
 * - Fine-pointer & reduced-motion detection (disables safely on mobile/touch screens)
 * - Customizable color via CSS `--foreground` variable or `color` prop
 */
export default function CustomCursor({ color }) {
  const cursorRef = useRef(null);
  const canvasRef = useRef(null);
  const headRef = useRef(null);

  useEffect(() => {
    // Check if the user is on a desktop device with a mouse/trackpad and doesn't prefer reduced motion
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

    // Hide native cursor only when custom cursor is active
    document.documentElement.classList.add("has-custom-cursor");

    // Resolve trail and glow color
    const getActiveColor = () => {
      return (
        color ||
        getComputedStyle(cursor).getPropertyValue("--foreground").trim() ||
        "#f0f2f0"
      );
    };

    let foregroundColor = getActiveColor();

    // Helper to get transparent version of the foreground color for gradient fading
    const getTransparentColor = (col) => {
      if (col.startsWith("#")) {
        let hex = col.slice(1);
        if (hex.length === 3) {
          hex = hex
            .split("")
            .map((c) => c + c)
            .join("");
        }
        const num = parseInt(hex, 16);
        const r = (num >> 16) & 255;
        const g = (num >> 8) & 255;
        const b = num & 255;
        return `rgba(${r}, ${g}, ${b}, 0)`;
      }
      if (col.startsWith("rgb")) {
        return col
          .replace(/rgb\((.*?)\)/, "rgba($1, 0)")
          .replace(/rgba\((.*?),\s*[\d.]+\)/, "rgba($1, 0)");
      }
      return "rgba(255, 255, 255, 0)";
    };

    let transparentColor = getTransparentColor(foregroundColor);

    // Canvas sizing with Retina display support (capped at 2 for performance)
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
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let hasMoved = false;
    let animFrameId = 0;

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
    };

    const handlePointerOver = (e) => {
      const interactiveEl = e.target?.closest(
        "a, button, [data-cursor], input, textarea, select, [role='button']"
      );
      cursor.dataset.hover = interactiveEl ? "true" : "false";
    };

    const handlePointerLeave = () => {
      cursor.dataset.visible = "false";
    };

    // Main animation loop
    const render = (time) => {
      animFrameId = requestAnimationFrame(render);

      // Smooth lag interpolation (factor 0.28 matches original website)
      current.x += (target.x - current.x) * 0.28;
      current.y += (target.y - current.y) * 0.28;

      head.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;

      // Add trail point if mouse has moved at least 1.5px
      const lastPoint = points[points.length - 1];
      if (
        hasMoved &&
        (!lastPoint || Math.hypot(current.x - lastPoint.x, current.y - lastPoint.y) >= 1.5)
      ) {
        points.push({ x: current.x, y: current.y, t: time });
      }

      // Keep only points from the last 150ms
      while (points.length > 0 && time - points[0].t > 150) {
        points.shift();
      }

      // Clear previous frame
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Need at least 3 points to construct a smooth tapered ribbon
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

        // Taper formula: thicker near the head, tapering down towards the tail
        const lifeRatio = Math.min(1, Math.max(0, 1 - (time - pt.t) / 150));
        const halfWidth = (1.5 + 7.5 * lifeRatio) / 2;

        leftPoints.push({ x: pt.x - dy * halfWidth, y: pt.y + dx * halfWidth });
        rightPoints.push({ x: pt.x + dy * halfWidth, y: pt.y - dx * halfWidth });
      }

      const tail = points[0];
      const headPt = points[len - 1];

      // Prevent 0-length gradient vector
      const dxGrad = headPt.x - tail.x;
      const dyGrad = headPt.y - tail.y;
      const gradEndX = dxGrad === 0 && dyGrad === 0 ? headPt.x + 0.1 : headPt.x;
      const gradEndY = dxGrad === 0 && dyGrad === 0 ? headPt.y + 0.1 : headPt.y;

      const gradient = ctx.createLinearGradient(tail.x, tail.y, gradEndX, gradEndY);
      gradient.addColorStop(0, transparentColor);
      gradient.addColorStop(1, foregroundColor);

      // Draw continuous polygonal ribbon
      ctx.beginPath();
      ctx.moveTo(leftPoints[0].x, leftPoints[0].y);
      for (let i = 1; i < len; i++) {
        ctx.lineTo(leftPoints[i].x, leftPoints[i].y);
      }
      for (let i = len - 1; i >= 0; i--) {
        ctx.lineTo(rightPoints[i].x, rightPoints[i].y);
      }
      ctx.closePath();

      // Fill ribbon with glow effect
      ctx.fillStyle = gradient;
      ctx.shadowColor = foregroundColor;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerover", handlePointerOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerover", handlePointerOver);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [color]);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      aria-hidden="true"
      style={color ? { "--foreground": color } : undefined}
    >
      <canvas ref={canvasRef} className="custom-cursor__canvas" />
      <div ref={headRef} className="custom-cursor__head" />
    </div>
  );
}
