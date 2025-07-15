'use client'

import { useState, useEffect } from 'react'

// Mobile breakpoint from SECTION_DESIGN_RULES.md
const MOBILE_BREAKPOINT = 768

export function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth
      setIsMobile(width < MOBILE_BREAKPOINT)
      setIsLoading(false)
    }

    // Initial check
    checkMobile()

    // Add event listeners for resize and orientation change
    window.addEventListener('resize', checkMobile)
    window.addEventListener('orientationchange', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('orientationchange', checkMobile)
    }
  }, [])

  return { isMobile, isLoading }
} 