'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image'; 
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion';
import { useRef } from 'react';

// Simple FeatureCard component
const FeatureCard: React.FC<{ 
  id: string; 
  title: string; 
  className?: string;
  children?: React.ReactNode; 
}> = ({ id, title, className, children }) => {
  return (
    <motion.div 
      className={`relative rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm min-h-[250px] sm:min-h-[300px] md:min-h-[400px] flex flex-col overflow-hidden ${className}`}
    >
      <div className="relative z-10 flex flex-col flex-grow">
        <h3 className={`text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-800`}>{title}</h3>
        {children}
      </div>
    </motion.div>
  );
};

// FeatureCard with animated SVG frames
const AnimatedFeatureCard: React.FC<{
  id: string;
  title: string;
  className?: string;
}> = ({ id, title, className }) => {
  // Animation states
  const [animationState, setAnimationState] = useState<'placeholder' | 'staggering' | 'swapped'>('placeholder');

  // Function to run the staggered animation sequence
  const runAnimationSequence = async () => {
    // Only run if we're in placeholder state
    if (animationState !== 'placeholder') return;
    
    // Start animation sequence
    setAnimationState('staggering');

    // After frames animate in, wait before swap
    setTimeout(() => {
      setAnimationState('swapped');
      
      // After another 2 seconds, fade back to placeholder
      setTimeout(() => {
        setAnimationState('placeholder');
      }, 2000);
    }, 1500); // Wait 1.5 seconds after stagger begins before swap
  };

  // Frame animation variants
  const f1f2Variant = {
    hidden: { opacity: 0, filter: 'blur(5px)' },
    visible: { 
      opacity: 1, 
      filter: 'blur(0px)', 
      transition: { 
        duration: 0.5,
        delay: 0.1 // 100ms delay
      } 
    }
  };
  
  const f1f3Variant = {
    hidden: { opacity: 0, filter: 'blur(5px)' },
    visible: { 
      opacity: 1, 
      filter: 'blur(0px)', 
      transition: { 
        duration: 0.5,
        delay: 0.2 // 200ms delay (100ms after f1f2)
      } 
    }
  };
  
  const f1f4Variant = {
    hidden: { opacity: 0, filter: 'blur(5px)' },
    visible: { 
      opacity: 1, 
      filter: 'blur(0px)', 
      transition: { 
        duration: 0.5,
        delay: 0.3 // 300ms delay (100ms after f1f3)
      } 
    }
  };

  // Special variants for f1f2 (which gets replaced by f1f5)
  const f2ExitVariant = {
    opacity: 0,
    scale: 0.8,
    x: -50,
    transition: { duration: 0.4, ease: "backIn" }
  };

  return (
    <motion.div 
      className={`relative rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm min-h-[250px] sm:min-h-[300px] md:min-h-[400px] flex flex-col overflow-hidden ${className}`}
      onHoverStart={runAnimationSequence}
    >
      {/* SVG Layers/Frames */}
      <div className="absolute inset-0">
        {/* Placeholder Image - shown initially and after animation completes */}
        <AnimatePresence initial={false}>
          {animationState === 'placeholder' && (
            <motion.div 
              className="absolute inset-0"
              key="placeholder"
              initial={{ opacity: animationState === 'placeholder' ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ 
                opacity: 0,
                transition: { duration: 0.4 }
              }}
            >
              <Image
                src="/images/feature1.svg"
                alt="Feature Placeholder"
                layout="fill"
                objectFit="cover"
                priority
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animation Layers - only shown during animation sequence */}
        <AnimatePresence initial={false}>
          {animationState !== 'placeholder' && (
            <>
              {/* f1f1 Frame - Base layer (replaced by f1f6) */}
              <AnimatePresence initial={false}>
                {animationState === 'staggering' && (
                  <motion.div
                    className="absolute inset-0"
                    key="f1f1"
                    initial={{ opacity: 0, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)', transition: { duration: 0.5 } }}
                    exit={{ 
                      opacity: 0, 
                      scale: 1.05,
                      filter: "blur(4px)",
                      transition: { 
                        duration: 0.4,
                        ease: "easeInOut"
                      } 
                    }}
                  >
                    <Image
                      src="/images/f1f1.svg"
                      alt="Feature Frame 1"
                      layout="fill"
                      objectFit="cover"
                      priority
                    />
                  </motion.div>
                )}
                
                {/* f1f6 Frame - Replaces f1f1 */}
                {animationState === 'swapped' && (
                  <motion.div
                    className="absolute inset-0"
                    key="f1f6"
                    initial={{ 
                      opacity: 0,
                      scale: 0.95,
                      filter: "blur(4px)"
                    }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      filter: "blur(0px)",
                      transition: { 
                        duration: 0.6,
                        ease: "easeOut" 
                      } 
                    }}
                    exit={{
                      opacity: 0,
                      filter: "blur(8px)",
                      transition: { duration: 0.5 }
                    }}
                  >
                    <Image
                      src="/images/f1f6.svg"
                      alt="Feature Frame 6"
                      layout="fill"
                      objectFit="cover"
                      priority
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* f1f2 Frame - Gets replaced by f1f5 */}
              <AnimatePresence initial={false}>
                {animationState === 'staggering' && (
                  <motion.div
                    className="absolute inset-0"
                    key="f1f2" 
                    variants={f1f2Variant}
                    initial="hidden"
                    animate="visible"
                    exit={f2ExitVariant}
                  >
                    <Image
                      src="/images/f1f2.svg"
                      alt="Feature Frame 2"
                      layout="fill"
                      objectFit="cover"
                    />
                  </motion.div>
                )}
                
                {/* f1f5 Frame - Replaces f1f2 */}
                {animationState === 'swapped' && (
                  <motion.div
                    className="absolute inset-0"
                    key="f1f5"
                    initial={{ 
                      opacity: 0, 
                      scale: 0.7,
                      y: 100, // Start from below
                      filter: "blur(12px)" // Start very blurry
                    }}
                    animate={{ 
                      opacity: 1,
                      scale: [0.7, 1.1, 1], // Still has the bounce effect
                      rotate: [-8, 4, 0], // Reduced rotation for better upward motion
                      y: [100, -5, 0], // Move up with a slight overshoot
                      filter: ["blur(12px)", "blur(2px)", "blur(0px)"], // Progressive unblurring
                      transition: { 
                        duration: 0.8,
                        ease: "easeOut",
                        times: [0, 0.7, 1] // Control timing of keyframes
                      }
                    }}
                    exit={{
                      opacity: 0,
                      filter: "blur(8px)",
                      transition: { duration: 0.5 }
                    }}
                  >
                    <Image
                      src="/images/f1f5.svg"
                      alt="Feature Frame 5"
                      layout="fill"
                      objectFit="cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* f1f3 Frame */}
              {(animationState === 'staggering' || animationState === 'swapped') && (
                <motion.div
                  className="absolute inset-0"
                  key="f1f3"
                  variants={f1f3Variant}
                  initial="hidden"
                  animate="visible"
                  exit={{
                    opacity: 0,
                    filter: "blur(4px)",
                    transition: { duration: 0.4 }
                  }}
                >
                  <Image
                    src="/images/f1f3.svg"
                    alt="Feature Frame 3"
                    layout="fill"
                    objectFit="cover"
                  />
                </motion.div>
              )}

              {/* f1f4 Frame */}
              {(animationState === 'staggering' || animationState === 'swapped') && (
                <motion.div
                  className="absolute inset-0"
                  key="f1f4"
                  variants={f1f4Variant}
                  initial="hidden"
                  animate="visible"
                  exit={{
                    opacity: 0,
                    filter: "blur(4px)",
                    transition: { duration: 0.4 }
                  }}
                >
                  <Image
                    src="/images/f1f4.svg"
                    alt="Feature Frame 4"
                    layout="fill"
                    objectFit="cover"
                  />
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Content layer - stays on top of all frames */}
      <div className="relative z-10 flex flex-col flex-grow">
        <h3 className={`text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-800`}>{title}</h3>
      </div>
    </motion.div>
  );
};

const FeatureSection: React.FC = () => {
  // Refs for scroll-triggered animations
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);
  
  // Check if elements are in view
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 });
  const isDescriptionInView = useInView(descriptionRef, { once: true, amount: 0.5 });
  const isCard1InView = useInView(card1Ref, { once: true, amount: 0.2 });
  const isCard2InView = useInView(card2Ref, { once: true, amount: 0.2 });
  const isCard3InView = useInView(card3Ref, { once: true, amount: 0.2 });
  const isCard4InView = useInView(card4Ref, { once: true, amount: 0.2 });
  
  // Animation variants
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  const staggeredCardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="bg-[#f9f9f9] py-12 sm:py-16 md:py-20"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <motion.h2 
            ref={titleRef}
            className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4"
            initial="hidden"
            animate={isTitleInView ? "visible" : "hidden"}
            variants={fadeInUpVariant}
          >
            Core Features Built For Streamers
          </motion.h2>
          <motion.p 
            ref={descriptionRef}
            className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2"
            initial="hidden"
            animate={isDescriptionInView ? "visible" : "hidden"}
            variants={fadeInUpVariant}
            transition={{ delay: 0.1 }}
          >
            Manage your queue, payments, and community interactions seamlessly, all in one place.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          
          {/* F1: Top Left - Animated with SVG frames */}
          <motion.div 
            ref={card1Ref}
            className="md:col-span-2"
            initial="hidden"
            animate={isCard1InView ? "visible" : "hidden"}
            variants={staggeredCardVariant}
          >
            <AnimatedFeatureCard 
              id="queue-management" 
              title="Automated Queue Management"
            />
          </motion.div>
          
          {/* F2: Top Right - Regular card */}
          <motion.div 
            ref={card2Ref}
            className="md:col-span-1"
            initial="hidden"
            animate={isCard2InView ? "visible" : "hidden"}
            variants={staggeredCardVariant}
            transition={{ delay: 0.1 }}
          >
            <FeatureCard 
              id="status-check"
              title="'Where Am I In Line?' Status" 
            />
          </motion.div>

          {/* F3: Bottom Left - Regular card */}
          <motion.div 
            ref={card3Ref}
            className="md:col-span-1"
            initial="hidden"
            animate={isCard3InView ? "visible" : "hidden"}
            variants={staggeredCardVariant}
            transition={{ delay: 0.2 }}
          >
            <FeatureCard 
              id="analytics"
              title="Track Performance Analytics" 
            />
          </motion.div>
          
          {/* F4: Bottom Right - Regular card */}
          <motion.div 
            ref={card4Ref}
            className="md:col-span-2"
            initial="hidden"
            animate={isCard4InView ? "visible" : "hidden"}
            variants={staggeredCardVariant}
            transition={{ delay: 0.3 }}
          >
            <FeatureCard 
              id="connect-platforms"
              title="Connect Your Platforms" 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection; 