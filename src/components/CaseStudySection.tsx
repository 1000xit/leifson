'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

const CaseStudySection: React.FC = () => {
  // Refs for scroll animations
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const statsRef = useRef(null);
  
  // Check if elements are in view
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const isLabelInView = useInView(labelRef, { once: true, amount: 0.8 });
  const isCardInView = useInView(cardRef, { once: true, amount: 0.3 });
  const isImageInView = useInView(imageRef, { once: true, amount: 0.5 });
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 });
  const isDescriptionInView = useInView(descriptionRef, { once: true, amount: 0.5 });
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.5 });
  
  // Animation variants
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };
  
  const labelVariant = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };
  
  const imageVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };
  
  const statsContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const statsItem = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="bg-[#f9f9f9] py-10 sm:py-16 md:py-20"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.span 
            ref={labelRef}
            className="inline-block py-1.5 px-4 sm:py-2 sm:px-6 rounded-full bg-gray-900 text-white text-xs sm:text-sm font-medium"
            initial="hidden"
            animate={isLabelInView ? "visible" : "hidden"}
            variants={labelVariant}
          >
            CASE STUDY
          </motion.span>
        </div>

        {/* Case Study Card */}
        <motion.div 
          ref={cardRef}
          className="max-w-5xl mx-auto bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
          initial="hidden"
          animate={isCardInView ? "visible" : "hidden"}
          variants={cardVariant}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {/* Image Column */}
            <div className="md:col-span-1 bg-[#40e0a0] md:rounded-l-xl flex items-center justify-center p-4 sm:p-6">
              <motion.div 
                ref={imageRef}
                className="relative w-full h-44 sm:h-60 md:h-80"
                initial="hidden"
                animate={isImageInView ? "visible" : "hidden"}
                variants={imageVariant}
              >
                <Image
                  src="/images/futuristiccs.png"
                  alt="Futuristic - Streamer"
                  layout="fill"
                  objectFit="contain"
                  priority
                />
              </motion.div>
            </div>

            {/* Content Column */}
            <div className="md:col-span-2 p-5 sm:p-8 flex flex-col justify-center">
              <motion.div 
                ref={titleRef}
                className="flex items-center mb-4 sm:mb-6"
                initial="hidden"
                animate={isTitleInView ? "visible" : "hidden"}
                variants={fadeInUpVariant}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mr-3 sm:mr-4">FUTURISTIC</h2>
                <span className="rounded-full bg-[#40e0a0] p-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-6 sm:h-6">
                    <path d="M5 12l5 5L20 7" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </motion.div>

              <motion.p 
                ref={descriptionRef}
                className="text-xl sm:text-2xl md:text-3xl text-gray-700 mb-6 sm:mb-10 md:mb-12 leading-tight"
                initial="hidden"
                animate={isDescriptionInView ? "visible" : "hidden"}
                variants={fadeInUpVariant}
                transition={{ delay: 0.1 }}
              >
                Futuristic quadrupled his streaming income after implementing Nero in his live streams.
              </motion.p>

              {/* Before/After/Now Stats */}
              <motion.div 
                ref={statsRef}
                className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8"
                variants={statsContainer}
                initial="hidden"
                animate={isStatsInView ? "visible" : "hidden"}
              >
                {/* BEFORE */}
                <motion.div variants={statsItem}>
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-4 flex items-center">
                    BEFORE
                    <svg className="ml-1 sm:ml-2 w-4 h-4 sm:w-4 sm:h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 12L3 7h10l-5 5z" fill="#F43F5E"/>
                    </svg>
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">Streaming with</p>
                  <p className="text-lg sm:text-xl font-semibold text-[#F43F5E]">standard tools</p>
                  <p className="text-gray-600 text-sm sm:text-base">and limited monetization</p>
                </motion.div>

                {/* AFTER */}
                <motion.div variants={statsItem}>
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-4 flex items-center">
                    AFTER
                    <svg className="ml-1 sm:ml-2 w-4 h-4 sm:w-4 sm:h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 4L3 9h10L8 4z" fill="#40e0a0"/>
                    </svg>
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">First month with Nero</p>
                  <p className="text-lg sm:text-xl font-semibold text-[#40e0a0]">4× growth</p>
                  <p className="text-gray-600 text-sm sm:text-base">in stream revenue</p>
                </motion.div>

                {/* NOW */}
                <motion.div variants={statsItem}>
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-4 flex items-center">
                    NOW
                    <svg className="ml-1 sm:ml-2 w-4 h-4 sm:w-4 sm:h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8" cy="8" r="5" fill="#6B7280"/>
                    </svg>
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">Building a sustainable career with consistent stream revenue</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudySection; 