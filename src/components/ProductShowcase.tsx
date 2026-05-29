"use client";

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import CardSwap, { Card } from './CardSwap';

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
    <section id="products" className="w-full bg-[#f0f0ee] py-24 md:py-32 overflow-hidden">
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

        <div className="flex justify-center items-center relative w-full h-[600px] md:h-[700px]">
          <CardSwap
            width="100%"
            height="100%"
            cardDistance={40}
            verticalDistance={40}
            delay={4000}
            pauseOnHover={true}
          >
            {products.map((p) => (
              <Card 
                key={p.title} 
                style={{ maxWidth: '450px', maxHeight: '550px' }}
                className="w-[90vw] md:w-[450px] flex flex-col overflow-hidden transition-shadow hover:shadow-xl cursor-pointer bg-white"
              >
                <div className="relative h-[240px] overflow-hidden bg-gray-50 flex items-center justify-center p-8 shrink-0 border-b border-gray-100">
                  <div className="w-full h-full relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex flex-col items-center justify-center shadow-inner transition-transform duration-700 group-hover:scale-[1.03]">
                      <span className="text-gray-400 font-medium tracking-widest uppercase text-xs mb-2">Render</span>
                      <div className="w-24 h-24 rounded-full border-4 border-gray-100 bg-white/50 shadow-sm" />
                    </div>
                  </div>
                </div>
                <div className="p-8 md:p-10 flex flex-col flex-grow bg-white">
                  <h3 className="font-semibold text-gray-900 text-2xl mb-2 tracking-tight">{p.title}</h3>
                  <h4 className="text-blue-500 font-medium text-sm mb-4">{p.desc}</h4>
                  <p className="text-gray-600 text-sm mb-8 flex-grow leading-relaxed">{p.longDesc}</p>
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
              </Card>
            ))}
          </CardSwap>
        </div>

      </div>
    </section>
  );
}
