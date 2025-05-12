'use client'; // Needed for state and motion

import React, { useState } from 'react'; // Added useState
import TestimonialCard from './TestimonialCard';
import { testimonialsData } from '@/lib/testimonialsData'; // Assuming path
import { motion } from 'framer-motion'; // Added motion

const TestimonialsSection: React.FC = () => {
  // State to track the ID of the hovered card
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Duplicate data for seamless loop
  const duplicatedTestimonials = [...testimonialsData, ...testimonialsData];

  // Recalculate scroll distance for new card width + margin
  const cardWidthEstimate = 592; // Roughly (560px width + 32px margin)
  const scrollDistance = cardWidthEstimate * testimonialsData.length;

  // Animation variant for the continuous scroll
  const scrollVariants = {
    animate: {
      x: [0, -scrollDistance], // Use calculated scroll distance
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 55, // Adjusted duration 
          ease: "linear",
        },
      },
    },
  };

  return (
    <section 
      className="relative bg-[#f9f9f9] min-h-[24vh] flex flex-col justify-center overflow-hidden 
                 before:absolute before:left-0 before:top-0 before:bottom-0 before:z-10 before:w-16 before:bg-gradient-to-r before:from-[#f9f9f9] before:to-transparent before:pointer-events-none
                 after:absolute after:right-0 after:top-0 after:bottom-0 after:z-10 after:w-16 after:bg-gradient-to-l after:from-[#f9f9f9] after:to-transparent after:pointer-events-none"
    >
      {/* Divider Line Removed */}

      {/* Motion container for scrolling */}
      <motion.div 
        className="flex pl-4 sm:pl-6 lg:pl-8" // Added initial padding left to match card spacing
        variants={scrollVariants}
        animate="animate" // Animate prop now runs continuously unless explicitly stopped/changed
      >
        {/* Render duplicated list */}
        {duplicatedTestimonials.map((testimonial, index) => (
          <TestimonialCard 
            key={`${testimonial.id}-${index}`} 
            testimonial={testimonial} 
            hoveredId={hoveredId} // Pass hovered state
            setHoveredId={setHoveredId} // Pass setter function
          />
        ))}
      </motion.div>
    </section>
  );
};

export default TestimonialsSection; 