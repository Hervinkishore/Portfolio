import { useState } from 'react';
import { Terminal, X, Sparkles } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
      onClose();
    }, 1800);
  };

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
          <div className="flex items-center gap-1.5 font-mono text-xs text-[#00FF41]">
            <Terminal className="w-3.5 h-3.5" />
            <span>send_message.sh</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#8CA397] hover:text-[#00FF41] cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {formSubmitted ? (
          <div className="py-6 text-center space-y-2 font-mono">
            <Sparkles className="w-6 h-6 text-[#00FF41] mx-auto animate-bounce" />
            <div className="text-sm text-[#00FF41] font-semibold">
              &gt; Message transmitted!
            </div>
            <p className="text-xs text-[#9BB0A5]">
              Thanks for reaching out. Kishore will reply shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 font-mono text-xs">
            <div>
              <label className="block text-[11px] text-[#86EFAC] mb-1">&gt; your_name:</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="w-full px-3 py-2 rounded bg-[#070B09] border border-[#00FF41]/30 text-[#F0FDF4] focus:outline-none focus:border-[#00FF41] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] text-[#86EFAC] mb-1">&gt; your_email:</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                className="w-full px-3 py-2 rounded bg-[#070B09] border border-[#00FF41]/30 text-[#F0FDF4] focus:outline-none focus:border-[#00FF41] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] text-[#86EFAC] mb-1">&gt; message:</label>
              <textarea
                rows="3"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Let's build something cool..."
                className="w-full px-3 py-2 rounded bg-[#070B09] border border-[#00FF41]/30 text-[#F0FDF4] focus:outline-none focus:border-[#00FF41] transition-colors"
              />
            </div>
            <button
              type="submit"
              className="btn-reflect w-full py-2 rounded bg-[#00FF41] text-[#050807] font-semibold hover:bg-[#33FF66] transition-colors cursor-pointer shadow-[0_0_15px_rgba(0,255,65,0.2)]"
            >
              &gt; Execute Send _
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
