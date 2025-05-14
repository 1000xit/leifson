'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface TestimonialProps {
  content: string;
  author: string;
  location: string;
  index: number;
  className?: string;
}

const testimonials: TestimonialProps[] = [
  {
    content: "Colby made getting life insurance simple and stress-free. He explained everything clearly, found the perfect policy for my needs, and gave me peace of mind knowing my family is protected. Highly recommend!",
    author: "Andrew F.",
    location: "Idaho",
    index: 0
  },
  {
    content: "I had a great experience working with Colby. He's been a longtime friend, and I've always known him to be trustworthy and dependable. Throughout the process, he was incredibly knowledgeable, patient, and supportive while I made my decision. If you're looking to protect your loved ones, I highly recommend working with him.",
    author: "Cooper C.",
    location: "Georgia",
    index: 1
  },
  {
    content: "Colby made the life insurance process simple and stress-free. He was clear, professional, and genuinely cared about finding the right coverage for me. Highly recommend!",
    author: "Craig G.",
    location: "New York",
    index: 2
  },
  {
    content: "I was putting off life insurance for years because it seemed so complicated. Leifson Insurance changed that completely. They took the time to understand my situation, explained my options without the jargon, and helped me secure coverage for my family that fits our budget.",
    author: "Brock A.",
    location: "Utah",
    index: 3
  }
];

// Duplicate testimonials multiple times to ensure an endless loop
const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials, ...testimonials];

const TestimonialCard: React.FC<TestimonialProps> = ({ content, author, location, className = '' }) => {
  return (
    <div className={`flex-shrink-0 w-80 md:w-96 p-6 mx-4 bg-white rounded-xl border border-gray-100 flex flex-col min-h-[280px] h-auto shadow-sm ${className}`}>
      <div className="flex items-start mb-3">
        <Quote className="text-liefson-primary-light flex-shrink-0 mr-2" size={24} />
      </div>
      <p className="text-gray-700 font-sans text-sm md:text-md leading-relaxed overflow-visible flex-grow">{content}</p>
      <div className="pt-3 mt-4 border-t border-gray-50 text-right">
        <p className="text-liefson-primary font-semibold">{author}</p>
        <p className="text-gray-500 text-sm">{location}</p>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const [carouselWidth, setCarouselWidth] = useState(2000);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Calculate the total width of testimonials to create proper seamless loop
  useEffect(() => {
    if (containerRef.current) {
      // Get all cards
      const cards = containerRef.current.querySelectorAll('.testimonial-card');
      if (cards.length > 0) {
        // Calculate total width of the original testimonials set
        let totalWidth = 0;
        // Only measure the first set of testimonials (original length)
        for (let i = 0; i < testimonials.length; i++) {
          const card = cards[i] as HTMLElement;
          // Include margin in width calculation
          const style = window.getComputedStyle(card);
          const marginLeft = parseInt(style.marginLeft || '0', 10);
          const marginRight = parseInt(style.marginRight || '0', 10);
          totalWidth += card.offsetWidth + marginLeft + marginRight;
        }
        setCarouselWidth(totalWidth);
      }
    }
  }, []);

  // Animation for the scrolling testimonials
  const scrollVariants = {
    animate: {
      x: [0, -carouselWidth], // Only need to scroll the width of one set for seamless loop
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 40,
          ease: "linear",
        },
      },
    },
  };

  return (
    <section id="reviews" className="py-16 md:py-24 bg-liefson-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center mb-12">
          <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl text-liefson-dark-text font-semibold mb-4 tracking-tight">
            What our clients say
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Real experiences from people we've helped protect what matters most
          </p>
        </div>
      </div>
      
      {/* Scrolling testimonials section */}
      <div className="relative testimonial-scroll-container overflow-hidden">
        {/* Gradient fade on left side */}
        <div className="absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-liefson-white to-transparent z-10"></div>
        
        <motion.div 
          ref={containerRef}
          className="flex py-4 testimony-scroll"
          variants={scrollVariants}
          animate="animate"
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={`${testimonial.author}-${index}`} 
              {...testimonial}
              // Add testimonial-card class for width calculation
              className="testimonial-card"
            />
          ))}
        </motion.div>
        
        {/* Gradient fade on right side */}
        <div className="absolute right-0 top-0 h-full w-40 bg-gradient-to-l from-liefson-white to-transparent z-10"></div>
      </div>
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-16 h-16 md:w-24 md:h-24 bg-liefson-primary-light rounded-full opacity-10 blur-xl pointer-events-none"
        animate={{ 
          y: [0, 15, 0],
          x: [0, -10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/3 w-20 h-20 md:w-32 md:h-32 bg-liefson-primary-light rounded-full opacity-5 blur-xl pointer-events-none"
        animate={{ 
          y: [0, -20, 0],
          x: [0, 15, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </section>
  );
};

export default Testimonials; 