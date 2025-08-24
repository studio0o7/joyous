'use client'

import React from 'react'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-blue-800 text-white py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {/* Logo and description */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1 text-center md:text-left">
            <div className="flex justify-center md:justify-start items-center mb-4 md:mb-6">
              <Image
                src="/images/Logo2.png"
                alt="Joyous Chess Logo"
                width={200}
                height={80}
                className="h-12 md:h-16 w-auto"
              />
            </div>
            <p className="text-white/90 font-lato font-normal leading-relaxed text-sm md:text-base">
              Building brilliant minds through joyful chess education. 
              Join thousands of students on their journey from pawn to king.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="font-bebas-neue font-extrabold text-lg md:text-xl mb-4 md:mb-6" style={{ color: '#F43F5E' }}>Quick Links</h3>
            <ul className="space-y-2 md:space-y-3 text-white/90 font-lato font-normal text-sm md:text-base">
              <li>
                <a href="#programs" className="hover:text-white transition-colors duration-300 hover:underline">
                  Our Programs
                </a>
              </li>
              <li>
                <a href="#tournaments" className="hover:text-white transition-colors duration-300 hover:underline">
                  Tournaments
                </a>
              </li>
              <li>
                <a href="#champs" className="hover:text-white transition-colors duration-300 hover:underline">
                  Our Champions
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors duration-300 hover:underline">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Learning */}
          <div className="text-center md:text-left">
            <h3 className="font-bebas-neue font-extrabold text-lg md:text-xl mb-4 md:mb-6" style={{ color: '#F43F5E' }}>Learning Tracks</h3>
            <ul className="space-y-2 md:space-y-3 text-white/90 font-lato font-normal text-sm md:text-base">
              <li>
                <a href="#beginner" className="hover:text-white transition-colors duration-300 hover:underline">
                  Learn to Play (Beginner)
                </a>
              </li>
              <li>
                <a href="#intermediate" className="hover:text-white transition-colors duration-300 hover:underline">
                  Get Tournament Ready
                </a>
              </li>
              <li>
                <a href="#advanced" className="hover:text-white transition-colors duration-300 hover:underline">
                  Chess Mastery (Advanced)
                </a>
              </li>
              <li>
                <a href="#private" className="hover:text-white transition-colors duration-300 hover:underline">
                  Private Coaching
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h3 className="font-bebas-neue font-extrabold text-lg md:text-xl mb-4 md:mb-6" style={{ color: '#F43F5E' }}>Contact Us</h3>
            <div className="space-y-2 md:space-y-3 text-white/90 font-lato font-normal text-sm md:text-base">
              <p>
                hello@joyouschess.com
              </p>
              <p>
                +91 98765 43210
              </p>
              <p>
                Mon-Fri 9AM-6PM IST
              </p>
              <div className="flex space-x-4 mt-4 md:mt-6 justify-center md:justify-start">
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors duration-300 hover:scale-110"
                  style={{ backgroundColor: '#F43F5E' }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLAnchorElement;
                    target.style.backgroundColor = '#E11D48';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLAnchorElement;
                    target.style.backgroundColor = '#F43F5E';
                  }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors duration-300 hover:scale-110"
                  style={{ backgroundColor: '#F43F5E' }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLAnchorElement;
                    target.style.backgroundColor = '#E11D48';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLAnchorElement;
                    target.style.backgroundColor = '#F43F5E';
                  }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors duration-300 hover:scale-110"
                  style={{ backgroundColor: '#F43F5E' }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLAnchorElement;
                    target.style.backgroundColor = '#E11D48';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLAnchorElement;
                    target.style.backgroundColor = '#F43F5E';
                  }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/20 mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center text-white/80 font-lato font-normal text-sm md:text-base">
          <p className="text-center md:text-left">&copy; 2024 Joyous Chess Academy. All rights reserved.</p>
          <div className="flex space-x-4 md:space-x-6 mt-4 md:mt-0">
            <a href="#privacy" className="hover:text-white transition-colors duration-300 hover:underline">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-white transition-colors duration-300 hover:underline">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 