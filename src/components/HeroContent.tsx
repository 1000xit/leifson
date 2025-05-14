'use client'; // Mark this component as a Client Component

import React, { useEffect, useState } from 'react';
// Revert back to standard framer-motion import
import { motion } from 'framer-motion';
import CalendlyDialog from './CalendlyDialog'; // Import the Calendly dialog component

// Animation variants (can be defined here or passed as props)
const animationVariants = {
  initial: {
    opacity: 0,
    filter: 'blur(5px)',
    y: 20,
  },
  animate: (i: number) => ({
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      delay: i * 0.1, // Stagger delay based on index
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const HeroContent: React.FC = () => {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const calendlyUrl = "https://calendly.com/amplifi-financial/15min";
  
  // Adjust scroll speed on mobile
  useEffect(() => {
    // Function to detect if we're on mobile
    const isMobile = () => window.innerWidth < 768;
    const isSmallMobile = () => window.innerWidth < 480;
    
    // Adjust scroll behavior for mobile
    const adjustScrollForMobile = () => {
      if (isMobile()) {
        // Find the scroll spacer element
        const spacer = document.getElementById('scroll-spacer');
        if (spacer) {
          // Reduce height on mobile to make scroll faster
          spacer.style.height = '30vh';
        }
        
        // Try to find and scale the records section if it exists
        const recordsContainer = document.querySelector('.records-container');
        if (recordsContainer instanceof HTMLElement) {
          // Apply different scaling based on screen size
          if (isSmallMobile()) {
            // Extra small screens - zoom out more
            recordsContainer.style.transform = 'scale(0.65)';
            recordsContainer.style.marginTop = '-15%'; // Pull up to compensate for smaller scale
          } else {
            // Regular mobile screens
            recordsContainer.style.transform = 'scale(0.75)';
            recordsContainer.style.marginTop = '-10%'; // Pull up slightly
          }
          recordsContainer.style.transformOrigin = 'center top';
          recordsContainer.style.width = '100%'; // Ensure it stays centered
          recordsContainer.style.maxWidth = 'none'; // Override any max-width
        }
        
        // Also try to find individual records that might not be in a container
        const records = document.querySelectorAll('.record-item');
        records.forEach((record) => {
          if (record instanceof HTMLElement) {
            if (isSmallMobile()) {
              record.style.transform = 'scale(0.65)';
            } else {
              record.style.transform = 'scale(0.75)';
            }
            record.style.transformOrigin = 'center center';
          }
        });
        
        // Find the hero content section and adjust height
        const heroSection = document.getElementById('hero-content');
        if (heroSection) {
          heroSection.style.minHeight = '50vh'; // Shorter on mobile
        }
      } else {
        // Desktop adjustments
        const heroSection = document.getElementById('hero-content');
        if (heroSection) {
          heroSection.style.minHeight = '65vh'; // Taller on desktop
        }
      }
      
      // Make the record scene container taller if it exists
      const recordScene = document.querySelector('.record-scene-container');
      if (recordScene instanceof HTMLElement) {
        recordScene.style.height = isMobile() ? '60vh' : '75vh';
      }
    };
    
    // Run once on component mount
    adjustScrollForMobile();
    
    // Also run when window is resized
    window.addEventListener('resize', adjustScrollForMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', adjustScrollForMobile);
    };
  }, []);

  return (
    <>
      <CalendlyDialog 
        isOpen={isCalendlyOpen} 
        onClose={() => setIsCalendlyOpen(false)} 
        calendlyUrl={calendlyUrl}
      />
      <div className="flex flex-col items-center pt-8 md:pt-16 pb-20 md:pb-32">
        {/* Copied animated elements from page.tsx */}
        <motion.h1 
          // Use sans font (Aileron) explicitly or ensure parent has it
          className="font-sans text-2xl sm:text-4xl md:text-7xl font-bold mb-2 sm:mb-4 md:mb-6 text-gray-900 leading-tight"
          custom={0} 
          variants={animationVariants}
          initial="initial"
          animate="animate"
          viewport={{ once: true }}
        >
          RUN YOUR MUSIC
          <br />
          LIVESTREAMS ON AUTOPILOT
        </motion.h1>
        
        <motion.p 
          // Use sans font (Aileron)
          className="font-sans text-sm sm:text-lg md:text-2xl text-gray-600 mb-4 sm:mb-6 md:mb-10 font-light"
          style={{ fontWeight: '300' }} 
          custom={1} 
          variants={animationVariants}
          initial="initial"
          animate="animate"
          viewport={{ once: true }}
        >
          Nero is a virtual stream manager that manages submissions, queues, 
          and payments so you can entertain without distractions.
        </motion.p>

        {/* Button Changes: rounded-xl, gradient, custom shadow */}
        <motion.button 
          onClick={() => setIsCalendlyOpen(true)}
          className="font-sans normal-case bg-gradient-to-br from-[#67e4bb] to-[#57DCAD] text-black font-medium py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 rounded-xl text-sm sm:text-base md:text-lg active:scale-95 motion-reduce:transform-none pointer-events-auto shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.5),0_1px_2px_0_rgba(0,0,0,0.05)] hover:shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.7),0_2px_4px_0_rgba(0,0,0,0.1)] transition-shadow duration-200"
          custom={2} 
          variants={animationVariants} 
          initial="initial"
          animate="animate"
          viewport={{ once: true }}
          whileHover={{ scale: 1.03, /* Slightly different hover */ }} 
          transition={{ type: "spring", stiffness: 400, damping: 17 }} 
        >
          Create a session
        </motion.button>
        
        {/* Add spacer for more vertical height */}
        <div className="h-10 sm:h-20 md:h-30"></div>
      </div>
    </>
  );
};

export default HeroContent; 