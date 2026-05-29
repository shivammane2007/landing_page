import Hero from '../components/Hero';
import Trust from '../components/Trust';
import ProductShowcase from '../components/ProductShowcase';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Technology from '../components/Technology';
import Testimonials from '../components/Testimonials';
import Impact from '../components/Impact';
import CaseStudies from '../components/CaseStudies';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <Hero />
      <Trust />
      <ProductShowcase />
      <Features />
      <HowItWorks />
      <Technology />
      <Testimonials />
      <Impact />
      <CaseStudies />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
