'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ShieldCheck, Home, TrendingUp, Puzzle, ArrowUpRight, LucideIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ServiceCardProps {
  bgColorClass: string;
  icon: LucideIcon;
  title: string;
  description: string;
  textColorClass: string;
  iconCustomColorClass?: string;
  exploreButtonTextColorClass?: string;
  index: number;
}

const cardScrollVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15, 
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const cardHoverTransition = { duration: 0.25, ease: "easeInOut" };

const cardContentVariants: Variants = {
  rest: { filter: 'blur(0px)', opacity: 1, transition: cardHoverTransition },
  hover: { filter: 'blur(4px)', opacity: 0.4, transition: cardHoverTransition },
};

const exploreButtonVariants: Variants = {
  rest: { opacity: 0, scale: 0.85, x: "-50%", y: "-50%", top: "50%", left: "50%", transition: { ...cardHoverTransition, delay: 0.05 } },
  hover: { opacity: 1, scale: 1, x: "-50%", y: "-50%", top: "50%", left: "50%", transition: { ...cardHoverTransition, delay: 0.05 } },
};

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  bgColorClass, 
  icon: IconComponent,
  title, 
  description, 
  textColorClass, 
  iconCustomColorClass,
  exploreButtonTextColorClass,
  index 
}) => {
  const router = useRouter();

  const handleNavigateToContact = () => {
    router.push('/contact');
  };

  return (
    <motion.div 
      className={`relative flex flex-col h-full p-6 ${bgColorClass} rounded-xl shadow-md min-h-[320px] md:min-h-[380px] overflow-hidden cursor-default`}
      variants={cardScrollVariants}
      custom={index}
      initial="rest"
      whileHover="hover"
    >
      <motion.div className="flex flex-col flex-grow" variants={cardContentVariants}>
        <div className={`mb-auto ${iconCustomColorClass || textColorClass}`}>
          <IconComponent size={28} strokeWidth={2} />
        </div>
        
        <div>
          <h3 className={`font-sans text-sm ${textColorClass} font-medium mb-1 leading-snug`}>{title}</h3>
          <p className={`font-sans text-sm ${textColorClass} leading-snug opacity-80`}>{description}</p>
        </div>
      </motion.div>

      <motion.button
        onClick={handleNavigateToContact}
        className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${exploreButtonTextColorClass} border-white/30 bg-gradient-to-br from-white/70 to-white/50 backdrop-blur-sm text-xs font-medium focus:outline-none whitespace-nowrap`}
        style={{ 
          position: 'absolute',
          top: '50%', 
          left: '50%', 
        }}
        variants={exploreButtonVariants}
      >
        <span>Explore Your Options</span>
        <ArrowUpRight size={16} strokeWidth={2} />
      </motion.button>
    </motion.div>
  );
};

const servicesData: ServiceCardProps[] = [
  {
    bgColorClass: 'bg-liefson-service-card-blue',
    icon: ShieldCheck, 
    title: 'Term Life Insurance',
    textColorClass: 'text-liefson-white',
    exploreButtonTextColorClass: 'text-liefson-white',
    description: 'Affordable coverage for a specific period with fixed premiums and guaranteed death benefits. Ideal for income replacement and specific financial obligations.',
    index: 0,
  },
  {
    bgColorClass: 'bg-liefson-primary',
    icon: Home, 
    textColorClass: 'text-liefson-white',
    exploreButtonTextColorClass: 'text-liefson-white',
    title: 'Permanent Life Insurance',
    description: 'Lifetime protection with cash value growth potential. Includes whole life, universal life, and indexed universal life options for long-term security.',
    index: 1,
  },
  {
    bgColorClass: 'bg-liefson-service-card-green',
    icon: TrendingUp,
    title: 'Annuities',
    textColorClass: 'text-liefson-white',
    exploreButtonTextColorClass: 'text-liefson-white',
    description: 'Tax-advantaged retirement income solutions with guaranteed payments for life. Options include fixed, variable, and indexed annuities to match your retirement goals.',
    index: 2,
  },
  {
    bgColorClass: 'bg-liefson-service-card-yellow',
    icon: Puzzle,
    title: 'Specialized Coverage',
    textColorClass: 'text-liefson-white',
    exploreButtonTextColorClass: 'text-liefson-white',
    description: 'Custom solutions for business owners, high-net-worth individuals, and those with specific health conditions. Finding the right carrier makes all the difference.',
    index: 3,
  },
];

const Services: React.FC = () => {
  const sectionContainerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.section 
      className="py-16 md:py-24 bg-liefson-white"
      variants={sectionContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12 md:mb-16" variants={textVariants}>
          <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl text-liefson-dark-text font-semibold mb-4 tracking-tight">
            Comprehensive protection for what matters most
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Licensed in all 50 states with access to over 20 insurance carriers.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {servicesData.map((service, index) => (
            <ServiceCard key={service.title} {...service} index={index} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Services; 