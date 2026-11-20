import { ArrowRight } from 'lucide-react';
import { coreSkills } from '../../data/portfolioData';

export default function About({ darkSectionsOnly }) {
  const lightSectionBg = darkSectionsOnly
    ? 'bg-[#0C120F] text-[#E2ECE7] border-y border-[#00FF41]/15'
    : 'bg-[#F6F9F7] text-[#111815]';

  const lightCardBg = darkSectionsOnly
    ? 'bg-[#101814] border-[#00FF41]/25 hover:border-[#00FF41]/60'
    : 'bg-white border-[#D8E4DD] hover:border-[#16A34A]';

  const lightMutedText = darkSectionsOnly ? 'text-[#94A89E]' : 'text-[#4B5B53]';
  const lightAccentText = darkSectionsOnly ? 'text-[#00FF41]' : 'text-[#15803D]';

  return (
    <section
      id="about"
      data-theme={darkSectionsOnly ? 'dark' : 'light'}
      className={`py-12 sm:py-16 transition-colors duration-300 ${lightSectionBg}`}
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Bio */}
        <div className="lg:col-span-5 space-y-3">
          <div className={`font-mono text-[10px] font-semibold tracking-wider uppercase ${lightAccentText}`}>
            01. ABOUT ME
          </div>
          <h2 className="font-mono text-xl sm:text-2xl font-bold tracking-tight">
            Curiosity drives the <span className={lightAccentText}>code</span>.
          </h2>
          <p className={`text-xs sm:text-[13px] leading-relaxed ${lightMutedText}`}>
            I&apos;m Kishore, a Computer Science student who loves solving problems, exploring new
            technologies and turning ideas into real-world solutions.
          </p>
          <div className="pt-1">
            <a
              href="#projects"
              className={`inline-flex items-center gap-1.5 font-mono text-xs font-medium border-b pb-0.5 transition-opacity hover:opacity-80 ${
                darkSectionsOnly
                  ? 'text-[#00FF41] border-[#00FF41]/50'
                  : 'text-[#15803D] border-[#15803D]/50'
              }`}
            >
              <span>Learn more about me</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right 2x2 Skill Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {coreSkills.map((skill) => {
            const IconComponent = skill.icon;
            return (
              <div
                key={skill.title}
                className={`p-3.5 rounded border transition-all flex items-center gap-3.5 shadow-xs ${lightCardBg}`}
              >
                <div
                  className={`w-9 h-9 rounded flex items-center justify-center shrink-0 ${
                    darkSectionsOnly
                      ? 'bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/25'
                      : 'bg-[#DCFCE7] text-[#15803D] border border-[#86EFAC]'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-mono text-xs sm:text-sm font-semibold">{skill.title}</h3>
                  <p className={`text-[11px] ${lightMutedText}`}>{skill.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
