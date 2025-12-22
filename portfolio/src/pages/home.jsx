import React, { useState, useEffect, useCallback } from 'react';
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
  ChevronRight
} from 'lucide-react';

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close carousel on Escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isCarouselOpen) {
        closeCarousel();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isCarouselOpen]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // DEBUG: Add console logs to see what's happening
  const openCarousel = useCallback((project) => {
    console.log('Opening carousel for project:', project.title);
    console.log('Project images:', project.images);
    
    setActiveProject(project);
    setCurrentImage(0);
    setIsCarouselOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    console.log('Carousel should be open now');
  }, []);

  const closeCarousel = useCallback(() => {
    console.log('Closing carousel');
    setIsCarouselOpen(false);
    setActiveProject(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
  }, []);

  const nextImage = useCallback((e) => {
    e?.stopPropagation();
    if (activeProject && activeProject.images) {
      setCurrentImage(prev => 
        prev === activeProject.images.length - 1 ? 0 : prev + 1
      );
    }
  }, [activeProject]);

  const prevImage = useCallback((e) => {
    e?.stopPropagation();
    if (activeProject && activeProject.images) {
      setCurrentImage(prev => 
        prev === 0 ? activeProject.images.length - 1 : prev - 1
      );
    }
  }, [activeProject]);

  // Helper function to get image source
  const getImageSrc = (imgPath) => {
    // If it's a URL (starts with http), use it directly
    if (imgPath.startsWith('http')) {
      return imgPath;
    }
    // If it's a local path without ./, add it
    if (!imgPath.startsWith('./') && !imgPath.startsWith('/')) {
      return `./${imgPath}`;
    }
    return imgPath;
  };

  const skills = [
    { name: 'React', level: 90, color: 'bg-blue-500' },
    { name: 'TypeScript', level: 85, color: 'bg-blue-600' },
    { name: 'Tailwind CSS', level: 95, color: 'bg-teal-500' },
    { name: 'Node.js', level: 85, color: 'bg-green-500' },
    { name: 'Python', level: 60, color: 'bg-yellow-500' },
    { name: 'Laravel', level: 85, color: 'bg-red-500' },
    { name: 'Next.js', level: 70, color: 'bg-gray-200' },
  ];

  const projects = [
    {
      title: 'Road Crime Fine Management System',
      description: 'Full stack system with React, Laravel & MySQL.',
      technologies: ['Laravel', 'React', 'MySQL','Stripe'],
    images: [
        'RCFMS.png','RCFMS-2.png','RCFMS-3.png','RCFMS-4.png','RCFMS-5.png',
        'RCFMS-6.png','RCFMS-7.png','RCFMS-8.png','RCFMS-9.png','RCFMS-10.png',
        'RCFMS-11.png','RCFMS-12.png','RCFMS-13.png','RCFMS-14.png','RCFMS-15.png',
        'RCFMS-16.png','RCFMS-17.png','RCFMS-18.png','RCFMS-19.png','RCFMS-23.png'
      ],
            github: 'https://github.com/YoonusAnees/RCFMS.git',
    },
    {
      title: 'Task Management App',
      description: 'Node.js task manager with MongoDB.',
      technologies: ['Node.js','HTML','CSS','JavaScript','HBS', 'MongoDB'],
      images: ['https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg'],
      github: 'https://github.com/YoonusAnees/Task-Manager.git',
      live: 'https://task-manager-ze0d.onrender.com/'
    },
    {
      title: 'Hotel Management System',
      description: 'Serenity Villa booking system.',
      technologies: ['PHP', 'HTML', 'CSS', 'JavaScript', 'MySQL'],
      images: ['HMS.png'],
      github: 'https://github.com/YoonusAnees/Hotel-Management-.git',
      live: 'https://mediumspringgreen-nightingale-863353.hostingersite.com/'
    },
    {
      title: 'Fund Raising Management System',
      description: 'DisasterAid relief management platform.',
      technologies: ['Node.js','React', 'Express','JWT' ,'MongoDB'],
      images: ['FMS.png'],
      github: 'https://github.com/YoonusAnees/DMS-FE.git',
      githubb: 'https://github.com/YoonusAnees/DMS-BE.git',
      live: 'https://dms-fe-ubdm.vercel.app'
    },
      {
      title: 'Payroll Management System',
      description: 'Payroll management platform for Equipment.',
      technologies: ['Node.js','React', 'Express','JWT' ,'MongoDB'],
      images: ['MDPOS.png'],
      github: 'https://github.com/YoonusAnees/POS.git',
      githubb: 'https://github.com/YoonusAnees/Anexxa.git',
      live: 'https://pos-tau-blond.vercel.app'
    },
    {
      title: 'Authentication System',
      description: 'A modern, Responsive Authentication system.',
      technologies: ['Node.js','React', 'MongoDB', 'React Context API', 'React Router', 'Express', 'JWT'],
      images: ['Auth.png'],
      github: 'https://github.com/YoonusAnees/Sample-UserAuth-FE.git',
      githubb: 'https://github.com/YoonusAnees/Sample-UserAuth-BE.git',
      live: 'https://sample-user-auth-fe.vercel.app'
    },
    {
      title: 'Candidate Tracking Management System',
      description: 'A modern web application for managing job candidates.',
      technologies: ['Node.js','React.js', 'MongoDB', 'React Context API', 'React Router', 'Express', 'JWT', 'Chart.js'],
      images: ['CTMS.png'],
      github: 'https://github.com/YoonusAnees/CTMSFE.git',
      githubb: 'https://github.com/YoonusAnees/CTMSBE.git',
      live: 'https://ctmsfe-1wfp.vercel.app'
    },

       {
      title: 'Book Shop Management System',
      description: 'Book Shop management system for book sales and inventory.',
      technologies: ['Java','HTML', 'CSS', 'JavaScript', 'MySQL', 'jsp servlet', 'JWT'],
      images: ['J1.png','J2.png','J3.png','J4.png','J5.png','J6.png','J7.png','J8.png','J9.png','J10.png','J11.png','J12.png','j13.png','j14.png','j15.png','j16.png','j17.png','j18.png','j19.png','j20.png'],
      github: 'https://github.com/YoonusAnees/PahanaBookShop.git',
      // live: 'https://ctmsfe-1wfp.vercel.app'
    },
  ];

  useEffect(() => {
    console.log('Carousel is open:', isCarouselOpen);
    console.log('Active project:', activeProject);
  }, [isCarouselOpen, activeProject]);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Yoonus Anees
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button onClick={() => scrollToSection('home')} className="hover:text-blue-400 transition-colors duration-200">Home</button>
                <button onClick={() => scrollToSection('about')} className="hover:text-blue-400 transition-colors duration-200">About</button>
                <button onClick={() => scrollToSection('skills')} className="hover:text-blue-400 transition-colors duration-200">Skills</button>
                <button onClick={() => scrollToSection('projects')} className="hover:text-blue-400 transition-colors duration-200">Projects</button>
                <button onClick={() => scrollToSection('contact')} className="hover:text-blue-400 transition-colors duration-200">Contact</button>
              </div>
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white p-2">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left px-3 py-2 hover:bg-gray-700 rounded-md">Home</button>
              <button onClick={() => scrollToSection('about')} className="block w-full text-left px-3 py-2 hover:bg-gray-700 rounded-md">About</button>
              <button onClick={() => scrollToSection('skills')} className="block w-full text-left px-3 py-2 hover:bg-gray-700 rounded-md">Skills</button>
              <button onClick={() => scrollToSection('projects')} className="block w-full text-left px-3 py-2 hover:bg-gray-700 rounded-md">Projects</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-3 py-2 hover:bg-gray-700 rounded-md">Contact</button>
            </div>
          </div>
        )}
      </nav>

      <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Yoonus Anees
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-gray-300">
              Software Engineer | Full Stack Developer
            </p>
            <p className="text-lg md:text-xl mb-12 text-gray-400 max-w-2xl mx-auto">
              Passionate about creating beautiful, functional, and user-friendly applications that solve real-world problems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => scrollToSection('projects')} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
                View My Work
              </button>
              <button onClick={() => scrollToSection('contact')} className="border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200">
                Get In Touch
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-white/60" size={32} />
        </div>
      </section>

      <section id="about" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a passionate full-stack developer creating web applications that combine beautiful design with powerful functionality.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                I specialize in modern web technologies including React, TypeScript, Node.js, and cloud platforms.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-lg">
                  <LuTvMinimal className="text-blue-400" size={20} />
                  <span>Software Engineer</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-lg">
                  <Code className="text-purple-400" size={20} />
                  <span>Full Stack Development</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-lg">
                  <Smartphone className="text-emerald-400" size={20} />
                  <span>Mobile Development</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-88 h-88 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center hover:animate-ping hover:scale-105 transition-all duration-800 ring-4 ring-blue-500/20">
                <div className="w-72 h-80 bg-gray-800 rounded-full flex items-center justify-center">
                  <img
                    src="./profile.jpg"
                    alt="Profile"
                    className="w-64 h-80 rounded-full object-cover bg-cover bg-center"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/256x320/1f2937/ffffff?text=Profile';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-all duration-300 transform hover:scale-105">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                  <span className="text-sm text-gray-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className={`h-2 rounded-full ${skill.color} transition-all duration-1000 ease-out`} style={{ width: `${skill.level}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                {/* Project Image with click handler */}
                <div 
                  className="relative group overflow-hidden cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Clicked on project:', project.title);
                    openCarousel(project);
                  }}
                >
                  <img
                    src={getImageSrc(project.images[0])}
                    alt={project.title}
                    className="h-56 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x224/1f2937/ffffff?text=Image+Not+Found';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold bg-black/70 px-4 py-2 rounded-lg">
                      View Gallery
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-white">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 10).map((tech, techIndex) => (
                      <span key={techIndex} className="bg-gray-700 text-blue-400 px-3 py-1 rounded-full text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                    {/* {project.technologies.length > 3 && (
                      <span className="bg-gray-700 text-blue-400 px-3 py-1 rounded-full text-xs font-medium">
                        +{project.technologies.length - 3} more
                      </span>
                    )} */}
                  </div>

                  <div className="flex gap-4">
                    <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors">
                      <Github size={18} /> <span className="text-sm">Code</span>
                    </a>
                    {project.githubb && (
                      <a href={project.githubb} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors">
                        <Github size={18} /> <span className="text-sm">Backend</span>
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors">
                        <ExternalLink size={18} /> <span className="text-sm">Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carousel Modal - FIXED VERSION */}
      {isCarouselOpen && activeProject && (
        <div 
          className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4"
          onClick={closeCarousel}
        >
          <div 
            className="relative bg-gray-900 rounded-xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={closeCarousel}
              className="absolute top-4 right-4 z-20 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
            
            {/* Project title */}
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-xl font-bold text-white">{activeProject.title}</h3>
            </div>
            
            {/* Main image container */}
            <div className="relative h-[60vh] flex items-center justify-center p-4">
              {activeProject.images && activeProject.images.length > 0 ? (
                <img
                  src={getImageSrc(activeProject.images[currentImage])}
                  className="max-h-full max-w-full object-contain rounded-lg"
                  alt={`${activeProject.title} - Image ${currentImage + 1}`}
                  onError={(e) => {
                    console.error('Failed to load image:', activeProject.images[currentImage]);
                    e.target.src = 'https://via.placeholder.com/800x600/1f2937/ffffff?text=Image+Not+Found';
                  }}
                />
              ) : (
                <div className="text-gray-400 text-center">
                  No images available
                </div>
              )}
              
              {/* Navigation arrows */}
              {activeProject.images && activeProject.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-gray-800/80 rounded-full hover:bg-gray-700 transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-gray-800/80 rounded-full hover:bg-gray-700 transition-colors"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
            
            {/* Image counter */}
            {activeProject.images && activeProject.images.length > 1 && (
              <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 bg-gray-800/80 px-4 py-2 rounded-full text-sm">
                {currentImage + 1} / {activeProject.images.length}
              </div>
            )}
            
            {/* Thumbnails */}
            {activeProject.images && activeProject.images.length > 1 && (
              <div className="p-4 border-t border-gray-700">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {activeProject.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 ${currentImage === index ? 'border-blue-500' : 'border-transparent'} hover:border-blue-300 transition-colors`}
                    >
                      <img
                        src={getImageSrc(img)}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/64/1f2937/ffffff?text=X';
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

      {/* Contact Section - Same as before */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
            <p className="text-xl text-gray-400 mt-6 max-w-2xl mx-auto">
              I'm always interested in new opportunities and exciting projects.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-center gap-4 p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors">
                <div className="p-3 bg-blue-500 rounded-lg"><Mail className="text-white" size={24} /></div>
                <div><h3 className="text-lg font-semibold text-white">Email</h3><p className="text-gray-400">yoonusanees2002@gmail.com</p></div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors">
                <div className="p-3 bg-purple-500 rounded-lg"><Phone className="text-white" size={24} /></div>
                <div><h3 className="text-lg font-semibold text-white">Phone</h3><p className="text-gray-400">0761310771</p></div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors">
                <div className="p-3 bg-emerald-500 rounded-lg"><MapPin className="text-white" size={24} /></div>
                <div><h3 className="text-lg font-semibold text-white">Location</h3><p className="text-gray-400">Akurana, Kandy, Sri Lanka</p></div>
              </div>
              <div className="flex gap-6 justify-center md:justify-start">
                <a href="https://github.com/YoonusAnees" target="_blank" rel="noreferrer" className="p-3 bg-gray-800 hover:bg-blue-600 rounded-lg transition-colors"><Github className="text-white" size={24} /></a>
                <a href="https://www.linkedin.com/in/yoonus-anees-59b7b2302/" target="_blank" rel="noreferrer" className="p-3 bg-gray-800 hover:bg-blue-600 rounded-lg transition-colors"><Linkedin className="text-white" size={24} /></a>
                <a href="mailto:yoonusanees2002@gmail.com" target="_blank" rel="noreferrer" className="p-3 bg-gray-800 hover:bg-blue-600 rounded-lg transition-colors"><Mail className="text-white" size={24} /></a>
              </div>
            </div>
            <form className="space-y-6 bg-gray-800 p-8 rounded-xl">
              <div><label className="block text-sm font-medium text-gray-300 mb-2">Name</label><input type="text" className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white" placeholder="Your name" /></div>
              <div><label className="block text-sm font-medium text-gray-300 mb-2">Email</label><input type="email" className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white" placeholder="your.email@example.com" /></div>
              <div><label className="block text-sm font-medium text-gray-300 mb-2">Message</label><textarea rows={5} className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white resize-none" placeholder="Tell me about your project..."></textarea></div>
              <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-8 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2025 Yoonus Anees. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;