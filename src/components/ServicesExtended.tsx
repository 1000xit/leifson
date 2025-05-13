'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LucideIcon,
  LifeBuoy,
  BarChart,
  ShieldCheck,
  HeartHandshake,
  Umbrella,
  FileText
} from 'lucide-react';

// Define the service data type explicitly for better type safety
interface ServiceData {
  id: string;
  title: string; // Simplified title for Nav
  fullTitle: string; // Full title for content heading
  Icon: LucideIcon; // Use LucideIcon type here
  content: React.ReactNode;
}

// Updated Data with types and simplified titles
const servicesExtendedData: ServiceData[] = [
    {
      id: 'term',
      title: 'Term Life Insurance',
      fullTitle: 'Term Life Insurance: Affordable Protection When You Need It Most',
      Icon: ShieldCheck,
      content: (
        <>
          <p className="mb-4">Term life insurance provides coverage for a specific period (typically 10, 20, or 30 years) at fixed premium rates. It pays a death benefit to your beneficiaries if you pass away during the term, offering straightforward financial protection for a set time period.</p>
          <h4 className="font-semibold text-liefson-dark-text mb-2">Key Benefits:</h4>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li>Most affordable form of life insurance</li>
            <li>Fixed premiums</li>
            <li>Coverage for specific time periods (10-30 years)</li>
          </ul>
          <h4 className="font-semibold text-liefson-dark-text mb-2">Ideal For:</h4>
          <p className="mb-4">Young families, mortgage protection, income replacement, specific timeframe needs.</p>
          <p className="italic">Example: "A healthy 30-year-old can get a 20 year term policy with $500,000 in coverage for as little as $30 per month"</p>
        </>
      ),
    },
    {
      id: 'iul',
      title: 'Indexed Universal Life',
      fullTitle: 'Indexed Universal Life: Growth Potential with Downside Protection',
      Icon: BarChart,
      content: (
        <>
          <p className="mb-4">Indexed Universal Life (IUL) insurance is a type of permanent life insurance offering a death benefit alongside a cash value component that can grow based on the performance of a stock market index (like the S&P 500), without direct investment risk. It typically includes a floor (often 0%) to protect against market losses and a cap on potential gains.</p>
          <h4 className="font-semibold text-liefson-dark-text mb-2">Key Benefits:</h4>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li>Market-linked growth potential (via index performance)</li>
            <li>Downside protection (guaranteed minimum interest rate, often 0%)</li>
            <li>Tax-advantaged cash accumulation (grows tax-deferred)</li>
            <li>Flexible premiums and death benefits (within limits)</li>
            <li>Potential for tax-free policy loans and withdrawals</li>
            <li>Includes Living Benefits riders</li>
          </ul>
          <h4 className="font-semibold text-liefson-dark-text mb-2">Ideal For:</h4>
          <p>Retirement planning, tax-advantaged growth strategies, individuals seeking protection with investment upside potential, high-income earners looking for supplemental retirement income.</p>
        </>
      ),
    },
     {
      id: 'whole',
      title: 'Whole Life Insurance',
      fullTitle: 'Whole Life Insurance: Lifetime Protection with Cash Value',
      Icon: LifeBuoy,
      content: (
        <>
          <p className="mb-4">Whole Life insurance is a type of permanent life insurance that provides coverage for your entire life, as long as premiums are paid. It features fixed premiums, a guaranteed death benefit, and a cash value component that grows at a guaranteed rate, tax-deferred. Policyholders may also receive dividends from mutual insurance companies.</p>
          <h4 className="font-semibold text-liefson-dark-text mb-2">Key Benefits:</h4>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li>Lifetime coverage guarantee</li>
            <li>Fixed, predictable premiums</li>
            <li>Guaranteed cash value accumulation (tax-deferred)</li>
            <li>Potential to earn dividends (not guaranteed)</li>
          </ul>
          <h4 className="font-semibold text-liefson-dark-text mb-2">Ideal For:</h4>
          <p>Permanent insurance needs, estate planning goals, creating a guaranteed inheritance, conservative long-term cash value growth.</p>
        </>
      ),
    },
     {
      id: 'living',
      title: 'Living Benefits',
      fullTitle: "Living Benefits: Insurance That Works While You're Alive", // Escaped apostrophe
      Icon: HeartHandshake,
      content: (
        <>
          <p className="mb-4">Living benefits, often included as riders on life insurance policies (especially IUL and Whole Life), allow the policyholder to access a portion of their death benefit while still alive if they experience a qualifying critical, chronic, or terminal illness. This provides financial flexibility during challenging health events.</p>
          <div className="bg-liefson-light-blue/10 p-4 rounded-lg my-4 border border-liefson-primary/30">
              <h4 className="font-semibold text-liefson-dark-text mb-2">A Personal Note:</h4>
              <p className="italic text-sm">"My journey into insurance began with a deeply personal experience. When my uncle was diagnosed with ALS (Amyotrophic Lateral Sclerosis), our family witnessed firsthand the devastating physical and financial impact of this progressive disease. As his condition rapidly deteriorated, he lost the ability to work and medical expenses mounted quickly. What saved our family from financial devastation was his foresight in securing a life insurance policy with living benefits. This critical feature allowed him to access a portion of his death benefit while still alive to help cover his specialized care needs."</p>
          </div>
        </>
      ),
    },
    {
      id: 'medicare',
      title: 'Medicare Solutions',
      fullTitle: 'Medicare Solutions: Navigating Your Healthcare Options',
      Icon: Umbrella,
      content: (
        <>
          <p className="mb-4">Medicare can be complex and confusing. We help seniors and eligible individuals understand their Medicare options and find the right coverage for their healthcare needs and budget. From Original Medicare to Medicare Advantage, Supplement plans, and Part D prescription coverage, we'll guide you through the entire process.</p>
          <h4 className="font-semibold text-liefson-dark-text mb-2">Key Benefits:</h4>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li>Expert guidance through Medicare enrollment</li>
            <li>Personalized plan comparison</li>
            <li>Explanation of coverage options in plain language</li>
            <li>Ongoing support as your needs change</li>
          </ul>
          <h4 className="font-semibold text-liefson-dark-text mb-2">Ideal For:</h4>
          <p>Adults 65+, individuals on disability, those approaching Medicare eligibility.</p>
        </>
      ),
    },
     {
      id: 'aca',
      title: 'Health Insurance Marketplace (ACA)',
      fullTitle: 'Health Insurance Marketplace: Affordable Coverage for Individuals & Families',
      Icon: FileText,
      content: (
        <>
          <p className="mb-4">Navigating the Health Insurance Marketplace (ACA/Obamacare) doesn't have to be overwhelming. We help individuals and families understand their options, determine subsidy eligibility, and select plans that provide the right balance of coverage and affordability. Our service continues after enrollment with support for claims, appeals, and annual reviews.</p>
          <h4 className="font-semibold text-liefson-dark-text mb-2">Key Benefits:</h4>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li>Plan comparison and selection assistance</li>
            <li>Subsidy eligibility determination</li>
            <li>Year-round support for claims and changes</li>
            <li>Special enrollment period guidance</li>
          </ul>
          <h4 className="font-semibold text-liefson-dark-text mb-2">Ideal For:</h4>
          <p>Self-employed individuals, those without employer-sponsored coverage, families needing comprehensive health insurance.</p>
        </>
      ),
    },
];

// --- Main Component ---
const ServicesExtended: React.FC = () => {
  const [activeServiceId, setActiveServiceId] = useState<string>(servicesExtendedData[0].id);
  
  // Get the currently active service data
  const activeService = servicesExtendedData.find(service => service.id === activeServiceId) || servicesExtendedData[0];

  // Animation variants
  const sectionContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.1, duration: 0.5 } },
  };

  const cardContentVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    <motion.section
      className="py-16 md:py-24 bg-white relative" 
      variants={sectionContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Add all styles in a single global style tag at the component level */}
      <style jsx global>{`
        /* Scrollbar styles for Webkit browsers */
        .custom-scrollbar::-webkit-scrollbar {
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(203, 213, 225, 0.4);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(203, 213, 225, 0.7);
        }
        
        /* Firefox scrollbar styles */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(203, 213, 225, 0.4) transparent;
        }
        
        /* Float animation for decorative elements */
        @keyframes float-slow {
          0% { transform: translateY(0) translateX(0) rotate(0); }
          33% { transform: translateY(-8px) translateX(5px) rotate(2deg); }
          66% { transform: translateY(4px) translateX(-4px) rotate(-1deg); }
          100% { transform: translateY(0) translateX(0) rotate(0); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
         {/* --- Section Header --- */}
         <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
         >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-liefson-dark-text font-semibold mb-4 tracking-tight">
            Explore Our Solutions
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Select a service to learn more about our offerings.
          </p>
        </motion.div>

        {/* --- Tab Navigation (Desktop) --- */}
        <div className="hidden md:block w-full mb-8 relative">
          <div 
            className="overflow-x-auto pb-1 custom-scrollbar px-3"
          >
            <div className="inline-flex flex-nowrap space-x-2 pl-1 pt-3 pb-1">
              {servicesExtendedData.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveServiceId(service.id)}
                  className={`flex items-center whitespace-nowrap px-4 py-2 text-sm font-medium rounded-full transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-liefson-primary
                    ${activeServiceId === service.id
                      ? 'bg-liefson-primary text-white shadow-sm' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                >
                  <service.Icon
                    className="mr-2 h-4 w-4 flex-shrink-0"
                    aria-hidden="true"
                    strokeWidth={activeServiceId === service.id ? 2 : 1.5}
                  />
                  <span>{service.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- Mobile Navigation (Dropdown) --- */}
        <div className="md:hidden mb-6">
          <select
            value={activeServiceId}
            onChange={(e) => setActiveServiceId(e.target.value)}
            className="block w-full pl-3 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-liefson-primary focus:border-liefson-primary rounded-md shadow-sm"
          >
            {servicesExtendedData.map(service => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
          </select>
        </div>

        {/* The Glass Card - Enhanced with more depth and visual interest */}
        <motion.div
          className="rounded-xl overflow-hidden relative mx-auto"
          initial={false}
        >
          {/* Card Background Layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/70 to-white/60 backdrop-blur-md z-0"></div>
          
          {/* Enhanced Border */}
          <div className="absolute inset-0 rounded-xl border border-white/30 z-10"></div>
          <div className="absolute inset-0 rounded-xl border-t border-l border-white/50 z-10" 
               style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
          <div className="absolute inset-0 rounded-xl border-r border-b border-black/5 z-10" 
               style={{ clipPath: 'polygon(100% 100%, 0 100%, 100% 0)' }}></div>
               
          {/* Ambient Light Effect */}
          <div className="absolute -top-[40%] -right-[20%] w-[70%] h-[70%] bg-liefson-primary/15 rounded-full blur-3xl z-0 opacity-70"></div>
          <div className="absolute -bottom-[30%] -left-[20%] w-[60%] h-[60%] bg-liefson-light-blue/20 rounded-full blur-3xl z-0 opacity-60"></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-[5%] left-[7%] w-20 h-20 border border-white/20 rounded-full z-0 opacity-40 animate-float-slow"></div>
          <div className="absolute bottom-[8%] right-[10%] w-12 h-12 border border-white/30 rounded-full z-0 opacity-30 animate-float-slow animation-delay-1000"></div>
          <div className="absolute top-[20%] right-[15%] w-8 h-8 bg-liefson-primary/10 rounded-full z-0 blur-sm animate-float-slow animation-delay-2000"></div>
          
          {/* Glass Frost Effect */}
          <div className="absolute inset-x-0 top-0 h-[10%] bg-gradient-to-b from-white/40 to-transparent z-0"></div>
          <div className="absolute inset-y-0 left-0 w-[10%] bg-gradient-to-r from-white/30 to-transparent z-0"></div>
          
          {/* Main Card Content Container */}
          <div className="relative shadow-sm min-h-[350px] sm:min-h-[400px] md:min-h-[500px] z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeServiceId}
                className="px-5 py-6 sm:px-7 sm:py-8 md:p-10 relative backdrop-blur-sm"
                variants={cardContentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {/* Card Title Section with enhanced styling */}
                <div className="relative mb-4 sm:mb-6 pb-3 sm:pb-5 border-b border-liefson-primary/10">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold font-serif text-liefson-dark-text">
                    {activeService.fullTitle}
                  </h3>
                  <div className="absolute -bottom-1 left-0 w-12 sm:w-16 h-[3px] bg-liefson-primary rounded-full"></div>
                </div>
                
                {/* Card Content */}
                <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none text-gray-800 font-sans text-base leading-relaxed">
                  {activeService.content}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div
          className="mt-8 sm:mt-12 text-center space-y-3 sm:space-y-4 md:space-y-0 md:space-x-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-liefson-primary hover:bg-liefson-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-liefson-primary transition duration-150 ease-in-out">
            Find The Best Rate
          </button>
          <button className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-liefson-primary text-base font-medium rounded-full text-liefson-primary bg-white hover:bg-liefson-light-blue/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-liefson-primary transition duration-150 ease-in-out">
            Call Today
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ServicesExtended; 