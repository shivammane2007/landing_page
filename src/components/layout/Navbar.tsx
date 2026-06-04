"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import PillNav from "../navigation/PillNav";

const Logo = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 256 256"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="rgb(84, 84, 84)"
      d="M 160 88 L 194 34 L 216 0 L 256 0 L 256 40 L 221.5 93.5 L 200 128 L 256 128 L 256 256 L 96 256 L 96 168 L 64.246 220 L 40 256 L 0 256 L 0 216 L 34 162 L 56 128 L 0 128 L 0 0 L 160 0 Z"
    />
  </svg>
);

const navItems = [
  { label: 'Story', href: '#story' },
  { label: 'Products', href: '#products' },
  { label: 'Features', href: '#features' },
  { label: 'Technology', href: '#technology' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Pricing', href: '#pricing' }
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [activeHref, setActiveHref] = useState<string>('');
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    if (latest > 60 !== isScrolled) {
      setIsScrolled(latest > 60);
    }

    const shouldHide = latest > previous && latest > 150;
    if (shouldHide !== hidden) {
      setHidden(shouldHide);
    }
    
    if (latest < 100 && activeHref !== '/') {
      setActiveHref('/');
    }
  });

  useEffect(() => {
    const sections = navItems.map(item => item.href.substring(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-150px 0px -50% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div 
      initial={false}
      animate={{ y: hidden ? "-120%" : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed top-4 left-0 right-0 z-[1000] w-[calc(100%-2rem)] md:w-max mx-auto pointer-events-none bg-transparent"
    >
      <div className={`pointer-events-auto mx-auto w-max rounded-[34px] transition-all duration-300 ${isScrolled ? 'backdrop-blur-md bg-[#EDEDED]/85 border border-gray-200 shadow-sm' : 'bg-transparent'}`}>
        <PillNav
          logo={<Logo />}
          logoAlt="Bionic Logo"
          items={navItems}
          activeHref={activeHref}
          className="mx-auto"
          ease="power2.easeOut"
          baseColor="#EDEDED"
          pillColor="#ffffff"
          hoveredPillTextColor="#000000"
          pillTextColor="#374151"
        />
      </div>
    </motion.div>
  );
}
