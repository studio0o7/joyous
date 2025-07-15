'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const ProgramCard = ({ image, title, track, description, buttonText, delay }: {
  image: string,
  title: string,
  track: string,
  description: string,
  buttonText: string,
  delay: number
}) => {
  // Using a fixed-width container for the card's content to ensure consistent layout
  // And then scaling the entire container to fit into the layout
  const cardWidth = 520; // Increased from 500 to give more width
  const cardHeight = 400; // The ideal height for the card's design
  const scale = 0.8; // Scale factor to fit 3 cards side-by-side
  const goldLight = '#f8d008'
  const goldDark = '#d4af37'

  return (
    // This outer container defines the space the scaled card will occupy in the flex layout
    <div
      className="flex-shrink-0"
      style={{ width: cardWidth * scale, height: cardHeight * scale }}
    >
      {/* This inner container holds the full-sized card and is the target of the scale transform */}
      <div
        style={{
          width: cardWidth,
          height: cardHeight,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          // Ensure the transformed element still captures pointer events
          pointerEvents: 'auto'
        }}
      >
        <motion.div
          className="relative flex items-center h-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay }}
        >
          <div className="w-[60%] relative h-full pointer-events-none">
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain object-center z-10"
              style={{
                filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.8))'
              }}
              priority={delay === 0.1}
            />
          </div>

          <div className="absolute top-10 right-0 w-[55%] pt-8 pr-8 z-20 flex flex-col justify-between pointer-events-auto" style={{ right: '22%', left: '48%', height: 'calc(100% - 5rem)' }}>
            <div>
              <h4 className="text-2xl font-bold text-yellow-400 mb-2 whitespace-nowrap">{title} <span className="text-white/80 text-sm block">{track}</span></h4>
              <p className="text-white/90 text-sm max-w-sm">
                {description}
              </p>
            </div>

            {/*
              BUTTON POSITIONING CONTROLS:
              - To move the button left or right: change `justify-start`, `justify-center`, or `justify-end`.
              - To add space around the button: use padding classes like `pb-4` (padding-bottom) or `px-2` (padding-left/right).
            */}
            <div className="flex justify-center pointer-events-auto" style={{ zIndex: 30 }}>
              <motion.button 
                className="group relative font-tenor-sans font-semibold transition-all duration-300 overflow-hidden whitespace-nowrap pointer-events-auto"
                style={{
                  background: `rgba(25,58,134,0.3)`,
                  border: `2px solid ${goldDark}`,
                  color: goldLight,
                  boxShadow: `
                    0 5px 15px rgba(212,175,55,0.2),
                    0 2px 8px rgba(0,0,0,0.3)
                  `,
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  padding: '0.5rem 1rem',
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
                <span className="relative z-10">
                  {buttonText}
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Chess piece SVG components for the scroll indicator
const ChessKing = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 45 45" fill="currentColor">
    <g fill="none" fillRule="evenodd" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.5 11.63V6M20 8h5" fill="none" stroke="currentColor" strokeLinejoin="miter"/>
      <path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" fill="currentColor" strokeLinecap="butt" strokeLinejoin="miter"/>
      <path d="M12.5 37c5.5 3.5 14.5 3.5 20 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-2.5-7.5-12-10.5-16-4-3 6 6 10.5 6 10.5v7" fill="currentColor"/>
      <path d="M12.5 30c5.5-3 14.5-3 20 0M12.5 33.5c5.5-3 14.5-3 20 0M12.5 37c5.5-3 14.5-3 20 0" fill="none"/>
    </g>
  </svg>
)

const ChessQueen = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 45 45" fill="currentColor">
    <g fill="currentColor" fillRule="evenodd" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-14V25L7 14l2 12z" strokeLinecap="butt"/>
      <path d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z" strokeLinecap="butt"/>
      <path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" fill="none"/>
      <circle cx="6" cy="12" r="2"/>
      <circle cx="14" cy="9" r="2"/>
      <circle cx="22.5" cy="8" r="2"/>
      <circle cx="31" cy="9" r="2"/>
      <circle cx="39" cy="12" r="2"/>
    </g>
  </svg>
)

const ChessPawn = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 45 45" fill="currentColor">
    <path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

export default function ProgramsSection() {
  // Theme colors
  const goldLight = '#f8d008'
  
  // Scroll state for the indicator
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const position = container.scrollLeft / (container.scrollWidth - container.clientWidth);
        setScrollPosition(position || 0);
      }
    };
    
    const container = scrollContainerRef.current;
    if (container) {
      // Reset scroll to beginning on mobile
      const resetScrollPosition = () => {
        if (window.innerWidth < 768) { // Only on mobile
          // Set scroll position to the beginning (first card)
          container.scrollLeft = 0;
          // Update scroll position state
          handleScroll();
        }
      };
      
      container.addEventListener('scroll', handleScroll);
      
      // Initial scroll reset to show first card
      setTimeout(resetScrollPosition, 100);
      
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);
  
  const programs = [
    {
      image: "/images/kr.png",
      title: "Learn to Play",
      track: "Beginner Track",
      description: "Perfect for kids who are new to the game. Learn the basics of movement, rules, and strategy through fun, interactive lessons.",
      buttonText: "Learn More",
      delay: 0.1
    },
    {
      image: "/images/bq.png",
      title: "Get Tournament Ready",
      track: "Intermediate Track",
      description: "For kids who know the basics and are ready for rankings, analysis, and serious competition prep both online and offline.",
      buttonText: "Join Tournament Track",
      delay: 0.2
    },
    {
      image: "/images/rq.png",
      title: "Chess Mastery",
      track: "Advanced Track",
      description: "Designed for highly motivated players aiming to master advanced tactics, analysis, and long-term chess growth with expert coaching.",
      buttonText: "Apply for Mastery Program",
      delay: 0.3
    }
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center text-white py-16">
      {/* Main Content */}
      <div className="text-center mb-12 px-4">
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
          Our Programs
        </motion.h2>
        <motion.p 
          className="text-lg text-white/90 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Structured learning paths designed to elevate your game from the first move to mastery.
        </motion.p>
      </div>
  
      {/* Program Cards Container with custom scrollbar for mobile */}
      <div 
        className="w-full overflow-x-auto md:overflow-x-visible md:scrollbar-default scrollbar-hide relative"
        ref={scrollContainerRef}
        style={{
          scrollbarWidth: 'none', // For Firefox
          msOverflowStyle: 'none' // For IE/Edge
        }}
      >
        {/* Using mx-auto with a specific width to center the flex container itself */}
        <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center md:w-fit mx-auto px-4 md:px-0 gap-x-8">
          {programs.map((program, index) => (
            <ProgramCard key={index} {...program} />
          ))}
        </div>
      </div>
      
      {/* Chess pieces scroll indicator - only visible on mobile */}
      <div className="flex justify-center mt-6 md:hidden">
        <div className="relative w-36 h-6 flex items-center">
          {/* Track background */}
          <div className="absolute inset-0 bg-blue-900/30 rounded-full backdrop-blur-sm border border-blue-500/20"></div>
          
          {/* Chess pieces indicators */}
          <div className="absolute flex space-x-5 left-0 w-full px-3">
            <div className={`transition-opacity duration-300 ${scrollPosition < 0.33 ? 'text-yellow-400' : 'text-white/40'}`}>
              <ChessPawn className="h-4 w-4" />
            </div>
            <div className={`transition-opacity duration-300 ${scrollPosition >= 0.33 && scrollPosition < 0.66 ? 'text-yellow-400' : 'text-white/40'}`}>
              <ChessQueen className="h-4 w-4" />
            </div>
            <div className={`transition-opacity duration-300 ${scrollPosition >= 0.66 ? 'text-yellow-400' : 'text-white/40'}`}>
              <ChessKing className="h-4 w-4" />
            </div>
          </div>
          
          {/* Remove the position indicator dot */}
        </div>
      </div>
    </div>
  )
} 