"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
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

const radius = 7;
const circumference = 2 * Math.PI * radius;

export default function FloatingProgressNav() {
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0].id);
  const [globalProgress, setGlobalProgress] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let rafId: number;

    const calculateProgress = () => {
      const footer = document.querySelector("footer");
      let isFooterVisible = false;

      if (footer) {
        const rect = footer.getBoundingClientRect();
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

      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;
      let currentActive = "";

      // Find section that occupies viewport center
      SECTIONS.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
            currentActive = section.id;
          }
        }
      });

      // Fallback: section whose top most recently crossed the center (scrolled above it)
      if (!currentActive) {
        let closestAbove = SECTIONS[0].id;
        let maxTop = -Infinity;
        SECTIONS.forEach((section) => {
          const el = document.getElementById(section.id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= viewportCenter && rect.top > maxTop) {
              maxTop = rect.top;
              closestAbove = section.id;
            }
          }
        });
        currentActive = closestAbove;
      }

      // Calculate Global Progress — guard against division by zero
      let p = 0;
      const firstSection = document.getElementById(SECTIONS[0].id);

      if (firstSection && footer) {
        const startY = firstSection.offsetTop;
        const endY = footer.offsetTop - viewportHeight;
        const totalScrollable = endY - startY;

        if (totalScrollable > 0) {
          p = (window.scrollY - startY) / totalScrollable;
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

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: "smooth",
      });
    }
  }, []);

  const activeIndex = useMemo(
    () => SECTIONS.findIndex((s) => s.id === activeSection),
    [activeSection]
  );
  const activeSectionData = SECTIONS[activeIndex > -1 ? activeIndex : 0];

  // Always provide explicit numeric initial value — prevents "animate from undefined" warning
  const strokeDashoffset = circumference - globalProgress * circumference;

  const scrollToNext = useCallback(() => {
    const nextIndex = activeIndex + 1 < SECTIONS.length ? activeIndex + 1 : 0;
    scrollToSection(SECTIONS[nextIndex].id);
  }, [activeIndex, scrollToSection]);

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
                  {/* Issue 2 fix: explicit strokeDashoffset initial prevents "animate from undefined" warning */}
                  <motion.circle
                    cx="10"
                    cy="10"
                    r={radius}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
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
