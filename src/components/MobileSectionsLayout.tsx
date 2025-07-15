'use client'

import React from 'react'
import { motion } from 'framer-motion'

// Import all sections
import HeroSection from './HeroSection'
import WhyUsSection from './sections/WhyUsSection'
import ProgramsSection from './sections/ProgramsSection'
import TournamentsSection from './sections/TournamentsSection'
import LearningToolsSection from './sections/LearningToolsSection'
import PrestigeSection from './sections/PrestigeSection'
import ContactSection from './sections/ContactSection'
import Footer from './Footer'

// Mobile section configuration - using design rules with proper viewport handling
const MOBILE_SECTIONS = [
  { id: 'hero', component: HeroSection, minHeight: '100vh' }, // Hero takes full viewport
  { id: 'why-us', component: WhyUsSection, minHeight: 'max(550px, 100vh)' },
  { id: 'tools', component: LearningToolsSection, minHeight: 'max(550px, 100vh)' },
  { id: 'programs', component: ProgramsSection, minHeight: 'max(550px, 100vh)' },
  { id: 'tournaments', component: TournamentsSection, minHeight: 'max(550px, 100vh)' },
  { id: 'prestige', component: PrestigeSection, minHeight: 'max(550px, 100vh)' },
  { id: 'contact', component: ContactSection, minHeight: 'max(550px, 100vh)' }
]

// Mobile Section Wrapper Component
function MobileSectionWrapper({ 
  section, 
  index 
}: { 
  section: typeof MOBILE_SECTIONS[0]
  index: number 
}) {
  const Component = section.component
  const isHero = section.id === 'hero'
  
  return (
    <motion.section
      id={section.id}
      className={`relative w-full max-w-full flex flex-col items-center justify-center overflow-hidden ${
        isHero ? 'min-h-screen' : ''
      }`}
      style={{ 
        minHeight: section.minHeight,
        // Ensure proper spacing and prevent overflow
        paddingTop: isHero ? '0' : '1rem',
        paddingBottom: isHero ? '0' : '1rem',
        paddingLeft: '0',
        paddingRight: '0'
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: 'easeOut'
      }}
    >
      {/* Section content with proper constraints */}
      <div className="relative z-20 w-full max-w-full h-full overflow-hidden">
        <Component />
      </div>
    </motion.section>
  )
}

// Main Mobile Layout Component
export default function MobileSectionsLayout() {
  return (
    <div className="relative z-20 w-full max-w-full overflow-hidden">
      {/* Mobile sections container with proper constraints */}
      <div className="relative w-full max-w-full">
        {MOBILE_SECTIONS.map((section, index) => (
          <MobileSectionWrapper
            key={section.id}
            section={section}
            index={index}
          />
        ))}
      </div>
      
      {/* Footer - only show on mobile layout */}
      <div className="relative z-30 w-full max-w-full">
        <Footer />
      </div>
    </div>
  )
} 