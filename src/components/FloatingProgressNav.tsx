"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = [
  { id: "story", label: "Story" },
  { id: "products", label: "Products" },
  { id: "features", label: "Features" },
  { id: "technology", label: "Technology" },
  { id: "testimonials", label: "Testimonials" },
  { id: "impact", label: "Impact" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
  { id: "support", label: "Support" },
];

export default function FloatingProgressNav() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let rafId: number;

    const calculateProgress = () => {
      // Auto-hide when hero is visible (e.g. scrollY > 400px shows it)
      if (window.scrollY > window.innerHeight * 0.4) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      const newProgressMap: Record<string, number> = {};
      let currentActive = "";
      const viewportHeight = window.innerHeight;

      SECTIONS.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const elementHeight = rect.height;

          // Progress calculation: 
          // 0 when the top of the element hits the middle of the screen
          // 1 when the bottom of the element hits the middle of the screen
          let p = (viewportHeight / 2 - rect.top) / elementHeight;
          p = Math.max(0, Math.min(1, p));
          newProgressMap[section.id] = p;

          // If the middle of the screen is currently intersecting this section
          if (rect.top <= viewportHeight / 2 && rect.bottom >= viewportHeight / 2) {
            currentActive = section.id;
          }
        }
      });

      // Fallback: If between sections (e.g., margins), find the last one we passed
      if (!currentActive) {
        let lastPassed = "";
        SECTIONS.forEach((s) => {
          if (newProgressMap[s.id] > 0) lastPassed = s.id;
        });
        currentActive = lastPassed || SECTIONS[0].id;
      }

      setProgressMap(newProgressMap);
      setActiveSection(currentActive);
    };

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(calculateProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    calculateProgress(); // Init on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80, // Offset for top navbar
        behavior: "smooth",
      });
    }
  };

  const activeIndex = SECTIONS.findIndex((s) => s.id === activeSection);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 50, opacity: 0, x: "-50%" }}
          animate={{ y: 0, opacity: 1, x: "-50%" }}
          exit={{ y: 50, opacity: 0, x: "-50%" }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-4 md:bottom-6 left-1/2 z-[1000] pointer-events-auto"
        >
          <div className="flex items-center gap-1.5 md:gap-2 bg-[#111111]/90 backdrop-blur-md border border-white/10 shadow-2xl rounded-full h-[56px] px-5 py-3">
            {SECTIONS.map((section, index) => {
              const isActive = activeSection === section.id;
              const progress = progressMap[section.id] || 0;
              const isCompleted = progress === 1;
              const isNearActive = Math.abs(activeIndex - index) <= 1;

              const radius = 6;
              const circumference = 2 * Math.PI * radius;
              const strokeDashoffset = circumference - progress * circumference;

              return (
                <div
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`items-center cursor-pointer group transition-all duration-300 ${
                    isNearActive ? "flex" : "hidden sm:flex"
                  }`}
                >
                  {/* Progress Indicator */}
                  <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 18 18" className="absolute -rotate-90">
                      {/* Base Track */}
                      <circle
                        cx="9"
                        cy="9"
                        r={radius}
                        fill={isCompleted ? "#3b82f6" : "none"}
                        stroke={isCompleted ? "#3b82f6" : "rgba(255,255,255,0.08)"}
                        strokeWidth="2"
                        className="transition-colors duration-300"
                      />
                      {/* Animated Progress Ring */}
                      {!isCompleted && progress > 0 && (
                        <circle
                          cx="9"
                          cy="9"
                          r={radius}
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="2"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                        />
                      )}
                    </svg>

                    {/* Active center dot */}
                    <motion.div
                      initial={false}
                      animate={{ scale: isActive && !isCompleted ? 1 : 0 }}
                      className="w-1.5 h-1.5 bg-white rounded-full absolute"
                    />
                  </div>

                  {/* Expanding Label */}
                  <motion.div
                    initial={false}
                    animate={{
                      width: isActive ? "auto" : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    className="overflow-hidden whitespace-nowrap flex items-center"
                  >
                    <span className="text-[13px] font-medium tracking-wide text-white pr-2 pl-1">
                      {section.label}
                    </span>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
