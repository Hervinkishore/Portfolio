import { useState } from 'react';
import { Mail, ArrowUp, ArrowRight, Check } from 'lucide-react';
import { Github, Linkedin } from '../icons/SocialIcons';
import { personalInfo } from '../../data/portfolioData';

export default function Footer({ onOpenContact }) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      data-theme="dark"
      className="bg-[#070B09] border-t border-[#00FF41]/20 pt-12 pb-6"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-10 border-b border-[#00FF41]/15">
          {/* Left CTA */}
          <div className="lg:col-span-5 space-y-3">
            <div className="font-mono text-[10px] font-semibold tracking-wider text-[#00FF41] uppercase">
              05. LET&apos;S CONNECT
            </div>
            <h2 className="font-mono text-xl sm:text-2xl font-bold text-[#F0FDF4]">
              Have something in <span className="text-[#00FF41]">mind</span>?
            </h2>
            <p className="text-xs text-[#8CA397] leading-relaxed max-w-xs">
              Let&apos;s talk about opportunities, collaborations or just a great idea.
            </p>
            <div className="pt-1">
              <button
                type="button"
                onClick={onOpenContact}
                className="btn-reflect inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[#00FF41] text-[#050807] font-mono text-xs font-semibold hover:bg-[#33FF66] transition-colors cursor-pointer shadow-[0_0_15px_rgba(0,255,65,0.2)]"
              >
                <span>Get in touch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Social Links */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="flex items-start gap-2.5 text-left p-2.5 rounded hover:bg-[#0E1612] border border-transparent hover:border-[#00FF41]/25 transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4 text-[#00FF41] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <div className="font-mono text-xs font-semibold text-[#F0FDF4] flex items-center gap-1.5">
                  <span>Email</span>
                  {copiedEmail && <Check className="w-3 h-3 text-[#00FF41]" />}
                </div>
                <div className="font-mono text-[10px] text-[#8CA397] truncate">
                  {copiedEmail ? 'Copied to clipboard!' : personalInfo.email}
                </div>
              </div>
            </button>

            <a
              href={personalInfo.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-2.5 p-2.5 rounded hover:bg-[#0E1612] border border-transparent hover:border-[#00FF41]/25 transition-colors"
            >
              <Linkedin className="w-4 h-4 text-[#00FF41] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <div className="font-mono text-xs font-semibold text-[#F0FDF4]">LinkedIn</div>
                <div className="font-mono text-[10px] text-[#8CA397] truncate">
                  /in/kishore-ms
                </div>
              </div>
            </a>

            <a
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-2.5 p-2.5 rounded hover:bg-[#0E1612] border border-transparent hover:border-[#00FF41]/25 transition-colors"
            >
              <Github className="w-4 h-4 text-[#00FF41] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <div className="font-mono text-xs font-semibold text-[#F0FDF4]">GitHub</div>
                <div className="font-mono text-[10px] text-[#8CA397] truncate">
                  /github/kishore-ms
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[10px] text-[#6EE7B7]/60">
          <div>
            <span className="text-[#00FF41] font-semibold">{personalInfo.handle}</span> © 2025. Built with
            curiosity.
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 hover:text-[#00FF41] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
