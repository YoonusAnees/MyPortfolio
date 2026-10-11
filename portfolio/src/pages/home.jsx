import React, { useState, useEffect, useCallback } from "react";
import Scene3D from "../components/3d/Scene3D";
import Navbar from "../components/ui/Navbar";
import StoryHUD from "../components/ui/StoryHUD";
import HeroChapter from "../components/sections/HeroChapter";
import StoryChapter from "../components/sections/StoryChapter";
import SkillsChapter from "../components/sections/SkillsChapter";
import ProjectsChapter from "../components/sections/ProjectsChapter";
import TimelineChapter from "../components/sections/TimelineChapter";
import ContactChapter from "../components/sections/ContactChapter";
import Footer from "../components/ui/Footer";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    { id: "hero", title: "Introduction" },
    { id: "story", title: "Story & Mindset" },
    { id: "skills", title: "Skills & Stack" },
    { id: "projects", title: "Projects" },
    { id: "timeline", title: "Milestones" },
    { id: "contact", title: "Contact" },
  ];

  // Scroll listener & progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? currentScrollY / docHeight : 0;

      setScrollY(currentScrollY);
      setScrollProgress(progress);

      // Determine active chapter by section offsets
      const chapterElements = chapters.map((ch) => document.getElementById(ch.id));
      const scrollMiddle = currentScrollY + window.innerHeight * 0.35;

      for (let i = chapterElements.length - 1; i >= 0; i--) {
        const el = chapterElements[i];
        if (el && el.offsetTop <= scrollMiddle) {
          setActiveChapter(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mouse move listener
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0b0c10] text-[#e2e8f0] selection:bg-neutral-700 selection:text-white overflow-x-hidden">
      {/* 3D WebGL Background Scene (Warm & Atmospheric) */}
      <Scene3D scrollProgress={scrollProgress} mousePos={mousePos} />

      {/* Subtle Warm Dot Grid */}
      <div className="fixed inset-0 warm-grid pointer-events-none z-0 opacity-40" />

      {/* Soft Warm Ambient Lighting Orbs */}
      <div className="fixed top-1/4 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-1/4 right-10 w-96 h-96 bg-slate-500/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Story HUD Overview */}
      {/* <StoryHUD
        scrollProgress={scrollProgress}
        activeChapter={activeChapter}
        chapters={chapters}
        onJumpToChapter={scrollToSection}
      /> */}

      {/* Navigation Header */}
      <Navbar
        activeSection={chapters[activeChapter]?.id || "hero"}
        onNavigate={scrollToSection}
        scrollY={scrollY}
      />

      {/* Story Chapters */}
      <main className="relative z-10 space-y-8">
        {/* Chapter 01: Introduction */}
        <HeroChapter mousePos={mousePos} onNavigate={scrollToSection} />

        {/* Chapter 02: Story & Mindset */}
        <StoryChapter onNavigate={scrollToSection} />

        {/* Chapter 03: Skills & Stack */}
        <SkillsChapter />

        {/* Chapter 04: Projects */}
        <ProjectsChapter />

        {/* Chapter 05: Milestones */}
        {/* <TimelineChapter /> */}

        {/* Chapter 06: Contact */}
        <ContactChapter />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
