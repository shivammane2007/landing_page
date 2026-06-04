"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AnimatedGenerateButton from "@/components/ui/animated-generate-button-shadcn-tailwind";

export default function FinalCTA() {
  return (
    <section className="w-full bg-[#f7f7f5] py-32 md:py-48">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "0px" }}
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
            <Link href="#" className="w-full sm:w-auto block">
              <AnimatedGenerateButton 
                labelIdle="Book a free fitting"
                labelActive="Processing..."
                className="w-full"
              />
            </Link>
            
            <Link href="/contact-sales" className="w-full sm:w-auto block">
              <AnimatedGenerateButton 
                labelIdle="Contact Sales"
                labelActive="Loading..."
                className="w-full"
              />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
