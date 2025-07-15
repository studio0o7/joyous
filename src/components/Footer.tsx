'use client'

import React from 'react'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="relative z-50 bg-chess-blue text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <Image
                src="/logo.png"
                alt="Joyous Chess Logo"
                width={80}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Building brilliant minds through joyful chess education. 
              Join thousands of students on their journey from pawn to king.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-white/80">
              <li><a href="#programs" className="hover:text-white transition-colors">Programs</a></li>
              <li><a href="#tournaments" className="hover:text-white transition-colors">Tournaments</a></li>
              <li><a href="#coaches" className="hover:text-white transition-colors">Our Coaches</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Learning */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Learning</h3>
            <ul className="space-y-2 text-white/80">
              <li><a href="#beginner" className="hover:text-white transition-colors">Beginner Classes</a></li>
              <li><a href="#intermediate" className="hover:text-white transition-colors">Intermediate</a></li>
              <li><a href="#advanced" className="hover:text-white transition-colors">Advanced</a></li>
              <li><a href="#private" className="hover:text-white transition-colors">Private Lessons</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-2 text-white/80 text-sm">
              <p>Email: hello@joyouschess.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Hours: Mon-Fri 9AM-6PM</p>
              <div className="flex space-x-3 mt-4">
                <a href="#" className="hover:text-white transition-colors">Facebook</a>
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-white/60 text-sm">
          <p>&copy; 2024 Joyous Chess Academy. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
} 