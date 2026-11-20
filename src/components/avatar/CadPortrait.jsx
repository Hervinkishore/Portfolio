import './CadPortrait.css';

/**
 * CAD-Framed Pixel Art Portrait Component
 * Features:
 * - Direct rendering of the user's high-res green pixel-art portrait (/hero-pixel-portrait.webp)
 * - Rich cyber-emerald background glow matching the hover state
 * - Electric phosphor sizzling effect on hover
 * - CAD technical corner brackets and coordinate badges (12.9716° N, 80.2707° E)
 */
export default function CadPortrait() {
  return (
    <div className="portrait-container relative w-full max-w-[340px] sm:max-w-[380px] select-none">
      {/* Phosphor Radial Backlight */}
      <div
        className="absolute -inset-6 rounded-full opacity-35 blur-2xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00FF41 0%, transparent 68%)' }}
      />

      {/* CAD Outer Framing Box with Technical Corner Crosshairs & Emerald Background */}
      <div className="relative border border-[#00FF41]/45 bg-[#08100C] rounded-xs overflow-hidden p-1 shadow-[0_0_35px_rgba(0,255,65,0.2)] transition-shadow duration-300">
        {/* Corner Crosshairs */}
        <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#00FF41] z-20" />
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#00FF41] z-20" />
        <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#00FF41] z-20" />
        <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#00FF41] z-20" />

        {/* Main Display Box with Rich Emerald Background */}
        <div className="relative aspect-square w-full overflow-hidden bg-[#0A140F]">
          {/* Base High-Resolution Pixel Portrait */}
          <img
            src="/hero-pixel-portrait.webp"
            alt="Kishore M S - Pixel Developer Portrait"
            className="portrait-img w-full h-full object-cover select-none"
            style={{
              imageRendering: 'pixelated',
            }}
            loading="eager"
          />

          {/* CRT Scanlines Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20 z-15"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, rgba(0, 255, 65, 0.08) 0px, rgba(0, 255, 65, 0.08) 2px, transparent 2px, transparent 4px)',
            }}
          />

          {/* Green Duotone Lighting Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070B09]/80 via-transparent to-transparent pointer-events-none z-10" />
        </div>
      </div>

      {/* Technical Coordinate & Tag Badges Below Portrait */}
      <div className="mt-2.5 w-full flex items-center justify-between text-[11px] text-[#86EFAC]/80 font-mono">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#00FF41] shadow-[0_0_6px_#00FF41]" />
            <span>Bio bio</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#00FF41] shadow-[0_0_6px_#00FF41]" />
            <span>Web Dev</span>
          </span>
        </div>
        <div className="text-[#6EE7B7]/70 text-[10px] text-right font-mono">
          <div>// 12.9716° N,</div>
          <div>80.2707° E</div>
        </div>
      </div>
    </div>
  );
}
