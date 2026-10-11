import React, { useState } from "react";
import { Terminal, Menu, X, ArrowUpRight } from "lucide-react";
import { playSound } from "../../utils/speechVoice";

export default function Navbar({ activeSection, onNavigate, scrollY }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: "hero", label: "01. Introduction" },
    { id: "story", label: "02. Story" },
    { id: "skills", label: "03. Skills" },
    { id: "projects", label: "04. Projects" },
    // { id: "timeline", label: "05. Milestones" },
    { id: "contact", label: "05. Contact" },
  ];

  const handleNavClick = (id) => {
    playSound("click");
    if (onNavigate) onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrollY > 30
        ? "bg-[#0b0c10]/90 backdrop-blur-2xl border-b border-neutral-800/80 py-3.5 shadow-xl"
        : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick("hero")}
          className="flex items-center gap-3 text-left group"
        >
          <div className="p-2.5 rounded-2xl bg-neutral-800/80 border border-neutral-700/80 group-hover:border-neutral-500 group-hover:scale-105 transition-all">
            <Terminal className="w-5 h-5 text-neutral-200" />
          </div>
          <div>
            <div className="text-lg font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
              Yoonus Anees
            </div>
            <div className="text-[11px] text-neutral-400 font-medium tracking-wide flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Full-Stack Engineer</span>
            </div>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 backdrop-blur-xl">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${isActive
                  ? "bg-neutral-800 text-white border border-neutral-700 shadow-sm"
                  : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50"
                  }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => handleNavClick("contact")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-neutral-100 hover:bg-white text-neutral-900 shadow-md transition-all hover:scale-105"
          >
            <span>Get In Touch</span>
            <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => {
            playSound("click");
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          className="lg:hidden p-2.5 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0b0c10]/95 backdrop-blur-2xl border-b border-neutral-800 px-6 py-6 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="block w-full text-left px-4 py-3 rounded-2xl text-sm text-neutral-300 hover:text-white hover:bg-neutral-900 border border-transparent hover:border-neutral-700 transition-all font-medium"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick("contact")}
            className="w-full py-3 rounded-2xl text-center font-semibold text-xs bg-neutral-100 text-neutral-900 shadow-md"
          >
            Get In Touch
          </button>
        </div>
      )}
    </header>
  );
}
