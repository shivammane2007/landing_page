"use client";

import { motion } from 'framer-motion';
import { FeatureCarousel, type ImageSet } from "@/components/ui/animated-feature-carousel";

import Globe from "@/components/ui/globe";

export default function Technology() {
  const images: ImageSet = {
      alt: "Bionic Technology",
      step1img1: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
      step1img2: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
      step2img1: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80",
      step2img2: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&q=80",
      step3img: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&q=80",
      step4img: "https://images.unsplash.com/photo-1535378273068-9bb67d5beacd?w=800&q=80",
  };

  return (
    <section id="technology" className="w-full bg-[#f7f7f5] py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight leading-tight"
          >
            Intelligence at the edge.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-lg max-w-2xl leading-relaxed"
          >
            Not just hardware — an intelligent system that learns, adapts, and improves. Our proprietary algorithms capture electrical impulses, translating intent into precise physical motion with near-zero latency.
          </motion.p>
        </div>

        <FeatureCarousel image={images}>
          <div className="absolute right-4 md:right-10 top-4 md:top-10 hidden md:block z-30 pointer-events-none scale-[0.65] xl:scale-75 origin-top-right">
            <Globe />
          </div>
        </FeatureCarousel>
        
      </div>
    </section>
  );
}
