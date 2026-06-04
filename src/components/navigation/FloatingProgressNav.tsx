"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

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
  const [isVisible, setIsVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  const { scrollYProgress, scrollY } = useScroll();
  const strokeDashoffset = useTransform(scrollYProgress, [0, 1], [circumference, 0]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const threshold = typeof window !== 'undefined' ? window.innerHeight * 0.4 : 400;
    const shouldBeVisible = latest > threshold && !isFooterVisible;
    if (shouldBeVisible !== isVisible) {
      setIsVisible(shouldBeVisible);
    }
  });

  useEffect(() => {
    // Observer for Footer visibility
    const footer = document.querySelector("footer");
    const footerObserver = new IntersectionObserver(
      (entries) => {
        setIsFooterVisible(entries[0].isIntersecting);
      },
      { rootMargin: "50px 0px 0px 0px" }
    );
    if (footer) footerObserver.observe(footer);

    // Observer for Active Sections
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) sectionObserver.observe(el);
    });

    return () => {
      footerObserver.disconnect();
      sectionObserver.disconnect();
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

  const scrollToNext = useCallback(() => {
    const nextIndex = activeIndex + 1 < SECTIONS.length ? activeIndex + 1 : 0;
    scrollToSection(SECTIONS[nextIndex].id);
  }, [activeIndex, scrollToSection]);

  return (
    <motion.div
      initial={false}
      animate={{ 
        y: isVisible ? 0 : 50, 
        opacity: isVisible ? 1 : 0, 
        x: "-50%",
        pointerEvents: isVisible ? "auto" : "none" 
      }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed bottom-4 md:bottom-6 left-1/2 z-[1000]"
    >
          <LiquidButton
            onClick={scrollToNext}
            className="flex items-center gap-3 md:gap-4 !bg-[#111111]/90 backdrop-blur-md border border-white/10 shadow-2xl !rounded-full !h-[56px] !px-5 !py-3 cursor-pointer group"
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
                    style={{ strokeDashoffset }}
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
          </LiquidButton>
    </motion.div>
  );
}
