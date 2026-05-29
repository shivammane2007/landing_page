import React from 'react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#f0f0ee] flex flex-col justify-end">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4"
      />

      {/* Foreground content wrapper */}
      <div className="relative z-10 w-full pb-10 sm:pb-16 lg:pb-20 px-6 sm:px-12 md:px-20 lg:px-28">
        <div className="max-w-xs">
          <Link 
            href="#" 
            className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-blue-500 hover:text-blue-600 transition-colors mb-3 group"
          >
            Seen on Shark Tank in India
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
          
          <h1 className="text-[1.5rem] sm:text-[1.75rem] leading-[1.15] font-medium text-gray-900 tracking-tight mb-3">
            Simple, smart prosthetics made for people who keep fighting.
          </h1>
          
          <p className="text-[13px] text-gray-400 font-normal mb-3">
            Reclaim your movement now.
          </p>
          
          <Link 
            href="#" 
            className="inline-flex items-center gap-2 text-[13px] font-medium text-blue-500 border border-blue-400 rounded-full px-5 py-2.5 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-200 group"
          >
            Try a free fitting
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
