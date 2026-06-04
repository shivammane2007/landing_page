"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import BorderGlow from "@/components/ui/BorderGlow";

const menuItems = [
  { label: 'Story', path: '#story' },
  { label: 'Products', path: '#products' },
  { label: 'Features', path: '#features' },
  { label: 'Technology', path: '#technology' },
  { label: 'Testimonials', path: '#testimonials' },
  { label: 'Impact', path: '#impact' },
  { label: 'Pricing', path: '#pricing' },
  { label: 'FAQ', path: '#faq' },
  { label: 'Support', path: '#support' },
];

export default function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const filteredItems = menuItems.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Command Menu"
            className="relative w-full max-w-lg mx-4"
          >
            <BorderGlow
              backgroundColor="#ffffff"
              borderRadius={16}
              className="bg-white shadow-xl border border-gray-200 overflow-hidden"
            >
            <div className="flex items-center px-4 py-3 border-b border-gray-200">
              <Search className="text-gray-400 w-5 h-5 mr-3" />
              <input
                autoFocus
                className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-400 text-lg"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <button
                    key={item.path}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
                    onClick={() => {
                      setIsOpen(false);
                      router.push(item.path);
                    }}
                  >
                    {item.label}
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">No results found.</div>
              )}
            </div>
            
            <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-500 flex justify-between bg-gray-50">
              <span>Use arrows to navigate</span>
              <span>esc to close</span>
            </div>
            </BorderGlow>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
