"use client";

import { motion } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';

const LargeStat = ({ target, label, suffix = '', prefix = '', decimals = 0 }: { target: number, label: string, suffix?: string, prefix?: string, decimals?: number }) => {
  const { ref, count } = useAnimatedCounter(target, 2000, (val) => 
    decimals > 0 ? (val / Math.pow(10, decimals)).toFixed(1) : val.toLocaleString()
  );
  
  return (
    <div ref={ref} className="text-center p-8 bg-white rounded-3xl border border-gray-200 shadow-sm transition-transform hover:-translate-y-1 duration-300">
      <div className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-3 tracking-tighter">
        {prefix}{count}{suffix}
      </div>
      <div className="text-gray-500 font-medium tracking-wide uppercase text-sm">
        {label}
      </div>
    </div>
  );
};

export default function Impact() {
  const comparison = [
    { before: "Limited mobility and range of motion", after: "Full independent movement and rotation" },
    { before: "Heavy reliance on caregivers for daily tasks", after: "Complete autonomy in daily living" },
    { before: "Discomfort during prolonged wear", after: "Breathable socket designed for 18h+ wear" },
    { before: "High latency making grasping difficult", after: "Sub-10ms response for natural fluid motion" }
  ];

  return (
    <section id="impact" className="w-full bg-[#fafaf8] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6"
          >
            The difference confidence makes.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto"
          >
            We benchmarked traditional prosthetics against our AI-driven systems. The results speak for themselves in both clinical data and daily human experience.
          </motion.p>
        </div>

        {/* Before / After */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 md:p-12 mb-24 overflow-hidden relative"
        >
          {/* Vertical divider on desktop */}
          <div className="hidden md:block absolute left-1/2 top-12 bottom-12 w-px bg-gray-200 -translate-x-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 relative z-10">
            {/* Before */}
            <div className="flex flex-col gap-8">
              <h3 className="text-sm font-bold text-gray-400 tracking-wider uppercase mb-2">Traditional Standard</h3>
              <ul className="flex flex-col gap-8">
                {comparison.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <X className="text-gray-300 shrink-0 mt-0.5" size={20} />
                    <span className="text-base text-gray-500">{item.before}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* After */}
            <div className="flex flex-col gap-8">
              <h3 className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-2">Smart Prosthetics</h3>
              <ul className="flex flex-col gap-8">
                {comparison.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="text-blue-500 shrink-0 mt-0.5" size={20} />
                    <span className="text-base font-medium text-gray-900">{item.after}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Large Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <LargeStat target={50000} label="Units Deployed" suffix="+" />
          <LargeStat target={49} decimals={1} label="User Rating" suffix=" / 5" />
          <LargeStat target={180} label="Clinical Partners" suffix="+" />
        </motion.div>

      </div>
    </section>
  );
}
