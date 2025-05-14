import React from 'react';
import Hero from '@/components/Hero';
import LogoCarousel from '@/components/LogoCarousel';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import ServicesExtended from '@/components/ServicesExtended';
import CTASection from '@/components/cta-section';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-liefson-white">
      <Hero />
      <LogoCarousel />
      <Services />
      <Testimonials />
      <ServicesExtended />
      <FAQ />
      <CTASection />
      <Footer />
      {/* Your new landing page content will go here */}
    </div>
  );
} 