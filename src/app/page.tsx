'use client'

import React, { useEffect, useState } from 'react'
import { 
  Header, 
  Chessboard3D, 
  ChessBackground
} from '@/components'
import IndependentStarWarsScroll from '@/components/IndependentStarWarsScroll'
import MobileSectionsLayout from '@/components/MobileSectionsLayout'
import { useMobileDetection } from '@/hooks/useMobileDetection'

export default function HomePage() {
  // Track viewport dimensions for responsive layout management
  const [viewportHeight, setViewportHeight] = useState(0)
  
  // Mobile detection
  const { isMobile, isLoading } = useMobileDetection()
  
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
  
  // Show loading state while detecting device type
  if (isLoading) {
    return (
      <div className="relative min-h-screen overflow-x-hidden w-full max-w-full">
        <div className="sticky top-0 z-50">
          <Header />
        </div>
        <div className="fixed inset-0 z-0">
          <ChessBackground />
        </div>
        <div className="fixed inset-0 z-10" style={{ height: viewportHeight || '100vh' }}>
          <Chessboard3D />
        </div>
        <div className="relative z-20 flex items-center justify-center min-h-screen">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className={`relative min-h-screen overflow-x-hidden w-full max-w-full ${isMobile ? 'mobile-container' : ''}`}>
      {/* Header - Fixed at top with higher z-index */}
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      
      {/* Background layers - Lower z-index */}
      <div className="fixed inset-0 z-0">
        <ChessBackground />
      </div>
      
      {/* 3D Chessboard - Only for desktop/tablet, not mobile */}
      {!isMobile && (
        <div className="fixed inset-0 z-10" style={{ height: viewportHeight || '100vh' }}>
          <Chessboard3D />
        </div>
      )}
      
      {/* Content container with proper z-index layering */}
      <div className="relative z-20 w-full max-w-full overflow-hidden">
        {/* Conditional rendering based on device type */}
        {isMobile ? (
          /* Mobile: Regular vertical sections layout */
          <MobileSectionsLayout />
        ) : (
          /* Desktop/Tablet: Star Wars scroll effect */
          <>
            <IndependentStarWarsScroll />
            
            {/* Content after Star Wars scrolling */}
            <main className="relative z-30">
              {/* Footer removed from main page layout - handled in mobile layout */}
            </main>
          </>
        )}
      </div>
    </div>
  )
} 