"use client";

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import AnimatedGenerateButton from './ui/animated-generate-button-shadcn-tailwind';
import BorderGlow from './ui/BorderGlow';

const CaseStudyCard = ({ title, story, tag, delay, image }: { title: string, story: string, tag: string, delay: number, image: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "0px" }}
    transition={{ delay, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    className="h-full"
  >
    <BorderGlow 
      backgroundColor="#ffffff"
      borderRadius={24}
      className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-md h-full"
    >
      <div className="flex flex-col h-full rounded-[24px] overflow-hidden">
        <div className="relative h-60 md:h-72 bg-gray-200 overflow-hidden flex items-center justify-center shrink-0">
          <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 z-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6 z-10 transition-transform duration-700 group-hover:scale-[1.03]">
            <div className="bg-white/90 backdrop-blur-sm text-gray-900 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase shadow-sm">
              {tag}
            </div>
          </div>
        </div>
        
        <div className="p-8 md:p-10 flex flex-col flex-grow">
      <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight tracking-tight">
        {title}
      </h3>
      <p className="text-gray-600 mb-8 flex-grow leading-relaxed text-base">
        {story}
      </p>
      <div className="w-fit">
        <Link href="#" className="inline-block">
          <AnimatedGenerateButton 
            labelIdle="Read full story"
            labelActive="Loading..."
          />
        </Link>
      </div>
      </div>
      </div>
    </BorderGlow>
  </motion.div>
);

export default function CaseStudies() {
  const caseStudies = [
    {
      title: "Arjun ran his first marathon at 32 — three years after losing his arm.",
      story: "With the Sports Edition's lightweight carbon fiber build and custom socket fit, Arjun regained his balance and running form completely, shaving 40 minutes off his initial training times. The sweat-resistant socket kept him comfortable through 26.2 miles.",
      tag: "Sports Edition",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/BSK_CSOB_MARATON046_%2833791445325%29.jpg/960px-BSK_CSOB_MARATON046_%2833791445325%29.jpg"
    },
    {
      title: "Maya returned to surgery six months after her accident.",
      story: "The precision control of the Smart Hand allowed Maya to hold surgical instruments with the exact dexterity required for her profession. The haptic feedback system gave her the delicate touch needed in the operating room.",
      tag: "Professional Use",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Cardiac_surgery_operating_room.jpg/960px-Cardiac_surgery_operating_room.jpg"
    },
    {
      title: "At 68, Ramesh makes his own breakfast every morning.",
      story: "The Everyday Edition's intuitive adaptive learning meant Ramesh didn't need months of training. It calibrated to his baseline muscle signals within 48 hours, allowing him to seamlessly grip cups, utensils, and plates.",
      tag: "Everyday Edition",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Breakfast_at_the_Black_Bear_Diner.jpg/960px-Breakfast_at_the_Black_Bear_Diner.jpg"
    }
  ];

  return (
    <section className="w-full bg-[#f7f7f5] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight"
          >
            Real people. Real transformations.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Behind every piece of technology is a human story. See how our patients have reclaimed their independence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((cs, i) => (
            <CaseStudyCard key={i} title={cs.title} story={cs.story} tag={cs.tag} image={cs.image} delay={i * 0.1} />
          ))}
        </div>

      </div>
    </section>
  );
}
