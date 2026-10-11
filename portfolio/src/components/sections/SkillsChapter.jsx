import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Terminal,
  Palette,
  Zap,
  Sparkles,
  Shield,
  Globe,
  Database,
  Layers,
  Box,
} from "lucide-react";
import SkillsConstellation3D from "../3d/SkillsConstellation3D";
import { playSound } from "../../utils/speechVoice";

export default function SkillsChapter() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Technologies" },
    { id: "frontend", label: "Frontend & UI" },
    { id: "backend", label: "Backend & APIs" },
    { id: "database", label: "Databases & Cloud" },
  ];

  const skillsList = [
    {
      name: "React & React Native",
      category: "frontend",
      level: 90,
      icon: <Cpu className="w-5 h-5 text-sky-400" />,
      color: "bg-sky-500",
      description: "Hooks, Context API, component architecture, React Router",
    },
    {
      name: "TypeScript",
      category: "frontend",
      level: 85,
      icon: <Terminal className="w-5 h-5 text-blue-400" />,
      color: "bg-blue-500",
      description: "Type safety, generics, interfaces, strict state modeling",
    },
    {
      name: "Tailwind CSS & UI Design",
      category: "frontend",
      level: 95,
      icon: <Palette className="w-5 h-5 text-teal-400" />,
      color: "bg-teal-500",
      description: "Responsive layouts, clean design systems, micro-interactions",
    },
    {
      name: "Node.js & Express",
      category: "backend",
      level: 85,
      icon: <Zap className="w-5 h-5 text-emerald-400" />,
      color: "bg-emerald-500",
      description: "RESTful architecture, JWT authentication, middleware pipelines",
    },
    {
      name: "Laravel & PHP",
      category: "backend",
      level: 85,
      icon: <Shield className="w-5 h-5 text-rose-400" />,
      color: "bg-rose-500",
      description: "Eloquent ORM, Blade, robust MVC enterprise applications",
    },
    {
      name: "Next.js & SSR",
      category: "frontend",
      level: 75,
      icon: <Globe className="w-5 h-5 text-neutral-300" />,
      color: "bg-neutral-400",
      description: "Server-side rendering, App router, SEO optimization",
    },
    {
      name: "MongoDB & Mongoose",
      category: "database",
      level: 80,
      icon: <Database className="w-5 h-5 text-emerald-400" />,
      color: "bg-emerald-500",
      description: "NoSQL schemas, aggregation pipelines, document indexing",
    },
    {
      name: "MySQL & PostgreSQL",
      category: "database",
      level: 85,
      icon: <Database className="w-5 h-5 text-sky-400" />,
      color: "bg-sky-500",
      description: "Relational modeling, complex queries, transactions, foreign keys",
    },
    {
      name: "Python",
      category: "backend",
      level: 65,
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      color: "bg-amber-500",
      description: "Scripting, algorithmic automation, API integrations",
    },
  ];

  const filteredSkills =
    activeCategory === "all"
      ? skillsList
      : skillsList.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Chapter Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-neutral-300 text-xs font-mono tracking-wide backdrop-blur-md">
            <Layers className="w-3.5 h-3.5 text-neutral-400" />
            03 // Skills & Technologies
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Technical{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-200">
              Stack & Proficiency
            </span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-base sm:text-lg font-light">
            Modern frameworks, robust backend languages, and high-performance database systems.
          </p>
        </div>

        {/* 3D Skills Constellation Core */}
        <div className="p-4 sm:p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-2xl shadow-xl">
          <div className="flex items-center justify-between mb-2 px-4">
            <span className="text-xs font-mono text-neutral-400 tracking-wider flex items-center gap-2">
              <Box className="w-4 h-4 text-amber-400" />
              Interactive 3D Skill Constellation
            </span>
            <span className="text-[11px] font-mono text-neutral-500 hidden sm:inline">
              WebGL
            </span>
          </div>
          <SkillsConstellation3D />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                playSound("click");
                setActiveCategory(cat.id);
              }}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-300 backdrop-blur-md ${
                activeCategory === cat.id
                  ? "bg-neutral-800 text-white border border-neutral-600 shadow-sm"
                  : "bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              onMouseEnter={() => playSound("hover")}
              className="group p-6 rounded-3xl bg-neutral-900/60 backdrop-blur-xl border border-neutral-800 hover:border-neutral-700 transition-all duration-300 hover:scale-[1.01]"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-neutral-800/80 border border-neutral-700/60">
                    {skill.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-200 transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-[11px] font-mono text-neutral-400 uppercase">
                      {skill.category}
                    </span>
                  </div>
                </div>
                <span className="text-sm font-mono font-bold text-neutral-300">
                  {skill.level}%
                </span>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed mb-4 font-light">
                {skill.description}
              </p>

              {/* Muted Progress Meter */}
              <div className="relative w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.0, ease: "easeOut" }}
                  className={`h-full rounded-full ${skill.color}`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
