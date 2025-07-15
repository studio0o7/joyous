'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'

// Import sections
import HeroSection from './HeroSection'
import WhyUsSection from './sections/WhyUsSection'
import ProgramsSection from './sections/ProgramsSection'
import TournamentsSection from './sections/TournamentsSection'
import LearningToolsSection from './sections/LearningToolsSection'
import TestimonialsSection from './sections/PrestigeSection'
import ContactSection from './sections/ContactSection'

// Simplified section height calculation using CSS clamp approach
export const getSectionHeight = () => {
  if (typeof window === 'undefined') return 800 // Default for SSR
  
  const viewportHeight = window.innerHeight
  
  // Simple clamp-based calculation: clamp(400px, 85vh, 1200px)
  const sectionHeight = Math.max(400, Math.min(viewportHeight * 0.85, 1200))
  
  return Math.round(sectionHeight)
}

// Export function for page component to use
export const getTotalScrollHeight = () => {
  if (typeof window === 'undefined') return 5600 // Default for SSR
  const sectionHeight = getSectionHeight()
  return sectionHeight * SECTIONS.length
}

// All sections including Hero - ALL use Star Wars effect now
const SECTIONS = [
  { id: 'hero', component: HeroSection, title: 'Joyous Chess Academy' },
  { id: 'why-us', component: WhyUsSection, title: '' },
  { id: 'tools', component: LearningToolsSection, title: '' },
  { id: 'programs', component: ProgramsSection, title: '' },
  { id: 'tournaments', component: TournamentsSection, title: '' },
  { id: 'testimonials', component: TestimonialsSection, title: '' },
  { id: 'contact', component: ContactSection, title: '' }
]

// Star Wars Section Component with responsive sizing
function StarWarsSection({ 
  section, 
  index, 
  smoothProgress,
  sectionHeight,
  isActive
}: { 
  section: typeof SECTIONS[0]
  index: number
  smoothProgress: MotionValue<number>
  sectionHeight: number
  isActive: boolean
}) {
  const Component = section.component
  
  // Calculate this section's progress based on smooth progress
  const sectionStart = index / SECTIONS.length
  const sectionEnd = (index + 1) / SECTIONS.length
  
  const sectionProgress = useTransform(
    smoothProgress,
    [sectionStart, sectionEnd],
    [0, 1]
  )
  
  // Special handling for Hero section (no title overlay)
  const isHero = section.id === 'hero'
  
  // Smooth transforms using useTransform for hardware acceleration
  const scale = useTransform(sectionProgress, [0, 0.5, 1], [0.8, 1, 1.2])
  const heroOpacity = useTransform(sectionProgress, [0, 0.8, 1], [1, 1, 0])
  const normalOpacity = useTransform(sectionProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const opacity = isHero ? heroOpacity : normalOpacity
  const translateZ = useTransform(sectionProgress, [0, 1], [100, -100])
  const rotateX = useTransform(sectionProgress, [0, 0.5, 1], [6, 0, -6]) // Reduced from 15° to 6°
  
  // Title opacity for non-hero sections
  const titleOpacity = useTransform(sectionProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  
  // Create transform for translateZ and rotateX outside of conditional rendering
  const combinedTransform = useTransform(
    [translateZ, rotateX],
    ([z, rx]) => `perspective(1000px) translateZ(${z}px) rotateX(${rx}deg)`
  )
  
  // Only render if close to being active (performance optimization)
  if (!isActive && Math.abs(index - smoothProgress.get() * SECTIONS.length) > 1.5) {
    return null
  }
  
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-20 pointer-events-none"
      style={{
        opacity,
        scale,
        height: `${sectionHeight}px`, // Dynamic height
        transform: combinedTransform,
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Section Title - Only for non-Hero sections with safe zone */}
      {!isHero && section.title && (
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 z-10 w-full px-4"
          style={{ 
            opacity: titleOpacity,
            top: 'clamp(8vh, 10vh, 12vh)'
          }}
        >
          <h2 
            className="font-bold text-center text-yellow-400 tracking-wider"
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 3rem)'
            }}
          >
            {section.title.toUpperCase()}
          </h2>
          <div 
            className="bg-yellow-400 mx-auto rounded-full" 
            style={{
              width: 'clamp(4rem, 6vw, 6rem)',
              height: '4px',
              marginTop: 'clamp(0.5rem, 1vw, 0.75rem)'
            }}
          />
        </motion.div>
      )}
      
      {/* Section Content - No restrictions, let each section handle its own spacing */}
      <div className="relative z-10 w-full h-full">
        <Component />
      </div>
    </motion.div>
  )
}

// Main Star Wars Scroll Component
export default function IndependentStarWarsScroll() {
  const [mounted, setMounted] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)
  const [sectionHeight, setSectionHeight] = useState(800)
  const [totalHeight, setTotalHeight] = useState(5600) // Default height to prevent footer flash
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Create a scroll area that maps exactly to our allocated space
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })
  
  // Spring physics for smooth scrolling - use direct scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  
  // Current section calculation
  const currentSectionProgress = useTransform(
    smoothProgress,
    (value) => Math.floor(value * SECTIONS.length)
  )
  
  // Handle window resize and calculate section height
  useEffect(() => {
    const handleResize = () => {
      const newSectionHeight = getSectionHeight()
      const newTotalHeight = newSectionHeight * SECTIONS.length
      setSectionHeight(newSectionHeight)
      setTotalHeight(newTotalHeight)
    }
    
    handleResize() // Initial calculation
    
    // Add event listeners for both resize and orientation change
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  useEffect(() => {
    const unsubscribe = currentSectionProgress.onChange((section) => {
      setCurrentSection(Math.min(section, SECTIONS.length - 1))
    })
    
    return unsubscribe
  }, [currentSectionProgress])
  
  // Calculate the current section progress for active section detection
  const currentSectionValue = smoothProgress.get() * SECTIONS.length
  
  // Don't render anything until mounted to prevent hydration issues
  if (!mounted) {
    return <div className="relative z-20" style={{ height: '100vh' }} /> // Use viewport height as placeholder
  }
  
  return (
    <div ref={containerRef} className="relative z-20" style={{ height: totalHeight }}>
      {/* Fixed positioned sections within the scroll container */}
      <div className="fixed inset-0 z-20">
        {/* Render all sections with dynamic sizing */}
        {SECTIONS.map((section, index) => {
          // Only render sections that are close to being active for performance
          const isActive = Math.abs(index - currentSectionValue) < 2
          
          return (
            <StarWarsSection
              key={section.id}
              section={section}
              index={index}
              smoothProgress={smoothProgress}
              sectionHeight={sectionHeight}
              isActive={isActive}
            />
          )
        })}
        
        {/* Section Progress Indicator - Only show after Hero */}
        <motion.div 
          className="fixed bottom-[3vh] md:bottom-[4vh] right-[5vw] md:right-[3vw] z-30 flex flex-col space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: currentSection > 0 ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {SECTIONS.slice(1).map((_, index) => (
            <motion.div
              key={index}
              className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-500 ${
                index === currentSection - 1 
                  ? 'bg-yellow-400 scale-125' 
                  : 'bg-white/30'
              }`}
              whileHover={{ scale: 1.3 }}
            />
          ))}
        </motion.div>
        
        {/* Current Section Number - Only show after Hero */}
        <motion.div
          className="fixed top-[2vh] md:top-[3vh] right-[5vw] md:right-[3vw] z-30 text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: currentSection > 0 ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="text-yellow-400 font-bold text-lg md:text-xl">
            {String(currentSection).padStart(2, '0')}
          </div>
          <div className="text-white/40 text-xs">
            of {String(SECTIONS.length - 1).padStart(2, '0')}
          </div>
        </motion.div>
      </div>
    </div>
  )
} 