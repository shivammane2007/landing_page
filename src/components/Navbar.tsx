"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Story', 'Products', 'Features', 'Technology', 'Testimonials', 'Pricing'];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center pt-4 sm:pt-6 px-4 sm:px-8 gap-2 sm:gap-3 transition-all duration-300 ${
          scrolled ? 'bg-white/80 backdrop-blur-sm pb-4 sm:pb-6' : ''
        }`}
      >
        <Link href="/" className="flex items-center justify-center rounded-full w-10 h-10 sm:w-11 sm:h-11 shrink-0 bg-[#EDEDED]">
          <Logo />
        </Link>
        
        <div className="hidden md:flex items-center gap-4 sm:gap-8 rounded-xl px-4 sm:px-8 py-2.5 sm:py-3 bg-[#EDEDED]">
          {navLinks.map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[12px] sm:text-[14px] font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="flex md:hidden items-center gap-2 rounded-xl px-4 py-2.5 bg-[#EDEDED]">
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="text-gray-700 hover:text-gray-900"
            aria-label="Open mobile menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-[#f0f0ee] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center justify-center rounded-full w-11 h-11 shrink-0 bg-[#EDEDED]">
                <Logo />
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-900 font-medium p-2"
              >
                Close
              </button>
            </div>
            
            <div className="flex flex-col gap-6 text-2xl font-semibold">
              {navLinks.map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-900"
                >
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
