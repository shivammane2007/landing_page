"use client";

import { motion } from 'framer-motion';
import { Brain, Hand, Smartphone, Battery, Feather, RefreshCw, Activity, ShieldCheck, Bluetooth } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    className="bg-white rounded-2xl p-8 border border-gray-200 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
  >
    <div className="bg-[#f0f0ee] rounded-xl p-3 w-fit mb-6 text-gray-700">
      <Icon size={24} />
    </div>
    <h3 className="text-gray-900 font-semibold text-lg mb-3 tracking-tight">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

export default function Features() {
  const features = [
    { icon: Brain, title: "AI Motion Tracking", desc: "Reads muscle signals in real time with sub-10ms response, making latency virtually imperceptible." },
    { icon: Hand, title: "Gesture Recognition", desc: "Learns your specific gripping patterns and automatically adapts to your daily routines and habits." },
    { icon: Smartphone, title: "Mobile App Control", desc: "Fine-tune grip modes, check calibration, and receive diagnostic alerts straight from your phone." },
    { icon: Battery, title: "18-Hour Battery Life", desc: "A high-density core ensures up to 18 hours on a single charge for all-day confidence." },
    { icon: Feather, title: "Carbon-Fiber Build", desc: "Constructed with aerospace-grade materials. Strong as steel, yet light enough to wear effortlessly." },
    { icon: RefreshCw, title: "Real-time Calibration", desc: "Continuously refines performance throughout the day, adjusting to muscle fatigue and sweat." },
    { icon: Activity, title: "Haptic Feedback", desc: "Subtle vibrations let you physically feel when you've made contact with an object, restoring a sense of touch." },
    { icon: ShieldCheck, title: "Medical Grade", desc: "ISO certified and FDA cleared. Built to the highest clinical safety standards available globally." },
    { icon: Bluetooth, title: "OTA Updates", desc: "Your prosthetic gets smarter over time. New firmware and capabilities are delivered wirelessly." }
  ];

  return (
    <section id="features" className="w-full bg-[#fafaf8] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 md:mb-24 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6"
          >
            Technology that moves with you.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-lg"
          >
            A perfect synergy of biomechanics and edge computing. We packed unprecedented computational power into an impossibly small, lightweight form factor.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((f, i) => (
            <FeatureCard key={f.title} icon={f.icon} title={f.title} desc={f.desc} delay={i * 0.05} />
          ))}
        </div>

      </div>
    </section>
  );
}
