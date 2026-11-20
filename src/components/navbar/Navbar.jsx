import { Sun, Moon } from 'lucide-react';
import AudioPlayer from '../audio/AudioPlayer';
import './Navbar.css';

export default function Navbar({ darkSectionsOnly, setDarkSectionsOnly }) {
  const navLinks = [
    { label: '> home', href: '#home' },
    { label: '> about', href: '#about' },
    { label: '> projects', href: '#projects' },
    { label: '> education', href: '#education' },
    { label: '> contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#070B09]/90 backdrop-blur-md border-b border-[#00FF41]/15" data-theme="dark">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 h-14 py-3 flex items-center justify-between">
        <a
          href="#home"
          className="font-mono text-xs sm:text-sm font-bold tracking-wider text-[#00FF41] hover:opacity-85 transition-opacity"
        >
          KISHORE.MS
        </a>

        {/* Desktop Nav with Sizzling -> Blinking Hover Effect */}
        <nav className="hidden md:flex items-center gap-5 font-mono text-[11px] text-[#9BB0A5]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-sizzle-blink cursor-pointer py-1 px-1.5"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Header Action Controls: Audio Loop Player + Theme Switch */}
        <div className="flex items-center gap-2.5">
          <AudioPlayer />

          <button
            type="button"
            onClick={() => setDarkSectionsOnly(!darkSectionsOnly)}
            className="btn-reflect flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0E1612] border border-[#00FF41]/35 text-[11px] font-mono text-[#86EFAC] hover:border-[#00FF41] transition-colors cursor-pointer"
            title="Toggle Full CMD Dark Mode / Hybrid Mode"
          >
            {darkSectionsOnly ? (
              <>
                <Sun className="w-3 h-3 text-[#00FF41]" />
                <span className="hidden sm:inline">Hybrid</span>
              </>
            ) : (
              <>
                <Moon className="w-3 h-3 text-[#00FF41]" />
                <span className="hidden sm:inline">CMD Dark</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
