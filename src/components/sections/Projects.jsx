import { ArrowRight } from 'lucide-react';
import { projects } from '../../data/portfolioData';

export default function Projects({ onSelectProject }) {
  return (
    <section
      id="projects"
      data-theme="dark"
      className="bg-[#080C0A] py-12 sm:py-16 border-y border-[#00FF41]/15"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="font-mono text-[10px] font-semibold tracking-wider text-[#00FF41] uppercase">
              02. SELECTED WORK
            </div>
            <h2 className="font-mono text-xl sm:text-2xl font-bold text-[#F0FDF4] mt-1">
              Things I&apos;ve <span className="text-[#00FF41]">built</span>.
            </h2>
            <p className="text-xs text-[#8CA397] mt-1">
              A few projects that showcase my skills and passion.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelectProject(projects[0])}
            className="inline-flex items-center gap-1 font-mono text-[11px] text-[#00FF41] hover:underline self-start sm:self-auto cursor-pointer"
          >
            <span>View all projects</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* 3 Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project) => {
            const IconComponent = project.icon;
            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group bg-[#0D1310] border border-[#00FF41]/20 hover:border-[#00FF41]/60 rounded-lg p-4 flex flex-col justify-between transition-all cursor-pointer hover:shadow-[0_0_20px_rgba(0,255,65,0.08)]"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="font-mono text-[11px] text-[#00FF41] font-semibold">
                      {project.id} —
                    </span>
                    <div className="w-11 h-11 rounded bg-[#070B09] border border-[#00FF41]/25 flex items-center justify-center text-[#00FF41] group-hover:scale-105 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-mono text-sm font-semibold text-[#F0FDF4] group-hover:text-[#00FF41] transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="font-mono text-[10px] text-[#6EE7B7]/70 mt-1">{project.meta}</p>
                  <p className="text-xs text-[#9BB0A5] mt-2.5 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#00FF41]/10 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#00FF41] group-hover:translate-x-0.5 transition-transform">
                    <span>Explore project</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
