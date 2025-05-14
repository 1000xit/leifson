'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Reordered logos according to requested sequence:
// Nationwide | Corebridge Financial | North American | F&G | Ethos | Lincoln Financial | Allianz | Athene | Ameritas | Mutual of Omaha | American-Amicable | American Equity
// Note: Some logos seem to be missing from the public directory (Ameritas, Mutual of Omaha, American-Amicable, American Equity)
const logos = [
  { src: '/nationwide.svg', alt: 'Nationwide', width: 296, height: 66 },
  { src: '/corebridge.svg', alt: 'Corebridge Financial', width: 215, height: 60 },
  { src: '/northamerican.svg', alt: 'North American', width: 257, height: 60 },
  { src: '/fg.svg', alt: 'F&G', width: 40, height: 29 },
  { src: '/ethos.svg', alt: 'Ethos', width: 285, height: 53 },
  { src: '/lincoln.svg', alt: 'Lincoln Financial Group', width: 172, height: 60 },
  { src: '/allainz.svg', alt: 'Allianz', width: 194, height: 51 },
  { src: '/athene.svg', alt: 'Athene', width: 172, height: 30 },
];

// Calculate aspect ratios and target height
const TARGET_LOGO_HEIGHT = 40; // px (approx h-10)

const scaledLogos = logos.map(logo => ({
  ...logo,
  scaledWidth: Math.round(TARGET_LOGO_HEIGHT * (logo.width / logo.height)),
  scaledHeight: TARGET_LOGO_HEIGHT,
}));

const duplicatedLogos = [...scaledLogos, ...scaledLogos]; // Duplicate for seamless looping

const LogoCarousel: React.FC = () => {
  const marqueeVariants = {
    animate: {
      x: [0, - (scaledLogos.reduce((acc, logo) => acc + logo.scaledWidth + 64, 0))], // 64 is 4rem (mx-8) * 2 for one set
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop' as const,
          duration: 40, // Adjust duration for speed
          ease: 'linear',
        },
      },
    },
  };

  return (
    <section id="carriers" className="py-10 md:py-14 bg-liefson-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="text-center mb-6">
          <h2 className="text-xs font-sans tracking-widest uppercase text-gray-400 font-medium mb-1">
            OUR CARRIERS
          </h2>
        </div>
      </div>
      
      <div className="logo-carousel-container overflow-hidden">
        <motion.div
          className="flex flex-nowrap items-center"
          variants={marqueeVariants}
          animate="animate"
        >
          {duplicatedLogos.map((logo, index) => (
            <div key={`${logo.alt}-${index}`} className="flex-none mx-8 flex items-center justify-center" style={{ height: `${TARGET_LOGO_HEIGHT}px` }}>
              <Image 
                src={logo.src} 
                alt={logo.alt} 
                width={logo.scaledWidth}
                height={logo.scaledHeight}
                className="object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LogoCarousel; 