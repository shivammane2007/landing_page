"use client";

import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';

const Step = ({ num, title, desc }: { num: number, title: string, desc: string }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "0px" }}
    className="relative pl-12 md:pl-16 py-8"
  >
    <div className="absolute left-0 top-8 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 z-10 bg-white border-2 border-gray-300 text-gray-600 shadow-sm">
      {num}
    </div>
    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 tracking-tight">
      {title}
    </h3>
    <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-xl">
      {desc}
    </p>
  </motion.div>
);

export default function HowItWorks() {
  const steps = [
    { title: "Clinical Consultation", desc: "Meet with our specialized clinical team to comprehensively assess your anatomical needs, daily lifestyle, and personal goals." },
    { title: "Anatomical Scanning", desc: "We utilize sub-millimeter 3D scanning technology to map your residual limb, ensuring a perfectly flush, comfortable custom socket." },
    { title: "Neural Calibration", desc: "Our proprietary AI software maps your specific muscle signals, learning the unique electrical patterns you generate when intending to move." },
    { title: "Guided Training", desc: "Work with our occupational therapists in guided sessions to help you master fine motor controls and complex gestures with your new prosthetic." },
    { title: "Lifelong Support", desc: "Enjoy ongoing access to our mobile app for remote calibration, firmware updates, and 24/7 direct communication with your clinical care team." }
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section className="w-full bg-[#f0f0ee] py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6"
          >
            From fitting to freedom.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-lg md:text-xl"
          >
            A streamlined, patient-first onboarding process.
          </motion.p>
        </div>

        <div className="relative ml-4 md:ml-10" ref={containerRef}>
          {/* Background Line */}
          <div className="absolute left-[15.5px] top-8 bottom-8 w-0.5 bg-gray-200" />
          
          {/* Animated Fill Line */}
          <motion.div 
            className="absolute left-[15.5px] top-8 bottom-8 w-0.5 bg-gray-900 origin-top"
            style={{ scaleY }}
          />

          <div className="flex flex-col">
            {steps.map((step, i) => (
              <Step 
                key={step.title} 
                num={i + 1} 
                title={step.title} 
                desc={step.desc} 
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
