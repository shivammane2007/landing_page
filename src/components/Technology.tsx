"use client";

import { motion } from 'framer-motion';
import { Eye, Layers, TrendingUp, Activity, Cpu, Network } from 'lucide-react';

const TechCard = ({ icon: Icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    className="bg-white rounded-2xl p-6 border border-gray-200 transition-transform duration-300 hover:-translate-y-1 hover:shadow-sm flex flex-col items-start"
  >
    <div className="bg-gray-50 rounded-lg p-2 mb-4">
      <Icon className="text-gray-900" size={20} />
    </div>
    <h3 className="text-gray-900 font-semibold text-base mb-2">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

export default function Technology() {
  const techStack = [
    { icon: Eye, title: "Computer Vision", desc: "Optional camera modules pre-analyze objects before grasp." },
    { icon: Layers, title: "Sensor Fusion", desc: "Combines IMU, EMG, and force sensors for total awareness." },
    { icon: TrendingUp, title: "Adaptive Learning", desc: "Machine learning models run locally to map your habits." },
    { icon: Activity, title: "Predictive Motion", desc: "Anticipates wrist rotation based on shoulder dynamics." },
    { icon: Cpu, title: "Edge Processing", desc: "Dedicated silicon processes 10,000 data points per second." },
    { icon: Network, title: "Neural Mapping", desc: "High-density sensor arrays read the faintest muscle twitches." }
  ];

  return (
    <section id="technology" className="w-full bg-[#f7f7f5] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          
          {/* Left Column */}
          <div className="flex flex-col lg:col-span-5">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight leading-tight"
            >
              Intelligence<br />at the edge.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 text-lg mb-10 leading-relaxed"
            >
              Not just hardware — an intelligent system that learns, adapts, and improves. Our proprietary EMG signal processing algorithms capture the faintest electrical impulses from your residual limb, translating intent into precise physical motion with near-zero latency.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-6 text-gray-600 leading-relaxed"
            >
              <div className="pl-6 border-l-2 border-gray-300">
                <p className="text-xl font-medium text-gray-900 mb-2 italic">
                  "It's the first time I've felt like the prosthetic is a part of me, rather than just a tool I operate."
                </p>
                <span className="text-sm font-semibold uppercase tracking-wider text-gray-400">Clinical Trial Patient #42</span>
              </div>
              
              <p>
                Through adaptive neural networks, the system learns your unique movement patterns. Every time you reach, grasp, or point, the AI refines its internal model. Combined with seamless OTA updates, your prosthetic actually gets smarter the longer you wear it.
              </p>
            </motion.div>
          </div>
          
          {/* Right Column Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {techStack.map((tech, i) => (
              <TechCard key={tech.title} icon={tech.icon} title={tech.title} desc={tech.desc} delay={0.1 * i} />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
