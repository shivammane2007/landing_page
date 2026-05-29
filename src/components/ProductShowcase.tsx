'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Lenis from '@studio-freight/lenis';
import { ZoomParallax } from "@/components/ui/zoom-parallax";

export default function ProductShowcase() {
	React.useEffect(() => {
		const lenis = new Lenis()

		function raf(time: number) {
			lenis.raf(time)
			requestAnimationFrame(raf)
		}

		requestAnimationFrame(raf)
		
		return () => {
		    lenis.destroy();
		};
	}, [])

	const images = [
		{
			src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D',
			alt: 'Technology Core',
		},
		{
			src: 'https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5mb3JtYXRpb24lMjB0ZWNobm9sb2d5fGVufDB8fDB8fHww',
			alt: 'Information Technology',
		},
		{
			src: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&q=80',
			alt: 'Robot hand reaching',
		},
		{
			src: 'https://images.unsplash.com/photo-1535378273068-9bb67d5beacd?w=800&q=80',
			alt: 'Robotic precision',
		},
		{
			src: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&q=80',
			alt: 'Engineering workspace',
		},
		{
			src: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
			alt: 'Automation bot',
		},
		{
			src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
			alt: 'Hardware circuits',
		},
	];

	return (
		<section id="products" className="min-h-screen w-full bg-[#f0f0ee]">
			<div className="relative flex h-[50vh] items-center justify-center overflow-hidden">
				{/* Radial spotlight */}
				<div
					aria-hidden="true"
					className={cn(
						'pointer-events-none absolute -top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full',
						'bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_50%)]',
						'blur-[30px]',
					)}
				/>
				<div className="text-center z-10 px-4">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
						Engineered for real life.
					</h2>
					<p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
						Dive into the mechanics of our advanced prosthetics. Pinpoint control, uncompromising confidence, and seamless integration.
					</p>
				</div>
			</div>
			
			<ZoomParallax images={images} />
			
			<div className="h-[20vh] bg-[#f0f0ee]"/>
		</section>
	);
}
