"use client";

import FlowingMenu from './FlowingMenu';

const menuItems = [
  {
    link: '#products',
    text: 'Smart Hand',
    image: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=600&h=400&fit=crop&auto=format'
  },
  {
    link: '#products',
    text: 'Smart Arm',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop&auto=format'
  },
  {
    link: '#features',
    text: 'AI Control',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&h=400&fit=crop&auto=format'
  },
  {
    link: '#pricing',
    text: 'Get Yours',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop&auto=format'
  }
];

export default function ExploreMenu() {
  return (
    <section className="w-full bg-[#f7f7f5] border-t border-gray-200">
      {/* Section header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-3">Explore</p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
          Our full line.
        </h2>
      </div>

      {/* FlowingMenu */}
      <div style={{ height: '400px', position: 'relative' }}>
        <FlowingMenu
          items={menuItems}
          speed={18}
          textColor="#1a1a1a"
          bgColor="#f7f7f5"
          marqueeBgColor="#1a1a1a"
          marqueeTextColor="#f7f7f5"
          borderColor="#e5e7eb"
        />
      </div>
    </section>
  );
}
