import Hero from '@/components/sections/Hero';
import Trust from '@/components/sections/Trust';
import ProductShowcase from '@/components/sections/ProductShowcase';
import { Gallery4Demo } from '@/components/blocks/gallery/gallery4-demo';
import Features from '@/components/sections/Features';
import HowItWorks from '@/components/sections/HowItWorks';
import Technology from '@/components/sections/Technology';
import Testimonials from '@/components/sections/Testimonials';
import Impact from '@/components/sections/Impact';
import CaseStudies from '@/components/sections/CaseStudies';
import Pricing from '@/components/sections/Pricing';
import FAQMarquee from '@/components/sections/FAQMarquee';
import FAQ from '@/components/sections/FAQ';
import FinalCTA from '@/components/sections/ContactCTA';
import ExploreMenu from '@/components/navigation/ExploreMenu';
import Footer from '@/components/layout/Footer';
import FloatingProgressNav from '@/components/navigation/FloatingProgressNav';

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
