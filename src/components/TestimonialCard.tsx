'use client'; // Needs to be client for hover state/motion

import React from 'react';
import Image from 'next/image';
import { Testimonial } from '@/lib/testimonialsData'; // Assuming path
import { motion } from 'framer-motion'; // Import motion

interface TestimonialCardProps {
  testimonial: Testimonial;
  hoveredId: number | null; // Added prop
  setHoveredId: (id: number | null) => void; // Added prop
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  testimonial, 
  hoveredId, 
  setHoveredId 
}) => {
  const isDimmed = hoveredId !== null && hoveredId !== testimonial.id;

  return (
    <motion.div 
      className="flex items-stretch flex-shrink-0 w-[480px] sm:w-[520px] md:w-[560px] h-[170px] overflow-visible group cursor-pointer mr-6 sm:mr-8"
      animate={{
        opacity: isDimmed ? 0.6 : 1, 
        y: hoveredId === testimonial.id ? -5 : 0, 
      }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }} 
      onMouseEnter={() => setHoveredId(testimonial.id)} 
      onMouseLeave={() => setHoveredId(null)} 
    >
      {/* Image Container - Using arbitrary values for specific rounding */}
      <div className="relative w-[140px] flex-shrink-0 overflow-hidden rounded-tl-[12px] rounded-bl-[12px]"> 
        <Image
          src={testimonial.imageSrc}
          alt={testimonial.name}
          fill
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out pointer-events-none" 
        />
      </div>

      {/* Gap - Removed bg-white */}
      <div className="w-4 flex-shrink-0"></div> 

      {/* Divider */}
      <div className="w-1.5 bg-[#57DCAD] flex-shrink-0"></div> 

      {/* Gap - Removed bg-white */}
      <div className="w-4 flex-shrink-0"></div> 

      {/* Text Area - Removed bg-white and rounding */}
      <div className="flex flex-col justify-center py-2 flex-grow"> 
        <p className="text-gray-700 text-base sm:text-lg mb-3 italic leading-snug">{testimonial.quote}</p>
        <p className="text-base sm:text-lg font-semibold text-[#57DCAD] mb-1">{testimonial.name}</p>
        <p className="text-[11px] sm:text-xs uppercase text-gray-500 tracking-wider font-medium">{testimonial.credentials}</p>
      </div>
    </motion.div>
  );
};

export default TestimonialCard; 