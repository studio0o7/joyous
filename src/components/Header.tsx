'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Theme colors - match with HeroSection
  const goldLight = '#f8d008';
  const goldDark = '#d4af37';

  // Handle scroll events for potential other effects
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Call once to initialize
    handleScroll();

    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when clicking a link
  const handleNavLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20 relative z-50"> {/* Added z-50 to ensure it stays above mobile menu */}
          {/* Logo - Fixed dimensions */}
          <div className="flex items-center flex-shrink-0">
            <Image
              src="/images/Logo2.png"
              alt="Joyous Chess Logo"
              width={180}
              height={72}
              className="h-16 w-auto"
              priority
            />
          </div>

          {/* Navigation - Fixed spacing */}
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#home" className="text-white hover:text-yellow-400 transition-colors font-medium text-sm whitespace-nowrap">
                Home
              </a>
              <a href="#programs" className="text-white hover:text-yellow-400 transition-colors font-medium text-sm whitespace-nowrap">
                Programs
              </a>
              <a href="#tournaments" className="text-white hover:text-yellow-400 transition-colors font-medium text-sm whitespace-nowrap">
                Tournaments
              </a>
              <a href="#about" className="text-white hover:text-yellow-400 transition-colors font-medium text-sm whitespace-nowrap">
                About
              </a>
              <a href="#contact" className="text-white hover:text-yellow-400 transition-colors font-medium text-sm whitespace-nowrap">
                Contact
              </a>
            </nav>

            {/* CTA Button - Styled like the gold button in HeroSection */}
            <motion.button 
              className="group relative font-tenor-sans font-semibold transition-all duration-300 overflow-hidden pointer-events-auto"
              style={{
                background: `rgba(25,58,134,0.3)`,
                border: `2px solid ${goldDark}`,
                color: goldLight,
                boxShadow: `
                  0 5px 15px rgba(212,175,55,0.2),
                  0 2px 8px rgba(0,0,0,0.3)
                `,
                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                padding: '0.6rem 1.2rem',
                fontSize: '0.9rem',
                borderRadius: '0.5rem'
              }}
              whileHover={{ 
                scale: 1.05,
                background: 'rgba(25,58,134,0.35)',
                boxShadow: `
                  0 7px 20px rgba(212,175,55,0.3),
                  0 3px 12px rgba(0,0,0,0.4)
                `,
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Chess pattern overlay that appears on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `
                    linear-gradient(45deg, rgba(246,198,70,0.4) 25%, transparent 25%),
                    linear-gradient(-45deg, rgba(246,198,70,0.4) 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, rgba(246,198,70,0.4) 75%),
                    linear-gradient(-45deg, transparent 75%, rgba(246,198,70,0.4) 75%)
                  `,
                  backgroundSize: '8px 8px',
                  backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px'
                }}
              />
              <span className="relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:font-bold">
                Book Free Class
              </span>
            </motion.button>

            {/* Mobile menu button - Fixed size */}
            <button 
              className="md:hidden p-2 text-white flex-shrink-0 z-50 relative" 
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 md:hidden pt-20 bg-blue-900/95 backdrop-blur-md"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col items-center space-y-6 p-6">
              <a 
                href="#home" 
                className="text-white hover:text-yellow-400 transition-colors font-medium text-lg"
                onClick={handleNavLinkClick}
              >
                Home
              </a>
              <a 
                href="#programs" 
                className="text-white hover:text-yellow-400 transition-colors font-medium text-lg"
                onClick={handleNavLinkClick}
              >
                Programs
              </a>
              <a 
                href="#tournaments" 
                className="text-white hover:text-yellow-400 transition-colors font-medium text-lg"
                onClick={handleNavLinkClick}
              >
                Tournaments
              </a>
              <a 
                href="#about" 
                className="text-white hover:text-yellow-400 transition-colors font-medium text-lg"
                onClick={handleNavLinkClick}
              >
                About
              </a>
              <a 
                href="#contact" 
                className="text-white hover:text-yellow-400 transition-colors font-medium text-lg"
                onClick={handleNavLinkClick}
              >
                Contact
              </a>
              
              <motion.button 
                className="group relative font-tenor-sans font-semibold transition-all duration-300 overflow-hidden mt-4 w-full max-w-xs"
                style={{
                  background: `rgba(25,58,134,0.5)`,
                  border: `2px solid ${goldDark}`,
                  color: goldLight,
                  boxShadow: `
                    0 5px 15px rgba(212,175,55,0.2),
                    0 2px 8px rgba(0,0,0,0.3)
                  `,
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  padding: '0.8rem 1.5rem',
                  fontSize: '1rem',
                  borderRadius: '0.5rem'
                }}
                onClick={handleNavLinkClick}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">
                  Book Free Class
                </span>
              </motion.button>
              
              {/* Extra close button at bottom of menu */}
              <button 
                className="mt-6 p-2 bg-blue-800/30 rounded-full border border-white/20 text-white hover:bg-blue-700/50 transition-colors"
                onClick={toggleMobileMenu}
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
} 