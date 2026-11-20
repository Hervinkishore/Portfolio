import { coreSkills, personalInfo } from '../../data/portfolioData';

export default function SkillsEducation({ darkSectionsOnly }) {
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
      id="education"
      data-theme={darkSectionsOnly ? 'dark' : 'light'}
      className={`py-12 sm:py-16 transition-colors duration-300 ${lightSectionBg}`}
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 03. Skills */}
        <div className="lg:col-span-6 space-y-3 lg:pr-6 lg:border-r lg:border-[#00FF41]/20">
          <div className={`font-mono text-[10px] font-semibold tracking-wider uppercase ${lightAccentText}`}>
            03. SKILLS
          </div>
          <h2 className="font-mono text-xl sm:text-2xl font-bold">
            Tools I work <span className={lightAccentText}>with</span>.
          </h2>
          <p className={`text-xs leading-relaxed ${lightMutedText}`}>
            Technologies and tools I&apos;ve worked with and continue to explore.
          </p>

          <div className="pt-2 grid grid-cols-4 gap-2.5">
            {coreSkills.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.title}
                  className={`p-3 rounded border flex flex-col items-center justify-center gap-1.5 text-center transition-colors shadow-xs ${lightCardBg}`}
                >
                  <IconComponent className={`w-4 h-4 ${lightAccentText}`} />
                  <span className="font-mono text-[11px] font-semibold">{item.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 04. Education */}
        <div className="lg:col-span-6 space-y-3 lg:pl-2">
          <div className={`font-mono text-[10px] font-semibold tracking-wider uppercase ${lightAccentText}`}>
            04. EDUCATION
          </div>
          <h2 className="font-mono text-xl sm:text-2xl font-bold">
            My academic <span className={lightAccentText}>journey</span>.
          </h2>

          <div className="pt-1 grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
            <div className="space-y-1">
              <p className="text-xs font-medium">{personalInfo.education.degree}</p>
              <p className={`text-[11px] ${lightMutedText}`}>{personalInfo.education.location}</p>
            </div>

            <div className="relative pl-4 border-l-2 border-[#22C55E] space-y-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00FF41] border-2 border-[#070B09] absolute -left-[6px] top-0.5" />
              <div className={`font-mono text-[11px] font-semibold ${lightAccentText}`}>
                {personalInfo.education.period}
              </div>
              <div className="font-mono text-xs font-semibold">{personalInfo.education.degree}</div>
              <div className={`text-[11px] leading-snug ${lightMutedText}`}>
                {personalInfo.education.institution}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
