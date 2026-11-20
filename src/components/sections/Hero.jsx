import CadPortrait from '../avatar/CadPortrait';

export default function Hero({ onOpenContact }) {
  return (
    <section
      id="home"
      data-theme="dark"
      className="relative bg-[#070B09] border-b border-[#00FF41]/20 min-h-[calc(100vh-3.5rem)] flex items-center py-10 sm:py-16 overflow-hidden"
    >
      {/* Subtle CAD Blueprint Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #00FF41 1px, transparent 1px), linear-gradient(to bottom, #00FF41 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Dynamic, Fluid Layout adapting across Mobile, Tablet, Laptop, and Ultrawide displays */}
      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column (7 cols): Terminal Typography, CTAs, and Arrow Controls */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs text-[#86EFAC]">
              <span className="w-2 h-2 rounded-xs bg-[#00FF41] inline-block animate-pulse shadow-[0_0_8px_#00FF41]" />
              <span>
                const conslet = <span className="text-[#00FF41] font-semibold">true</span>;
              </span>
            </div>

            {/* Headline with terminal typography */}
            <h1 className="font-mono text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-bold tracking-tight leading-[1.18] text-[#F0FDF4]">
              I build with <span className="text-[#00FF41]">logic</span>. I create with{' '}
              <span className="text-[#00FF41]">purpose</span>.
            </h1>

            <p className="text-xs sm:text-sm text-[#9BB0A5] max-w-lg leading-relaxed font-mono">
              Computer Science student focused on Java, DSA, and building thoughtful digital
              experiences.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 font-mono text-xs">
              <a
                href="#projects"
                className="btn-reflect px-5 py-2.5 rounded-md bg-[#00FF41] text-[#050807] font-semibold hover:bg-[#33FF66] transition-all shadow-[0_0_20px_rgba(0,255,65,0.25)]"
              >
                Explore my work
              </a>
              <button
                type="button"
                onClick={onOpenContact}
                className="btn-reflect px-5 py-2.5 rounded-md bg-[#0C1510] border border-[#00FF41]/45 text-[#86EFAC] hover:border-[#00FF41] hover:text-[#00FF41] transition-all cursor-pointer"
              >
                Get in touch
              </button>
            </div>

            {/* Technical Arrow Controls (< >) matching reference design */}
            <div className="pt-3 flex items-center gap-2 text-[#00FF41]/70 font-mono">
              <a
                href="#about"
                className="w-8 h-8 rounded border border-[#00FF41]/30 hover:border-[#00FF41] hover:text-[#00FF41] flex items-center justify-center text-xs transition-colors"
                title="Scroll to about"
              >
                &lt;
              </a>
              <a
                href="#projects"
                className="w-8 h-8 rounded border border-[#00FF41]/30 hover:border-[#00FF41] hover:text-[#00FF41] flex items-center justify-center text-xs transition-colors"
                title="Scroll to projects"
              >
                &gt;
              </a>
              <span className="text-[10px] text-[#6EE7B7]/50 ml-2">// 01_OVERVIEW</span>
            </div>
          </div>

          {/* Right Column (5 cols): CAD-Framed Dithered Phosphor Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <CadPortrait />
          </div>

        </div>
      </div>
    </section>
  );
}
