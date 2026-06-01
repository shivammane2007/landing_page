"use client";

import Link from "next/link";
import { ArrowUp, Mail, Send, AtSign, Globe, Share2, Heart } from "lucide-react";
import ButtonSocialIconDemo from "./ui/social-icon";

function handleScrollTop() {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
}

const ScrollToTop = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center rounded-full border border-gray-200 bg-white shadow-sm">
        <button type="button" onClick={handleScrollTop} className="p-2.5 hover:bg-gray-50 rounded-full transition-colors" aria-label="Scroll to top">
          <ArrowUp className="h-4 w-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

const navigation = {
  categories: [
    {
      id: "prosthetics",
      name: "Bionic",
      sections: [
        {
          id: "product",
          name: "Product",
          items: [
            { name: "Smart Hand", href: "#" },
            { name: "Smart Arm", href: "#" },
            { name: "Sports Edition", href: "#" },
            { name: "Pricing", href: "#pricing" },
          ],
        },
        {
          id: "company",
          name: "Company",
          items: [
            { name: "About Us", href: "#" },
            { name: "Story", href: "#" },
            { name: "Careers", href: "#" },
            { name: "Investors", href: "#" },
          ],
        },
        {
          id: "resources",
          name: "Resources",
          items: [
            { name: "Blog", href: "#" },
            { name: "Research", href: "#" },
            { name: "Clinical Studies", href: "#" },
            { name: "API", href: "#" },
          ],
        },
        {
          id: "support",
          name: "Support",
          items: [
            { name: "Contact", href: "/contact-sales" },
            { name: "Consultation", href: "/contact-sales" },
            { name: "Service Centers", href: "#" },
            { name: "Warranty", href: "#" },
          ],
        },
      ],
    },
  ],
};

const Underline = `hover:-translate-y-1 border border-gray-200 rounded-xl p-2.5 transition-transform bg-white text-gray-500 hover:text-gray-900 shadow-sm`;

const Logo = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 256 256"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="rgb(84, 84, 84)"
      d="M 160 88 L 194 34 L 216 0 L 256 0 L 256 40 L 221.5 93.5 L 200 128 L 256 128 L 256 256 L 96 256 L 96 168 L 64.246 220 L 40 256 L 0 256 L 0 216 L 34 162 L 56 128 L 0 128 L 0 0 L 160 0 Z"
    />
  </svg>
);

export default function Footer() {
  return (
    <footer className="border-gray-200 px-4 mx-auto w-full border-t bg-[#f0f0ee]">
      <div className="relative mx-auto grid max-w-7xl items-center justify-center gap-6 p-10 pb-0 md:flex">
        <Link href="/">
          <p className="flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 p-4 hover:scale-105 transition-transform duration-300">
            <Logo />
          </p>
        </Link>
        <p className="bg-transparent text-center text-sm leading-relaxed text-gray-500 md:text-left max-w-2xl">
          Welcome to Bionic, where engineering meets human resilience. We don't just build hardware; we engineer extensions of the human body. Every prosthetic is crafted for comfort, pinpoint control, and uncompromising confidence. Reclaim your movement with intuitive technology designed for real life.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="border-b border-gray-200"> </div>
        <div className="py-10">
          {navigation.categories.map((category) => (
            <div
              key={category.name}
              className="grid grid-cols-2 flex-row justify-between gap-8 leading-6 md:flex"
            >
              {category.sections.map((section) => (
                <div key={section.name} className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm tracking-wide uppercase mb-4">{section.name}</h4>
                  <ul
                    role="list"
                    className="flex flex-col space-y-3"
                  >
                    {section.items.map((item) => (
                      <li key={item.name} className="flow-root">
                        <Link
                          href={item.href}
                          className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors duration-200"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="border-b border-gray-200"> </div>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-6 gap-y-6 mb-10">
        <div className="flex flex-wrap items-center justify-center gap-4 px-6">
          <ButtonSocialIconDemo />
        </div>
        <ScrollToTop />
      </div>

    </footer>
  );
}
