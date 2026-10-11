import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Database,
  Image as ImageIcon,
  FolderGit2,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { playSound } from "../../utils/speechVoice";

export default function ProjectsChapter() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const projectsData = [
    {
      title: "SLREPSMS",
      category: "enterprise",
      badge: "Flagship Project",
      description: "Sri Lanka E-Penalty Safety Management System designed for digital law compliance, fine payments, and dispute tracking.",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "TypeScript", "AutoWrapper"],
      images: ["SLREPSM.png"],
      github: "https://github.com/YoonusAnees/SLREPMSFE.git",
      githubb: "https://github.com/YoonusAnees/SLREPSMS-Backend.git",
      live: "https://slrepmsfe.vercel.app/",
      featured: true,
    },
    {
      title: "Road Crime Fine Management System",
      category: "enterprise",
      badge: "Enterprise",
      description: "Full-stack traffic violations and fine tracking platform built with Laravel, Eloquent ORM, MySQL, and React.",
      technologies: ["Laravel", "React", "MySQL", "Stripe", "Eloquent ORM", "Tailwind"],
      images: [
        "RCFMS.png",
        "RCFMS-2.png",
        "RCFMS-3.png",
        "RCFMS-4.png",
        "RCFMS-5.png",
        "RCFMS-6.png",
        "RCFMS-7.png",
        "RCFMS-8.png",
        "RCFMS-9.png",
        "RCFMS-10.png",
        "RCFMS-11.png",
        "RCFMS-12.png",
        "RCFMS-13.png",
        "RCFMS-14.png",
        "RCFMS-15.png",
        "RCFMS-16.png",
        "RCFMS-17.png",
        "RCFMS-18.png",
        "RCFMS-19.png",
        "RCFMS-23.png",
      ],
      github: "https://github.com/YoonusAnees/RCFMS.git",
      featured: true,
    },
    {
      title: "Eivor.s Luxury Fashion",
      category: "client",
      badge: "Client Production",
      description: "High-end women's luxury fashion e-commerce storefront with seamless product curation, cart state, and responsive design.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
      images: ["Eivor-1.png", "Eivor-2.png", "Eivor-3.png", "Eivor-4.png", "Eivor-5.png"],
      live: "https://eivor.vercel.app/",
      featured: true,
    },
    {
      title: "ITC GOLD HOUSE",
      category: "client",
      badge: "Client Production",
      description: "Premium jewellery catalogue and storefront with dynamic gold rate calculations, luxury styling, and Next.js SSR.",
      technologies: ["Next.js", "React", "Node.js", "Express", "MongoDB"],
      images: ["itc-1.png", "itc-2.png", "itc-3.png", "itc-4.png", "itc-5.png", "itc-6.png"],
      live: "https://itc-gold-house.vercel.app/",
      featured: true,
    },
    {
      title: "Fund Raising Management System",
      category: "fullstack",
      badge: "Relief Platform",
      description: "DisasterAid humanitarian relief and donation transparency platform with secure payment channels and allocation tracking.",
      technologies: ["React", "Node.js", "Express", "JWT", "MongoDB"],
      images: ["FMS.png"],
      github: "https://github.com/YoonusAnees/DMS-FE.git",
      githubb: "https://github.com/YoonusAnees/DMS-BE.git",
      live: "https://dms-fe-ubdm.vercel.app",
    },
    {
      title: "Equipment Payroll Management System",
      category: "enterprise",
      badge: "FinTech System",
      description: "Automated payroll distribution, employee timesheets, equipment allowances, dynamic salary slips, and Stripe billing.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Chart.js", "Stripe"],
      images: ["MDPOS.png"],
      github: "https://github.com/YoonusAnees/POS.git",
      githubb: "https://github.com/YoonusAnees/Anexxa.git",
      live: "https://pos-tau-blond.vercel.app",
    },
    {
      title: "Candidate Tracking Management System (CTMS)",
      category: "fullstack",
      badge: "HR Tech",
      description: "Modern recruiting dashboard for interviewing pipelines, candidate scoring, resume indexing, and communications.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "JWT", "Context API"],
      images: ["CTMS.png"],
      github: "https://github.com/YoonusAnees/CTMSFE.git",
      githubb: "https://github.com/YoonusAnees/CTMSBE.git",
      live: "https://ctmsfe-1wfp.vercel.app",
    },
    {
      title: "State Pharmaceutical Cooperation System",
      category: "enterprise",
      badge: "Enterprise API",
      description: "RESTful architecture for state drug inventory, multi-warehouse batch supply chains, and procurement audits.",
      technologies: ["C#", ".NET Framework", "Entity Framework", "SQL Server", "HTML/CSS"],
      images: [
        "SPC1.png",
        "SPC2.png",
        "SPC3.png",
        "SPC4.png",
        "SPC5.png",
        "SPC6.png",
        "SPC7.png",
        "SPC8.png",
        "SPC9.png",
        "SPC10.png",
      ],
      github: "https://github.com/YoonusAnees/State-Pharmaceutical-Cooperation-System.git",
      githubb: "https://github.com/YoonusAnees/StatePharmaceuticalCooperationAPI-BE.git",
    },
    {
      title: "Pahana Book Shop Management System",
      category: "enterprise",
      badge: "Inventory & POS",
      description: "Enterprise system for retail book sales, barcodes, customer loyalty, and multi-tier cashier auditing.",
      technologies: ["Java", "JSP Servlet", "MySQL", "JWT", "JavaScript"],
      images: ["J1.png", "J2.png", "J3.png", "J4.png", "J5.png", "J6.png"],
      github: "https://github.com/YoonusAnees/PahanaBookShop.git",
    },
    {
      title: "Money Tracking System (KBMS)",
      category: "fullstack",
      badge: "Finance Tracker",
      description: "Real-time money remittance, sender verification, currency ledger, and balance accounting dashboard.",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      images: ["MoneyTracker.png"],
      github: "https://github.com/YoonusAnees/KBMS-FE.git",
      githubb: "https://github.com/YoonusAnees/KBMS-BE.git",
      live: "https://kbms-seven.vercel.app/",
    },
    {
      title: "Attendance Monitoring System",
      category: "fullstack",
      badge: "Event Tech",
      description: "Smart digital attendance check-ins using single-use QR invite tokens and real-time attendance telemetry.",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      images: ["AttendanceTrackingSystem.png"],
      github: "https://github.com/YoonusAnees/Attendances-FE.git",
      githubb: "https://github.com/YoonusAnees/Attendances-BE.git",
      live: "https://attendances-fe.vercel.app/",
    },
    {
      title: "Hotel Management System (Serenity Villa)",
      category: "fullstack",
      badge: "Hospitality",
      description: "Boutique villa reservation and booking portal with guest calendar synchronization and invoice generator.",
      technologies: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3"],
      images: ["HMS.png"],
      github: "https://github.com/YoonusAnees/Hotel-Management-.git",
      live: "https://mediumspringgreen-nightingale-863353.hostingersite.com/",
    },
    {
      title: "Authentication System",
      category: "fullstack",
      badge: "Security Core",
      description: "Secure authentication template with JWT access/refresh rotation, password hashing, and email validation.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "JWT"],
      images: ["Auth.png"],
      github: "https://github.com/YoonusAnees/Sample-UserAuth-FE.git",
      githubb: "https://github.com/YoonusAnees/Sample-UserAuth-BE.git",
      live: "https://sample-user-auth-fe.vercel.app",
    },
    {
      title: "Task Management App",
      category: "fullstack",
      badge: "Productivity",
      description: "Task tracking platform with milestone statuses, deadline alerts, and responsive viewports.",
      technologies: ["Node.js", "MongoDB", "HBS", "JavaScript", "CSS"],
      images: ["https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg"],
      github: "https://github.com/YoonusAnees/Task-Manager.git",
      live: "https://task-manager-ze0d.onrender.com/",
    },
  ];

  const filterTabs = [
    { id: "all", label: "All Projects" },
    { id: "client", label: "Client Work" },
    { id: "enterprise", label: "Enterprise Systems" },
    { id: "fullstack", label: "Web Applications" },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  const getImageSrc = (imgPath) => {
    if (!imgPath) return "https://via.placeholder.com/600x340/0f172a/ffffff?text=Project+Preview";
    if (imgPath.startsWith("http")) return imgPath;
    if (!imgPath.startsWith("./") && !imgPath.startsWith("/")) return `./${imgPath}`;
    return imgPath;
  };

  const openModal = (proj) => {
    playSound("click");
    setSelectedProject(proj);
    setCurrentImageIdx(0);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    playSound("click");
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Chapter Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-neutral-300 text-xs font-mono tracking-wide backdrop-blur-md">
            <FolderGit2 className="w-3.5 h-3.5 text-neutral-400" />
            04 // Featured Projects
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Selected Work &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-200">
              Creations
            </span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-base sm:text-lg font-light">
            A showcase of production systems, client platforms, and full-stack software.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playSound("click");
                setActiveFilter(tab.id);
              }}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-300 backdrop-blur-md ${
                activeFilter === tab.id
                  ? "bg-neutral-800 text-white border border-neutral-600 shadow-sm"
                  : "bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              onMouseEnter={() => playSound("hover")}
              className="group relative flex flex-col justify-between rounded-3xl bg-neutral-900/60 backdrop-blur-xl border border-neutral-800/90 overflow-hidden hover:border-neutral-700 transition-all duration-300 hover:scale-[1.01]"
            >
              {/* Image Preview Banner */}
              <div
                onClick={() => openModal(project)}
                className="relative h-56 overflow-hidden cursor-pointer bg-neutral-950"
              >
                <img
                  src={getImageSrc(project.images[0])}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/600x340/0f172a/ffffff?text=Project+Preview";
                  }}
                />

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-neutral-900/90 backdrop-blur-md border border-neutral-700 text-neutral-200 shadow-sm">
                    {project.badge}
                  </span>
                </div>

                {/* Hover Gallery Action Indicator */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                  <div className="flex items-center gap-2 bg-neutral-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-xs font-medium text-neutral-200 border border-neutral-700">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>View Gallery ({project.images.length})</span>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-200 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Technologies Stack Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.slice(0, 4).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 bg-neutral-800/80 text-neutral-300 rounded-lg text-[11px] font-mono border border-neutral-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-1 bg-neutral-800/40 text-neutral-400 rounded-lg text-[11px] font-mono">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-3 pt-4 border-t border-neutral-800/80">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => playSound("click")}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-medium transition-all"
                    >
                      <Github size={14} />
                      <span>Code</span>
                    </a>
                  )}

                  {project.githubb && (
                    <a
                      href={project.githubb}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => playSound("click")}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-medium transition-all"
                    >
                      <Database size={14} />
                      <span>Backend</span>
                    </a>
                  )}

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => playSound("click")}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-neutral-100 hover:bg-white text-neutral-900 text-xs font-semibold transition-all ml-auto"
                    >
                      <ExternalLink size={14} />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Carousel Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-5xl w-full bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
                    {selectedProject.badge}
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2.5 rounded-2xl bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Main Image Display */}
              <div className="relative h-[55vh] flex items-center justify-center p-6 bg-neutral-950">
                <img
                  src={getImageSrc(selectedProject.images[currentImageIdx])}
                  alt={`${selectedProject.title} frame ${currentImageIdx + 1}`}
                  className="max-h-full max-w-full object-contain rounded-2xl shadow-xl"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/800x600/0f172a/ffffff?text=Image+Unavailable";
                  }}
                />

                {/* Left / Right Nav Arrows */}
                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playSound("click");
                        setCurrentImageIdx((prev) =>
                          prev === 0 ? selectedProject.images.length - 1 : prev - 1
                        );
                      }}
                      className="absolute left-6 p-3 rounded-2xl bg-neutral-900/90 backdrop-blur-md border border-neutral-700 text-white hover:bg-neutral-800 transition-all"
                    >
                      <ChevronLeft size={22} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playSound("click");
                        setCurrentImageIdx((prev) =>
                          prev === selectedProject.images.length - 1 ? 0 : prev + 1
                        );
                      }}
                      className="absolute right-6 p-3 rounded-2xl bg-neutral-900/90 backdrop-blur-md border border-neutral-700 text-white hover:bg-neutral-800 transition-all"
                    >
                      <ChevronRight size={22} />
                    </button>
                  </>
                )}

                {/* Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs font-mono text-neutral-300">
                  {currentImageIdx + 1} / {selectedProject.images.length}
                </div>
              </div>

              {/* Thumbnails Row */}
              {selectedProject.images.length > 1 && (
                <div className="p-4 bg-neutral-900/80 border-t border-neutral-800 overflow-x-auto flex gap-3">
                  {selectedProject.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        playSound("click");
                        setCurrentImageIdx(idx);
                      }}
                      className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        currentImageIdx === idx
                          ? "border-amber-400 scale-105"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={getImageSrc(img)}
                        alt={`thumb ${idx}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/80/0f172a/ffffff?text=Thumb";
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
