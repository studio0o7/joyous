'use client'

import React, { useEffect, useState } from 'react'
import { 
  Header, 
  Chessboard3D, 
  ChessBackground
} from '@/components'
import IndependentStarWarsScroll from '@/components/IndependentStarWarsScroll'

export default function HomePage() {
  // Track viewport dimensions for responsive layout management
  const [viewportHeight, setViewportHeight] = useState(0)
  
  useEffect(() => {
    // Update viewport height on resize and orientation change
    const updateViewportHeight = () => {
      setViewportHeight(window.innerHeight)
      
      // Force layout recalculation with a small delay
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 100)
    }
    
    // Set initial height
    updateViewportHeight()
    
    // Add event listeners
    window.addEventListener('resize', updateViewportHeight)
    window.addEventListener('orientationchange', updateViewportHeight)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', updateViewportHeight)
      window.removeEventListener('orientationchange', updateViewportHeight)
    }
  }, [])
  
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Header - Fixed at top with higher z-index */}
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      
      {/* Background layers - Lower z-index */}
      <div className="fixed inset-0 z-0">
        <ChessBackground />
      </div>
      
      <div className="fixed inset-0 z-10" style={{ height: viewportHeight || '100vh' }}>
        <Chessboard3D />
      </div>
      
      {/* Content container with proper z-index layering */}
      <div className="relative z-20">
        {/* Star Wars Scroll System with proper height management */}
        <IndependentStarWarsScroll />
        
        {/* Content after Star Wars scrolling */}
        <main className="relative z-30">
          {/* Footer removed from main page layout */}
        </main>
      </div>
    </div>
  )
} 