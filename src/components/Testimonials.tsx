"use client";

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import React, { useRef } from 'react';
import BorderGlow from './ui/BorderGlow';

const TestimonialCard = ({ testimonial }: { testimonial: any }) => (
  <BorderGlow
    backgroundColor="#ffffff"
    borderRadius={16}
    className="p-8 border border-gray-200 transition-transform duration-300 hover:-translate-y-1 h-full flex flex-col min-w-[300px] md:min-w-0 snap-center hover:shadow-sm"
  >
    <div className="flex gap-1 mb-6 text-yellow-500">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={16} fill="currentColor" />
      ))}
    </div>
    <p className="text-gray-700 italic leading-relaxed mb-8 flex-grow text-lg">
      "{testimonial.quote}"
    </p>
    <div className="flex items-center gap-4 mt-auto">
      <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg shrink-0">
        {testimonial.name.charAt(0)}
      </div>
      <div>
        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
        <p className="text-gray-500 text-sm">
          {testimonial.occupation}, {testimonial.location}
        </p>
      </div>
    </div>
  </BorderGlow>
);

export default function Testimonials() {
  const testimonials = [
    { quote: "It gave me back my independence. I can finally cook, type, and live my life without constantly asking for help.", name: "Priya", occupation: "Teacher", location: "Mumbai" },
    { quote: "The response time is incredible. I returned to competitive running much faster than my doctors ever predicted.", name: "James", occupation: "Athlete", location: "London" },
    { quote: "This is the most significant leap in prosthetic technology I've seen in my 20-year career. I recommend it to all my patients.", name: "Dr. Anita Sharma", occupation: "Prosthetist", location: "Delhi" },
    { quote: "I was worried about going back to the office, but the precision control let me return to my engineering work seamlessly.", name: "Rahul", occupation: "Engineer", location: "Bangalore" },
    { quote: "Simple things like holding my grandson's hand or pouring tea feel natural again. It's truly a blessing.", name: "Fatima", occupation: "Homemaker", location: "Dubai" },
    { quote: "I never thought I'd play the guitar again. The adaptive grip actually learns my chord shapes.", name: "Carlos", occupation: "Musician", location: "São Paulo" }
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="testimonials" className="w-full bg-[#f0f0ee] py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6"
          >
            Stories from people who never stopped moving.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-lg"
          >
            Join thousands of users who have reclaimed their mobility, independence, and confidence.
          </motion.p>
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ delay: i * 0.1 }}
          >
            <TestimonialCard testimonial={t} />
          </motion.div>
        ))}
      </div>

      {/* Mobile Horizontal Scroll */}
      <div 
        ref={scrollRef}
        className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-8 no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {testimonials.map((t) => (
          <TestimonialCard key={t.name} testimonial={t} />
        ))}
      </div>
    </section>
  );
}
