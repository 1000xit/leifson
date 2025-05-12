'use client';

import React from 'react';
import HeroBackground from '@/components/HeroBackground';
import HeroContent from '@/components/HeroContent';
import TestimonialsSection from '@/components/TestimonialsSection';
import HoveredTrack from '@/components/HoveredTrack';
import { TrackProvider } from '@/context/TrackContext';
import FeatureSection from './FeatureSection';
import CaseStudySection from './CaseStudySection';
import FAQSection from './FAQSection';
import CallToActionSection from './CallToActionSection';

export default function PageClientContent() {
  return (
    <TrackProvider>
      {/* Hero Content Section */}
      <section 
        id="hero-content" 
        // Added back min-height and original classes
        className="relative bg-transparent text-gray-900 z-[30] min-h-[65vh] flex flex-col items-center text-center px-3 sm:px-6 md:px-8 pt-16 md:pt-20 pointer-events-none"
      >
        {/* Restored original pointer-events structure */}
        <div className="pointer-events-auto">
           <HeroContent />
        </div>
      </section>

      {/* Spacer Div - RESTORED and height adjusted */}
      {/* Height reduced to ~100vh - hero content height */}
      <div id="scroll-spacer" style={{ height: '30vh', position: 'relative', zIndex: 1, background: '#f9f9f9' }}></div> 

      {/* Testimonials Section */}
      <section 
        id="testimonials" 
        className="relative bg-[#f9f9f9] text-gray-800 pb-20 pt-4 z-[20]"
       >
        <TestimonialsSection />
      </section>

      {/* Feature Section */}
      <section 
        id="feature-section-wrapper" 
        className="relative z-[20] bg-[#f9f9f9]"
      >
        <FeatureSection />
      </section>

      {/* Case Study Section */}
      <section 
        id="case-study-section-wrapper" 
        className="relative z-[20] bg-[#f9f9f9]"
      >
        <CaseStudySection />
      </section>

      {/* FAQ Section */}
      <section 
        id="faq-section-wrapper" 
        className="relative z-[20]"
      >
        <FAQSection />
      </section>

      {/* Call to Action Section - Added relative and z-index */}
      <section className="relative z-[20]">
        <CallToActionSection />
      </section>

      {/* Hero Background (Fixed positioning restored here) */}
      <HeroBackground />

      {/* Hovered Track Display */}
      <HoveredTrack />
    </TrackProvider>
  );
} 