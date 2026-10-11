import React, { useState } from "react";
import { playSound } from "../../utils/speechVoice";
import { Volume2, VolumeX, ChevronUp } from "lucide-react";

export default function StoryHUD({
  scrollProgress = 0,
  activeChapter = 0,
  chapters = [],
  onJumpToChapter,
}) {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    if (nextState) playSound("click");
  };

  const handleChapterClick = (idx, id) => {
    if (soundEnabled) playSound("warp");
    if (onJumpToChapter) onJumpToChapter(id);
  };

  return (
    <>
      {/* Top Global Scroll Progress Bar (Warm Neutral/Amber Tone) */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-neutral-900/40 backdrop-blur-sm">
        <div
          className="h-full bg-gradient-to-r from-neutral-400 via-amber-400 to-amber-500 transition-all duration-150"
          style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
        />
      </div>

      {/* Floating Story Chapter Tracker HUD (Desktop Sidebar) */}
      <div className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3 p-3 rounded-3xl bg-neutral-900/80 backdrop-blur-2xl border border-neutral-800 shadow-xl">
        <div className="flex items-center gap-2 px-3 py-1 border-b border-neutral-800/80 pb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 font-semibold">
            Overview
          </span>
        </div>

        {chapters.map((chapter, index) => {
          const isActive = activeChapter === index;
          return (
            <button
              key={chapter.id}
              onClick={() => handleChapterClick(index, chapter.id)}
              className={`group flex items-center gap-3 px-3 py-2 rounded-2xl text-left transition-all duration-300 ${
                isActive
                  ? "bg-neutral-800/90 border border-neutral-700 text-white shadow-md"
                  : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-amber-400 scale-125"
                    : "bg-neutral-600 group-hover:bg-neutral-400"
                }`}
              />
              <div className="flex flex-col">
                <span className="text-[9px] font-mono text-neutral-500 group-hover:text-amber-400/80 font-medium">
                  0{index + 1}
                </span>
                <span className="text-xs font-medium tracking-wide whitespace-nowrap">
                  {chapter.title}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Floating Controls (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        <button
          onClick={toggleSound}
          title={soundEnabled ? "Audio Enabled" : "Audio Muted"}
          className={`p-3 rounded-2xl backdrop-blur-xl border transition-all duration-300 shadow-lg ${
            soundEnabled
              ? "bg-neutral-900/90 border-neutral-700 text-amber-400 hover:bg-neutral-800"
              : "bg-neutral-900/80 border-neutral-800 text-neutral-500 hover:text-neutral-300"
          }`}
        >
          {soundEnabled ? <Volume2 size={17} /> : <VolumeX size={17} />}
        </button>

        <button
          onClick={() => {
            if (soundEnabled) playSound("click");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          title="Return to top"
          className="p-3 rounded-2xl bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-all duration-300 shadow-lg group"
        >
          <ChevronUp size={17} className="group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </>
  );
}
