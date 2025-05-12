'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface LoaderScreenProps {
  message?: string;
}

const LoaderScreen: React.FC<LoaderScreenProps> = ({ message = 'Loading...' }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
    >
      <div className="text-center">
        <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-t-2 border-gray-500 border-t-green-400 mx-auto"></div>
        <p className="text-white text-sm">{message}</p>
      </div>
    </motion.div>
  );
};

export default LoaderScreen; 