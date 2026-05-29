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
  { id: "support", label: "Support" },
  { id: "faq", label: "FAQ" },
];

export default function FloatingProgressNav() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [globalProgress, setGlobalProgress] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let rafId: number;

    const calculateProgress = () => {
      const footer = document.querySelector('footer');
      let isFooterVisible = false;

      if (footer) {
        const rect = footer.getBoundingClientRect();
        // Hide if the footer has taken up more than 50px of the viewport from the bottom
        if (rect.top < window.innerHeight - 50) {
          isFooterVisible = true;
        }
      }

      // Auto-hide when hero is visible OR footer is reached
      if (window.scrollY > window.innerHeight * 0.4 && !isFooterVisible) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      let currentActive = "";
      const viewportHeight = window.innerHeight;

      // 1. Calculate Active Section (same logic)
      SECTIONS.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportHeight / 2 && rect.bottom >= viewportHeight / 2) {
            currentActive = section.id;
          }
        }
      });

      if (!currentActive) {
        // Fallback: finding nearest section if in gaps
        let closest = SECTIONS[0].id;
        let minDistance = Infinity;
        SECTIONS.forEach((section) => {
           const el = document.getElementById(section.id);
           if (el) {
             const rect = el.getBoundingClientRect();
             const distance = Math.abs(rect.top - viewportHeight / 2);
             if (distance < minDistance) {
                minDistance = distance;
                closest = section.id;
             }
           }
        });
        currentActive = closest;
      }

      // 2. Calculate Global Progress (Hero to Footer)
      let p = 0;
      const firstSection = document.getElementById(SECTIONS[0].id);

      if (firstSection && footer) {
        // Start when the top of the viewport reaches the first section (Hero is completely scrolled out)
        const startY = firstSection.offsetTop;
        // End when the bottom of the viewport reaches the footer (Footer is about to enter)
        const endY = footer.offsetTop - viewportHeight;
        
        if (endY > startY) {
          p = (window.scrollY - startY) / (endY - startY);
          p = Math.max(0, Math.min(1, p));
        }
      }

      setGlobalProgress(p);
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
  const activeSectionData = SECTIONS[activeIndex > -1 ? activeIndex : 0];
  const progress = globalProgress;

  const radius = 7;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  const scrollToNext = () => {
    const nextIndex = activeIndex + 1 < SECTIONS.length ? activeIndex + 1 : 0;
    scrollToSection(SECTIONS[nextIndex].id);
  };

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
          <div 
            onClick={scrollToNext}
            className="flex items-center gap-3 md:gap-4 bg-[#111111]/90 backdrop-blur-md border border-white/10 shadow-2xl rounded-full h-[56px] px-5 py-3 cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 20 20" className="absolute -rotate-90">
                  <circle
                    cx="10"
                    cy="10"
                    r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="2"
                  />
                  <motion.circle
                    cx="10"
                    cy="10"
                    r={radius}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeDasharray={circumference}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 0.1, ease: "linear" }}
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="overflow-hidden relative w-[90px] md:w-[100px] h-[20px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeSectionData.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-[14px] font-medium tracking-wide text-white absolute left-0"
                  >
                    {activeSectionData.label}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            <div className="w-[1px] h-4 bg-white/10" />

            <div className="flex items-center justify-center w-[40px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="text-[13px] text-white/50 tracking-wide font-medium"
                >
                  {activeIndex + 1} / {SECTIONS.length}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
