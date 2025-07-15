'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function LearningToolsSection() {
  // Theme colors - matching the other sections
  const goldLight = '#f8d008'
  const goldDark = '#d4af37'
  
  return (
    <div className="w-full flex flex-col items-center justify-center pt-28 sm:pt-10 relative z-40 pointer-events-auto">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-5 md:px-6 py-6 sm:py-10 pointer-events-auto">
        {/* Main content container */}
        <div className="flex flex-col items-center pointer-events-auto z-30">
          {/* Section Header */}
          <motion.h2
            className="font-karla font-bold mb-2 sm:mb-4 text-center text-[clamp(1.5rem,5vw,2.2rem)] leading-tight"
            style={{
              color: goldLight,
              textShadow: `0 2px 10px rgba(0,0,0,0.4), 0 0 30px rgba(248,208,8,0.3)`
            }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Learning Chess Has Never Been Easier
          </motion.h2>
          
          <motion.p 
            className="text-white/90 text-sm sm:text-base md:text-lg max-w-2xl text-center mb-4 sm:mb-8 px-2 sm:px-0"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="sm:hidden">Elite coaching. Flexible schedules. AI-powered progress.</span>
            <span className="hidden sm:inline">Elite online coaching. Flexible schedules. Personalized progress.
            Joyous Chess makes learning smart, fun, and truly accessible — powered by AI and real coaches.</span>
          </motion.p>

          {/* Benefits Cards - More compact layout */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-8 w-full max-w-3xl px-2 sm:px-0"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Card 1 */}
            <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/20 rounded-lg p-3 sm:p-4 border-t border-yellow-500/30 flex items-start">
              <div className="flex-shrink-0 flex items-center justify-center mr-2 sm:mr-3">
                <span className="text-yellow-400 text-3xl sm:text-4xl font-bold" style={{textShadow: '0 0 10px rgba(248,208,8,0.5)'}}>♘</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-base sm:text-lg mb-0.5 sm:mb-1">Learn Anytime, Anywhere</h3>
                <p className="text-white/80 text-xs sm:text-sm">Online classes fit your schedule — no travel, no limits.</p>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/20 rounded-lg p-3 sm:p-4 border-t border-yellow-500/30 flex items-start">
              <div className="flex-shrink-0 flex items-center justify-center mr-2 sm:mr-3">
                <span className="text-yellow-400 text-3xl sm:text-4xl font-bold" style={{textShadow: '0 0 10px rgba(248,208,8,0.5)'}}>♕</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-base sm:text-lg mb-0.5 sm:mb-1">Smarter Learning With AI</h3>
                <p className="text-white/80 text-xs sm:text-sm">Your child&apos;s chess journey adapts to their level and pace.</p>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/20 rounded-lg p-3 sm:p-4 border-t border-yellow-500/30 flex items-start">
              <div className="flex-shrink-0 flex items-center justify-center mr-2 sm:mr-3">
                <span className="text-yellow-400 text-3xl sm:text-4xl font-bold" style={{textShadow: '0 0 10px rgba(248,208,8,0.5)'}}>♗</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-base sm:text-lg mb-0.5 sm:mb-1">Live, Expert Coaching</h3>
                <p className="text-white/80 text-xs sm:text-sm">Real mentors. Real growth. Real competition readiness.</p>
              </div>
            </div>
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pointer-events-auto z-50 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-4 sm:mb-8 w-full px-4 sm:px-0"
          >
            <motion.button 
              className="group relative inline-flex items-center justify-center w-full sm:w-auto font-tenor-sans font-semibold transition-all duration-300 overflow-hidden pointer-events-auto z-50"
              style={{
                background: `rgba(25,58,134,0.5)`,
                border: `2px solid ${goldDark}`,
                color: goldLight,
                boxShadow: `
                  0 5px 15px rgba(212,175,55,0.3),
                  0 2px 8px rgba(0,0,0,0.4)
                `,
                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                padding: '0.4rem 1rem',
                fontSize: 'clamp(0.75rem, 0.9vw, 1rem)',
                borderRadius: '0.25rem'
              }}
              whileHover={{ 
                scale: 1.05,
                background: 'rgba(25,58,134,0.6)',
                boxShadow: `
                  0 7px 20px rgba(212,175,55,0.4),
                  0 3px 12px rgba(0,0,0,0.5)
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
              <span className="relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:font-bold">
                Book a Free Class
              </span>
              <svg className="w-4 h-4 ml-2 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.button>

            <motion.button 
              className="group relative inline-flex items-center justify-center w-full sm:w-auto font-tenor-sans font-semibold transition-all duration-300 overflow-hidden pointer-events-auto z-50"
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '2px solid white',
                color: 'white',
                boxShadow: '0 5px 15px rgba(255,255,255,0.2), 0 2px 8px rgba(0,0,0,0.3)',
                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                padding: '0.4rem 1rem',
                fontSize: 'clamp(0.75rem, 0.9vw, 1rem)',
                borderRadius: '0.25rem'
              }}
              whileHover={{ 
                scale: 1.05,
                background: 'rgba(255,255,255,0.25)',
                boxShadow: '0 7px 20px rgba(255,255,255,0.3), 0 3px 12px rgba(0,0,0,0.4)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Chess pattern overlay that appears on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `
                    linear-gradient(45deg, rgba(255,255,255,0.4) 25%, transparent 25%),
                    linear-gradient(-45deg, rgba(255,255,255,0.4) 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.4) 75%),
                    linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.4) 75%)
                  `,
                  backgroundSize: '8px 8px',
                  backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px'
                }}
              />
              <span className="relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:font-bold">
                Learn More
              </span>
            </motion.button>
          </motion.div>

          {/* Prefer In-Person Section - Moved below CTAs */}
          <motion.div 
            className="w-full max-w-3xl mb-4 relative px-2 sm:px-0"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Chess pattern background */}
            <div className="absolute inset-0 z-10 opacity-20"
              style={{
                background: `
                  linear-gradient(45deg, ${goldDark} 25%, transparent 25%),
                  linear-gradient(-45deg, ${goldDark} 25%, transparent 25%),
                  linear-gradient(45deg, transparent 75%, ${goldDark} 75%),
                  linear-gradient(-45deg, transparent 75%, ${goldDark} 75%)
                `,
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
              }}
            />
            
            {/* Content overlay */}
            <div className="relative z-20 bg-gradient-to-r from-blue-900/80 to-indigo-900/80 rounded-lg p-3 sm:p-5 border border-yellow-500/30 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
              <div className="text-center md:text-left">
                <h3 className="text-white font-bold text-lg sm:text-xl mb-1 sm:mb-2">Prefer in-person?</h3>
                <p className="text-white/80 text-xs sm:text-sm mb-0 sm:mb-3">We also offer select offline classes across Delhi NCR.</p>
                <div className="hidden sm:flex justify-center md:justify-start flex-wrap gap-2 sm:gap-4">
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1 sm:mr-2">♙</span>
                    <span className="text-white/80 text-xs">Premium centers</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1 sm:mr-2">♙</span>
                    <span className="text-white/80 text-xs">Expert coaches</span>
                  </div>
                </div>
              </div>
              
              <motion.button 
                className="inline-flex items-center font-tenor-sans font-semibold transition-all duration-300 whitespace-nowrap mt-2 md:mt-0"
                style={{
                  background: `rgba(25,58,134,0.5)`,
                  border: `2px solid ${goldDark}`,
                  color: goldLight,
                  boxShadow: `0 5px 15px rgba(212,175,55,0.3), 0 2px 8px rgba(0,0,0,0.4)`,
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  padding: '0.3rem 0.8rem',
                  fontSize: 'clamp(0.7rem, 0.8vw, 0.9rem)',
                  borderRadius: '0.25rem'
                }}
                whileHover={{ 
                  scale: 1.05,
                  background: 'rgba(25,58,134,0.6)',
                  boxShadow: `0 7px 20px rgba(212,175,55,0.4), 0 3px 12px rgba(0,0,0,0.5)`,
                }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 