'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function WhyUsSection() {
  // Theme colors and state
  const goldLight = '#f8d008'
  const goldDark = '#d4af37'
  const goldVeryDark = '#9e7c21'  // Added darker gold color
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  
  // Make sure interactive elements are clickable
  useEffect(() => {
    const section = document.getElementById('why-us-section')
    if (section) {
      section.style.zIndex = '40'
      section.style.pointerEvents = 'auto'
    }
    
    return () => {
      if (section) {
        section.style.zIndex = ''
        section.style.pointerEvents = ''
      }
    }
  }, [])
  
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }
  
  return (
    <div id="why-us-section" className="w-full flex flex-col items-center justify-center md:pt-14 pt-20 relative z-40 pointer-events-auto">
      {/* Main content section */}
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 py-12 md:py-12 pb-16 md:pb-12 pointer-events-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Mobile Order - Left Side Rearranged for Mobile */}
          <div className="flex flex-col justify-start lg:items-start items-center text-center lg:text-left pointer-events-auto z-30 order-1 lg:order-1">
            {/* Title */}
            <motion.h2
              className="font-karla font-bold mb-4 text-[clamp(1.8rem,3vw,2.2rem)] leading-tight"
              style={{
                color: goldLight,
                textShadow: `0 2px 10px rgba(0,0,0,0.4), 0 0 30px rgba(248,208,8,0.3)`
              }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Why Chess with Us?
            </motion.h2>
            
            {/* Credibility Statement - Different versions for mobile and desktop */}
            <motion.div
              className="pointer-events-auto z-30 mb-6 w-full lg:w-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-white font-bold text-xl mb-3 lg:border-l-4 lg:pl-3 text-center lg:text-left border-yellow-500">
                Experience & Excellence Since 2010
              </h3>
              
              {/* Desktop paragraph - hidden on mobile */}
              <p className="text-white/90 text-base leading-relaxed mb-4 hidden lg:block">
                At Joyous Chess, every child is guided by certified mentors in a nurturing environment that develops critical thinking. Our step-by-step curriculum takes students from basics to tournaments with continuous tracking and recognition of achievements. With technology-powered dashboards and in-app puzzles, we&apos;ve supported over 5,000 students, hosted more than 100 tournaments, and partnered with leading schools across India during our 12+ year journey.
              </p>
              
              {/* Mobile paragraph removed as requested */}
            </motion.div>
            
            {/* Statistics with emphasis */}
            <motion.div
              className="grid grid-cols-3 gap-2 md:gap-4 mb-6 w-full"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/20 p-3 md:p-4 rounded-lg text-center border-t border-yellow-500/30">
                <span className="text-yellow-400 font-bold text-2xl md:text-3xl block">5000+</span>
                <span className="text-white/80 text-xs md:text-sm">Students</span>
              </div>
              
              <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/20 p-3 md:p-4 rounded-lg text-center border-t border-yellow-500/30">
                <span className="text-yellow-400 font-bold text-2xl md:text-3xl block">100+</span>
                <span className="text-white/80 text-xs md:text-sm">Tournaments</span>
              </div>
              
              <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/20 p-3 md:p-4 rounded-lg text-center border-t border-yellow-500/30">
                <span className="text-yellow-400 font-bold text-2xl md:text-3xl block">12+</span>
                <span className="text-white/80 text-xs md:text-sm">Years</span>
              </div>
            </motion.div>

            {/* Mobile specific layout - hide on desktop */}
            <div className="lg:hidden w-full">
              {/* Video container for Mobile */}
              <motion.div 
                className="relative w-full h-[220px] rounded-lg overflow-hidden pointer-events-auto mb-2"
                style={{ 
                  boxShadow: `0 6px 20px rgba(0,0,0,0.3)`,
                  border: `2px solid ${goldDark}`
                }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <video 
                  ref={videoRef}
                  className="w-full h-full object-cover pointer-events-auto"
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                >
                  <source src="/images/video1.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Video overlay */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-auto"
                  onClick={() => {
                    if (videoRef.current) {
                      if (videoRef.current.paused) {
                        videoRef.current.play();
                      } else {
                        videoRef.current.pause();
                      }
                    }
                  }}
                >
                  {/* Title */}
                  <div className="absolute top-3 left-3">
                    <h3 className="text-yellow-400 text-sm font-bold">Chess Excellence Journey</h3>
                  </div>
                  
                  {/* Controls */}
                  <div className="absolute bottom-3 flex justify-between items-center w-full px-3">
                    <div className="text-white/70 text-xs">
                      Click video to play/pause
                    </div>
                    
                    {/* Sound toggle button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMute();
                      }}
                      className="bg-black/40 backdrop-blur-sm rounded-full p-2 hover:bg-black/60 transition-colors duration-200"
                    >
                      {isMuted ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/70" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 3.75a.75.75 0 00-1.264-.546L4.703 7H3.167a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h1.536l4.033 3.796A.75.75 0 0010 16.25V3.75z" />
                          <path d="M15.95 10.5a4.501 4.501 0 00-1.423-3.275.75.75 0 00-1.06 1.06 3.002 3.002 0 010 4.43.75.75 0 001.06 1.06 4.501 4.501 0 001.423-3.275z" />
                          <path d="M12.53 10.5a1 1 0 10-1.06 1.06 1 1 0 001.06-1.06z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
              
              {/* Quote for Mobile */}
              <motion.div
                className="w-full pointer-events-auto z-30 mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div 
                  className="p-3 rounded-lg shadow-md"
                  style={{
                    background: `linear-gradient(to right, ${goldVeryDark}, ${goldDark})`,
                  }}
                >
                  <p className="text-white font-semibold text-sm italic text-center">
                    &quot;This is more than learning chess. It&apos;s about building focus, confidence, and resilience for life.&quot;
                  </p>
                  <p className="text-white/90 text-xs text-center mt-1">
                    - Joyous Chess Philosophy
                  </p>
                </div>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pointer-events-auto z-50 mx-auto lg:mx-0"
            >
              <motion.button 
                className="group relative inline-flex items-center font-tenor-sans font-semibold transition-all duration-300 overflow-hidden pointer-events-auto z-50"
                style={{
                  background: `rgba(25,58,134,0.5)`,
                  border: `2px solid ${goldDark}`,
                  color: goldLight,
                  boxShadow: `
                    0 5px 15px rgba(212,175,55,0.3),
                    0 2px 8px rgba(0,0,0,0.4)
                  `,
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  padding: '0.5rem 1.2rem',
                  fontSize: 'clamp(0.8rem, 0.9vw, 1rem)',
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
                  See What Parents Say
                </span>
                <svg className="w-4 h-4 ml-2 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.button>
            </motion.div>
          </div>

          {/* Right Side - Video with sound toggle - Only visible on desktop */}
          <div className="hidden lg:flex flex-col pointer-events-auto z-30 order-2 lg:order-2">
            {/* Video container */}
            <motion.div 
              className="relative w-full h-[350px] rounded-lg overflow-hidden pointer-events-auto mb-2"
              style={{ 
                boxShadow: `0 6px 20px rgba(0,0,0,0.3)`,
                border: `2px solid ${goldDark}`
              }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <video 
                className="w-full h-full object-cover pointer-events-auto"
                autoPlay
                muted={isMuted}
                loop
                playsInline
              >
                <source src="/images/video1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Video overlay */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-auto"
                onClick={() => {
                  if (videoRef.current) {
                    if (videoRef.current.paused) {
                      videoRef.current.play();
                    } else {
                      videoRef.current.pause();
                    }
                  }
                }}
              >
                {/* Title */}
                <div className="absolute top-3 left-3">
                  <h3 className="text-yellow-400 text-sm font-bold">Chess Excellence Journey</h3>
                </div>
                
                {/* Controls */}
                <div className="absolute bottom-3 flex justify-between items-center w-full px-3">
                  <div className="text-white/70 text-xs">
                    Click video to play/pause
                  </div>
                  
                  {/* Sound toggle button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute();
                    }}
                    className="bg-black/40 backdrop-blur-sm rounded-full p-2 hover:bg-black/60 transition-colors duration-200"
                  >
                    {isMuted ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/70" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 3.75a.75.75 0 00-1.264-.546L4.703 7H3.167a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h1.536l4.033 3.796A.75.75 0 0010 16.25V3.75z" />
                        <path d="M15.95 10.5a4.501 4.501 0 00-1.423-3.275.75.75 0 00-1.06 1.06 3.002 3.002 0 010 4.43.75.75 0 001.06 1.06 4.501 4.501 0 001.423-3.275z" />
                        <path d="M12.53 10.5a1 1 0 10-1.06 1.06 1 1 0 001.06-1.06z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
            
            {/* Quote with darker gold gradient background under the video - moved closer to video and text left-aligned */}
            <motion.div
              className="w-full pointer-events-auto z-30"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div 
                className="p-3 rounded-lg shadow-md"
                style={{
                  background: `linear-gradient(to right, ${goldVeryDark}, ${goldDark})`,
                }}
              >
                <p className="text-white font-semibold text-sm italic text-left">
                  &quot;This is more than learning chess. It&apos;s about building focus, confidence, and resilience for life.&quot;
                </p>
                <p className="text-white/90 text-xs text-right mt-1">
                  - Joyous Chess Philosophy
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
} 