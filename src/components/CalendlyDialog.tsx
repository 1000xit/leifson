'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface CalendlyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  calendlyUrl: string;
}

const CalendlyDialog: React.FC<CalendlyDialogProps> = ({ isOpen, onClose, calendlyUrl }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  
  // Close dialog when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent scrolling when dialog is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Close dialog when pressing escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };
  
  const dialogVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { 
        type: 'spring',
        duration: 0.5,
        bounce: 0.2
      } 
    },
    exit: { 
      opacity: 0, 
      y: 20, 
      scale: 0.95, 
      transition: { duration: 0.2 } 
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-liefson-dark-text/70 backdrop-blur-sm"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
          />
          
          {/* Dialog */}
          <motion.div
            ref={dialogRef}
            className="relative z-10 bg-white rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-xl"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dialogVariants}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 bg-white rounded-full p-1 text-gray-500 hover:text-liefson-primary transition-colors shadow-md"
              aria-label="Close dialog"
            >
              <X size={24} />
            </button>
            
            {/* Calendly iframe */}
            <div className="calendly-embed-container w-full h-[600px]">
              <iframe
                src={calendlyUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                title="Schedule appointment"
                className="min-h-[600px]"
              ></iframe>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CalendlyDialog; 