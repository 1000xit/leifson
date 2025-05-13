"use client"; // Mark as a Client Component

import React from 'react';
import Image from 'next/image';
import { motion, Transition } from 'framer-motion';

const Hero = () => {
  // Animation variants for staggering children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger delay for each child
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 12 }
    },
  };

  // Enhanced variants for a more dynamic floating image
  const floatTransition: Transition = {
    duration: 10,
    repeat: Infinity,
    ease: "easeInOut",
    repeatType: "mirror" as const,
  };

  const floatingImageVariants = {
    float: {
      x: ["0px", "-4px", "4px", "-4px", "0px"],
      y: ["0px", "6px", "-6px", "6px", "0px"],
      rotate: [0, 0.7, -0.7, 0.7, 0],
      transition: floatTransition,
    },
  };

  // Updated gradientVariants for a slower, sunrise-like effect
  const gradientVariants = {
    hidden: { 
      opacity: 0, 
      y: "30%", // Start lower (percentage of its own height)
      scale: 1.2, // Start slightly larger to enhance the reveal
    },
    visible: {
      opacity: 0.9, // Final opacity
      y: "0%",
      scale: 1,
      transition: { 
        duration: 2.5, // Slower duration
        ease: [0.25, 0.8, 0.5, 1], // Custom ease for a smooth, decelerating sunrise
      },
    },
  };

  const backgroundIconVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1, // Wrapper opacity, SVG internal opacity will make it faint
      transition: { duration: 1.5, ease: "easeOut", delay: 0.3 } // Fade in after main content starts
    }
  };

  return (
    <section 
      className="bg-liefson-primary w-full min-h-[70vh] h-auto rounded-bl-[40px] rounded-br-[40px] md:rounded-bl-[64px] md:rounded-br-[64px] flex items-start justify-center text-liefson-white overflow-hidden pt-[5vh] md:pt-[10vh] pb-10 md:pb-0 relative" // Responsive rounding
    >
      {/* Background Leifson Icon with fade-in */}
      <motion.div 
        className="absolute inset-0 z-[1] p-12 md:p-16 lg:p-20 xl:p-24 overflow-hidden rounded-bl-[40px] rounded-br-[40px] md:rounded-bl-[64px] md:rounded-br-[64px]" // Increased padding, removed explicit opacity class
        variants={backgroundIconVariants}
        initial="hidden"
        animate="visible"
      >
        <Image 
          src="/leifsonicon.svg"
          alt="Background Leifson Icon Pattern"
          layout="fill"
          objectFit="cover"
          className="pointer-events-none" // Prevent interaction if it accidentally overlaps content visually
        />
      </motion.div>

      {/* Gradient Div - Absolutely Positioned */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[300px] md:h-[400px] bg-[radial-gradient(ellipse_at_center_bottom,_#00284D_20%,_rgba(0,40,77,0)_75%)] z-0"
        variants={gradientVariants}
        initial="hidden"
        animate="visible"
      />

      {/* Main Content Container - Needs to be above the gradient and icon */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center w-full gap-4 md:gap-6 relative z-10" // Added relative and z-10
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Column - Text Content */}
        <motion.div className="md:w-1/2 text-center md:text-left" variants={itemVariants}>
          <motion.h1 
            className="font-serif text-liefson-primary-light text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tight leading-[0.9] mb-6"
            style={{ lineHeight: '0.9' }}
          >
            Protect What Matters Most
          </motion.h1>
          <motion.p 
            className="font-sans text-liefson-subheader text-base sm:text-lg mb-6 md:mb-8 max-w-md sm:max-w-lg mx-auto md:mx-0"
            style={{ lineHeight: '1.6' }}
            variants={itemVariants}
          >
            {/* Text for larger screens (md and up) */}
            <span className="hidden md:inline">
              Life is about the little moments that matter. Insurance is about protecting them. Licensed in all 50 states with access to over 20 top-rated insurance carriers.
            </span>
            {/* Text for smaller screens (block by default, hidden on md and up) */}
            <span className="md:hidden">
              Licensed in all 50 states with access to over 20 top-rated insurance carriers.
            </span>
          </motion.p>
          <motion.div variants={itemVariants}>
            <motion.button
              className="bg-liefson-primary-light text-liefson-primary transition-opacity px-3 py-1.5 rounded-full flex items-center space-x-3 text-sm font-medium mx-auto md:mx-0"
              whileHover="hover"
              initial="rest"
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className="font-sans font-regular pl-2 tracking-tight text-base">Speak with an expert</span>
              <motion.span
                className="bg-liefson-white text-liefson-primary rounded-full w-10 h-10 flex items-center justify-center text-md"
                variants={{
                  rest: { x: 0, scale: 1 },
                  hover: { x: 4, scale: 1.1 }
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Column - Image with float and hover effects */}
        <motion.div 
          className="md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0 relative z-10" // z-10 already here, good
          variants={itemVariants}
        >
          {/* Container to control responsive max-width of the image */}
          <motion.div
            className="transform md:rotate-3 w-full max-w-[280px] sm:max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl" // Responsive max-width for image
            variants={floatingImageVariants}
            animate="float"
            whileHover={{ scale: 1.12 }}
            transition={{ type: "spring", stiffness: 250, damping: 15 }}
          >
            <Image 
              src="/quote.png" 
              alt="Insurance Quote Illustration" 
              width={600} // Base aspect ratio hint
              height={540} // Base aspect ratio hint
              className="w-full h-auto block" // Image scales to fit its parent
              priority
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero; 