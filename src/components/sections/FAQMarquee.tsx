"use client";

import { UserCheck, Activity, ShieldCheck, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Marquee } from "@/components/ui/marquee";
import DotPattern from "@/components/ui/dot-pattern-1";

const marqueeData = [
  "How long does the battery last?",
  "Can I swim with the Sports Edition?",
  "Is it covered by my insurance?",
  "How natural does the grip feel?",
  "Does it require any surgery?",
  "How do I control individual fingers?",
  "What happens if it breaks?",
  "Is the arm heavy to wear all day?",
  "Can it withstand sweat and heat?",
  "How long is the warranty period?",
  "Do I need a special custom socket?",
  "Can I update the firmware myself?",
];

const features = [
  {
    description:
      "No jargon, no overcomplication — just clear, step-by-step guidance to fit and use your new limb confidently from day one.",
    icon: UserCheck,
    title: "We make things simple",
  },
  {
    description:
      "Every design we engineer is tailored to help you reclaim movement faster, easier, and with less cognitive strain.",
    icon: Activity,
    title: "We focus on real results",
  },
  {
    description:
      "With years of hands-on experience and rigorous clinical trials, we bring proven biomechanical solutions to you.",
    icon: ShieldCheck,
    title: "We know what works",
  },
  {
    description:
      "From your first consultation to daily use years down the line, we provide ongoing support, not just a one-time fitting.",
    icon: Heart,
    title: "With you all the way",
  },
];

export default function FAQMarquee() {
  const m1 = marqueeData.slice(0, marqueeData.length / 3);
  const m2 = marqueeData.slice(
    marqueeData.length / 3,
    (marqueeData.length / 3) * 2,
  );
  const m3 = marqueeData.slice((marqueeData.length / 3) * 2);

  return (
    <section id="support" className="relative bg-[#fafaf8] pt-20 sm:pt-32 text-gray-900 border-t border-gray-200">
      <div className="mx-auto max-w-full">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center space-y-6 px-5 text-center md:px-10 mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-2">Support & FAQ</p>
          <h2 className="max-w-3xl font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            Removing the roadblocks to your mobility.
          </h2>
          <p className="max-w-xl text-base md:text-lg text-gray-500 leading-relaxed">
            It's easy to get lost in a sea of medical advice, conflicting opinions, and
            endless options. We filter out the noise, focus on what truly
            matters, and give you the kind of clarity that lets you reclaim your life.
          </p>
          
        </div>
          
        <div className="relative w-full overflow-hidden pb-16">
          <div className="absolute left-0 top-0 bottom-0 z-10 w-24 md:w-40 bg-gradient-to-r from-[#fafaf8] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 z-10 w-24 md:w-40 bg-gradient-to-l from-[#fafaf8] to-transparent pointer-events-none" />

          <div className="flex w-full flex-col">
            <Marquee className="[--duration:45s] [--gap:1rem]" repeat={4} pauseOnHover>
              {m1.map((q) => (
                <Badge
                  className="rounded-full border-gray-200 bg-white px-4 py-2 text-gray-600 shadow-sm font-medium"
                  key={q}
                  size="lg"
                  variant="outline"
                >
                  {q}
                </Badge>
              ))}
            </Marquee>

            <Marquee
              className="[--duration:50s] [--gap:1rem]"
              repeat={4}
              reverse
              pauseOnHover
            >
              {m2.map((q) => (
                <Badge
                  className="rounded-full border-gray-200 bg-white px-4 py-2 text-gray-600 shadow-sm font-medium"
                  key={q}
                  size="lg"
                  variant="outline"
                >
                  {q}
                </Badge>
              ))}
            </Marquee>

            <Marquee className="[--duration:42s] [--gap:1rem]" repeat={4} pauseOnHover>
              {m3.map((q) => (
                <Badge
                  className="rounded-full border-gray-200 bg-white px-4 py-2 text-gray-600 shadow-sm font-medium"
                  key={q}
                  size="lg"
                  variant="outline"
                >
                  {q}
                </Badge>
              ))}
            </Marquee>
          </div>
        </div>

        <div className="relative mx-4 sm:mx-8 lg:mx-12 border border-gray-200 shadow-sm rounded-2xl transition-all duration-300 hover:shadow-md hover:-translate-y-1 bg-[#fafaf8]">
          <DotPattern width={5} height={5} className="fill-gray-200 md:fill-gray-200 rounded-2xl" />


          <div className="relative z-20 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4 bg-white/95 rounded-[calc(1rem-1px)] overflow-hidden">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  className="flex flex-col gap-5 px-6 py-12 lg:px-8 lg:py-16 hover:bg-gray-50 transition-colors"
                  key={feature.title}
                >
                  <div className="bg-[#f0f0ee] rounded-xl p-3 w-fit text-gray-700">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex flex-col gap-3 pt-6 lg:pt-10">
                    <h3 className="font-semibold text-xl tracking-tight text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="leading-relaxed text-gray-500 text-sm">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
