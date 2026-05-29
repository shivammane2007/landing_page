"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="w-full bg-[#f7f7f5] py-32 md:py-48">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-center text-center"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tight leading-[1.1]">
            Ready to reclaim<br />your movement?
          </h2>
          
          <p className="text-gray-600 text-xl md:text-2xl mb-14 max-w-2xl mx-auto leading-relaxed">
            Take the first step towards independence with our advanced smart prosthetics. Schedule a free consultation today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
            <Link 
              href="#" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-semibold text-white bg-blue-600 rounded-full px-8 py-4 hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 group"
            >
              Book a free fitting
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                <ArrowRight size={18} />
              </span>
            </Link>
            
            <Link 
              href="#" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-semibold text-gray-900 bg-white border border-gray-300 rounded-full px-8 py-4 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
            >
              Contact Sales
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
