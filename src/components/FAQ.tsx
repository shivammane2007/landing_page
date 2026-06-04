"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle } from "lucide-react";

interface FAQItem {
    q: string;
    a: string;
}

const ClayItem = ({ faq, isOpen, onClick, cardBgColor, cardTextColor, cardSubtextColor, iconColor, activeIconBgColor, activeIconColor, shadowLightColor, shadowDarkColor }: { faq: FAQItem, isOpen: boolean, onClick: () => void, cardBgColor: string, cardTextColor: string, cardSubtextColor: string, iconColor: string, activeIconBgColor: string, activeIconColor: string, shadowLightColor: string, shadowDarkColor: string }) => {
    return (
        <motion.div
            layout
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-6 md:p-8 rounded-[2rem] cursor-pointer transition-all duration-300"
            style={{
                backgroundColor: cardBgColor,
                boxShadow: isOpen
                    ? `inset 10px 10px 20px ${shadowDarkColor}, inset -10px -10px 20px ${shadowLightColor}`
                    : `10px 10px 20px ${shadowDarkColor}, -10px -10px 20px ${shadowLightColor}`,
            }}
        >
            <motion.div layout className="flex justify-between items-center font-bold text-lg md:text-xl" style={{ color: cardTextColor }}>
                {faq.q}
                <div className={`w-8 h-8 rounded-full flex shrink-0 ml-4 items-center justify-center transition-all duration-300`} style={{ backgroundColor: isOpen ? activeIconBgColor : "transparent", color: isOpen ? activeIconColor : iconColor }}>
                    <HelpCircle size={20} />
                </div>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="pt-4 font-medium leading-relaxed pr-10 text-base md:text-lg" style={{ color: cardSubtextColor }}>
                            {faq.a}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        { q: "How long does the clinical fitting process take?", a: "The initial fitting process typically takes 1-2 hours. Our clinicians utilize sub-millimeter 3D scanning to map your residual limb, analyze baseline muscle signals, and tailor the socket for maximum comfort." },
        { q: "Is the prosthetic waterproof or water-resistant?", a: "The Everyday Edition is IP67 water-resistant, meaning it can withstand rain and accidental splashes. The Sports Edition is fully waterproof (IP68) up to 2 meters for 30 minutes, allowing for swimming and rigorous outdoor activities." },
        { q: "What is the battery life, and how long does charging take?", a: "Our smart prosthetics feature an 18-hour battery life under normal use. A full charge from 0 to 100% takes approximately 90 minutes using the included rapid magnetic charger." },
        { q: "Is 24/7 support really available, and how do I access it?", a: "Yes, 24/7 support is available through our dedicated mobile app. You can instantly chat with technical support for firmware issues or schedule a telehealth clinical review for socket comfort adjustments." },
        { q: "Are financing or EMI options available?", a: "Absolutely. We partner with major healthcare financing networks to offer flexible EMI plans spread across 12, 24, or 36 months. Our patient advocacy team will also assist you with filing claims to maximize your insurance benefits." },
        { q: "What warranty and repair coverage is included?", a: "The Starter plan includes a 1-year comprehensive warranty, while Professional and Enterprise plans include 2 years. This covers all mechanical parts, motors, sensors, and software." },
        { q: "How long does delivery take after ordering?", a: "Because each socket is custom-manufactured to your precise anatomy, final assembly and delivery typically take between 10 to 14 business days from your initial scanning appointment." }
    ];

    const backgroundColor = "#fafaf8";
    const title = "Frequently asked questions.";
    const subtitle = "Everything you need to know about our technology, support, and process.";
    const titleColor = "#111827";
    const cardBgColor = "#fafaf8";
    const cardTextColor = "#111827";
    const cardSubtextColor = "#4b5563";
    const iconColor = "#9ca3af";
    const activeIconBgColor = "#111827";
    const activeIconColor = "#ffffff";
    const shadowLightColor = "#ffffff";
    const shadowDarkColor = "#e6e6e2"; 

    return (
        <section id="faq" className="w-full py-24 md:py-32 overflow-hidden flex flex-col items-center justify-center px-4" style={{ backgroundColor }}>
            <div className="max-w-4xl mx-auto w-full">
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "0px" }}
                        className="text-4xl md:text-5xl font-bold tracking-tight mb-6" 
                        style={{ color: titleColor }}
                    >
                        {title}
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "0px" }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl"
                        style={{ color: cardSubtextColor }}
                    >
                        {subtitle}
                    </motion.p>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px" }}
                    className="w-full space-y-6"
                >
                    {faqs.map((faq, i) => (
                        <ClayItem 
                            key={i} 
                            faq={faq} 
                            isOpen={openIndex === i}
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            cardBgColor={cardBgColor} 
                            cardTextColor={cardTextColor} 
                            cardSubtextColor={cardSubtextColor} 
                            iconColor={iconColor} 
                            activeIconBgColor={activeIconBgColor} 
                            activeIconColor={activeIconColor} 
                            shadowLightColor={shadowLightColor} 
                            shadowDarkColor={shadowDarkColor} 
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
