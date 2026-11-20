import { X } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
      data-theme="dark"
    >
      <div
        className="bg-[#0B110E] border border-[#00FF41]/40 rounded-lg max-w-md w-full p-5 space-y-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#00FF41]/20 pb-2.5">
          <span className="font-mono text-xs text-[#00FF41]">
            PROJECT_{project.id}.LOG
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-[#8CA397] hover:text-[#00FF41] cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div>
          <h3 className="font-mono text-base font-bold text-[#F0FDF4]">
            {project.title}
          </h3>
          <p className="font-mono text-[11px] text-[#00FF41]/80 mt-0.5">
            {project.meta}
          </p>
        </div>

        <p className="text-xs text-[#B5C7BE] leading-relaxed">{project.details}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded bg-[#00FF41]/10 border border-[#00FF41]/30 font-mono text-[10px] text-[#00FF41]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
