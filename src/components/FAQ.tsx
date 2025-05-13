'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  question: string;
  answer: React.ReactNode; // Allow JSX in answers
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="flex items-center justify-between w-full py-4 sm:py-5 px-4 sm:px-6 text-left focus:outline-none group"
        onClick={onClick}
      >
        <span className="font-sans font-medium text-sm sm:text-base md:text-lg text-liefson-dark-text group-hover:text-liefson-primary transition-colors duration-200 pr-2">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 ml-2"
        >
          <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${isOpen ? 'text-liefson-primary' : 'text-gray-500'} group-hover:text-liefson-primary`} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="pb-4 sm:pb-6 px-4 sm:px-6 text-gray-600 font-sans text-sm sm:text-base leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const faqData = [
  {
    id: 'what-is',
    question: 'What is life insurance and why do I need it?',
    answer: "Life insurance is a contract that provides a tax-free payout to your beneficiaries if you pass away. It's designed to protect your loved ones financially by covering expenses like mortgages, debts, education, and daily living costs.",
  },
  {
    id: 'how-much',
    question: 'How much life insurance coverage do I need?',
    answer: "It depends on your income, debts, future expenses (like college tuition), and your family's lifestyle needs. A personalized needs analysis is the best approach to determine coverage needs.",
  },
  {
    id: 'term-vs-perm',
    question: 'What\'s the difference between term and permanent life insurance?',
    answer: (
        <>
            <p className="mb-2">Term life covers you for a set period (e.g., 10, 20, or 30 years) and is generally more affordable.</p>
            <p>Permanent life covers you for life and can build cash value over time, but typically is more expensive initially.</p>
        </>
    )
  },
  {
    id: 'multiple-policies',
    question: 'Can I have more than one life insurance policy?',
    answer: "Yes. Many people layer policies to match different financial needs at different stages of life (such as combining a 20-year term policy with a permanent policy).",
  },
  {
    id: 'work-coverage',
    question: 'Does life insurance through my job provide enough coverage?',
    answer: "Employer-provided coverage is a great benefit, but it's often not enough on its own. Plus, you typically lose it if you leave the company. Having your own policy ensures continuous protection.",
  },
  {
    id: 'rate-factors',
    question: 'What factors affect my life insurance rates?',
    answer: "Rates are based on your age, health, lifestyle, occupation, and coverage amount. The younger and healthier you are when you apply, the lower your premiums typically are.",
  },
   {
    id: 'medical-exam',
    question: 'Do I need a medical exam to get life insurance?',
    answer: "Some policies require a medical exam; others don't. We work with multiple carriers, including no-exam options, depending on your health profile and coverage needs.",
  },
  {
    id: 'cost',
    question: 'Is life insurance expensive?',
    answer: "Most people are surprised at how affordable life insurance can be, especially if you apply while you're young and healthy. We offer a range of solutions to fit nearly every budget.",
  },
];

const FAQ: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const sectionContainerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.08, delayChildren: 0.2 } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.section 
      className="py-12 sm:py-16 md:py-24 bg-liefson-light-blue/10"
      variants={sectionContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-8 sm:mb-12 md:mb-16" variants={itemVariants}>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-liefson-dark-text font-semibold mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl shadow-md overflow-hidden"
          variants={itemVariants}
        >
          {faqData.map((item) => (
            <AccordionItem
              key={item.id}
              question={item.question}
              answer={item.answer}
              isOpen={openAccordion === item.id}
              onClick={() => toggleAccordion(item.id)}
            />
          ))}
        </motion.div>

        <motion.div className="mt-8 sm:mt-12 text-center text-gray-600 text-sm sm:text-base" variants={itemVariants}>
           <p>Don't see your question? <a href="#contact" className="text-liefson-primary hover:underline font-medium">Contact us directly!</a></p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FAQ; 