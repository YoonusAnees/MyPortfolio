import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Terminal, ArrowDown, FileText, Code, CheckCircle2 } from "lucide-react";
import Avatar3D from "../3d/Avatar3D";
import cvPdf from "../../assets/Professional CV Resume Yoonus Anees.pdf";
import { playSound } from "../../utils/speechVoice";

export default function HeroChapter({ mousePos, onNavigate }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-12 gap-12 items-center z-10">
        {/* Left Column: Story Greeting & Identity */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7 space-y-6 text-left"
        >
          {/* Chapter Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-neutral-300 text-xs font-mono tracking-wide backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            01 // Introduction & Overview
          </div>

          {/* Main Title */}
          <div className="space-y-2">
            <h2 className="text-base sm:text-lg font-mono text-amber-400/90 font-medium tracking-wide flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>console.log("Hello, world");</span>
            </h2>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
              Hi, I'm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-amber-200">
                Yoonus
              </span>
            </h1>
            <p className="text-2xl sm:text-3xl text-neutral-300 font-light">
              Software Engineer &{" "}
              <span className="font-semibold text-white">
                Full-Stack Developer
              </span>
            </p>
          </div>

          {/* Bio Story Hook */}
          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed font-light">
            I build responsive, scalable web applications and enterprise systems.
            With a focus on clean code, thoughtful architecture, and engaging interactive experiences,
            I turn complex software challenges into intuitive digital products.
          </p>

          {/* Quick Metrics Bar (Warm Slate / Neutral) */}
          <div className="grid grid-cols-3 gap-4 pt-2 max-w-lg">
            <div className="p-4 rounded-2xl bg-neutral-900/70 border border-neutral-800 backdrop-blur-md">
              <div className="text-2xl font-bold text-white font-mono">
                15+
              </div>
              <div className="text-xs text-neutral-400 mt-0.5">Projects Delivered</div>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-900/70 border border-neutral-800 backdrop-blur-md">
              <div className="text-2xl font-bold text-amber-300 font-mono">
                Full-Stack
              </div>
              <div className="text-xs text-neutral-400 mt-0.5">MERN / Laravel</div>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-900/70 border border-neutral-800 backdrop-blur-md">
              <div className="text-2xl font-bold text-neutral-200 font-mono">
                100%
              </div>
              <div className="text-xs text-neutral-400 mt-0.5">Client Commitment</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => {
                playSound("click");
                onNavigate("story");
              }}
              className="group relative px-7 py-3.5 rounded-2xl font-semibold text-neutral-950 bg-neutral-100 hover:bg-white transition-all duration-300 shadow-md flex items-center gap-2.5"
            >
              <span>Explore My Story</span>
              <Sparkles className="w-4 h-4 text-amber-600 group-hover:rotate-12 transition-transform" />
            </button>

            <button
              onClick={() => {
                playSound("click");
                onNavigate("projects");
              }}
              className="group relative px-6 py-3.5 rounded-2xl font-semibold text-neutral-200 bg-neutral-900/80 border border-neutral-700/80 hover:border-neutral-500 hover:text-white transition-all duration-300 backdrop-blur-md flex items-center gap-2"
            >
              <Code className="w-4 h-4 text-neutral-400" />
              <span>View Projects</span>
            </button>

            <a
              href={cvPdf}
              download="Yoonus_Anees_CV.pdf"
              onClick={() => playSound("click")}
              className="group relative px-6 py-3.5 rounded-2xl font-semibold text-neutral-300 bg-neutral-900/80 border border-neutral-800 hover:border-neutral-600 hover:text-white transition-all duration-300 backdrop-blur-md flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-neutral-400 group-hover:scale-110 transition-transform" />
              <span>Resume PDF</span>
            </a>
          </div>
        </motion.div>

        {/* Right Column: 3D Human Developer Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-5 flex flex-col items-center justify-center"
        >
          <div className="relative p-3 rounded-3xl bg-neutral-900/60 backdrop-blur-2xl border border-neutral-800 shadow-2xl">
            <Avatar3D mousePos={mousePos} />
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Story Indicator */}
      <div
        onClick={() => {
          playSound("click");
          onNavigate("story");
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group z-20 text-neutral-400 hover:text-white transition-colors"
      >
        <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-500 group-hover:text-neutral-300">
          Scroll for Chapter 02
        </span>
        <ArrowDown className="w-4 h-4 animate-bounce text-neutral-400" />
      </div>
    </section>
  );
}
