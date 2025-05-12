'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define FAQ content
type FAQ = {
  id: string;
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    id: 'faq1',
    question: 'What are Nero Livestreams?',
    answer: 'Nero Livestreams are a new way for creatives to connect with their community in real time through music. These interactive experiences let fans become part of the show through live music reviews, remix contests, beat battles, cookups, and more.'
  },
  {
    id: 'faq2',
    question: 'Is Nero a separate streaming platform?',
    answer: 'No, Nero is not a separate streaming platform. Instead, it enhances your livestreams across Instagram, Twitch, TikTok, YouTube, and more by turning them into interactive experiences. You don\'t need to move your audience to a new platform - Nero helps you engage fans directly where they already are.'
  },
  {
    id: 'faq3',
    question: 'How do I make money on Nero?',
    answer: 'Nero drives revenue by allowing viewers to pay for priority submissions through "skip the line" features. You can also add shopping options like Instagram shoutouts, merchandise, and more to maximize your earnings.'
  },
  {
    id: 'faq4',
    question: 'Do I have to pay to use Nero?',
    answer: 'No! Nero is free to use. To maintain a quality experience for everyone, Nero takes a 15% commission on transactions made through the platform.'
  },
  {
    id: 'faq5',
    question: 'Can I collect emails from my viewers?',
    answer: 'Yes - Nero allows you to export first-party data from your streams, so you can retarget viewers and grow your community.'
  },
  {
    id: 'faq6',
    question: 'How do payments work?',
    answer: 'Nero partners with Stripe for fast, secure payments & payouts.'
  }
];

// More centered bubble positions, with top values increased by 5%
const positions = [
  { top: '15%', left: '40%' }, // Was 13%
  { top: '18%', right: '30%' }, // Was 16%
  { top: '40%', left: '25%' }, // Was 35%
  { top: '51%', right: '44%' }, // Was 39%
  { top: '73%', left: '35%' }, // Was 60%
  { top: '79%', right: '25%' }, // Was 55%
];

// Animation variants for bubbles spreading out
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const DraggableBubble: React.FC<{
  faq: FAQ;
  index: number;
  onFaqSelect: (id: string) => void;
  containerRef: React.RefObject<HTMLDivElement>;
}> = ({ faq, index, onFaqSelect, containerRef }) => {
  // Use separate refs for the draggable div and its inner content
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const [finalPosition, setFinalPosition] = useState({ x: 0, y: 0 });
  
  // Calculate final position based on container size and position
  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      
      // Parse position values
      const posObj = positions[index % positions.length];
      let x = 0, y = 0;

      // Calculate exact pixel values for final positions
      if ('left' in posObj) {
        x = parseInt(posObj.left as string) * containerWidth / 100;
      } else if ('right' in posObj) {
        x = containerWidth - (parseInt(posObj.right as string) * containerWidth / 100);
      }
      
      if ('top' in posObj) {
        y = parseInt(posObj.top as string) * containerHeight / 100;
      }
      
      setFinalPosition({ x, y });
    }
  }, [containerRef, index]);
  
  // Animation variants for individual bubble
  const bubbleVariants = {
    hidden: { x: 0, y: 0, opacity: 0, scale: 0.5 },
    visible: {
      x: finalPosition.x,
      y: finalPosition.y,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 80,
        duration: 0.8
      }
    }
  };
  
  // Explicitly handle the pointer down event
  const handlePointerDown = (e: React.PointerEvent) => {
    setDragStartPos({ x: e.clientX, y: e.clientY });
    setHasMoved(false);
  };
  
  // Handle pointer movement to detect drag
  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStartPos.x === 0 && dragStartPos.y === 0) return;
    
    // Calculate distance moved
    const dx = Math.abs(e.clientX - dragStartPos.x);
    const dy = Math.abs(e.clientY - dragStartPos.y);
    
    // If moved more than 5px in any direction, consider it a drag
    if (dx > 5 || dy > 5) {
      setHasMoved(true);
    }
  };
  
  // Handle click for FAQ selection
  const handleClick = (e: React.MouseEvent) => {
    // If the user has moved the cursor, don't register as a click
    if (!hasMoved) {
      onFaqSelect(faq.id);
    }
  };
  
  // Reset drag state on pointer up
  const handlePointerUp = () => {
    setDragStartPos({ x: 0, y: 0 });
  };
  
  return (
    <motion.div
      ref={bubbleRef}
      className="absolute cursor-grab active:cursor-grabbing z-10"
      style={{ 
        position: 'absolute',
        left: 0,
        top: 0,
        translateX: "-50%",
        translateY: "-50%"
      }}
      variants={bubbleVariants}
      initial="hidden"
      animate={{
        ...bubbleVariants.visible,
        x: [
          finalPosition.x, 
          finalPosition.x + (Math.sin(index * 2.7) * 3), 
          finalPosition.x - (Math.cos(index * 1.5) * 2),
          finalPosition.x
        ],
        y: [
          finalPosition.y, 
          finalPosition.y - (Math.cos(index * 3.1) * 2), 
          finalPosition.y + (Math.sin(index * 2.3) * 3),
          finalPosition.y
        ],
        scale: [1, 1.015, 1],
        transition: {
          ...bubbleVariants.visible.transition,
          x: {
            repeat: Infinity,
            duration: 3.7 + (index % 3) * 0.9,
            ease: "easeInOut",
            times: [0, 0.3, 0.7, 1]
          },
          y: {
            repeat: Infinity,
            duration: 4.2 + (index % 4) * 0.8,
            ease: "easeInOut", 
            times: [0, 0.4, 0.8, 1]
          },
          scale: {
            repeat: Infinity,
            duration: 2.9 + (index % 2) * 1.1,
            ease: "easeInOut"
          }
        }
      }}
      whileHover={{ scale: 1.05 }}
      // Make draggable without click triggers
      drag
      dragConstraints={containerRef}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      dragElastic={0.5}
      whileDrag={{ scale: 1.1, zIndex: 20 }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClick={handleClick}
    >
      <div className="bg-gray-100 rounded-[18px] px-5 py-4 shadow-sm border border-gray-200 max-w-[280px] sm:max-w-[240px]">
        <div className="text-gray-500 text-sm mb-1">Your name</div>
        <div className="font-medium text-gray-800 leading-snug text-sm sm:text-base">{faq.question}</div>
      </div>
    </motion.div>
  );
};

const FAQSection: React.FC = () => {
  const [selectedFAQ, setSelectedFAQ] = useState<string | null>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleSelectFAQ = (id: string) => {
    setSelectedFAQ(id);
  };
  
  const handleClose = () => {
    setSelectedFAQ(null);
  };

  // Function to determine if we should show interactive bubbles or fallback to list
  const useInteractiveBubbles = () => {
    // Return true only for tablet/desktop
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768;
    }
    return true; // Default to true on server
  };

  const [showInteractive, setShowInteractive] = useState(true);

  // Update when window resizes
  useEffect(() => {
    const handleResize = () => {
      setShowInteractive(useInteractiveBubbles());
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="bg-white text-gray-800 py-8 sm:py-12 md:py-16 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-6 tracking-tight text-black">
            IN CASE YOU STILL HAVE QUESTIONS?
          </h2>
        </div>
        
        {/* Interactive bubbles for larger screens */}
        {showInteractive && !selectedFAQ && (
          <div 
            ref={constraintsRef}
            className="relative h-[300px] sm:h-[400px] md:h-[450px] w-full mx-auto hidden md:block"
          >
            {/* Background glow elements */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#40e0a0] opacity-5 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-[#40e0a0] opacity-5 rounded-full blur-[120px]"></div>
            
            {/* Draggable Bubbles */}
            <motion.div 
              ref={containerRef}
              className="relative w-full h-full"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {faqs.map((faq, index) => (
                <DraggableBubble
                  key={faq.id}
                  faq={faq}
                  index={index}
                  onFaqSelect={handleSelectFAQ}
                  containerRef={constraintsRef}
                />
              ))}
            </motion.div>
          </div>
        )}
        
        {/* Mobile fallback - simple list for better UX on small screens */}
        {(!showInteractive && !selectedFAQ) && (
          <div className="md:hidden px-2 grid grid-cols-1 gap-3 max-w-md mx-auto">
            {faqs.map((faq) => (
              <motion.div 
                key={faq.id} 
                className="bg-gray-100 rounded-[18px] px-4 py-3 cursor-pointer shadow-sm border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectFAQ(faq.id)}
              >
                <div className="text-gray-500 text-xs mb-1">Your name</div>
                <div className="font-medium text-gray-800 text-sm">{faq.question}</div>
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Selected FAQ Display */}
        <AnimatePresence>
          {selectedFAQ && (
            <motion.div 
              className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-white bg-opacity-95 z-50 p-4 sm:relative sm:bg-transparent sm:p-0 sm:h-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute top-4 right-4 sm:hidden">
                <button 
                  className="text-gray-500 p-2" 
                  onClick={handleClose}
                  aria-label="Close"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              
              <motion.div 
                className="w-full max-w-md sm:max-w-lg mx-auto px-2 sm:px-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {/* Question */}
                <div className="mb-3 sm:mb-6">
                  <motion.div 
                    className="inline-block bg-gray-100 rounded-[18px] px-3 sm:px-5 py-2 sm:py-4 max-w-[90%] sm:max-w-[80%] shadow-sm border border-gray-200"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="text-gray-500 text-xs sm:text-sm mb-1">Your name</div>
                    <div className="font-medium text-gray-800 text-sm sm:text-base">
                      {faqs.find(f => f.id === selectedFAQ)?.question}
                    </div>
                  </motion.div>
                </div>
                
                {/* Typing indicator animation */}
                <motion.div 
                  className="mb-2 sm:mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.5 } }}
                  exit={{ opacity: 0 }}
                >
                  <div className="inline-block bg-gray-200 rounded-full py-1.5 sm:py-3 px-3 sm:px-6">
                    <motion.div 
                      className="flex space-x-1.5 sm:space-x-2"
                      animate={{ 
                        opacity: [0.5, 1, 0.5],
                        transition: { 
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }}
                    >
                      <div className="w-1 h-1 sm:w-2 sm:h-2 bg-gray-400 rounded-full"></div>
                      <div className="w-1 h-1 sm:w-2 sm:h-2 bg-gray-400 rounded-full"></div>
                      <div className="w-1 h-1 sm:w-2 sm:h-2 bg-gray-400 rounded-full"></div>
                    </motion.div>
                  </div>
                </motion.div>
                
                {/* Answer */}
                <div className="flex justify-end mb-4 sm:mb-8">
                  <motion.div 
                    className="bg-[#40e0a0] text-black rounded-[18px] px-3 sm:px-5 py-2 sm:py-4 max-w-[90%] sm:max-w-[80%] shadow-sm"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    <div className="text-gray-700 text-xs sm:text-sm mb-1">Nero</div>
                    <motion.div 
                      className="font-medium text-gray-800 leading-tight text-xs sm:text-base"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4 }}
                    >
                      {faqs.find(f => f.id === selectedFAQ)?.answer}
                    </motion.div>
                  </motion.div>
                </div>
                
                {/* Ask another question button */}
                <div className="text-center">
                  <motion.button
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-base font-medium shadow-sm border border-gray-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClose}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 }}
                  >
                    Ask another question
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FAQSection; 