"use client";

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import AnimatedGenerateButton from './ui/animated-generate-button-shadcn-tailwind';
import BorderGlow from './ui/BorderGlow';

const PricingCard = ({ plan, delay }: { plan: any, delay: number }) => {
  const isHighlighted = plan.highlighted;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`h-full ${
        isHighlighted 
          ? 'z-10 scale-[1.02] md:scale-105' 
          : ''
      }`}
    >
      <BorderGlow
        backgroundColor="#ffffff"
        borderRadius={24}
        className={`relative p-8 transition-transform duration-300 hover:-translate-y-2 flex flex-col h-full ${
          isHighlighted 
            ? 'border-2 border-gray-900 shadow-xl' 
            : 'border border-gray-200 shadow-sm'
        }`}
      >
        {isHighlighted && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white rounded-full px-5 py-1.5 text-xs font-bold tracking-widest uppercase whitespace-nowrap">
            Most Popular
          </div>
        )}
        
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
        <p className="text-gray-500 text-sm mb-6 h-10">{plan.for}</p>
        
        <div className="mb-8 pb-8 border-b border-gray-100">
          <span className="text-5xl font-extrabold text-gray-900 tracking-tight">{plan.price}</span>
        </div>
        
        <ul className="flex flex-col gap-5 mb-10 flex-grow">
          {plan.features.map((feature: string, i: number) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-700 leading-snug">
              <CheckCircle2 className="text-blue-600 shrink-0 mt-0.5" size={18} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <div className="mt-auto w-full flex justify-center">
          <Link href="#" className="w-full block">
            <AnimatedGenerateButton 
              labelIdle={plan.cta}
              labelActive="Processing..."
              className="w-full"
            />
          </Link>
        </div>
      </BorderGlow>
    </motion.div>
  );
};

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$1,799",
      for: "Individuals seeking essential daily mobility",
      features: [
        "Smart Hand (Everyday Edition)",
        "1-year comprehensive warranty",
        "Mobile app standard access",
        "Standard business hours support",
        "Initial clinical fitting & calibration"
      ],
      cta: "Get started",
      highlighted: false
    },
    {
      name: "Professional",
      price: "$2,999",
      for: "Active users requiring maximum durability",
      features: [
        "Choice of Smart Hand or Arm",
        "2-year comprehensive warranty",
        "Priority 24/7 technical support",
        "Advanced AI multi-grip calibration",
        "Sports & high-impact accessories pack",
        "Free annual clinical check-up"
      ],
      cta: "Choose Professional",
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      for: "Hospitals, rehab centers, and institutions",
      features: [
        "Volume licensing and deployment",
        "Dedicated clinical liaison",
        "Full API & Data access",
        "On-site staff training",
        "Custom branding options",
        "SLA guarantee (4-hour response)"
      ],
      cta: "Contact Sales",
      highlighted: false
    }
  ];

  return (
    <section id="pricing" className="w-full bg-[#f0f0ee] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight"
          >
            Transparent pricing. No surprises.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto"
          >
            We believe advanced prosthetics should be accessible. Flexible plans built for individuals and healthcare providers alike.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16 items-center">
          {plans.map((plan, i) => (
            <div key={plan.name} className={`${plan.highlighted ? 'order-1 md:order-2' : 'order-2 md:order-1'}`}>
              <PricingCard plan={plan} delay={i * 0.1} />
            </div>
          ))}
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center text-sm text-gray-500 font-medium"
        >
          All plans include free initial clinical consultation. Financing and insurance processing options are available.
        </motion.p>

      </div>
    </section>
  );
}
