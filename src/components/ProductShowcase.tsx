"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const ProductCard = ({ title, desc, delay = 0, longDesc }: { title: string, desc: string, delay?: number, longDesc: string }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Calculate position relative to center of card
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group bg-white rounded-3xl overflow-hidden border border-gray-200 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative h-72 overflow-hidden bg-gray-50 flex items-center justify-center p-8">
        <motion.div 
          className="w-full h-full relative"
          animate={{ x: mousePos.x, y: mousePos.y }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
        >
          {/* Subtle geometric or image placeholder for Apple style vibe */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl group-hover:scale-[1.03] transition-transform duration-700 flex flex-col items-center justify-center shadow-inner">
            <span className="text-gray-400 font-medium tracking-widest uppercase text-xs mb-2">Render</span>
            <div className="w-24 h-24 rounded-full border-4 border-gray-100 bg-white/50 shadow-sm" />
          </div>
        </motion.div>
      </div>
      <div className="p-8 md:p-10 flex flex-col flex-grow">
        <h3 className="font-semibold text-gray-900 text-2xl mb-2 tracking-tight">{title}</h3>
        <h4 className="text-blue-500 font-medium text-sm mb-4">{desc}</h4>
        <p className="text-gray-600 text-sm mb-8 flex-grow leading-relaxed">{longDesc}</p>
        <Link 
          href="#" 
          className="inline-flex items-center gap-1 text-gray-900 hover:text-blue-600 font-semibold text-sm transition-colors w-fit group/link"
        >
          Learn more 
          <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-1">
            <ArrowRight size={16} />
          </span>
        </Link>
      </div>
    </motion.div>
  );
};

export default function ProductShowcase() {
  const products = [
    { 
      title: "Smart Hand", 
      desc: "Intuitive grip. Natural feel.",
      longDesc: "Engineered with 5 independent micro-motors and individual finger articulation, allowing you to seamlessly grip objects of any shape with minimal cognitive effort. Perfect for everyday tasks."
    },
    { 
      title: "Smart Arm", 
      desc: "Full-range movement. Adaptive control.",
      longDesc: "A complete above-elbow solution. Integrated elbow flexion and wrist rotation governed by adaptive AI that anticipates your movement intentions based on shoulder posture and EMG signals."
    },
    { 
      title: "Sports Edition", 
      desc: "Built for athletes. Engineered for impact.",
      longDesc: "Reinforced carbon-fiber chassis and a specialized dynamic shock-absorption system. IP68 waterproof rating ensures you never have to hold back during swimming, climbing, or heavy lifting."
    },
    { 
      title: "Everyday Edition", 
      desc: "Lightweight. Comfortable. Always ready.",
      longDesc: "Our most accessible model designed for comfort over 18+ hours of continuous wear. Features breathable socket materials and a streamlined profile that fits perfectly under clothing."
    }
  ];

  return (
    <section id="products" className="w-full bg-[#f0f0ee] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16 md:mb-20 text-center max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight"
          >
            Designed for real life.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-lg md:text-xl leading-relaxed"
          >
            We don't just build hardware. We engineer extensions of the human body. Every prosthetic is crafted for comfort, pinpoint control, and uncompromising confidence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {products.map((p, i) => (
            <ProductCard key={p.title} title={p.title} desc={p.desc} longDesc={p.longDesc} delay={i * 0.1} />
          ))}
        </div>

      </div>
    </section>
  );
}
