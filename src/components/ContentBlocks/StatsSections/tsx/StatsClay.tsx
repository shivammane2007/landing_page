"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, Users, Heart, Monitor, LucideIcon } from "lucide-react";
import { Counter } from "@/src/lib/utils/counter";

interface StatItem {
    value: string;
    label: string;
    icon: LucideIcon;
}

interface StatsClayProps {
    stats?: StatItem[];
    title?: string;
    subtitle?: string;
    accentColor?: string;
}

const parseNumericValue = (value: string): { number: number; suffix: string } => {
    const match = value.match(/^(\d+)(.*)/);
    if (match) {
        return { number: parseInt(match[1], 10), suffix: match[2] };
    }
    return { number: 0, suffix: value };
};

const StatsClay: React.FC<StatsClayProps> = ({
    stats = [
        { value: "700+", label: "Premium Components", icon: Layers },
        { value: "10K+", label: "Active Developers", icon: Users },
        { value: "99%", label: "Dev Satisfaction", icon: Heart },
        { value: "2", label: "Platforms Supported", icon: Monitor },
    ],
    title = "Built for Scale, Designed for Craft",
    subtitle = "The numbers behind Uilora's growing ecosystem of premium UI components.",
    accentColor = "#5227FF",
}) => {
    const sectionBg = "#EEEEF0";

    const cardVariants: any = {
        hidden: { opacity: 0, y: 40 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        }),
    };

    return (
        <div
            className="relative w-full min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden"
            style={{ backgroundColor: sectionBg }}
        >

            <div className="max-w-6xl w-full">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase mb-5"
                        style={{
                            backgroundColor: sectionBg,
                            color: accentColor,
                            boxShadow: `3px 3px 6px #d1d5db, -3px -3px 6px #ffffff`,
                        }}
                    >
                        Uilora Stats
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold text-gray-800 mb-4"
                    >
                        {title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-base md:text-lg text-gray-500 max-w-xl mx-auto"
                    >
                        {subtitle}
                    </motion.p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        const { number, suffix } = parseNumericValue(stat.value);

                        return (
                            <motion.div
                                key={i}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-60px" }}
                                variants={cardVariants}
                                whileHover={{
                                    y: -10,
                                    boxShadow: `12px 12px 24px #c8cacc, -12px -12px 24px #ffffff`,
                                    transition: { type: "spring", stiffness: 300, damping: 20 },
                                }}
                                className="group rounded-[2rem] flex flex-col items-center justify-center p-10 text-center cursor-default"
                                style={{
                                    backgroundColor: sectionBg,
                                    boxShadow: `8px 8px 16px #d1d5db, -8px -8px 16px #ffffff`,
                                }}
                            >
                                {/* Icon Circle */}
                                <motion.div
                                    className="mb-5 w-14 h-14 rounded-full flex items-center justify-center transition-shadow duration-300"
                                    style={{
                                        backgroundColor: sectionBg,
                                        boxShadow: `inset 4px 4px 8px #d1d5db, inset -4px -4px 8px #ffffff`,
                                    }}
                                    whileHover={{
                                        boxShadow: `inset 4px 4px 8px #d1d5db, inset -4px -4px 8px #ffffff, 0 0 20px ${accentColor}33`,
                                    }}
                                >
                                    <Icon
                                        size={24}
                                        style={{ color: accentColor }}
                                        strokeWidth={2}
                                    />
                                </motion.div>

                                {/* Number */}
                                <div
                                    className="text-5xl font-bold mb-2"
                                    style={{ color: accentColor }}
                                >
                                    <Counter to={number} suffix={suffix} />
                                </div>

                                {/* Label */}
                                <div className="text-sm font-medium text-gray-400">
                                    {stat.label}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default StatsClay;
