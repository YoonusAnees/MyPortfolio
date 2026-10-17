import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion as Motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
  Search,
  X,
  ChevronDown,
  ExternalLink,
  Github,
  FolderGit2,
  SlidersHorizontal,
  RotateCcw,
  Code2,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import SkillsGlobe3D from "../3d/SkillsGlobe3D";
import { playSound } from "../../utils/speechVoice";

export default function SkillsChapter() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState(null);
  const lastHoverSoundRef = useRef(0);
  const searchInputRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Handle body scroll lock and Escape key listener when popup modal is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedSkill(null);
      }
    };

    if (selectedSkill) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedSkill]);

  const categories = [
    { id: "all", label: "All Technologies" },
    { id: "frontend", label: "Frontend & UI" },
    { id: "backend", label: "Backend & APIs" },
    { id: "database", label: "Databases & Cloud" },
  ];

  const skillsList = [
    {
      id: "react",
      name: "React & React Native",
      category: "frontend",
      level: 90,
      icon: <Cpu className="w-5 h-5 text-sky-400" />,
      color: "bg-sky-500",
      description: "Hooks, Context API, component architecture, React Router",
      extendedDescription:
        "Architecting high-scale component hierarchies, custom hooks for complex stateful logic, fluid navigation patterns, and cross-platform native-feeling mobile applications.",
      proficiencyStatus: "Advanced / Core Specialty",
      relatedTech: ["Next.js", "React Native", "Context API", "React Router", "Vite", "Framer Motion"],
      projects: [
        {
          title: "SLREPSMS",
          badge: "Flagship",
          description: "Digital law compliance & fine dispute platform with secure payment integrations.",
          live: "https://slrepmsfe.vercel.app/",
          github: "https://github.com/YoonusAnees/SLREPMSFE.git",
        },
        {
          title: "Road Crime Fine Management System",
          badge: "Enterprise",
          description: "Traffic violation records and fine tracking portal with live status audits.",
          github: "https://github.com/YoonusAnees/RCFMS.git",
        },
        {
          title: "Eivor.s Luxury Fashion",
          badge: "Client Production",
          description: "High-end luxury apparel storefront with smooth catalog browsing and cart state.",
          live: "https://eivor.vercel.app/",
        },
        {
          title: "ITC GOLD HOUSE",
          badge: "Client Production",
          description: "Jewellery catalogue with dynamic gold rate calculations and luxury branding.",
          live: "https://itc-gold-house.vercel.app/",
        },
      ],
    },
    {
      id: "typescript",
      name: "TypeScript",
      category: "frontend",
      level: 85,
      icon: <Terminal className="w-5 h-5 text-blue-400" />,
      color: "bg-blue-500",
      description: "Type safety, generics, interfaces, strict state modeling",
      extendedDescription:
        "Enforcing strict compile-time type safety across complex domain models, generic helper utilities, and predictable API contracts to eliminate runtime exceptions.",
      proficiencyStatus: "Proficient / Enterprise Ready",
      relatedTech: ["Generics", "Type Narrowing", "Interfaces", "Strict Null Checks", "Utility Types"],
      projects: [
        {
          title: "SLREPSMS",
          badge: "Flagship",
          description: "Digital law enforcement architecture with strictly typed payment & audit payloads.",
          live: "https://slrepmsfe.vercel.app/",
          github: "https://github.com/YoonusAnees/SLREPMSFE.git",
        },
      ],
    },
    {
      id: "tailwind",
      name: "Tailwind CSS & UI Design",
      category: "frontend",
      level: 95,
      icon: <Palette className="w-5 h-5 text-teal-400" />,
      color: "bg-teal-500",
      description: "Responsive layouts, clean design systems, micro-interactions",
      extendedDescription:
        "Crafting futuristic, high-contrast dark mode interfaces, glassmorphic HUD controls, fluid responsive viewports, and unified design token systems.",
      proficiencyStatus: "Expert / Core Specialty",
      relatedTech: ["Design Systems", "Framer Motion", "Glassmorphism", "Responsive Layouts", "Dark Mode"],
      projects: [
        {
          title: "Road Crime Fine Management System",
          badge: "Enterprise",
          description: "Custom dark-theme responsive dashboards with granular violation status views.",
          github: "https://github.com/YoonusAnees/RCFMS.git",
        },
        {
          title: "Eivor.s Luxury Fashion",
          badge: "Client Production",
          description: "Minimalist editorial UI design with smooth micro-interactions and transitions.",
          live: "https://eivor.vercel.app/",
        },
      ],
    },
    {
      id: "nodejs",
      name: "Node.js & Express",
      category: "backend",
      level: 85,
      icon: <Zap className="w-5 h-5 text-emerald-400" />,
      color: "bg-emerald-500",
      description: "RESTful architecture, JWT authentication, middleware pipelines",
      extendedDescription:
        "Designing resilient RESTful microservices, secure JSON Web Token authentication cycles, rate-limiting middleware, and high-throughput async data processing.",
      proficiencyStatus: "Proficient / Production Core",
      relatedTech: ["Express", "JWT Auth", "REST APIs", "Middleware Pipelines", "Bcrypt", "CORS"],
      projects: [
        {
          title: "SLREPSMS",
          badge: "Flagship",
          description: "Scalable backend services managing digital violation logs and verification.",
          live: "https://slrepmsfe.vercel.app/",
          github: "https://github.com/YoonusAnees/SLREPSMS-Backend.git",
        },
        {
          title: "Fund Raising Management System",
          badge: "Relief Platform",
          description: "Humanitarian relief donation routing and transparent fund allocation APIs.",
          live: "https://dms-fe-ubdm.vercel.app",
          github: "https://github.com/YoonusAnees/DMS-BE.git",
        },
        {
          title: "Equipment Payroll Management System",
          badge: "FinTech",
          description: "Automated payroll computation, equipment allowances, and billing APIs.",
          live: "https://pos-tau-blond.vercel.app",
          github: "https://github.com/YoonusAnees/POS.git",
        },
        {
          title: "Candidate Tracking Management System (CTMS)",
          badge: "HR Tech",
          description: "Interview scheduling, applicant scoring, and evaluation pipeline backend.",
          live: "https://ctmsfe-1wfp.vercel.app",
          github: "https://github.com/YoonusAnees/CTMSBE.git",
        },
      ],
    },
    {
      id: "laravel",
      name: "Laravel & PHP",
      category: "backend",
      level: 85,
      icon: <Shield className="w-5 h-5 text-rose-400" />,
      color: "bg-rose-500",
      description: "Eloquent ORM, Blade, robust MVC enterprise applications",
      extendedDescription:
        "Engineering scalable enterprise MVC platforms utilizing Laravel Eloquent ORM, automated database migrations, policy authorization gates, and payment gateway webhooks.",
      proficiencyStatus: "Proficient / Enterprise Ready",
      relatedTech: ["Eloquent ORM", "Blade", "Artisan CLI", "Stripe API", "MVC Architecture", "PHP 8+"],
      projects: [
        {
          title: "Road Crime Fine Management System",
          badge: "Enterprise",
          description: "Full-stack traffic penalty tracking system with Eloquent relations and Stripe payments.",
          github: "https://github.com/YoonusAnees/RCFMS.git",
        },
        {
          title: "Hotel Management System (Serenity Villa)",
          badge: "Hospitality",
          description: "Villa booking engine with guest calendar management and invoice generation.",
          live: "https://mediumspringgreen-nightingale-863353.hostingersite.com/",
          github: "https://github.com/YoonusAnees/Hotel-Management-.git",
        },
      ],
    },
    {
      id: "nextjs",
      name: "Next.js & SSR",
      category: "frontend",
      level: 75,
      icon: <Globe className="w-5 h-5 text-neutral-300" />,
      color: "bg-neutral-400",
      description: "Server-side rendering, App router, SEO optimization",
      extendedDescription:
        "Building search-engine optimized, high-performance web applications using server-side rendering, incremental static generation, and automated asset delivery pipelines.",
      proficiencyStatus: "Competent / Modern Web",
      relatedTech: ["Server Components", "App Router", "SEO Optimization", "Dynamic Routing", "Image Optimization"],
      projects: [
        {
          title: "ITC GOLD HOUSE",
          badge: "Client Production",
          description: "Luxury jewellery catalogue with SSR for search indexing and real-time gold rates.",
          live: "https://itc-gold-house.vercel.app/",
        },
      ],
    },
    {
      id: "mongodb",
      name: "MongoDB & Mongoose",
      category: "database",
      level: 80,
      icon: <Database className="w-5 h-5 text-emerald-400" />,
      color: "bg-emerald-500",
      description: "NoSQL schemas, aggregation pipelines, document indexing",
      extendedDescription:
        "Architecting flexible NoSQL collections with Mongoose validation, multi-stage aggregation pipelines, population references, and compound index performance optimization.",
      proficiencyStatus: "Proficient / NoSQL Core",
      relatedTech: ["Mongoose ORM", "Aggregation Pipelines", "Document Indexing", "BSON", "MongoDB Atlas"],
      projects: [
        {
          title: "Eivor.s Luxury Fashion",
          badge: "Client Production",
          description: "Flexible catalog schemas, order documents, and customer collection schemas.",
          live: "https://eivor.vercel.app/",
        },
        {
          title: "Fund Raising Management System",
          badge: "Relief Platform",
          description: "Transparent donation ledger models with stage-by-stage fund tracking.",
          live: "https://dms-fe-ubdm.vercel.app",
        },
        {
          title: "Equipment Payroll Management System",
          badge: "FinTech",
          description: "Payroll timesheets, employee compensation structures, and billing records.",
          live: "https://pos-tau-blond.vercel.app",
        },
      ],
    },
    {
      id: "mysql",
      name: "MySQL & PostgreSQL",
      category: "database",
      level: 85,
      icon: <Database className="w-5 h-5 text-sky-400" />,
      color: "bg-sky-500",
      description: "Relational modeling, complex queries, transactions, foreign keys",
      extendedDescription:
        "Designing normalized relational database schemas, ACID-compliant transactions, foreign key constraints, indexing strategies, and optimized SQL joins.",
      proficiencyStatus: "Proficient / Relational Core",
      relatedTech: ["PostgreSQL", "MySQL", "ACID Transactions", "Foreign Keys", "Relational Modeling", "SQL Queries"],
      projects: [
        {
          title: "SLREPSMS",
          badge: "Flagship",
          description: "PostgreSQL relational compliance ledger for legal disputes and fine verification.",
          live: "https://slrepmsfe.vercel.app/",
          github: "https://github.com/YoonusAnees/SLREPMSFE.git",
        },
        {
          title: "Road Crime Fine Management System",
          badge: "Enterprise",
          description: "MySQL schema handling traffic officer roles, violation categories, and penalty tiers.",
          github: "https://github.com/YoonusAnees/RCFMS.git",
        },
        {
          title: "Pahana Book Shop Management System",
          badge: "Inventory & POS",
          description: "Relational database for retail books, barcode mappings, and cashier auditing.",
          github: "https://github.com/YoonusAnees/PahanaBookShop.git",
        },
      ],
    },
    {
      id: "python",
      name: "Python",
      category: "backend",
      level: 65,
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      color: "bg-amber-500",
      description: "Scripting, algorithmic automation, API integrations",
      extendedDescription:
        "Developing background automation routines, data extraction scripts, algorithmic calculations, and API integration tools.",
      proficiencyStatus: "Practitioner / Utility & Scripting",
      relatedTech: ["Scripting", "Automation", "REST Clients", "Data Structures", "Algorithms"],
      projects: [],
      note: "Primary production projects in this portfolio showcase TypeScript/Node and Laravel/PHP stacks. Python is utilized for automation scripts and data utility routines.",
    },
  ];

  // Category counts and average calculations for the interactive overview
  const categoryStats = useMemo(() => {
    const map = {
      frontend: { count: 0, totalLevel: 0, label: "Frontend & UI", icon: Palette },
      backend: { count: 0, totalLevel: 0, label: "Backend & APIs", icon: Zap },
      database: { count: 0, totalLevel: 0, label: "Databases & Cloud", icon: Database },
    };

    skillsList.forEach((s) => {
      if (map[s.category]) {
        map[s.category].count += 1;
        map[s.category].totalLevel += s.level;
      }
    });

    return Object.entries(map).map(([key, data]) => ({
      id: key,
      label: data.label,
      count: data.count,
      avg: Math.round(data.totalLevel / data.count),
      icon: data.icon,
    }));
  }, [skillsList]);

  // Combined Search and Category Filtering
  const filteredSkills = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return skillsList.filter((skill) => {
      const matchesCategory =
        activeCategory === "all" || skill.category === activeCategory;
      if (!matchesCategory) return false;
      if (!query) return true;

      const inName = skill.name.toLowerCase().includes(query);
      const inDesc = skill.description.toLowerCase().includes(query);
      const inExtDesc = skill.extendedDescription?.toLowerCase().includes(query);
      const inCat = skill.category.toLowerCase().includes(query);
      const inRelated = skill.relatedTech?.some((t) =>
        t.toLowerCase().includes(query)
      );
      const inProjects = skill.projects?.some((p) =>
        p.title.toLowerCase().includes(query)
      );

      return inName || inDesc || inExtDesc || inCat || inRelated || inProjects;
    });
  }, [skillsList, activeCategory, searchQuery]);

  // Throttled sound effect on hover to avoid noisy sound loops
  const triggerHoverSound = () => {
    const now = Date.now();
    if (now - lastHoverSoundRef.current > 120) {
      playSound("hover");
      lastHoverSoundRef.current = now;
    }
  };

  const handleClearSearch = () => {
    playSound("click");
    setSearchQuery("");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleResetAll = () => {
    playSound("click");
    setSearchQuery("");
    setActiveCategory("all");
  };

  const activeCategoryLabel =
    categories.find((c) => c.id === activeCategory)?.label || "All Technologies";

  return (
    <section id="skills" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto space-y-14">
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

        {/* Interactive 3D Rolling Skills Globe */}
        <SkillsGlobe3D />

        {/* Interactive Stack Telemetry Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {categoryStats.map((stat) => {
            const Icon = stat.icon;
            const isSelected = activeCategory === stat.id;
            return (
              <button
                key={stat.id}
                type="button"
                onClick={() => {
                  playSound("click");
                  setActiveCategory((prev) => (prev === stat.id ? "all" : stat.id));
                }}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 backdrop-blur-md flex items-center justify-between group ${
                  isSelected
                    ? "bg-neutral-800/90 border-amber-500/60 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/30"
                    : "bg-neutral-900/50 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-800/40"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${isSelected ? "text-amber-300" : "text-neutral-400 group-hover:text-amber-200"} transition-colors`} />
                    <span className="text-xs font-mono font-medium text-neutral-300">
                      {stat.label}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-neutral-400">
                    {stat.count} Technologies • Avg {stat.avg}%
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border transition-colors ${
                      isSelected
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                        : "bg-neutral-800 text-neutral-400 border-neutral-700/60 group-hover:text-neutral-200"
                    }`}
                  >
                    {isSelected ? "Active" : "Filter"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Search & Category Filter Navigation Bar */}
        <div className="space-y-4">
          {/* Search Bar Input */}
          <div className="relative max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-4 h-4 text-neutral-400 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                role="searchbox"
                id="skills-search-input"
                name="skills-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    handleClearSearch();
                  }
                }}
                placeholder="Search technologies, tools, concepts (e.g. React, PostgreSQL, JWT)..."
                aria-label="Search technologies and skills"
                className="w-full pl-11 pr-11 py-3 bg-neutral-900/80 hover:bg-neutral-900 border border-neutral-800 focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/30 rounded-2xl text-xs sm:text-sm text-white placeholder-neutral-500 outline-none transition-all duration-300 shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  aria-label="Clear search query"
                  className="absolute right-3.5 p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs & Dynamic Counter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
            {/* Dynamic Results Counter */}
            <div className="text-xs font-mono text-neutral-400 flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-500" />
              <span>
                Showing <strong className="text-amber-200">{filteredSkills.length}</strong> of {skillsList.length} technologies
                {activeCategory !== "all" && (
                  <span className="text-neutral-500"> in {activeCategoryLabel}</span>
                )}
                {searchQuery.trim() && (
                  <span className="text-amber-400/80"> matching &ldquo;{searchQuery}&rdquo;</span>
                )}
              </span>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => {
                const isSelected = activeCategory === cat.id;
                const count =
                  cat.id === "all"
                    ? skillsList.length
                    : skillsList.filter((s) => s.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      playSound("click");
                      setActiveCategory(cat.id);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-300 backdrop-blur-md flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-neutral-800 text-white border border-amber-500/50 shadow-sm shadow-amber-500/10 ring-1 ring-amber-500/20"
                        : "bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                        isSelected
                          ? "bg-amber-500/20 text-amber-300"
                          : "bg-neutral-800 text-neutral-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Skills Cards Grid or Empty State */}
        {filteredSkills.length === 0 ? (
          /* Empty Search & Filter State */
          <Motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
            className="p-12 rounded-3xl bg-neutral-900/50 border border-neutral-800/80 backdrop-blur-xl text-center space-y-4 max-w-lg mx-auto"
          >
            <div className="w-12 h-12 mx-auto rounded-2xl bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center text-amber-300">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">No Matching Technologies</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                No skills match &ldquo;<span className="text-neutral-200">{searchQuery}</span>&rdquo;
                {activeCategory !== "all" && <span> within {activeCategoryLabel}</span>}. Try broadening your search or resetting filters.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {activeCategory !== "all" && (
                <button
                  type="button"
                  onClick={() => {
                    playSound("click");
                    setActiveCategory("all");
                  }}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium transition-all"
                >
                  Search in All Categories
                </button>
              )}
              <button
                type="button"
                onClick={handleResetAll}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-100 hover:bg-white text-neutral-900 text-xs font-semibold transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Filters
              </button>
            </div>
          </Motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {filteredSkills.map((skill, index) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                index={index}
                shouldReduceMotion={shouldReduceMotion}
                triggerHoverSound={triggerHoverSound}
                onSelect={(selected) => {
                  playSound("click");
                  setSelectedSkill(selected);
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Centered Modal Pop-up with Dimmed Blurred Backdrop */}
      <AnimatePresence>
        {selectedSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
            {/* Dimmed Blurred Backdrop */}
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                playSound("click");
                setSelectedSkill(null);
              }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            {/* Centered Modal Card */}
            <Motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              role="dialog"
              aria-modal="true"
              className="relative w-full max-w-2xl max-h-[88vh] bg-neutral-900/95 border border-amber-500/40 rounded-3xl shadow-2xl shadow-black/90 backdrop-blur-2xl overflow-hidden flex flex-col z-10"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-neutral-800/80 bg-neutral-900/80 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="p-3.5 rounded-2xl bg-neutral-800/90 border border-neutral-700/60 shadow-inner">
                    {selectedSkill.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        {selectedSkill.name}
                      </h3>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700/60">
                        {selectedSkill.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-mono font-semibold text-amber-300">
                        Proficiency: {selectedSkill.level}%
                      </span>
                      <span className="text-neutral-600">•</span>
                      <span className="text-xs font-mono text-neutral-400">
                        {selectedSkill.proficiencyStatus}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      playSound("click");
                      setSelectedSkill(null);
                    }}
                    className="p-2 rounded-2xl bg-neutral-800/90 hover:bg-neutral-800 border border-neutral-700/80 text-neutral-400 hover:text-white transition-all shadow-md group flex items-center gap-1.5"
                    title="Close (Esc)"
                  >
                    <span className="text-[10px] font-mono text-neutral-500 group-hover:text-neutral-400 px-1 hidden sm:inline">ESC</span>
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Proficiency Level Progress Bar */}
              <div className="relative w-full h-1 bg-neutral-800">
                <Motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${selectedSkill.level}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`h-full ${selectedSkill.color}`}
                />
              </div>

              {/* Scrollable Modal Content */}
              <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(88vh-140px)]">
                {/* Architectural Implementation */}
                <div className="space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-amber-400" />
                    Architectural Implementation
                  </div>
                  <p className="text-sm text-neutral-300 leading-relaxed font-light bg-neutral-950/40 p-4 rounded-2xl border border-neutral-800/80">
                    {selectedSkill.extendedDescription}
                  </p>
                </div>

                {/* Associated Tools & Ecosystem */}
                {selectedSkill.relatedTech && selectedSkill.relatedTech.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                      Associated Tools & Ecosystem
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedSkill.relatedTech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 bg-neutral-800/90 text-neutral-200 rounded-xl text-xs font-mono border border-neutral-700/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Real Connected Projects */}
                <div className="space-y-3 pt-2 border-t border-neutral-800/80">
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                      <FolderGit2 className="w-3.5 h-3.5 text-amber-400" />
                      Portfolio Projects Using {selectedSkill.name.split(" ")[0]}
                    </div>
                    {selectedSkill.projects.length > 0 && (
                      <a
                        href="#projects"
                        onClick={() => {
                          playSound("click");
                          setSelectedSkill(null);
                        }}
                        className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-0.5 transition-colors"
                      >
                        <span>View in Projects</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  {selectedSkill.projects.length > 0 ? (
                    <div className="space-y-2.5">
                      {selectedSkill.projects.map((proj) => (
                        <div
                          key={proj.title}
                          className="p-3.5 rounded-2xl bg-neutral-950/50 border border-neutral-800/90 hover:border-neutral-700 transition-colors space-y-2"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-bold text-white">
                                {proj.title}
                              </h4>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700/60">
                                {proj.badge}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              {proj.github && (
                                <a
                                  href={proj.github}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    playSound("click");
                                  }}
                                  aria-label={`View code for ${proj.title}`}
                                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
                                >
                                  <Github className="w-3.5 h-3.5" />
                                </a>
                              )}
                              {proj.live && (
                                <a
                                  href={proj.live}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    playSound("click");
                                  }}
                                  aria-label={`Open live demo for ${proj.title}`}
                                  className="p-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 hover:text-white border border-amber-500/40 transition-colors"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-neutral-400 font-light leading-relaxed">
                            {proj.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-neutral-950/50 border border-neutral-800/80 text-xs text-neutral-400 font-light leading-relaxed">
                      {selectedSkill.note || "Utilized as a foundational stack technology across enterprise workflows."}
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 px-6 border-t border-neutral-800/80 bg-neutral-900/80 flex items-center justify-between text-xs font-mono text-neutral-500">
                <span>Click outside or ESC to close</span>
                <button
                  type="button"
                  onClick={() => {
                    playSound("click");
                    setSelectedSkill(null);
                  }}
                  className="px-4 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </Motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Individual Skill Card in Grid
function SkillCard({ skill, index, shouldReduceMotion, triggerHoverSound, onSelect }) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.35,
        delay: shouldReduceMotion ? 0 : index * 0.03,
      }}
      onMouseEnter={triggerHoverSound}
      onClick={() => onSelect(skill)}
      className="group relative rounded-3xl bg-neutral-900/60 backdrop-blur-xl border border-neutral-800 hover:border-amber-500/40 hover:bg-neutral-900/80 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-amber-500/5 cursor-pointer w-full text-left p-6"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-neutral-800/80 border border-neutral-700/60 shrink-0 group-hover:border-amber-500/30 group-hover:bg-neutral-800 transition-colors">
            {skill.icon}
          </div>
          <div>
            <h3 className="text-base font-bold text-white group-hover:text-amber-200 transition-colors">
              {skill.name}
            </h3>
            <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
              {skill.category}
            </span>
          </div>
        </div>

        {/* Level and Expand Indicator */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-sm font-mono font-bold text-neutral-300">
            {skill.level}%
          </span>
          <div className="p-1.5 rounded-xl border border-neutral-700/60 bg-neutral-800/80 text-neutral-400 group-hover:text-amber-300 group-hover:border-amber-500/40 transition-colors">
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>

      <p className="text-xs text-neutral-400 leading-relaxed mb-4 font-light">
        {skill.description}
      </p>

      {/* Proficiency Progress Meter */}
      <div className="relative w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
        <Motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.9,
            ease: "easeOut",
          }}
          className={`h-full rounded-full ${skill.color}`}
        />
      </div>

      {/* Card Footer Action */}
      <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-neutral-400 group-hover:text-amber-200 transition-colors pt-2 border-t border-neutral-800/50">
        <span className="flex items-center gap-1.5">
          <span>Click to view details</span>
        </span>
        {skill.projects.length > 0 && (
          <span className="text-amber-400/80">
            {skill.projects.length} project{skill.projects.length > 1 ? "s" : ""}
          </span>
        )}
      </div>
    </Motion.div>
  );
}
