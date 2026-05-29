"use client";

import React, { useState, useEffect } from 'react';
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Very simple active section detection based on hash
      const sections = ['#story', '#products', '#features', '#technology', '#testimonials', '#pricing'];
      let current = '';
      for (const id of sections) {
        const el = document.querySelector(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = id;
          }
        }
      }
      if (current) {
        setActiveHref(current);
      } else if (window.scrollY < 100) {
        setActiveHref('/');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Story', href: '#story' },
    { label: 'Products', href: '#products' },
    { label: 'Features', href: '#features' },
    { label: 'Technology', href: '#technology' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Pricing', href: '#pricing' }
  ];

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[1000] w-[calc(100%-2rem)] md:w-max">
      <div className={`mx-auto rounded-[34px] transition-all duration-300 ${scrolled ? 'backdrop-blur-md bg-[#EDEDED]/85 border border-gray-200 shadow-sm' : 'bg-transparent'}`}>
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
    </div>
  );
}
