'use client';

import React, { useState, FormEvent } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Image from 'next/image';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    insuranceType: '',
    message: ''
  });
  
  const [submitStatus, setSubmitStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    message: ''
  });

  const calendlyUrl = "https://calendly.com/amplifi-financial/15min";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.firstName || !formData.email || !formData.message) {
      setSubmitStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        message: 'Please fill out all required fields.'
      });
      return;
    }
    
    setSubmitStatus({
      isSubmitting: true,
      isSuccess: false,
      isError: false,
      message: ''
    });
    
    try {
      const webhookUrl = 'https://hook.us1.make.com/oo8v2yif1h4mw9yd1jjgk3b9ybg7t460';
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          insuranceType: formData.insuranceType,
          message: formData.message,
          source: 'Leifson Website Contact Form',
          timestamp: new Date().toISOString()
        }),
      });
      
      if (response.ok) {
        setSubmitStatus({
          isSubmitting: false,
          isSuccess: true,
          isError: false,
          message: 'Your message has been sent successfully! We\'ll get back to you soon.'
        });
        
        // Reset form after successful submission
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          insuranceType: '',
          message: ''
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      setSubmitStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        message: 'There was an error sending your message. Please try again later.'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-liefson-dark-text mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're here to help you protect what matters most. Reach out to us with any questions about life insurance options.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Info Column */}
            <div className="lg:col-span-1">
              <div className="bg-liefson-white rounded-xl p-8 shadow-sm border border-gray-100">
                {/* Colby's Profile Card */}
                <div className="flex flex-col items-center text-center mb-8 pb-8 border-b border-gray-100">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-liefson-primary-light/30 shadow-md">
                    <Image 
                      src="/colbyleifson.jpg" 
                      alt="Colby Leifson" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-liefson-dark-text">Colby Leifson</h3>
                  <p className="text-sm text-gray-600 mt-1">Founder & Insurance Specialist</p>
                  <p className="text-xs text-gray-500 mt-2 italic">
                    "Our mission is to provide every family with the protection they deserve through transparent guidance, unbiased recommendations, and personalized insurance solutions."
                  </p>
                </div>
                
                <h2 className="text-2xl font-serif font-semibold text-liefson-dark-text mb-6">
                  Get In Touch
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Phone className="h-5 w-5 text-liefson-primary" />
                    </div>
                    <div className="ml-4">
                      <p className="text-base font-medium text-liefson-dark-text">Phone</p>
                      <p className="mt-1 text-sm text-gray-600">678-713-6452</p>
                      <p className="mt-1 text-xs text-gray-500">Monday-Friday, 9AM-6PM ET</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Mail className="h-5 w-5 text-liefson-primary" />
                    </div>
                    <div className="ml-4">
                      <p className="text-base font-medium text-liefson-dark-text">Email</p>
                      <p className="mt-1 text-sm text-gray-600">colby@leifson.com</p>
                      <p className="mt-1 text-xs text-gray-500">We'll respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <MapPin className="h-5 w-5 text-liefson-primary" />
                    </div>
                    <div className="ml-4">
                      <p className="text-base font-medium text-liefson-dark-text">Location</p>
                      <p className="mt-1 text-sm text-gray-600">11405 Old Roswell Road</p>
                      <p className="mt-1 text-sm text-gray-600">Alpharetta, GA 30009</p>
                      <p className="mt-1 text-xs text-gray-500">Serving clients nationwide</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Clock className="h-5 w-5 text-liefson-primary" />
                    </div>
                    <div className="ml-4">
                      <p className="text-base font-medium text-liefson-dark-text">Hours</p>
                      <p className="mt-1 text-sm text-gray-600">Monday - Friday: 9AM - 6PM ET</p>
                      <p className="mt-1 text-xs text-gray-500">Weekend consultations available by appointment</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-5 w-5 text-liefson-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-base font-medium text-liefson-dark-text">Coverage</p>
                      <p className="mt-1 text-sm text-gray-600">Licensed in all 50 states</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Column */}
            <div className="lg:col-span-2">
              <div className="bg-liefson-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-serif font-semibold text-liefson-dark-text mb-6">
                  Send Us a Message
                </h2>
                
                {submitStatus.isSuccess ? (
                  <div>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center mb-8">
                      <svg className="h-12 w-12 text-green-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="text-lg font-medium text-green-800 mb-2">Thank You!</h3>
                      <p className="text-green-700 mb-4">{submitStatus.message}</p>
                      <button
                        onClick={() => setSubmitStatus(prev => ({ ...prev, isSuccess: false }))}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Send Another Message
                      </button>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-xl font-serif font-semibold text-liefson-dark-text mb-4 text-center">
                        Want to speed things up?
                      </h3>
                      <p className="text-gray-600 mb-6 text-center">
                        Find a time that works for you below to schedule a quick consultation with our team.
                      </p>
                      <div className="calendly-embed-container" style={{ minHeight: "650px" }}>
                        <iframe
                          src={calendlyUrl}
                          width="100%"
                          height="650"
                          frameBorder="0"
                          title="Schedule appointment"
                          className="rounded-lg shadow-sm"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    {submitStatus.isError && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 mb-4">
                        <p>{submitStatus.message}</p>
                      </div>
                    )}
                  
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                          First name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative mt-1">
                          <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            autoComplete="given-name"
                            placeholder="Your first name"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="block w-full appearance-none bg-white rounded-xl border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-liefson-primary-light focus:border-liefson-primary transition-colors shadow-sm bg-gradient-to-r from-white to-liefson-white"
                          />
                          <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-liefson-primary-light/10 to-transparent rounded-l-xl pointer-events-none"></div>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                          Last name
                        </label>
                        <div className="relative mt-1">
                          <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            autoComplete="family-name"
                            placeholder="Your last name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="block w-full appearance-none bg-white rounded-xl border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-liefson-primary-light focus:border-liefson-primary transition-colors shadow-sm bg-gradient-to-r from-white to-liefson-white"
                          />
                          <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-liefson-primary-light/10 to-transparent rounded-l-xl pointer-events-none"></div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative mt-1">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          autoComplete="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="block w-full appearance-none bg-white rounded-xl border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-liefson-primary-light focus:border-liefson-primary transition-colors shadow-sm bg-gradient-to-r from-white to-liefson-white"
                        />
                        <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-liefson-primary-light/10 to-transparent rounded-l-xl pointer-events-none"></div>
                      </div>
                      <p className="mt-1.5 text-xs text-gray-500">We'll never share your email with anyone else.</p>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <div className="relative mt-1">
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          autoComplete="tel"
                          placeholder="(123) 456-7890"
                          value={formData.phone}
                          onChange={handleChange}
                          className="block w-full appearance-none bg-white rounded-xl border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-liefson-primary-light focus:border-liefson-primary transition-colors shadow-sm bg-gradient-to-r from-white to-liefson-white"
                        />
                        <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-liefson-primary-light/10 to-transparent rounded-l-xl pointer-events-none"></div>
                      </div>
                      <p className="mt-1.5 text-xs text-gray-500">For quicker responses to urgent inquiries.</p>
                    </div>

                    <div>
                      <label htmlFor="insuranceType" className="block text-sm font-medium text-gray-700">
                        I'm interested in
                      </label>
                      <div className="relative mt-1">
                        <select
                          id="insuranceType"
                          name="insuranceType"
                          value={formData.insuranceType}
                          onChange={handleChange}
                          className="block w-full appearance-none bg-white rounded-xl border border-gray-300 px-4 py-3 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-liefson-primary-light focus:border-liefson-primary transition-colors shadow-sm bg-gradient-to-r from-white to-liefson-white"
                        >
                          <option value="">Select your insurance interest...</option>
                          <option value="Term Life Insurance">Term Life Insurance</option>
                          <option value="Whole Life Insurance">Whole Life Insurance</option>
                          <option value="Indexed Universal Life Insurance">Indexed Universal Life Insurance</option>
                          <option value="Medicare Solutions">Medicare Solutions</option>
                          <option value="Health Insurance Marketplace (ACA)">Health Insurance Marketplace (ACA)</option>
                          <option value="Other/Not Sure">Other/Not Sure</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <svg className="h-5 w-5 text-liefson-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-liefson-primary-light/10 to-transparent rounded-l-xl pointer-events-none"></div>
                      </div>
                      <p className="mt-1.5 text-xs text-gray-500">Select the type of insurance you're most interested in learning about.</p>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <div className="relative mt-1">
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          placeholder="Tell us about your insurance needs..."
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="block w-full appearance-none bg-white rounded-xl border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-liefson-primary-light focus:border-liefson-primary transition-colors shadow-sm"
                        />
                        <div className="absolute top-0 left-0 h-12 w-12 bg-gradient-to-r from-liefson-primary-light/10 to-transparent rounded-tl-xl pointer-events-none"></div>
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={submitStatus.isSubmitting}
                        className={`w-full inline-flex justify-center items-center rounded-full border border-transparent bg-gradient-to-r from-liefson-primary to-liefson-primary/90 px-6 py-3.5 text-base font-medium text-white shadow-sm hover:from-liefson-primary/95 hover:to-liefson-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-liefson-primary transition-all group ${submitStatus.isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        {submitStatus.isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </>
                        )}
                      </button>
                      <p className="mt-2 text-xs text-center text-gray-500">We typically respond within 1 business day.</p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 