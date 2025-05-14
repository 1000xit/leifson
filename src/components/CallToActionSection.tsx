'use client';

import React from 'react';
import { LampContainer } from '@/components/LampSection';
import { motion } from 'framer-motion';

const CallToActionSection: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <LampContainer className="pt-3 pb-4 md:pt-4 md:pb-6 flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0.3, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "circOut",
          }}
          className="font-sans -mt-4 md:-mt-8 text-black text-center text-3xl sm:text-4xl md:text-5xl font-bold max-w-3xl mx-auto"
        >
          Run your streams on autopilot so you can stay in the spotlight.
        </motion.h2>
        
        <div className="flex justify-center w-full mt-8 md:mt-10">
          <motion.button 
            onClick={() => window.location.href = "/contact"}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 20px rgba(101, 228, 187, 0.25), 0 6px 8px rgba(101, 228, 187, 0.2)",
              transition: { duration: 0.2, ease: "easeOut" }
            }}
            whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
            className="font-sans normal-case bg-gradient-to-br from-[#67e4bb] to-[#57DCAD] text-black font-medium py-2 px-6 sm:py-3 sm:px-8 rounded-xl text-sm sm:text-base active:scale-95 motion-reduce:transform-none shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.5),0_1px_2px_0_rgba(0,0,0,0.05)] hover:shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.7),0_2px_4px_0_rgba(0,0,0,0.1)] transition-shadow duration-200"
          >
            Create a session
          </motion.button>
        </div>
      </LampContainer>
    </div>
  );
};

export default CallToActionSection; 