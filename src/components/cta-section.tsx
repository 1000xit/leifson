'use client';

import React from 'react';
import { motion } from 'framer-motion';

const CTASection: React.FC = () => {

  // Variants for animation (optional, but consistent with the page)
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  return (
    <motion.section 
      id="contact"
      className="bg-liefson-white py-20 md:py-28 relative overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Extremely dynamic gradient flows */}
      
      {/* Create 8-10 varied gradient blobs that move freely throughout the section */}
      <motion.div 
        className="absolute z-0 w-[70%] h-[70%] rounded-full opacity-60"
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 85, 170, 0.3) 0%, rgba(0, 85, 170, 0) 80%)',
          filter: 'blur(40px)',
        }}
        animate={{ 
          x: ['-20%', '60%', '10%', '80%', '-20%'],
          y: ['-30%', '60%', '0%', '40%', '-30%'],
          scale: [1, 1.3, 0.8, 1.2, 1],
        }}
        transition={{ 
          repeat: Infinity,
          repeatType: "reverse",
          duration: 80,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1]
        }}
      />
      
      <motion.div 
        className="absolute z-0 w-[60%] h-[60%] rounded-full opacity-50"
        style={{
          background: 'radial-gradient(circle at center, rgba(64, 169, 255, 0.4) 0%, rgba(64, 169, 255, 0) 70%)',
          filter: 'blur(35px)',
        }}
        animate={{ 
          x: ['80%', '0%', '60%', '-20%', '80%'],
          y: ['50%', '-20%', '70%', '20%', '50%'],
          scale: [0.9, 1.4, 1, 1.2, 0.9],
        }}
        transition={{ 
          repeat: Infinity,
          repeatType: "reverse",
          duration: 65,
          ease: "easeInOut",
          times: [0, 0.3, 0.6, 0.8, 1],
          delay: 7
        }}
      />
      
      <motion.div 
        className="absolute z-0 w-[80%] h-[80%] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle at center, rgba(173, 216, 230, 0.3) 0%, rgba(173, 216, 230, 0) 70%)',
          filter: 'blur(50px)',
        }}
        animate={{ 
          x: ['30%', '-40%', '70%', '0%', '30%'],
          y: ['0%', '80%', '30%', '-40%', '0%'],
          scale: [1.1, 0.7, 1.3, 0.9, 1.1],
        }}
        transition={{ 
          repeat: Infinity,
          repeatType: "reverse",
          duration: 75,
          ease: "easeInOut",
          times: [0, 0.25, 0.5, 0.75, 1],
          delay: 12
        }}
      />
      
      <motion.div 
        className="absolute z-0 w-[40%] h-[40%] rounded-full opacity-60"
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 85, 170, 0.25) 0%, rgba(0, 85, 170, 0) 70%)',
          filter: 'blur(30px)',
        }}
        animate={{ 
          x: ['-30%', '90%', '20%', '50%', '-30%'],
          y: ['70%', '20%', '-30%', '90%', '70%'],
          scale: [0.8, 1.2, 0.9, 1.3, 0.8],
        }}
        transition={{ 
          repeat: Infinity,
          repeatType: "reverse",
          duration: 60,
          ease: "easeInOut",
          times: [0, 0.2, 0.6, 0.8, 1],
          delay: 5
        }}
      />
      
      <motion.div 
        className="absolute z-0 w-[35%] h-[35%] rounded-full opacity-70"
        style={{
          background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 80%)',
          filter: 'blur(25px)',
        }}
        animate={{ 
          x: ['50%', '-20%', '80%', '10%', '50%'],
          y: ['-20%', '60%', '20%', '90%', '-20%'],
          scale: [1, 0.6, 1.2, 0.8, 1],
          opacity: [0.7, 0.3, 0.6, 0.4, 0.7]
        }}
        transition={{ 
          repeat: Infinity,
          repeatType: "reverse",
          duration: 50,
          ease: "easeInOut",
          times: [0, 0.3, 0.5, 0.7, 1],
          delay: 15
        }}
      />

      <motion.div 
        className="absolute z-0 w-[50%] h-[50%] rounded-full opacity-40"
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 85, 170, 0.15) 0%, rgba(0, 85, 170, 0) 75%)',
          filter: 'blur(40px)',
        }}
        animate={{ 
          x: ['70%', '10%', '-30%', '60%', '70%'],
          y: ['30%', '-40%', '50%', '10%', '30%'],
          scale: [1.2, 0.9, 1.1, 0.8, 1.2],
        }}
        transition={{ 
          repeat: Infinity,
          repeatType: "reverse",
          duration: 70,
          ease: "easeInOut",
          times: [0, 0.2, 0.4, 0.8, 1],
          delay: 9
        }}
      />

      <motion.div 
        className="absolute z-0 w-[25%] h-[25%] rounded-full opacity-50"
        style={{
          background: 'radial-gradient(circle at center, rgba(173, 216, 230, 0.5) 0%, rgba(173, 216, 230, 0) 65%)',
          filter: 'blur(20px)',
        }}
        animate={{ 
          x: ['10%', '80%', '40%', '-10%', '10%'],
          y: ['80%', '30%', '-20%', '50%', '80%'],
          scale: [0.9, 1.3, 1, 0.7, 0.9],
          opacity: [0.5, 0.7, 0.3, 0.6, 0.5]
        }}
        transition={{ 
          repeat: Infinity,
          repeatType: "reverse",
          duration: 40,
          ease: "easeInOut",
          times: [0, 0.4, 0.6, 0.8, 1],
          delay: 3
        }}
      />

      <motion.div 
        className="absolute z-0 w-[45%] h-[45%] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle at center, rgba(64, 169, 255, 0.25) 0%, rgba(64, 169, 255, 0) 70%)',
          filter: 'blur(30px)',
        }}
        animate={{ 
          x: ['0%', '60%', '20%', '90%', '0%'],
          y: ['40%', '0%', '80%', '30%', '40%'],
          scale: [1.1, 0.7, 1.2, 0.9, 1.1],
        }}
        transition={{ 
          repeat: Infinity,
          repeatType: "reverse",
          duration: 55,
          ease: "easeInOut",
          times: [0, 0.3, 0.5, 0.9, 1],
          delay: 18
        }}
      />

      <motion.div 
        className="absolute z-0 w-[30%] h-[30%] rounded-full opacity-45"
        style={{
          background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 75%)',
          filter: 'blur(25px)',
        }}
        animate={{ 
          x: ['40%', '-10%', '70%', '20%', '40%'],
          y: ['10%', '50%', '-10%', '70%', '10%'],
          scale: [0.8, 1.1, 0.9, 1.2, 0.8],
          opacity: [0.45, 0.6, 0.3, 0.5, 0.45]
        }}
        transition={{ 
          repeat: Infinity,
          repeatType: "reverse",
          duration: 65,
          ease: "easeInOut",
          times: [0, 0.2, 0.6, 0.9, 1],
          delay: 22
        }}
      />

      <motion.div 
        className="absolute z-0 w-[55%] h-[55%] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 85, 170, 0.2) 0%, rgba(0, 85, 170, 0) 80%)',
          filter: 'blur(45px)',
        }}
        animate={{ 
          x: ['20%', '70%', '-20%', '50%', '20%'],
          y: ['-30%', '40%', '70%', '0%', '-30%'],
          scale: [1, 1.4, 0.8, 1.1, 1],
        }}
        transition={{ 
          repeat: Infinity,
          repeatType: "reverse",
          duration: 85,
          ease: "easeInOut",
          times: [0, 0.3, 0.6, 0.8, 1],
          delay: 30
        }}
      />

      {/* Content with higher z-index */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Desktop version (hidden on small screens) - Keep this the same */}
        <h2 className="hidden sm:block font-serif text-4xl sm:text-5xl lg:text-6xl text-liefson-dark-text font-semibold tracking-tight leading-tight mb-8">
          <span className="block pb-2">Let's protect your family —</span>
          <span className="block">
            <span className="align-middle">get a&nbsp;</span>
            <span className="inline-block align-middle mx-1 transform translate-y-[-0.075em] sm:translate-y-[-0.1em] pt-3">
              <motion.button 
                onClick={() => window.location.href = "/contact"}
                className="bg-liefson-primary-light text-liefson-primary transition-opacity px-3 py-1.5 rounded-full flex items-center space-x-3 text-sm font-medium transform focus:outline-none focus:ring-2 focus:ring-liefson-primary-light focus:ring-offset-2 focus:ring-offset-liefson-white"
                whileHover="hover"
                initial="rest"
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className="font-sans font-regular pl-2 tracking-tight text-base">get started</span>
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
            </span>
            <span className="align-middle">&nbsp;free quote today</span>
          </span>
        </h2>
          
        {/* Mobile version (hidden on larger screens) - Simplified with natural flowing text */}
        <div className="sm:hidden text-center mb-8">
          <h2 className="font-serif text-3xl text-liefson-dark-text font-semibold tracking-tight leading-tight mb-6">
            Let's protect your family, get a free quote today
          </h2>
          <motion.button
            onClick={() => window.location.href = "/contact"}
            className="bg-liefson-primary-light text-liefson-primary transition-opacity px-4 py-2 rounded-full flex items-center space-x-3 text-sm font-medium mx-auto transform focus:outline-none focus:ring-2 focus:ring-liefson-primary-light focus:ring-offset-2 focus:ring-offset-liefson-white"
            whileHover="hover"
            initial="rest"
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span className="font-sans font-regular pl-2 tracking-tight text-base">get started</span>
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
        </div>
        
      </div>
    </motion.section>
  );
};

export default CTASection; 