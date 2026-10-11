import React from "react";
import { Terminal, ArrowUp } from "lucide-react";
import { playSound } from "../../utils/speechVoice";

export default function Footer() {
  const scrollToTop = () => {
    playSound("click");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-neutral-800/80 bg-[#0b0c10] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Identity */}
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2.5">
            <div className="p-1.5 rounded-lg bg-neutral-800 text-neutral-300">
              <Terminal size={15} />
            </div>
            <span className="text-base font-bold text-white">
              Yoonus Anees
            </span>
          </div>
          <p className="text-xs text-neutral-400">
            Full-Stack Software Engineer • Web Application Architect
          </p>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Available for New Projects & Roles</span>
        </div>

        {/* Back to top & Copyright */}
        <div className="flex items-center gap-4 text-xs text-neutral-400">
          <span>© {new Date().getFullYear()} Yoonus Anees.</span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 transition-colors"
            title="Scroll to Top"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
