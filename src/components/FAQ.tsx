"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

const FAQItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onClick}
        aria-expanded={isOpen}
        className="flex justify-between items-center w-full py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg"
      >
        <span className={`text-lg md:text-xl transition-colors duration-200 ${isOpen ? 'font-bold text-gray-900' : 'font-medium text-gray-700 hover:text-gray-900'}`}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-gray-400 shrink-0 ml-6"
        >
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-gray-600 leading-relaxed pr-10 text-base md:text-lg">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How long does the clinical fitting process take?",
      answer: "The initial fitting process typically takes 1-2 hours. Our clinicians utilize sub-millimeter 3D scanning to map your residual limb, analyze baseline muscle signals, and tailor the socket for maximum comfort."
    },
    {
      question: "Is the prosthetic waterproof or water-resistant?",
      answer: "The Everyday Edition is IP67 water-resistant, meaning it can withstand rain and accidental splashes. The Sports Edition is fully waterproof (IP68) up to 2 meters for 30 minutes, allowing for swimming and rigorous outdoor activities."
    },
    {
      question: "What is the battery life, and how long does charging take?",
      answer: "Our smart prosthetics feature an 18-hour battery life under normal use. A full charge from 0 to 100% takes approximately 90 minutes using the included rapid magnetic charger."
    },
    {
      question: "Is 24/7 support really available, and how do I access it?",
      answer: "Yes, 24/7 support is available through our dedicated mobile app. You can instantly chat with technical support for firmware issues or schedule a telehealth clinical review for socket comfort adjustments."
    },
    {
      question: "Are financing or EMI options available?",
      answer: "Absolutely. We partner with major healthcare financing networks to offer flexible EMI plans spread across 12, 24, or 36 months. Our patient advocacy team will also assist you with filing claims to maximize your insurance benefits."
    },
    {
      question: "What warranty and repair coverage is included?",
      answer: "The Starter plan includes a 1-year comprehensive warranty, while Professional and Enterprise plans include 2 years. This covers all mechanical parts, motors, sensors, and software."
    },
    {
      question: "How long does delivery take after ordering?",
      answer: "Because each socket is custom-manufactured to your precise anatomy, final assembly and delivery typically take between 10 to 14 business days from your initial scanning appointment."
    }
  ];

  return (
    <section id="faq" className="w-full bg-[#fafaf8] py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6"
          >
            Frequently asked questions.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-lg md:text-xl"
          >
            Everything you need to know about our technology, support, and process.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-white rounded-3xl p-6 md:p-12 border border-gray-200 shadow-sm"
        >
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
