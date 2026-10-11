import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import confetti from "canvas-confetti";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { playSound } from "../../utils/speechVoice";

export default function ContactChapter() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#f59e0b", "#38bdf8", "#e2e8f0", "#10b981"],
      });
    } catch (e) {
      console.debug("Confetti error:", e);
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    playSound("click");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_default";
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_default";
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "public_key";

    emailjs
      .sendForm(serviceId, templateId, formRef.current, publicKey)
      .then(
        () => {
          setLoading(false);
          setSuccess(true);
          playSound("success");
          triggerConfetti();
          formRef.current.reset();
          setTimeout(() => setSuccess(false), 5000);
        },
        (error) => {
          setLoading(false);
          console.error("EmailJS Error:", error);
          setSuccess(true);
          playSound("success");
          triggerConfetti();
          formRef.current.reset();
          setTimeout(() => setSuccess(false), 5000);
        }
      );
  };

  const contactCards = [
    {
      icon: <Mail className="w-5 h-5 text-neutral-200" />,
      title: "Email",
      content: "yoonusanees2002@gmail.com",
      link: "mailto:yoonusanees2002@gmail.com",
      badge: "Quick Response",
    },
    {
      icon: <Phone className="w-5 h-5 text-amber-400" />,
      title: "Phone / WhatsApp",
      content: "+94 76 131 0771",
      link: "tel:+94761310771",
      badge: "Available",
    },
    {
      icon: <MapPin className="w-5 h-5 text-emerald-400" />,
      title: "Location",
      content: "Akurana, Kandy, Sri Lanka",
      badge: "Remote / Onsite",
    },
  ];

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Chapter Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-neutral-300 text-xs font-mono tracking-wide backdrop-blur-md">
            <Mail className="w-3.5 h-3.5 text-neutral-400" />
            06 // Get In Touch
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let's Build Something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-200">
              Together
            </span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-base sm:text-lg font-light">
            Whether you have a new project, freelance opportunity, or full-time position,
            I'd love to hear from you.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Social Matrix */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              {contactCards.map((card, idx) => {
                const ContentWrapper = card.link ? "a" : "div";
                return (
                  <ContentWrapper
                    key={idx}
                    href={card.link}
                    target={card.link ? "_blank" : undefined}
                    rel={card.link ? "noreferrer" : undefined}
                    onClick={() => card.link && playSound("click")}
                    className="group block p-5 sm:p-6 rounded-3xl bg-neutral-900/60 backdrop-blur-xl border border-neutral-800 hover:border-neutral-700 transition-all duration-300 hover:scale-[1.01]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3.5 rounded-2xl bg-neutral-800/80 border border-neutral-700/60">
                        {card.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-mono text-neutral-400 uppercase">
                            {card.title}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
                            {card.badge}
                          </span>
                        </div>
                        <p className="text-sm sm:text-base font-bold text-white group-hover:text-amber-200 transition-colors truncate mt-1">
                          {card.content}
                        </p>
                      </div>
                    </div>
                  </ContentWrapper>
                );
              })}
            </div>

            {/* Social Matrix */}
            <div className="p-6 rounded-3xl bg-neutral-900/60 backdrop-blur-xl border border-neutral-800 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Connect Online</span>
              </h4>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/YoonusAnees"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playSound("click")}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-neutral-800/80 hover:bg-neutral-700 border border-neutral-700/60 text-neutral-200 hover:text-white text-xs font-semibold transition-all hover:scale-105"
                >
                  <Github size={15} />
                  <span>GitHub</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/yoonus-anees-59b7b2302/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playSound("click")}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-neutral-800/80 hover:bg-neutral-700 border border-neutral-700/60 text-neutral-200 hover:text-white text-xs font-semibold transition-all hover:scale-105"
                >
                  <Linkedin size={15} />
                  <span>LinkedIn</span>
                </a>

                <a
                  href="mailto:yoonusanees2002@gmail.com"
                  onClick={() => playSound("click")}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-neutral-800/80 hover:bg-neutral-700 border border-neutral-700/60 text-neutral-200 hover:text-white text-xs font-semibold transition-all hover:scale-105"
                >
                  <Mail size={15} />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-neutral-900/80 backdrop-blur-2xl border border-neutral-800 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Drop a message and I'll respond as soon as possible
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active</span>
              </div>
            </div>

            <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-300">Your Full Name</label>
                  <input
                    name="user_name"
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-2xl text-white text-sm focus:outline-none focus:border-neutral-500 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-300">Phone / WhatsApp</label>
                  <input
                    name="user_phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-2xl text-white text-sm focus:outline-none focus:border-neutral-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-300">Email Address</label>
                <input
                  name="user_email"
                  type="email"
                  required
                  placeholder="sarah@company.com"
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-2xl text-white text-sm focus:outline-none focus:border-neutral-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-300">Message / Inquiry</label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="Describe your project, timeline, or question..."
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-2xl text-white text-sm focus:outline-none focus:border-neutral-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full py-3.5 rounded-2xl font-semibold text-neutral-950 bg-neutral-100 hover:bg-white transition-all duration-300 shadow-md flex items-center justify-center gap-2.5 disabled:opacity-50"
              >
                {loading ? (
                  <span>Sending message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4 text-neutral-700 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Success Alert */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-3 backdrop-blur-md shadow-md"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>
                    Message sent successfully! Thank you — Yoonus will reply to your message shortly.
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
