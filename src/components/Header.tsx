'use client'; // Need this for useState

import React, { useState } from 'react'; // Added useState
import Image from 'next/image';
import Link from 'next/link'; // Using Next.js Link component
import { motion, AnimatePresence } from 'framer-motion'; // Standard import
import CalendlyDialog from './CalendlyDialog'; // Import the Calendly dialog component

// Basic hamburger/close icons - Updated stroke color
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  
  const calendlyUrl = "https://calendly.com/amplifi-financial/15min?month=2025-05";

  const navLinks = [
    { href: "#carriers", label: "Our Carriers" },
    { href: "#services", label: "Services" },
    { href: "#reviews", label: "Reviews" },
    { href: "/contact", label: "Contact Us" },
  ];

  const mobileMenuVariants = {
    closed: { opacity: 0, y: -20, transition: { duration: 0.2 } },
    open: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };
  
  // Open Calendly dialog
  const handleOpenCalendly = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsCalendlyOpen(true);
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  // Handle navigation - combines smooth scrolling for hash links and regular navigation for page links
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // For hash links (internal page sections)
    if (href.startsWith('#')) {
      e.preventDefault();
      
      // Close mobile menu if open
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
      
      // Get the target element
      const target = document.querySelector(href);
      if (!target) return;
      
      // Get the target's position
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      
      // Calculate 20vh offset (20% of viewport height)
      const offset = window.innerHeight * 0.2;
      
      // Scroll to the target element minus the offset for better positioning
      window.scrollTo({
        top: targetPosition - offset,
        behavior: 'smooth'
      });
      
      // Update the URL without page reload
      window.history.pushState(null, '', href);
    } else {
      // For regular page links, let the default navigation happen
      // Close mobile menu if open
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    }
  };

  // Helper component for animated links
  const AnimatedLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link 
      href={href}
      // Updated hover text color, base text color inherited
      className="relative group hover:text-gray-600 transition-colors duration-200 motion-reduce:transition-none font-sans"
    >
      {children}
      {/* Underline pseudo-element - Updated color */}
      <span 
        className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out origin-center motion-reduce:transform-none motion-reduce:transition-none"
      />
    </Link>
  );

  return (
    <>
      {/* Calendly Dialog */}
      <CalendlyDialog 
        isOpen={isCalendlyOpen} 
        onClose={() => setIsCalendlyOpen(false)} 
        calendlyUrl={calendlyUrl}
      />
      
      {/* Outer header: sticky, full-width, dark blue background */}
      <header className="sticky top-0 z-50 w-full pt-4 pb-2 bg-liefson-primary px-4 sm:px-0">
        {/* Pill-shaped nav: centered, specific width, white background, no shadow (or subtle if preferred) */}
        <nav 
          className="max-w-7xl mx-auto px-6 py-3 bg-liefson-white rounded-full sm:px-8 lg:px-10" // Base px-6, sm:px-8, lg:px-10
        >
          <div className="flex items-center justify-between h-10"> {/* Height set by user to h-10 */}
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image src="/Leifson.svg" alt="Liefson Logo" width={115} height={36} /> {/* Scaled up logo further */}
              </Link>
            </div>

            {/* Desktop Centered Nav Links */}
            <div className="hidden md:flex items-center space-x-8"> {/* Increased space */}
              {navLinks.slice(0, 3).map((link) => (
                <a 
                  key={link.href} 
                  href={link.href}
                  onClick={(e) => handleNavigation(e, link.href)}
                  className="relative group text-liefson-dark-text text-md font-medium cursor-pointer"
                >
                  <motion.span
                    className="inline-block"
                    whileHover={{ y: -2, scale: 1.05 }} 
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {link.label}
                  </motion.span>
                  <span className="absolute bottom-[-2px] left-0 w-full h-[1.5px] bg-liefson-primary-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out origin-center" />
                </a>
              ))}
            </div>

            {/* Desktop Right Aligned Links & Button */}
            <div className="hidden md:flex items-center space-x-6"> {/* Increased space */}
              <a 
                href={navLinks[3].href}
                onClick={(e) => handleNavigation(e, navLinks[3].href)}
                className="relative group text-liefson-dark-text text-md font-medium cursor-pointer"
              >
                <motion.span
                  className="inline-block"
                  whileHover={{ y: -2, scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {navLinks[3].label}
                </motion.span>
                <span className="absolute bottom-[-2px] left-0 w-full h-[1.5px] bg-liefson-primary-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out origin-center" />
              </a>
              <a 
                href="#"
                onClick={handleOpenCalendly}
                className="relative group text-liefson-dark-text text-md font-medium"
              >
                <motion.button 
                  className="bg-liefson-primary-light text-liefson-primary transition-opacity px-2 py-1.5 rounded-full flex items-center space-x-3 text-sm font-medium"
                  whileHover={{ scale: 1.03, opacity: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <span className="font-sans font-regular pl-2 text-base">Get a quote</span>
                  <span 
                    className="bg-liefson-white text-liefson-primary rounded-full w-8 h-8 flex items-center justify-center text-md"
                  >
                    →
                  </span>
                </motion.button>
              </a>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="-mr-2 flex md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="p-2 rounded-md text-liefson-dark-text hover:text-liefson-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-liefson-primary-light"
                aria-expanded={isMenuOpen}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden absolute top-full left-0 right-0 mx-4 mt-2 bg-liefson-white rounded-xl shadow-lg py-4 z-40"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="flex flex-col space-y-3 px-4">
                {navLinks.map((link) => (
                  <a 
                    key={link.href} 
                    href={link.href}
                    onClick={(e) => handleNavigation(e, link.href)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-liefson-dark-text hover:bg-liefson-primary-light hover:text-liefson-primary"
                  >
                    {link.label}
                  </a>
                ))}
                <a href="#" className="w-full" onClick={handleOpenCalendly}>
                  <button className="w-full bg-liefson-primary-light text-liefson-primary px-4 py-2.5 rounded-lg flex items-center justify-center space-x-2 text-sm font-semibold">
                    <span>Get a quote</span>
                    <span className="bg-liefson-white text-liefson-primary rounded-full w-6 h-6 flex items-center justify-center text-sm">
                      →
                    </span>
                  </button>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header; 