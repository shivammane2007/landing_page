import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import Trust from '@/components/sections/Trust';
import ProductShowcase from '@/components/sections/ProductShowcase';

const Gallery4Demo = dynamic(() => import('@/components/blocks/gallery/gallery4-demo').then(mod => mod.Gallery4Demo));
const Features = dynamic(() => import('@/components/sections/Features'));
const HowItWorks = dynamic(() => import('@/components/sections/HowItWorks'));
const Technology = dynamic(() => import('@/components/sections/Technology'));
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'));
const Impact = dynamic(() => import('@/components/sections/Impact'));
const CaseStudies = dynamic(() => import('@/components/sections/CaseStudies'));
const Pricing = dynamic(() => import('@/components/sections/Pricing'));
const FAQMarquee = dynamic(() => import('@/components/sections/FAQMarquee'));
const FAQ = dynamic(() => import('@/components/sections/FAQ'));
const FinalCTA = dynamic(() => import('@/components/sections/ContactCTA'));
const ExploreMenu = dynamic(() => import('@/components/navigation/ExploreMenu'));
const Footer = dynamic(() => import('@/components/layout/Footer'));
const FloatingProgressNav = dynamic(() => import('@/components/navigation/FloatingProgressNav'));

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <Hero />
      <Trust />
      <ProductShowcase />
      <Gallery4Demo />
      <Features />
      <HowItWorks />
      <Technology />
      <Testimonials />
      <Impact />
      <CaseStudies />
      <Pricing />
      <FAQMarquee />
      <FAQ />
      <FinalCTA />
      <ExploreMenu />
      <Footer />
      <FloatingProgressNav />
    </main>
  );
}
