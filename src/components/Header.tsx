'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const Header = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  
  // Optimized throttled scroll handler for better performance
  const ticking = React.useRef(false);

  const handleScroll = React.useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        const isScrolled = window.scrollY > 60;
        if (isScrolled !== scrolled) {
          setScrolled(isScrolled);
        }
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, [scrolled]);

  React.useEffect(() => {
    // Add passive event listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
  
  // Check if we're on home page
  const isHomePage = pathname === '/'
  
  return (
    <header className={`fixed top-0 left-0 w-full z-50 header-transition ${
      isHomePage 
        ? (scrolled ? 'bg-white shadow-sm' : 'bg-transparent')
        : 'bg-white shadow-sm'
    }`}>
      <div className={`max-w-7xl mx-auto px-6 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}>
        <div className="flex items-center">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/logo.png"
              alt="Joyous Chess Logo"
              width={320}
              height={130}
              className={`w-auto transition-all duration-300 ${
                scrolled ? 'h-12 md:h-16' : 'h-16 md:h-24'
              }`}
              priority
            />
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden ml-auto">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-blue-800 p-2"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center">
            <nav className="flex items-center space-x-6">
              {/* Home */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Link 
                  href="/" 
                  className={`px-4 py-2 rounded-full text-sm font-lato font-bold transition-all duration-300 hover:scale-105 ${
                    pathname === '/' 
                      ? 'bg-blue-800 text-white hover:bg-blue-900' 
                      : 'text-blue-800 hover:text-blue-900 hover:bg-blue-50'
                  }`}
                >
                  HOME
                </Link>
              </motion.div>

              {/* Programs */}
              <div className="relative"
                onMouseEnter={() => setActiveDropdown('programs')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <motion.button 
                  className={`px-4 py-2 rounded-full text-sm font-lato font-bold transition-all duration-300 hover:scale-105 flex items-center ${
                    (pathname === '/online-chess-classes' || pathname === '/offline-chess-classes') 
                      ? 'bg-blue-800 text-white hover:bg-blue-900' 
                      : 'text-blue-800 hover:text-blue-900 hover:bg-blue-50'
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  PROGRAMS
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.button>
                {activeDropdown === 'programs' && (
                  <div className="absolute top-full left-0 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
                    <Link href="/online-chess-classes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Online Classes</Link>
                    <Link href="/offline-chess-classes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Offline Classes</Link>
                  </div>
                )}
              </div>

              {/* Tournaments */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link 
                  href="/TournmentRegistration" 
                  className={`px-4 py-2 rounded-full text-sm font-lato font-bold transition-all duration-300 hover:scale-105 ${
                    (pathname === '/TournmentRegistration' || pathname.startsWith('/tournaments/')) 
                      ? 'bg-blue-800 text-white hover:bg-blue-900' 
                      : 'text-blue-800 hover:text-blue-900 hover:bg-blue-50'
                  }`}
                >
                  TOURNAMENTS
                </Link>
              </motion.div>

              {/* Company */}
              <div className="relative"
                onMouseEnter={() => setActiveDropdown('company')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <motion.button 
                  className={`px-4 py-2 rounded-full text-sm font-lato font-bold transition-all duration-300 hover:scale-105 flex items-center ${
                    (pathname === '/why-us' || pathname === '/about-us') 
                      ? 'bg-blue-800 text-white hover:bg-blue-900' 
                      : 'text-blue-800 hover:text-blue-900 hover:bg-blue-50'
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  COMPANY
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.button>
                {activeDropdown === 'company' && (
                  <div className="absolute top-full left-0 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
                    <Link href="/why-us" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Why Us</Link>
                    <Link href="/about-us" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">About Us</Link>
                  </div>
                )}
              </div>

              {/* Contact Us */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Link 
                  href="/contact-us" 
                  className={`px-4 py-2 rounded-full text-sm font-lato font-bold transition-all duration-300 hover:scale-105 ${
                    pathname === '/contact-us' 
                      ? 'bg-blue-800 text-white hover:bg-blue-900' 
                      : 'text-blue-800 hover:text-blue-900 hover:bg-blue-50'
                  }`}
                >
                  CONTACT US
                </Link>
              </motion.div>
            </nav>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Book Free Class Button */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <button 
                className="text-white px-4 py-2 rounded-full text-sm font-lato font-bold transition-all duration-300 hover:opacity-90 hover:scale-105" 
                style={{ backgroundColor: '#F43F5E' }}
                onClick={() => {
                  if (window.location.pathname === '/') {
                    const element = document.getElementById('upcoming-classes')
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' })
                    }
                  } else {
                    window.location.href = '/#upcoming-classes'
                  }
                }}
              >
                BOOK FREE CLASS
              </button>
            </motion.div>

            {/* Login Button */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <a 
                href="https://classroom.joyouschess.com/login" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-blue-800 text-white px-4 py-2 rounded-full text-sm font-lato font-bold transition-all duration-300 hover:bg-blue-900 hover:scale-105"
              >
                LOGIN
              </a>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-6 py-4 space-y-4">
              {/* Mobile Navigation Links */}
              <Link 
                href="/" 
                className={`block px-4 py-2 rounded-full text-sm font-lato font-bold text-center ${
                  pathname === '/' 
                    ? 'bg-blue-800 text-white' 
                    : 'text-blue-800 border-2 border-blue-800'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                HOME
              </Link>
              
              <div className="space-y-2">
                <div className="text-sm font-lato font-bold text-blue-800 px-2">PROGRAMS</div>
                <Link href="/online-chess-classes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded" onClick={() => setMobileMenuOpen(false)}>Online Classes</Link>
                <Link href="/offline-chess-classes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded" onClick={() => setMobileMenuOpen(false)}>Offline Classes</Link>
              </div>
              
              <div className="space-y-2">
                <Link 
                  href="/TournmentRegistration" 
                  className={`block px-4 py-2 rounded-full text-sm font-lato font-bold text-center ${
                    (pathname === '/TournmentRegistration' || pathname.startsWith('/tournaments/')) 
                      ? 'bg-blue-800 text-white' 
                      : 'text-blue-800 border-2 border-blue-800'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  TOURNAMENTS
                </Link>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-lato font-bold text-blue-800 px-2">COMPANY</div>
                <Link href="/why-us" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded" onClick={() => setMobileMenuOpen(false)}>Why Us</Link>
                <Link href="/about-us" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
              </div>
              
              <Link href="/contact-us" className="block text-sm font-lato font-bold text-blue-800 px-2 py-2" onClick={() => setMobileMenuOpen(false)}>
                CONTACT US
              </Link>
              
              {/* Mobile Action Buttons */}
              <div className="pt-4 space-y-3">
                <button 
                  className="block text-white px-4 py-2 rounded-full text-sm font-lato font-bold text-center transition-all duration-300 w-full" 
                  style={{ backgroundColor: '#F43F5E' }}
                  onClick={() => {
                    if (window.location.pathname === '/') {
                      const element = document.getElementById('upcoming-classes')
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' })
                      }
                    } else {
                      window.location.href = '/#upcoming-classes'
                    }
                    setMobileMenuOpen(false)
                  }}
                >
                  BOOK FREE CLASS
                </button>
                <a 
                  href="https://classroom.joyouschess.com/login" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block bg-blue-800 text-white px-4 py-2 rounded-full text-sm font-lato font-bold text-center transition-all duration-300"
                >
                  LOGIN
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header 