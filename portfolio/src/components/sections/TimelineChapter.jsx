import React from "react";
import { motion } from "framer-motion";
import { Milestone, Briefcase, GraduationCap, Code2, Sparkles } from "lucide-react";
import { playSound } from "../../utils/speechVoice";

export default function TimelineChapter() {
  const milestones = [
    {
      year: "2024 — Present",
      title: "Full-Stack Software Engineer & Solutions Architect",
      role: "Client Productions & Complex Systems",
      description:
        "Architecting production client web systems (Eivor.s Luxury Fashion, ITC Gold House, SLREPSMS) with Next.js, React, Node.js, and MongoDB/PostgreSQL. Delivering responsive, high-converting digital products.",
      tags: ["Full-Stack", "Client Solutions", "Next.js", "React", "Node.js"],
      icon: <Briefcase className="w-5 h-5 text-neutral-200" />,
    },
    {
      year: "2023 — 2024",
      title: "Enterprise Systems & Multi-Tier Applications",
      role: "Full-Stack Development",
      description:
        "Engineered major full-scale systems including Road Crime Fine Management System (Laravel & MySQL), Equipment Payroll Management (MERN & Stripe), and Candidate Tracking Management System (CTMS).",
      tags: ["Laravel", "MERN Stack", "MySQL", "Stripe API", "JWT Auth"],
      icon: <Code2 className="w-5 h-5 text-amber-400" />,
    },
    {
      year: "2022 — 2023",
      title: "Software Engineering & Computer Science Foundation",
      role: "Technical Academic Studies & Specialization",
      description:
        "Developed deep competencies in Data Structures & Algorithms, Object-Oriented Programming (Java, C#), Database Architecture (SQL & NoSQL), and REST API design.",
      tags: ["Java", "C#", "SQL Server", "Algorithms", "OOP Architecture"],
      icon: <GraduationCap className="w-5 h-5 text-emerald-400" />,
    },
    {
      year: "Genesis",
      title: "The Passion For Modern Web Engineering",
      role: "Self-Directed Building",
      description:
        "Built first dynamic web projects, mastered JavaScript fundamentals, modern CSS, and responsive layouts that sparked a passion for modern web technologies.",
      tags: ["JavaScript", "HTML5", "CSS3", "Git & GitHub"],
      icon: <Sparkles className="w-5 h-5 text-neutral-400" />,
    },
  ];

  return (
    <section id="timeline" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Chapter Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-neutral-300 text-xs font-mono tracking-wide backdrop-blur-md">
            <Milestone className="w-3.5 h-3.5 text-neutral-400" />
            05 // Journey & Milestones
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Key Milestones &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-200">
              Progression
            </span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-base sm:text-lg font-light">
            A chronological timeline tracing skills, systems delivered, and career milestones.
          </p>
        </div>

        {/* Timeline Line */}
        <div className="relative pl-6 sm:pl-10 border-l-2 border-neutral-800 space-y-12">
          {milestones.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              onMouseEnter={() => playSound("hover")}
              className="relative group"
            >
              {/* Node Marker */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-1 p-2 rounded-2xl bg-neutral-900 border-2 border-neutral-700 group-hover:border-amber-400 transition-all duration-300 shadow-md">
                {item.icon}
              </div>

              {/* Timeline Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/60 backdrop-blur-xl border border-neutral-800 group-hover:border-neutral-700 transition-all duration-300 hover:scale-[1.01]">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-neutral-800 text-neutral-200 border border-neutral-700">
                    {item.year}
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    {item.role}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-amber-200 transition-colors mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-neutral-300 font-light leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg bg-neutral-800/80 text-[11px] font-mono text-neutral-300 border border-neutral-700/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
