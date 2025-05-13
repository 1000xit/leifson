'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const logos = [
  { src: '/allainz.svg', alt: 'Allianz', width: 194, height: 51 },
  { src: '/athene.svg', alt: 'Athene', width: 172, height: 30 },
  { src: '/corebridge.svg', alt: 'Corebridge Financial', width: 215, height: 60 },
  { src: '/ethos.svg', alt: 'Ethos', width: 285, height: 53 },
  { src: '/fg.svg', alt: 'F&G', width: 40, height: 29 },
  { src: '/lincoln.svg', alt: 'Lincoln Financial Group', width: 172, height: 60 },
  { src: '/nationwide.svg', alt: 'Nationwide', width: 296, height: 66 },
  { src: '/northamerican.svg', alt: 'North American', width: 257, height: 60 },
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
    <div className="py-12 md:py-16 bg-liefson-white relative logo-carousel-container overflow-hidden">
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
  );
};

export default LogoCarousel; 