import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Compass, ShieldCheck, Cpu, Terminal, Zap } from "lucide-react";
import { playSound } from "../../utils/speechVoice";

export default function StoryChapter() {
  const storyCards = [
    {
      icon: <Terminal className="w-5 h-5 text-neutral-300" />,
      title: "01. The Foundation & Genesis",
      subtitle: "From curious lines of code to building enterprise systems",
      content:
        "My path into software engineering began with a genuine curiosity about how digital systems function under the hood. What started as experimentation evolved into a dedicated pursuit of mastering full-stack architecture, clean APIs, and responsive interfaces.",
      borderColor: "hover:border-neutral-600",
    },
    {
      icon: <Cpu className="w-5 h-5 text-amber-400" />,
      title: "02. The Full-Stack Spectrum",
      subtitle: "End-to-End Development from Database to UI",
      content:
        "I specialize in connecting reliable backend architectures (Node.js, Express, Laravel, PostgreSQL, MongoDB) with clean, accessible frontend interfaces (React, Next.js, modern CSS, 3D Canvas). Every layer is structured for efficiency, speed, and maintainability.",
      borderColor: "hover:border-amber-500/40",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: "03. Engineering Philosophy",
      subtitle: "Clean Code, Security & Scalability",
      content:
        "I approach code as a craftsman: self-documenting logic, modular component boundaries, strict typing, and reliable database indexing. I build software designed to stand the test of time and scale effortlessly.",
      borderColor: "hover:border-emerald-500/40",
    },
    {
      icon: <Zap className="w-5 h-5 text-neutral-200" />,
      title: "04. Real-World Impact",
      subtitle: "Delivering for Real Clients & Enterprise Needs",
      content:
        "From government-level penalty management systems (SLREPSMS) and law enforcement fine tracking (RCFMS) to luxury e-commerce platforms (Eivor.s, ITC Gold House), I engineer real products that solve practical business problems.",
      borderColor: "hover:border-neutral-600",
    },
  ];

  return (
    <section id="story" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Chapter Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-neutral-300 text-xs font-mono tracking-wide backdrop-blur-md">
            <Compass className="w-3.5 h-3.5 text-neutral-400" />
            02 // Story & Philosophy
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            The Story Behind the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-200">
              Developer
            </span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-base sm:text-lg font-light">
            Every great software product is born from deliberate craftsmanship, continuous learning,
            and a passion for building reliable solutions.
          </p>
        </div>

        {/* Story Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {storyCards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              onMouseEnter={() => playSound("hover")}
              className={`group relative p-8 rounded-3xl bg-neutral-900/60 backdrop-blur-xl border border-neutral-800/90 transition-all duration-300 hover:scale-[1.01] hover:bg-neutral-900/90 ${card.borderColor}`}
            >
              <div className="flex items-start gap-5">
                <div className="p-3.5 rounded-2xl bg-neutral-800/80 border border-neutral-700/60 transition-transform duration-300">
                  {card.icon}
                </div>
                <div className="space-y-2 flex-1">
                  <span className="text-xs font-mono font-medium tracking-wider text-neutral-400 uppercase">
                    {card.title}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-200 transition-colors">
                    {card.subtitle}
                  </h3>
                  <p className="text-neutral-300 text-sm leading-relaxed font-light pt-1">
                    {card.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Narrative Quote Highlight */}
        <div className="relative p-8 sm:p-10 rounded-3xl bg-neutral-900/70 border border-neutral-800 backdrop-blur-xl shadow-xl text-center max-w-4xl mx-auto">
          <Sparkles className="w-6 h-6 text-amber-400 mx-auto mb-4" />
          <p className="text-xl sm:text-2xl font-light text-neutral-200 italic leading-relaxed">
            "Software engineering is about architecting systems that run smoothly, scale effortlessly,
            and create genuine value for the people who use them."
          </p>
          <div className="mt-4 text-xs font-mono text-neutral-400 uppercase tracking-widest font-semibold">
            — Yoonus Anees
          </div>
        </div>
      </div>
    </section>
  );
}
