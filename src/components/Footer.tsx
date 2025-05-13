'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, Clock, MapPin, ExternalLink, ChevronRight } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-liefson-primary text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & About Column */}
          <div className="space-y-6">
            <div className="flex items-center">
              <Image 
                src="/leifsoniconwhite.svg" 
                alt="Leifson Insurance" 
                width={40} 
                height={45} 
                className="w-auto h-10"
              />
            </div>
            <p className="text-liefson-subheader text-sm leading-relaxed pr-4">
              Protecting families across America with personalized insurance solutions since 2015.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link href="https://twitter.com" className="text-white/70 hover:text-white transition-colors duration-200" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="https://linkedin.com" className="text-white/70 hover:text-white transition-colors duration-200" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>
              <Link href="https://facebook.com" className="text-white/70 hover:text-white transition-colors duration-200" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Contact Information Column */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium tracking-wide">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="w-5 h-5 mr-3 mt-0.5 text-liefson-primary-light flex-shrink-0" />
                <span>678-713-6452</span>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-3 mt-0.5 text-liefson-primary-light flex-shrink-0" />
                <a href="mailto:colby@leifson.com" className="hover:text-liefson-primary-light transition-colors">
                  colby@leifson.com
                </a>
              </li>
              <li className="flex items-start">
                <Clock className="w-5 h-5 mr-3 mt-0.5 text-liefson-primary-light flex-shrink-0" />
                <span>Monday–Friday, 9 AM–6 PM ET <br/> Weekends by appointment</span>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-6 lg:pl-6">
            <h3 className="text-lg font-medium tracking-wide">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="flex items-center text-white/80 hover:text-white transition-colors">
                  <ChevronRight className="w-4 h-4 mr-1 text-liefson-primary-light" />
                  <span>Term Life Insurance</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center text-white/80 hover:text-white transition-colors">
                  <ChevronRight className="w-4 h-4 mr-1 text-liefson-primary-light" />
                  <span>Permanent Life Insurance</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center text-white/80 hover:text-white transition-colors">
                  <ChevronRight className="w-4 h-4 mr-1 text-liefson-primary-light" />
                  <span>Medicare Solutions</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center text-white/80 hover:text-white transition-colors">
                  <ChevronRight className="w-4 h-4 mr-1 text-liefson-primary-light" />
                  <span>ACA/Health Insurance</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Pages Column */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium tracking-wide">Pages</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="flex items-center text-white/80 hover:text-white transition-colors">
                  <ChevronRight className="w-4 h-4 mr-1 text-liefson-primary-light" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="flex items-center text-white/80 hover:text-white transition-colors">
                  <ChevronRight className="w-4 h-4 mr-1 text-liefson-primary-light" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="flex items-center text-white/80 hover:text-white transition-colors">
                  <ChevronRight className="w-4 h-4 mr-1 text-liefson-primary-light" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="flex items-center text-white/80 hover:text-white transition-colors">
                  <ChevronRight className="w-4 h-4 mr-1 text-liefson-primary-light" />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-white/60 text-xs leading-relaxed mb-6 max-w-5xl">
            Leifson Insurance is a marketing company offering a wide range of insurance products and services through a network of independent affiliates. We do not provide legal, tax, or investment advice. Insurance products are offered through Leifson Insurance and its affiliated partners, subject to underwriting approval and availability by state. Leifson Insurance is licensed in all 50 U.S. states and the District of Columbia.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              &copy; {currentYear} Leifson Insurance. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link href="/privacy" className="text-white/60 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/60 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 