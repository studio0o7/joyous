'use client'

import React from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, TargetAndTransition } from 'framer-motion'

// Helper component for the iridescent soap bubbles
const SoapBubble = ({
  children,
  animation,
  className = '',
}: {
  children: React.ReactNode
  animation: TargetAndTransition
  className?: string
}) => {
  return (
    <motion.div
      className={`relative flex items-center justify-center rounded-full text-center text-white
        w-[clamp(60px,9vw,150px)] h-[clamp(60px,9vw,150px)]
        backdrop-blur-md shadow-2xl shadow-black/20`}
      style={{
        border: '1.5px solid rgba(255, 255, 255, 0.25)',
      }}
      animate={animation}
      transition={{
        duration: Math.random() * 4 + 8, // 8s to 12s
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {/* Iridescent background effect */}
      <div
        className={`absolute inset-0 rounded-full opacity-60 mix-blend-overlay ${className}`}
      />
      {/* Specular highlight */}
      <div
        className="absolute top-[10%] left-[10%] h-1/4 w-1/4 rounded-full bg-white/30"
        style={{ filter: 'blur(10px)' }}
      />
      <span
        className="relative z-10 px-2 font-tenor-sans font-bold leading-tight
          text-[clamp(9px,1.2vw,16px)]"
        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
      >
        {children}
      </span>
    </motion.div>
  )
}

export default function HeroSection() {
  const { scrollYProgress } = useScroll()
  
  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -200])
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -80])
  
  // Theme colors
  const goldLight = '#f8d008'
  const goldDark = '#d4af37'
  
  return (
    <motion.div 
      className="relative flex items-center justify-center overflow-hidden 
                 pt-[calc(4rem+clamp(2vh,8vh,12vh))] pb-[clamp(20vh,40vh,60vh)] sm:pb-[clamp(40vh,60vh,80vh)] 
                 min-h-[calc(100vh-5rem)]"
      style={{ y: heroY }}
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-4 relative flex">
        {/* Desktop bubbles - same as before */}
        <div className="absolute inset-0 hidden sm:grid grid-cols-3 items-center pointer-events-none">
          {/* Left column for bubbles */}
          <div className="flex flex-col space-y-8 items-center pt-20">
            <SoapBubble
              className="bg-gradient-to-br from-pink-400/30 via-purple-400/30 to-blue-400/30"
              animation={{ y: [0, -12, 0], rotate: [0, 3, -3, 0], scale: [1, 1.04, 1] }}
            >
              Trusted by<br/>2000+<br/>Parents
            </SoapBubble>
            
            <SoapBubble
              className="bg-gradient-to-tr from-yellow-400/20 via-red-400/20 to-blue-500/30"
              animation={{ y: [0, 12, 0], rotate: [0, -4, 4, 0], scale: [1, 1.05, 1] }}
            >
              5000+ Kids<br/>Ranked &<br/>Coached
            </SoapBubble>
        </div>
          
          {/* Center column for main content */}
          <div className="col-span-1">
            {/* Empty spacer */}
      </div>

          {/* Right column for bubbles */}
          <div className="flex flex-col space-y-8 items-center pt-20">
            <SoapBubble
              className="bg-gradient-to-bl from-green-400/30 via-cyan-400/30 to-purple-400/30"
              animation={{ y: [0, -10, 0], x: [0, 5, 0], scale: [1, 1.03, 1] }}
            >
              100+<br/>Chess<br/>Tournaments
            </SoapBubble>
            
            <SoapBubble
              className="bg-gradient-to-tl from-orange-400/30 via-yellow-300/20 to-green-400/30"
              animation={{ y: [0, 8, 0], x: [0, -6, 0], rotate: [0, 2, -2, 0] }}
            >
             20+<br/>Partner<br/>Schools 
            </SoapBubble>
          </div>
      </div>

      {/* Main content */}
        <div className="flex-1 flex items-center justify-center mt-10 sm:mt-0">
        <div className="text-center w-full mx-auto" style={{ maxWidth: 'clamp(40rem, 60vw, 80rem)' }}>
          
          {/* Title with Gold */}
          <motion.h1 
              className="font-karla font-extrabold mb-2 sm:mb-2 lg:mb-3 leading-tight tracking-wide px-2 sm:px-0"
            style={{
              color: goldLight,
              textShadow: `
                0 2px 10px rgba(0,0,0,0.4),
                0 0 30px rgba(248,208,8,0.3)
              `,
                fontSize: 'clamp(1.5rem, 2vw, 2.5rem)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Building Brilliant Minds Through Joyful Chess
          </motion.h1>

          {/* Description */}
          <motion.p 
              className="mb-4 sm:mb-3 lg:mb-4 mx-auto leading-relaxed font-tenor-sans font-normal px-6 sm:px-0"
            style={{
              color: 'white',
              textShadow: `
                0 3px 6px rgba(0,0,0,0.4),
                0 0 20px rgba(255,255,255,0.15)
              `,
                fontSize: 'clamp(0.8rem, 1vw, 1.1rem)',
                maxWidth: 'clamp(20rem, 40vw, 45rem)'
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Live online classes, exciting tournaments, and a personalized learning path — designed to help every child grow through the joy of chess.
          </motion.p>

            {/* Hero GIF with bubbles on either side for mobile */}
          <motion.div 
              className="relative flex items-center justify-center mb-5 sm:mb-3"
            style={{ y: imageY }}
          >
            {/* Left bubble - mobile only */}
            <div className="flex-none sm:hidden mr-2 pointer-events-none">
              <SoapBubble
                className="bg-gradient-to-br from-pink-400/30 via-purple-400/30 to-blue-400/30"
                animation={{ y: [0, -8, 0], rotate: [0, 2, -2, 0], scale: [1, 1.03, 1] }}
              >
                1000+<br/>Parents
              </SoapBubble>
            </div>
            
            {/* Center GIF */}
            <motion.div 
              className="flex-none relative flex justify-center" 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
                <Image
                  src="/images/Gif21.gif"
                  alt="Chess Learning Hero"
                    width={200}
                    height={200}
                    className="h-auto w-[clamp(140px,12vw,200px)]"
                  style={{
                    filter: 'drop-shadow(0 12px 30px rgba(0,0,0,0.4)) drop-shadow(0 0 20px rgba(246,198,70,0.2))',
                  }}
                  priority
                />
            </motion.div>
            
            {/* Right bubble - mobile only */}
            <div className="flex-none sm:hidden ml-2 pointer-events-none">
              <SoapBubble
                className="bg-gradient-to-bl from-green-400/30 via-cyan-400/30 to-purple-400/30"
                animation={{ y: [0, -6, 0], scale: [1, 1.02, 1] }}
              >
                20+<br/>Schools
              </SoapBubble>
            </div>
          </motion.div>

            {/* Premium Buttons - Improved mobile styling */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center w-full px-8 sm:px-0"
            style={{
                gap: 'clamp(0.8rem, 0.8vw, 0.8rem)'
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button 
              className="group relative font-tenor-sans font-semibold transition-all duration-300 overflow-hidden pointer-events-auto w-auto sm:w-auto"
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: `2px solid white`,
                color: 'white',
                boxShadow: `
                  0 5px 15px rgba(255,255,255,0.2),
                  0 2px 8px rgba(0,0,0,0.3)
                `,
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                  padding: 'clamp(0.6rem, 0.8vw, 0.6rem) clamp(1.2rem, 1.2vw, 1rem)',
                  fontSize: 'clamp(0.8rem, 0.9vw, 0.9rem)',
                borderRadius: '0.5rem'
              }}
              whileHover={{ 
                scale: 1.05,
                background: 'rgba(255,255,255,0.25)',
                boxShadow: `
                  0 7px 20px rgba(255,255,255,0.3),
                  0 3px 12px rgba(0,0,0,0.4)
                `,
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
              <motion.span 
                className="relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:font-bold"
                initial={{ opacity: 1 }}
              >
                Book a Free Class
              </motion.span>
            </motion.button>
            
            <motion.button 
              className="group relative font-tenor-sans font-semibold transition-all duration-300 overflow-hidden pointer-events-auto w-auto sm:w-auto"
              style={{
                background: `rgba(25,58,134,0.3)`,
                border: `2px solid ${goldDark}`,
                color: goldLight,
                boxShadow: `
                  0 5px 15px rgba(212,175,55,0.2),
                  0 2px 8px rgba(0,0,0,0.3)
                `,
                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  padding: 'clamp(0.6rem, 0.8vw, 0.6rem) clamp(1.2rem, 1.2vw, 1rem)',
                  fontSize: 'clamp(0.8rem, 0.9vw, 0.9rem)',
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
              <motion.span 
                className="relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:font-bold"
                initial={{ opacity: 1 }}
              >
                View Our Programs
              </motion.span>
            </motion.button>
          </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 