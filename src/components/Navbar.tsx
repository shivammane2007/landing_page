"use client";

import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import PillNav from './PillNav';

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
    
    // Background style activation
    if (latest > 60) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Scroll direction detection (hide on scroll down, show on scroll up)
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    // Active section logic
    const sections = ['#story', '#products', '#features', '#technology', '#testimonials', '#pricing'];
    let current = '';
    for (const id of sections) {
      const el = document.querySelector(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          current = id;
        }
      }
    }
    
    if (current) {
      setActiveHref(current);
    } else if (latest < 100) {
      setActiveHref('/');
    }
  });

  return (
    <motion.div 
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-120%", opacity: 0 }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="sticky top-4 left-0 right-0 z-[1000] w-[calc(100%-2rem)] md:w-max mx-auto pointer-events-auto"
    >
      <div className={`mx-auto rounded-[34px] transition-all duration-300 ${isScrolled ? 'backdrop-blur-md bg-[#EDEDED]/85 border border-gray-200 shadow-sm' : 'bg-transparent'}`}>
        <PillNav
          logo={<Logo />}
          logoAlt="Bionic Logo"
          items={navItems} // Reference remains stable, preventing re-renders inside PillNav
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
