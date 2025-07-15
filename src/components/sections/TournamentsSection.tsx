'use client'

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function TournamentsSection() {
  // Theme colors
  const goldLight = '#f8d008'
  const goldDark = '#d4af37'
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [activeCard, setActiveCard] = useState(0)
  
  // Highlight cards data
  const highlights = [
    {
      title: "Delhi State Chess Championship",
      content: "2000+ participants (2022 & 2023). Hosted by Joyous Chess, with guests from the All India Chess Federation and Delhi Police.",
      icon: "♚" // King
    },
    {
      title: "Youth Grand Prix 2025",
      content: "A prestigious platform with 250+ players, 86 trophies, and 48 medals awarded.",
      icon: "♕" // Queen
    },
    {
      title: "CaratLane x Joyous Chess Under-7",
      content: "Hosted at a luxury venue with gold prizes, this event celebrated excellence and early talent.",
      icon: "♖" // Rook
    }
  ]
  
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-center text-white py-6 pt-20">
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Side - Content (7 columns) */}
          <div className="flex flex-col justify-start lg:col-span-7 lg:text-left text-center px-3 sm:px-0">
            {/* Title with Stats Tags */}
            <div className="mb-2">
              <motion.h2
                className="font-karla font-bold text-[clamp(1.4rem,2.8vw,2rem)] leading-tight inline"
                style={{
                  color: goldLight,
                  textShadow: `0 2px 10px rgba(0,0,0,0.4), 0 0 30px rgba(248,208,8,0.3)`
                }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Tournaments & Events That Shape Champions
              </motion.h2>
              
              {/* Stats as Tags */}
              <div className="flex flex-wrap gap-1 md:gap-2 mt-2 justify-center lg:justify-start">
                <motion.span 
                  className="inline-flex items-center px-1 md:px-2 py-0.5 md:py-1 rounded text-[10px] md:text-xs font-medium bg-gradient-to-r from-blue-900/40 to-indigo-900/20 border-t border-yellow-500/30"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <span className="text-yellow-400 font-bold mr-1">100+</span>
                  <span className="text-white/80">Tournaments</span>
                </motion.span>
                
                <motion.span 
                  className="inline-flex items-center px-1 md:px-2 py-0.5 md:py-1 rounded text-[10px] md:text-xs font-medium bg-gradient-to-r from-blue-900/40 to-indigo-900/20 border-t border-yellow-500/30"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                >
                  <span className="text-yellow-400 font-bold mr-1">2000+</span>
                  <span className="text-white/80">Participants</span>
                </motion.span>
                
                <motion.span 
                  className="inline-flex items-center px-1 md:px-2 py-0.5 md:py-1 rounded text-[10px] md:text-xs font-medium bg-gradient-to-r from-blue-900/40 to-indigo-900/20 border-t border-yellow-500/30"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                >
                  <span className="text-yellow-400 font-bold mr-1">50+</span>
                  <span className="text-white/80">Schools</span>
                </motion.span>
              </div>
            </div>
            
            {/* Description - Hidden on mobile, visible on desktop */}
            <motion.p
              className="text-white/90 mb-4 text-sm hidden lg:block"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Joyous Chess doesn&apos;t just teach chess — we build winners.
              From city-wide tournaments to national-level championships, our events inspire, challenge, and transform.
            </motion.p>

            {/* Mobile layout adjustments - Video comes here on mobile */}
            <div className="lg:hidden mb-3 mt-1 px-1">
              <motion.div 
                className="relative h-[280px] rounded-lg overflow-hidden flex justify-center items-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div 
                  className="relative h-[260px] w-[180px]" 
                  style={{ 
                    border: `2px solid ${goldDark}`,
                    borderRadius: '4px'
                  }}
                >
                  <video 
                    ref={videoRef}
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ objectFit: 'cover' }}
                    autoPlay
                    muted={isMuted}
                    loop
                    playsInline
                  >
                    <source src="/images/video2.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Video overlay */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"
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
                    <div className="absolute top-1 left-1">
                      <h3 className="text-yellow-400 text-[10px] font-bold">Tournament Highlights</h3>
                    </div>
                    
                    {/* Controls */}
                    <div className="absolute bottom-1 flex justify-between items-center w-full px-1">
                      <div className="text-white/70 text-[9px]">
                        Click to play/pause
                      </div>
                      
                      {/* Sound toggle button */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMute();
                        }}
                        className="bg-black/40 backdrop-blur-sm rounded-full p-1 hover:bg-black/60 transition-colors duration-200"
                      >
                        {isMuted ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 text-white/70" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 3.75a.75.75 0 00-1.264-.546L4.703 7H3.167a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h1.536l4.033 3.796A.75.75 0 0010 16.25V3.75z" />
                            <path d="M15.95 10.5a4.501 4.501 0 00-1.423-3.275.75.75 0 00-1.06 1.06 3.002 3.002 0 010 4.43.75.75 0 001.06 1.06 4.501 4.501 0 001.423-3.275z" />
                            <path d="M12.53 10.5a1 1 0 10-1.06 1.06 1 1 0 001.06-1.06z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Desktop Highlights Section */}
            <motion.div
              className="mb-4 hidden lg:block"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-white font-bold text-lg mb-2 border-l-4 border-yellow-500 pl-3 text-left">
                Highlights
              </h3>
              
              <div className="space-y-2">
                {highlights.map((highlight, index) => (
                  <div key={index} className="bg-gradient-to-r from-blue-900/40 to-indigo-900/20 p-3 rounded-lg border-t border-yellow-500/30">
                    <h4 className="text-yellow-400 font-bold text-sm">{highlight.title}</h4>
                    <p className="text-white/80 text-xs">{highlight.content}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Mobile Scrollable Highlights with Chess Piece Indicators */}
            <div className="lg:hidden px-1">
              <h3 className="text-white font-bold text-base mb-1 text-center">
                Highlights
              </h3>
              
              {/* Scrollable Card Container */}
              <div className="relative overflow-hidden mb-1">
                <div 
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${activeCard * 100}%)` }}
                >
                  {highlights.map((highlight, index) => (
                    <div 
                      key={index} 
                      className="bg-gradient-to-r from-blue-900/40 to-indigo-900/20 p-2 rounded-lg border-t border-yellow-500/30 w-full flex-shrink-0"
                    >
                      <h4 className="text-yellow-400 font-bold text-xs">{highlight.title}</h4>
                      <p className="text-white/80 text-[10px]">{highlight.content}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Chess Piece Indicators */}
              <div className="flex justify-center gap-3 mt-1 mb-3">
                {highlights.map((highlight, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveCard(index)}
                    className={`text-xl transition-all duration-300 ${activeCard === index ? 'text-yellow-400 scale-125' : 'text-white/50'}`}
                    aria-label={`View highlight ${index + 1}`}
                  >
                    {highlight.icon}
                  </button>
                ))}
              </div>
            </div>
            
            {/* CTA Button - Moved down in mobile */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pointer-events-auto z-50 mx-auto lg:mx-0 mt-1 lg:mt-2"
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
                  padding: '0.3rem 0.8rem',
                  fontSize: 'clamp(0.7rem, 0.85vw, 0.9rem)',
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
                  Register For Events
                </span>
                <svg className="w-3 h-3 lg:w-4 lg:h-4 ml-1 lg:ml-2 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.button>
            </motion.div>
          </div>
          
          {/* Right Side - Video (5 columns) - Only visible on desktop */}
          <div className="lg:col-span-5 flex-col hidden lg:flex">
            <div className="grid grid-cols-12 gap-2">
              {/* Video container (12 columns) - Only for desktop */}
              <motion.div 
                className="relative col-span-12 h-[440px] rounded-lg overflow-hidden flex justify-center items-center pt-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div 
                  className="relative h-[390px] w-[260px]" 
                  style={{ 
                    border: `2px solid ${goldDark}`,
                    borderRadius: '4px'
                  }}
                >
                  <video 
                    ref={videoRef}
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ objectFit: 'cover' }}
                    autoPlay
                    muted={isMuted}
                    loop
                    playsInline
                  >
                    <source src="/images/video2.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Video overlay */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"
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
                    <div className="absolute top-2 left-2">
                      <h3 className="text-yellow-400 text-xs font-bold">Tournament Highlights</h3>
                    </div>
                    
                    {/* Controls */}
                    <div className="absolute bottom-2 flex justify-between items-center w-full px-2">
                      <div className="text-white/70 text-xs">
                        Click to play/pause
                      </div>
                      
                      {/* Sound toggle button */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMute();
                        }}
                        className="bg-black/40 backdrop-blur-sm rounded-full p-1 hover:bg-black/60 transition-colors duration-200"
                      >
                        {isMuted ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white/70" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 3.75a.75.75 0 00-1.264-.546L4.703 7H3.167a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h1.536l4.033 3.796A.75.75 0 0010 16.25V3.75z" />
                            <path d="M15.95 10.5a4.501 4.501 0 00-1.423-3.275.75.75 0 00-1.06 1.06 3.002 3.002 0 010 4.43.75.75 0 001.06 1.06 4.501 4.501 0 001.423-3.275z" />
                            <path d="M12.53 10.5a1 1 0 10-1.06 1.06 1 1 0 001.06-1.06z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 