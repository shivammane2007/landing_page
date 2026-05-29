import Link from 'next/link';
import { Users, MessageCircle, Image as ImageIcon, Video } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    Product: [
      { name: "Smart Hand", href: "#" },
      { name: "Smart Arm", href: "#" },
      { name: "Sports Edition", href: "#" },
      { name: "Everyday Edition", href: "#" },
      { name: "Pricing", href: "#pricing" }
    ],
    Company: [
      { name: "About Us", href: "#" },
      { name: "Story", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
      { name: "Investors", href: "#" }
    ],
    Resources: [
      { name: "Blog", href: "#" },
      { name: "Research", href: "#" },
      { name: "Clinical Studies", href: "#" },
      { name: "Support Docs", href: "#" },
      { name: "API", href: "#" }
    ],
    Support: [
      { name: "Contact", href: "#" },
      { name: "Book Consultation", href: "#" },
      { name: "Service Centers", href: "#" },
      { name: "Warranty Claims", href: "#" }
    ],
    Legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "Compliance", href: "#" }
    ]
  };

  return (
    <footer className="w-full bg-[#f0f0ee] pt-24 pb-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-20">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col gap-6">
              <h4 className="font-semibold text-gray-900 text-sm tracking-wide uppercase">{category}</h4>
              <ul className="flex flex-col gap-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm font-medium text-gray-500">
            © {new Date().getFullYear()} AI Prosthetics Inc. All rights reserved.
          </p>
          
          <p className="text-sm text-gray-400">
            Made with care for people who keep fighting.
          </p>
          
          <div className="flex items-center gap-6 text-gray-400">
            <Link href="#" className="hover:text-blue-600 transition-colors" aria-label="LinkedIn">
              <Users size={20} />
            </Link>
            <Link href="#" className="hover:text-blue-600 transition-colors" aria-label="Twitter">
              <MessageCircle size={20} />
            </Link>
            <Link href="#" className="hover:text-blue-600 transition-colors" aria-label="Instagram">
              <ImageIcon size={20} />
            </Link>
            <Link href="#" className="hover:text-blue-600 transition-colors" aria-label="YouTube">
              <Video size={20} />
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
