"use client";

import { motion } from 'framer-motion';
import { Tv } from 'lucide-react';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';

const StatItem = ({ target, label, suffix = '' }: { target: number, label: string, suffix?: string }) => {
  const { ref, count } = useAnimatedCounter(target, 2000);
  
  return (
    <motion.div 
      ref={ref}
      className="bg-white rounded-2xl p-8 flex flex-col items-center justify-center text-center border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="text-4xl font-bold text-gray-900 mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm font-medium text-gray-500">
        {label}
      </div>
    </motion.div>
  );
};

export default function Trust() {
  const partners = [
    "Mayo Clinic", "Cleveland Clinic", "Johns Hopkins", 
    "Mass General", "Mount Sinai", "Stanford Health",
    "UCLA Health", "Penn Medicine"
  ];

  return (
    <section id="story" className="w-full bg-[#f7f7f5] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight"
          >
            Trusted by thousands worldwide.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-lg max-w-2xl mx-auto"
          >
            Our intelligent prosthetics are currently transforming lives in leading hospitals, rehabilitation centers, and homes across 25+ countries.
          </motion.p>
        </div>

        {/* Logo Marquee */}
        <div className="relative overflow-hidden mb-16 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-[#f7f7f5] before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-[#f7f7f5] after:to-transparent">
          <div className="flex animate-marquee whitespace-nowrap items-center" aria-hidden="true">
            {[...partners, ...partners].map((partner, i) => (
              <span 
                key={i} 
                className="mx-8 text-xl font-medium text-gray-400 opacity-80 hover:opacity-100 hover:text-gray-600 transition-colors duration-300 select-none grayscale"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>

        {/* Shark Tank Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex justify-center mb-20"
        >
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 rounded-full px-6 py-2.5 font-medium shadow-sm">
            <Tv size={18} />
            <span>Featured on Shark Tank India</span>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
          <StatItem target={10000} label="Lives Improved" suffix="+" />
          <StatItem target={98} label="Customer Satisfaction" suffix="%" />
          <StatItem target={25} label="Countries Supported" suffix="+" />
          <StatItem target={24} label="Customer Care" suffix="/7" />
        </div>

        {/* Certification Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-wrap justify-center gap-4"
        >
          {['ISO 13485 Certified', 'CE Marked', 'FDA Cleared'].map(cert => (
            <span key={cert} className="bg-white text-gray-500 rounded-full px-5 py-2 text-sm font-medium border border-gray-200 shadow-sm">
              {cert}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
