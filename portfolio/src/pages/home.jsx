import React, { useState, useEffect, useCallback, useRef } from "react";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";

import { LuTvMinimal } from "react-icons/lu";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Smartphone,
  Menu,
  X,
  ChevronDown,
  MapPin,
  Phone,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  Cpu,
  Database,
  Cloud,
  Shield,
  Palette,
  Globe,
  Terminal,
} from "lucide-react";

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          setLoading(false);
          setSuccess(true);

          // reset form
          formRef.current.reset();

          // auto close popup
          setTimeout(() => setSuccess(false), 3000);
        },
        (error) => {
          setLoading(false);
          console.log(error);
          alert("Something went wrong!");
        },
      );
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isCarouselOpen) {
        closeCarousel();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isCarouselOpen]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const openCarousel = useCallback((project) => {
    setActiveProject(project);
    setCurrentImage(0);
    setIsCarouselOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeCarousel = useCallback(() => {
    setIsCarouselOpen(false);
    setActiveProject(null);
    document.body.style.overflow = "auto";
  }, []);

  const nextImage = useCallback(
    (e) => {
      e?.stopPropagation();
      if (activeProject && activeProject.images) {
        setCurrentImage((prev) =>
          prev === activeProject.images.length - 1 ? 0 : prev + 1,
        );
      }
    },
    [activeProject],
  );

  const prevImage = useCallback(
    (e) => {
      e?.stopPropagation();
      if (activeProject && activeProject.images) {
        setCurrentImage((prev) =>
          prev === 0 ? activeProject.images.length - 1 : prev - 1,
        );
      }
    },
    [activeProject],
  );

  const getImageSrc = (imgPath) => {
    if (!imgPath || typeof imgPath !== "string") {
      return "https://via.placeholder.com/400x224/0f172a/ffffff?text=No+Image";
    }

    if (imgPath.startsWith("http")) {
      return imgPath;
    }

    if (!imgPath.startsWith("./") && !imgPath.startsWith("/")) {
      return `./${imgPath}`;
    }

    return imgPath;
  };

  const skills = [
    {
      name: "React",
      level: 90,
      color: "from-cyan-500 to-blue-600",
      icon: <Cpu className="w-4 h-4" />,
    },
    {
      name: "TypeScript",
      level: 85,
      color: "from-blue-600 to-blue-800",
      icon: <Terminal className="w-4 h-4" />,
    },
    {
      name: "Tailwind CSS",
      level: 95,
      color: "from-teal-400 to-emerald-600",
      icon: <Palette className="w-4 h-4" />,
    },
    {
      name: "Node.js",
      level: 85,
      color: "from-green-500 to-emerald-600",
      icon: <Zap className="w-4 h-4" />,
    },
    {
      name: "Python",
      level: 60,
      color: "from-yellow-500 to-amber-600",
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      name: "Laravel",
      level: 85,
      color: "from-red-500 to-pink-600",
      icon: <Shield className="w-4 h-4" />,
    },
    {
      name: "Next.js",
      level: 70,
      color: "from-gray-200 to-gray-400",
      icon: <Globe className="w-4 h-4" />,
    },
    {
      name: "MongoDB",
      level: 80,
      color: "from-green-400 to-emerald-500",
      icon: <Database className="w-4 h-4" />,
    },
    {
      name: "MySQL",
      level: 85,
      color: "from-blue-400 to-cyan-500",
      icon: <Database className="w-4 h-4" />,
    },
  ];

  const projects = [
    {
      title: "SLREPSMS",
      description: "Sri Lnaka E-Penalty Safty Managment System.",
      technologies: [
        "Node js",
        "React",
        "PsogrsSQL",
        "Stripe",
        "Autowrapper",
        "Typescript",
      ],
      images: ["SLREPSM.png"],
      github: "https://github.com/YoonusAnees/SLREPMSFE.git",
      githubb: "https://github.com/YoonusAnees/SLREPSMS-Backend.git",
      live: "https://slrepmsfe.vercel.app/",
    },
    {
      title: "Road Crime Fine Management System",
      description: "Full stack system with React, Laravel & MySQL.",
      technologies: ["Laravel", "React", "MySQL", "Stripe", "Eloquent"],
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
    },
    {
      title: "Task Management App",
      description: "Node.js task manager with MongoDB.",
      technologies: ["Node.js", "HTML", "CSS", "JavaScript", "HBS", "MongoDB"],
      images: [
        "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg",
      ],
      github: "https://github.com/YoonusAnees/Task-Manager.git",
      live: "https://task-manager-ze0d.onrender.com/",
    },
    {
      title: "Hotel Management System",
      description: "Serenity Villa booking system.",
      technologies: ["PHP", "HTML", "CSS", "JavaScript", "MySQL"],
      images: ["HMS.png"],
      github: "https://github.com/YoonusAnees/Hotel-Management-.git",
      live: "https://mediumspringgreen-nightingale-863353.hostingersite.com/",
    },
    {
      title: "Fund Raising Management System",
      description: "DisasterAid relief management platform.",
      technologies: ["Node.js", "React", "Express", "JWT", "MongoDB"],
      images: ["FMS.png"],
      github: "https://github.com/YoonusAnees/DMS-FE.git",
      githubb: "https://github.com/YoonusAnees/DMS-BE.git",
      live: "https://dms-fe-ubdm.vercel.app",
    },
    {
      title: "Payroll Management System",
      description: "Payroll management platform for Equipment.",
      technologies: [
        "Node.js",
        "React",
        "Express",
        "JWT",
        "MongoDB",
        "Mongoose",
        "Chart.js",
        "Stripe",
      ],
      images: ["MDPOS.png"],
      github: "https://github.com/YoonusAnees/POS.git",
      githubb: "https://github.com/YoonusAnees/Anexxa.git",
      live: "https://pos-tau-blond.vercel.app",
    },
    {
      title: "Authentication System",
      description: "A modern, Responsive Authentication system.",
      technologies: [
        "Node.js",
        "React",
        "MongoDB",
        "Mongoose",
        "React Context API",
        "React Router",
        "Express",
        "JWT",
      ],
      images: ["Auth.png"],
      github: "https://github.com/YoonusAnees/Sample-UserAuth-FE.git",
      githubb: "https://github.com/YoonusAnees/Sample-UserAuth-BE.git",
      live: "https://sample-user-auth-fe.vercel.app",
    },
    {
      title: "Candidate Tracking Management System",
      description: "A modern web application for managing job candidates.",
      technologies: [
        "Node.js",
        "React.js",
        "MongoDB",
        "Mongoose",
        "React Context API",
        "React Router",
        "Express",
        "JWT",
      ],
      images: ["CTMS.png"],
      github: "https://github.com/YoonusAnees/CTMSFE.git",
      githubb: "https://github.com/YoonusAnees/CTMSBE.git",
      live: "https://ctmsfe-1wfp.vercel.app",
    },
    {
      title: "Book Shop Management System",
      description: "Book Shop management system for book sales and inventory.",
      technologies: [
        "Java",
        "HTML",
        "CSS",
        "JavaScript",
        "MySQL",
        "jsp servlet",
        "JWT",
      ],
      images: [
        "J1.png",
        "J2.png",
        "J3.png",
        "J4.png",
        "J5.png",
        "J6.png",
        "J7.png",
        "J8.png",
        "J9.png",
        "J10.png",
        "J11.png",
        "J12.png",
        "j13.png",
        "j14.png",
        "j15.png",
        "j16.png",
        "j17.png",
        "j18.png",
        "j19.png",
        "j20.png",
      ],
      github: "https://github.com/YoonusAnees/PahanaBookShop.git",
    },
    {
      title: "Pharmaceutical-Cooperation-System",
      description:
        "Project provides a RESTful API designed for managing various operations of a pharmaceutical system.",
      technologies: [
        "Microsoft SQL Server",
        "NET Framework",
        "Entity Framework",
        "C#",
        "HTML",
        "CSS",
        "JavaScript",
      ],
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
        "SPC11.png",
        "SPC12.png",
        "SPC13.png",
        "SPC14.png",
        "SPC15.png",
        "SPC16.png",
        "SPC17.png",
        "SPC18.png",
        "SPC19.png",
        "SPC20.png",
      ],
      github:
        "https://github.com/YoonusAnees/State-Pharmaceutical-Cooperation-System.git",
      githubb:
        "https://github.com/YoonusAnees/StatePharmaceuticalCooperationAPI-BE.git",
    },

    {
      title: "Money Tracking System",
      description:
        "Tracking System where we can see who sent the money and total amount .",
      technologies: ["Node.js", "React", "Express", "MongoDB"],
      images: ["MoneyTracker.png"],
      github: "https://github.com/YoonusAnees/KBMS-FE.git",
      githubb: "https://github.com/YoonusAnees/KBMS-BE.git",
      live: "https://kbms-seven.vercel.app/",
    },

    {
      title: "Attendance Monitoring System With Invitaton",
      description: "Here we monitor the attendances throuhg making invitaton .",
      technologies: ["Node.js", "React", "Express", "MongoDB"],
      images: ["AttendanceTrackingSystem.png"],
      github: "https://github.com/YoonusAnees/Attendances-FE.git",
      githubb: "https://github.com/YoonusAnees/Attendances-BE.git",
      live: "https://attendances-fe.vercel.app/",
    },
  ];

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div
          className="absolute w-4 h-4 bg-blue-400 rounded-full opacity-20"
          style={{
            left: `${(mousePosition.x / window.innerWidth) * 100}%`,
            top: `${(mousePosition.y / window.innerHeight) * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        ></div>
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrollY > 50 ? "bg-gray-900/90 backdrop-blur-xl shadow-2xl" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center group">
              <div className="relative">
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
                  Yoonus Anees
                </div>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {["home", "about", "skills", "projects", "contact"].map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item)}
                      className="relative group text-lg font-medium"
                    >
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-300 capitalize">
                        {item}
                      </span>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-sm transition-all duration-300"
              >
                {isMenuOpen ? (
                  <X size={24} className="text-gray-300" />
                ) : (
                  <Menu size={24} className="text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-xl border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-2">
              {["home", "about", "skills", "projects", "contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left px-6 py-4 text-lg text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-300 capitalize"
                  >
                    {item}
                  </button>
                ),
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-blue-900/20 to-purple-900/30"></div>
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in space-y-8">
            {/* Glowing orb effect */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight relative">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
                  Yoonus Anees
                </span>
              </h1>
            </div>

            <div className="space-y-6">
              <p className="text-2xl md:text-3xl lg:text-4xl text-gray-300 font-light">
                Software Engineer •{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
                  Full Stack Developer
                </span>
              </p>

              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
                Crafting exceptional digital experiences with cutting-edge
                technologies. Passionate about building scalable, performant
                applications that make a difference.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-10">
              <button
                onClick={() => scrollToSection("projects")}
                className="group relative px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 group-hover:from-cyan-600 group-hover:to-blue-700 transition-all duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center gap-3">
                  <span>View My Work</span>
                  <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                </div>
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="group relative px-8 py-4 rounded-2xl font-semibold border-2 border-cyan-400/30 hover:border-cyan-400 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-cyan-400/5 group-hover:bg-cyan-400/10 transition-colors duration-300"></div>
                <div className="relative flex items-center justify-center gap-3 text-cyan-300 group-hover:text-cyan-200">
                  <span>Get In Touch</span>
                  <Zap className="w-5 h-5 group-hover:animate-bounce" />
                </div>
              </button>

              <div className="flex gap-4">
  <a
    href="./src/assets/Professional CV Resume Yoonus Anees.pdf"  // <--- Path to your PDF
    download
    className="group relative px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 group-hover:from-purple-600 group-hover:to-pink-700 transition-all duration-300"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="relative flex items-center justify-center gap-3">
      <span>Download CV</span>
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  </a>
</div>

            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <ChevronDown className="text-cyan-400/60" size={32} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 relative inline-block">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                About Me
              </span>
              <Sparkles className="absolute -top-2 -right-6 w-6 h-6 text-yellow-400 animate-spin-slow" />
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <p className="text-xl text-gray-300 leading-relaxed font-light">
                  I'm a passionate full-stack developer dedicated to creating
                  web applications that combine beautiful design with powerful
                  functionality. With expertise in modern web technologies, I
                  bring ideas to life through clean code and innovative
                  solutions.
                </p>
                <p className="text-xl text-gray-300 leading-relaxed font-light">
                  My focus is on building scalable, maintainable applications
                  that provide exceptional user experiences while solving
                  real-world problems efficiently.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                {[
                  {
                    icon: <Cpu className="w-5 h-5" />,
                    text: "Software Engineer",
                    color: "from-cyan-500 to-blue-600",
                  },
                  {
                    icon: <Terminal className="w-5 h-5" />,
                    text: "Full Stack Development",
                    color: "from-purple-500 to-pink-600",
                  },
                  {
                    icon: <Smartphone className="w-5 h-5" />,
                    text: "Mobile Development",
                    color: "from-emerald-500 to-green-600",
                  },
                  {
                    icon: <Cloud className="w-5 h-5" />,
                    text: "Cloud Solutions",
                    color: "from-orange-500 to-red-600",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="group bg-gray-800/50 backdrop-blur-sm p-5 rounded-2xl border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-br ${item.color}`}
                      >
                        {item.icon}
                      </div>
                      <span className="text-gray-300 group-hover:text-white font-medium transition-colors">
                        {item.text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative w-80 h-96 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
                <div className="relative w-full h-full bg-gray-800/30 backdrop-blur-sm rounded-3xl border border-gray-700/50 p-2">
                  <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden">
                    <img
                      src="./profile.jpg"
                      alt="Profile"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/320x384/0f172a/ffffff?text=Profile";
                      }}
                    />
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
    <section
  id="skills"
  className="relative py-24 bg-gradient-to-b from-gray-900/50 to-gray-800/50"
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-20">
      <h2 className="text-4xl md:text-5xl font-bold mb-6 relative inline-block">
        <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Skills & Technologies
        </span>
        <Zap className="absolute -top-2 -right-8 w-7 h-7 text-yellow-400 animate-pulse" />
      </h2>
      <div className="w-32 h-1 bg-gradient-to-r from-emerald-500 to-cyan-600 mx-auto rounded-full"></div>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {skills.map((skill, index) => (
        <div
          key={index}
          className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${skill.color}`}>
                {skill.icon}
              </div>
              <h3 className="text-xl font-semibold text-white">
                {skill.name}
              </h3>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {skill.level}%
            </span>
          </div>

          <div className="relative">
            <div className="w-full h-3 bg-gray-700/50 rounded-full overflow-hidden">
              {/* Animated Progress Bar */}
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${skill.color} group-hover:animate-pulse`}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }} // Ensures it only animates once when scrolling down
                transition={{ duration: 1.5, ease: "easeOut" }}
              ></motion.div>
            </div>
            
            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <span>Beginner</span>
              <span>Expert</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Projects Section */}
      <section id="projects" className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 relative inline-block">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Featured Projects
              </span>
              <Sparkles className="absolute -top-2 -right-8 w-7 h-7 text-yellow-400 animate-pulse" />
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-600 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-400 mt-8 max-w-3xl mx-auto font-light">
              A showcase of my recent work, featuring full-stack applications
              built with modern technologies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                {/* Project Image */}
                <div
                  className="relative h-56 overflow-hidden cursor-pointer"
                  onClick={() => openCarousel(project)}
                >
                  <img
                    src={getImageSrc(project.images[0])}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x224/0f172a/ffffff?text=Project+Image";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <div className="bg-gray-900/90 backdrop-blur-sm p-3 rounded-xl">
                        <div className="flex items-center justify-center gap-2 text-cyan-300 font-medium">
                          <span>View Gallery</span>
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-5 leading-relaxed font-light">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1.5 bg-gray-700/50 text-cyan-300 rounded-full text-xs font-medium hover:bg-cyan-500/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-3 py-1.5 bg-gray-700/50 text-gray-400 rounded-full text-xs font-medium">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 border-t border-gray-700/50 pt-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group/link"
                    >
                      <div className="p-2 bg-gray-700/50 rounded-lg group-hover/link:bg-gradient-to-br group-hover/link:from-gray-700 group-hover/link:to-gray-800">
                        <Github size={18} />
                      </div>
                      <span className="text-sm font-medium">Code</span>
                    </a>

                    {project.githubb && (
                      <a
                        href={project.githubb}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group/link"
                      >
                        <div className="p-2 bg-gray-700/50 rounded-lg group-hover/link:bg-gradient-to-br group-hover/link:from-gray-700 group-hover/link:to-gray-800">
                          <Database size={18} />
                        </div>
                        <span className="text-sm font-medium">Backend</span>
                      </a>
                    )}

                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group/link"
                      >
                        <div className="p-2 bg-gray-700/50 rounded-lg group-hover/link:bg-gradient-to-br group-hover/link:from-cyan-500/20 group-hover/link:to-blue-500/20">
                          <ExternalLink size={18} />
                        </div>
                        <span className="text-sm font-medium">Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carousel Modal */}
      {isCarouselOpen && activeProject && (
        <div
          className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 backdrop-blur-xl"
          onClick={closeCarousel}
        >
          <div
            className="relative bg-gradient-to-br from-gray-900 to-gray-800 w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-3xl border border-gray-700/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeCarousel}
              className="absolute top-6 right-6 z-20 p-3 bg-gray-800/80 backdrop-blur-sm rounded-xl hover:bg-gray-700/80 transition-colors group"
            >
              <X size={24} className="text-gray-300 group-hover:text-white" />
            </button>

            {/* Project info */}
            <div className="p-8 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-900/50">
              <h3 className="text-3xl font-bold text-white mb-2">
                {activeProject.title}
              </h3>
              <p className="text-gray-400">{activeProject.description}</p>
            </div>

            {/* Main image */}
            <div className="relative h-[60vh] flex items-center justify-center p-8">
              {activeProject.images && activeProject.images.length > 0 ? (
                <>
                  <img
                    src={getImageSrc(activeProject.images[currentImage])}
                    className="max-h-full max-w-full object-contain rounded-xl shadow-2xl"
                    alt={`${activeProject.title} - Image ${currentImage + 1}`}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/800x600/0f172a/ffffff?text=Image+Not+Found";
                    }}
                  />

                  {/* Navigation arrows */}
                  {activeProject.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-8 top-1/2 transform -translate-y-1/2 p-4 bg-gray-800/80 backdrop-blur-sm rounded-xl hover:bg-gray-700/80 transition-colors group"
                      >
                        <ChevronLeft
                          size={28}
                          className="text-gray-300 group-hover:text-white"
                        />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-8 top-1/2 transform -translate-y-1/2 p-4 bg-gray-800/80 backdrop-blur-sm rounded-xl hover:bg-gray-700/80 transition-colors group"
                      >
                        <ChevronRight
                          size={28}
                          className="text-gray-300 group-hover:text-white"
                        />
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="text-gray-400 text-center text-xl">
                  No images available
                </div>
              )}
            </div>

            {/* Image counter */}
            {activeProject.images && activeProject.images.length > 1 && (
              <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 bg-gray-800/80 backdrop-blur-sm px-6 py-3 rounded-full text-lg font-medium">
                {currentImage + 1} / {activeProject.images.length}
              </div>
            )}

            {/* Thumbnailss */}
            {activeProject.images && activeProject.images.length > 1 && (
              <div className="p-6 bg-gradient-to-t from-gray-900/50 to-transparent">
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {activeProject.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${currentImage === index ? "border-cyan-500 shadow-lg shadow-cyan-500/20" : "border-transparent hover:border-gray-600"}`}
                    >
                      <img
                        src={getImageSrc(img)}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/80/0f172a/ffffff?text=Thumb";
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section
        id="contact"
        className="relative py-24 bg-gradient-to-b from-gray-800/50 to-gray-900/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 relative inline-block">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Get In Touch
              </span>
              <Mail className="absolute -top-2 -right-8 w-7 h-7 text-cyan-400 animate-bounce-slow" />
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-400 mt-8 max-w-2xl mx-auto font-light">
              I'm always open to discussing new opportunities, exciting
              projects, or just having a chat about technology.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              {[
                {
                  icon: <Mail className="w-6 h-6" />,
                  title: "Email",
                  content: "yoonusanees2002@gmail.com",
                  color: "from-cyan-500 to-blue-600",
                  link: "mailto:yoonusanees2002@gmail.com",
                },
                {
                  icon: <Phone className="w-6 h-6" />,
                  title: "Phone",
                  content: "+94 76 131 0771",
                  color: "from-emerald-500 to-green-600",
                  link: "tel:+94761310771",
                },
                {
                  icon: <MapPin className="w-6 h-6" />,
                  title: "Location",
                  content: "Akurana, Kandy, Sri Lanka",
                  color: "from-purple-500 to-pink-600",
                },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target={item.link ? "_blank" : undefined}
                  rel={item.link ? "noreferrer" : undefined}
                  className={`block group ${item.link ? "cursor-pointer" : "cursor-default"}`}
                >
                  <div className="flex items-center gap-6 p-6 bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 hover:scale-105">
                    <div
                      className={`p-4 rounded-xl bg-gradient-to-br ${item.color}`}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 group-hover:text-cyan-300 transition-colors">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </a>
              ))}

              {/* Social Links */}
              <div className="pt-8">
                <h4 className="text-xl font-semibold text-white mb-6">
                  Connect with me
                </h4>
                <div className="flex gap-6">
                  {[
                    {
                      icon: <Github className="w-6 h-6" />,
                      href: "https://github.com/YoonusAnees",
                      color: "hover:bg-gray-700",
                    },
                    {
                      icon: <Linkedin className="w-6 h-6" />,
                      href: "https://www.linkedin.com/in/yoonus-anees-59b7b2302/",
                      color: "hover:bg-blue-600",
                    },
                    {
                      icon: <Mail className="w-6 h-6" />,
                      href: "mailto:yoonusanees2002@gmail.com",
                      color: "hover:bg-cyan-600",
                    },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:scale-110"
                    >
                      <div
                        className={`p-3 rounded-lg bg-gray-700/50 ${social.color} transition-colors duration-300`}
                      >
                        {React.cloneElement(social.icon, {
                          className: "w-6 h-6 text-white",
                        })}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50">
              <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Name
                  </label>
                  <input
                    name="user_name"
                    type="text"
                    required
                    className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Contact Number
                  </label>
                  <input
                    name="user_phone"
                    type="number"
                    required
                    className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white"
                    placeholder="Your number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Email
                  </label>
                  <input
                    name="user_email"
                    type="email"
                    required
                    className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white resize-none"
                    placeholder="Drop your message here..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full px-8 py-4 rounded-xl font-semibold text-white overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600"></div>

                  <div className="relative flex items-center justify-center gap-3">
                    <span>{loading ? "Sending..." : "Send Message"}</span>
                    <Zap className="w-5 h-5 group-hover:animate-bounce" />
                  </div>
                </button>
              </form>
            </div>

            {/* ✅ SUCCESS POPUP */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 40, scale: 0.9 }}
                  className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-4 rounded-xl shadow-lg z-50"
                >
                  Your message has been sent successfully to Yoonus!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 bg-gradient-to-t from-gray-900 to-transparent border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
                Yoonus Anees
              </div>
              <p className="text-gray-500 text-sm">
                Building the future, one line of code at a time
              </p>
            </div>

            <div className="flex items-center gap-6">
              <span className="text-gray-500 text-sm">
                © {new Date().getFullYear()} All rights reserved
              </span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-cyan-400 font-medium">
                  Available for opportunities
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
