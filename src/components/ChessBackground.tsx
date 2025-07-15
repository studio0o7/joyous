'use client'

import React from 'react'

// Simple lightweight chess background - just the gradient
export default function ChessBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      {/* Main gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, 
              #4a6ba8 0%,    /* Light Chess Blue */
              #193A86 25%,   /* Chess Blue */
              #EC4957 50%,   /* Chess Red */
              #193A86 75%,   /* Chess Blue */
              #0f2147 100%   /* Dark Chess Blue */
            )
          `
        }}
      />
    </div>
  )
} 