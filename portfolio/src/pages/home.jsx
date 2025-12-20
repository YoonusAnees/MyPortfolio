import React, { useState, useEffect } from 'react';
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
  
} from 'lucide-react';


function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
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
      title: 'Road Crime Fined Management System',
      description: 'Fully Fledge Road Crime Managment  solution with React, Laravel, and MySQL. Features include user authentication, payment processing, and admin dashboard.',
      technologies: ['React', 'Laravel', 'MySQL', 'Stripe'],
      image: 'RCFMS.png',
      github: 'https://github.com/YoonusAnees/RCFMS.git',
      
    },
    {
      title: 'Task Management App',
      description: 'Task Manager With JavaScript Programming language Node.js Backend runtime environment Express.js API routing & server handling Mongoose MongoDB object modeling MongoDB Database hbs / handlebars Optional view rendering.',
      technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind'],
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
      github: 'https://github.com/YoonusAnees/Task-Manager.git',
      live: 'https://task-manager-ze0d.onrender.com/'
    },
    {
      title: 'Hotel Management ',
      description: 'Hotel Management System with html css javaScript with PHP.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'PHP'],
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
      github: '#',
      live: '#'
    }
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Yoonus Anees
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button 
                  onClick={() => scrollToSection('home')}
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('skills')}
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  Skills
                </button>
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  Projects
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  Contact
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button 
                onClick={() => scrollToSection('home')}
                className="block w-full text-left px-3 py-2 hover:bg-gray-700 rounded-md"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="block w-full text-left px-3 py-2 hover:bg-gray-700 rounded-md"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('skills')}
                className="block w-full text-left px-3 py-2 hover:bg-gray-700 rounded-md"
              >
                Skills
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="block w-full text-left px-3 py-2 hover:bg-gray-700 rounded-md"
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-3 py-2 hover:bg-gray-700 rounded-md"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
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
              <button 
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
              >
                View My Work
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-white/60" size={32} />
        </div>
      </section>

      {/* About Section */}
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
                I'm a passionate full-stack developer creating web applications that combine beautiful design with powerful functionality. My journey in tech started with a curiosity about how things work, and it has evolved into a deep love for solving complex problems through code.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                I specialize in modern web technologies including React, TypeScript, Node.js, and cloud platforms. I believe in writing clean, maintainable code and creating user experiences that are both intuitive and delightful.
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
              <div className="w-88 h-88 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center hover:animate-ping hover:scale-105 transition-all duration-800 ring-4 ring-blue-500/20 ">
                <div className="w-72 h-80 bg-gray-800 rounded-full flex items-center justify-center">
                  <img 
                    src="./profile.jpg" 
                    alt="Profile" 
                    className="w-64 h-80 rounded-full object-cover bg-cover bg-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
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
                  <div 
                    className={`h-2 rounded-full ${skill.color} transition-all duration-1000 ease-out`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-white">{project.title}</h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="bg-gray-700 text-blue-400 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <a 
                      href={project.github}
                      className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                    >
                      <Github size={18} />
                      <span className="text-sm">Code</span>
                    </a>
                    <a 
                      href={project.live}
                      className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                    >
                      <ExternalLink size={18} />
                      <span className="text-sm">Live Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
            <p className="text-xl text-gray-400 mt-6 max-w-2xl mx-auto">
              I'm always interested in new opportunities and exciting projects. Let's discuss how we can work together!
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-center gap-4 p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors">
                <div className="p-3 bg-blue-500 rounded-lg">
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Email</h3>
                  <p className="text-gray-400">yoonusanees2002@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors">
                <div className="p-3 bg-purple-500 rounded-lg">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Phone</h3>
                  <p className="text-gray-400">0761310771</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors">
                <div className="p-3 bg-emerald-500 rounded-lg">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Location</h3>
                  <p className="text-gray-400">Akurana,Kandy ,Sri Lanka</p>
                </div>
              </div>
              
              <div className="flex gap-6 justify-center md:justify-start">
                <a 
                  href="https://github.com/YoonusAnees" 
                  className="p-3 bg-gray-800 hover:bg-blue-600 rounded-lg transition-colors"
                >
                  <Github className="text-white" size={24} />
                </a>
                <a 
                  href="www.linkedin.com/in/yoonus-anees-59b7b2302" 
                  className="p-3 bg-gray-800 hover:bg-blue-600 rounded-lg transition-colors"
                >
                  <Linkedin className="text-white" size={24} />
                </a>
                <a 
                  href="mailto:yoonusanees2002@gmail.com" 
                  className="p-3 bg-gray-800 hover:bg-blue-600 rounded-lg transition-colors"
                >
                  <Mail className="text-white" size={24} />
                </a>
              </div>
            </div>
            
            <form className="space-y-6 bg-gray-800 p-8 rounded-xl">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea 
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
              >
                Send Message
              </button>
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