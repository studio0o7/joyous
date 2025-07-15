'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// Testimonial card component
const TestimonialCard = ({
  name,
  text,
  type,
  delay = 0,
  isOnline = true
}: {
  name: string
  text: string
  type: string
  delay?: number
  isOnline?: boolean
}) => {
  // Star rating - all testimonials have 5 stars
  const renderStars = () => {
    return (
      <div className="flex space-x-1 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className="text-yellow-400 text-sm">★</span>
        ))}
      </div>
    )
  }

  // Function to highlight keywords in gold and bold
  const renderHighlightedText = (text: string) => {
    // Define important keywords to highlight
    const keywords = [
      "excellent", "significant improvement", "highly informative", "dynamic", "innovative",
      "well-structured", "interactive", "motivating", "enthusiastic", "recommend", 
      "patient", "knowledgeable", "passionate", "transformative", "well-rounded",
      "strategies", "tactics", "valuable life lessons", "sportsmanship", "perseverance",
      "discipline", "resilience", "confidence", "self-belief", "positive", "supportive"
    ]
    
    // Create a regex pattern with all keywords (ensuring we match whole words)
    const pattern = new RegExp(`(${keywords.join('|')})`, 'gi')
    
    // Split the text by matches and map each part
    const parts = text.split(pattern)
    
    return parts.map((part, i) => {
      // Check if this part matches any keyword (case insensitive)
      const isKeyword = keywords.some(keyword => 
        part.toLowerCase() === keyword.toLowerCase()
      )
      
      return isKeyword ? 
        <span key={i} className="font-bold text-yellow-400">{part}</span> : 
        <span key={i}>{part}</span>
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="bg-transparent backdrop-blur-sm rounded-xl p-5 shadow-lg hover:shadow-xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 flex flex-col flex-shrink-0 w-[calc(100vw-4rem)] md:w-[300px] lg:w-[350px] h-70" // Reduced height from h-80 to h-72
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div> {/* Top content container */}
        {/* Star Rating */}
        {renderStars()}
        
        {/* Online/Offline Tag */}
        <div className="mb-3">
          <span 
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              isOnline 
                ? 'bg-blue-900/30 text-blue-200 border border-blue-500/30' 
                : 'bg-yellow-900/30 text-yellow-200 border border-yellow-500/30'
            }`}
          >
            {isOnline ? 'Online Class' : 'Offline Class'}
          </span>
        </div>
      </div>
      
      {/* Testimonial Text with highlighted keywords */}
      <p className="text-white/90 mb-4 text-sm italic overflow-y-auto scrollbar-hide"> {/* Make text area grow and scroll if needed */}
        &quot;{renderHighlightedText(text)}&quot;
      </p>
      
      <div className="mt-auto"> {/* Bottom content container - mt-auto added */}
        {/* Divider */}
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mb-3"></div>
        
        {/* Parent Name with King Symbol */}
        <div className="flex items-center">
          <span className="text-yellow-400 mr-2 text-lg">♚</span>
          <div>
            <h3 className="text-yellow-400 font-bold text-sm">{name}</h3>
            <p className="text-white/70 text-xs">{type}</p>
          </div>
        </div>
      </div>

      {/* Chess piece decorations */}
      <div className="absolute bottom-3 right-3 opacity-10 text-yellow-400 text-xl">
        {isOnline ? '♕' : '♚'}
      </div>
    </motion.div>
  )
}

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  
  // Theme colors
  const goldLight = '#f8d008'
  const goldDark = '#d4af37'

  const testimonials = [
    {
      name: "Chetan Sharma",
      text: "Joyous Chess Academy offers an excellent blend of theory and practical training in their online classes. My child has shown significant improvement in chess tactics and strategies.",
      type: "Parent",
      isOnline: true
    },
    {
      name: "Vikram Khanna",
      text: "The online chess classes at Joyous Chess Academy are highly informative and dynamic, incorporating innovative teaching methods that make learning chess fun and engaging.",
      type: "Parent",
      isOnline: true
    },
    {
      name: "Ankita Arora",
      text: "The online chess classes at Joyous Chess are well-structured and interactive, keeping my child motivated and enthusiastic about learning chess.",
      type: "Parent",
      isOnline: true
    },
    {
      name: "Shilpa Agarwal",
      text: "I highly recommend their online classes. The instructors are patient, knowledgeable, and dedicated to nurturing young chess players.",
      type: "Parent",
      isOnline: true
    },
    {
      name: "Ashwani Jain",
      text: "Joyous Chess Academy has a fantastic team of instructors who are passionate about chess and dedicated to nurturing young talents. Their offline classes have been transformative for my child.",
      type: "Parent",
      isOnline: false
    },
    {
      name: "Goyal Krishnan",
      text: "Joyous Chess Academy's offline classes provide a well-rounded chess education, covering various aspects of the game, including opening strategies, mid-game tactics, and endgame techniques.",
      type: "Parent",
      isOnline: false
    },
    {
      name: "Paul Sebastian",
      text: "Joyous Chess Academy's offline classes have not only improved my child's chess skills but also taught them valuable life lessons such as sportsmanship and perseverance.",
      type: "Parent",
      isOnline: false
    },
    {
      name: "Himani Gupta",
      text: "I am grateful to Joyous Chess Academy for their offline classes, which have not only honed my child's chess skills but also instilled discipline and resilience.",
      type: "Parent",
      isOnline: false
    },
    {
      name: "Vineet Bhardwaj",
      text: "Joyous Chess Academy's offline classes have helped my child gain confidence and self-belief, both on and off the chessboard.",
      type: "Parent",
      isOnline: false
    },
    {
      name: "Anushree Paul",
      text: "Joyous Chess Academy has created a positive and supportive learning environment in their offline classes, fostering friendships and a love for the game among young chess enthusiasts.",
      type: "Parent",
      isOnline: false
    }
  ]

  // Auto-slide functionality
  useEffect(() => {
    const startAutoSlide = () => {
      intervalRef.current = setInterval(() => {
        if (testimonials.length > 0) {
          setActiveIndex((prevIndex) => 
            prevIndex >= testimonials.length - 1 ? 0 : prevIndex + 1
          )
        }
      }, 3000)
    }
    
    startAutoSlide()
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [testimonials.length])

  // Scroll to active index
  useEffect(() => {
    if (sliderRef.current) {
      const scrollAmount = activeIndex * (320 + 16) // card width + gap
      sliderRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      })
    }
  }, [activeIndex])

  // Handle manual navigation with chess pieces
  const handlePieceClick = (index: number) => {
    setActiveIndex(index)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    
    // Restart auto slider after manual navigation
    intervalRef.current = setInterval(() => {
      if (testimonials.length > 0) {
        setActiveIndex((prevIndex) => 
          prevIndex >= testimonials.length - 1 ? 0 : prevIndex + 1
        )
      }
    }, 3000)
  }

  // Chess pieces for navigation
  const chessPieces = ['♟', '♞', '♝', '♜', '♛', '♚', '♟', '♞', '♝', '♜']

  return (
    <section className="pb-12 relative z-10 sm:px-4 px-6 sm:pt-24 pt-32">
      <div className="container mx-auto px-4">
        
        {/* Chess pieces background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -left-10 text-yellow-500/5 text-[150px] transform -rotate-12">♞</div>
          <div className="absolute -bottom-20 -right-10 text-yellow-500/5 text-[200px] transform rotate-12">♝</div>
        </div>
        
        {/* Section Header - More compact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl lg:text-3xl font-bold mb-2"
            style={{
              color: goldLight,
              textShadow: `0 2px 10px rgba(0,0,0,0.4), 0 0 30px rgba(248,208,8,0.3)`
            }}
          >
            Hear From Our Parents
          </h2>
          <p className="text-base text-white/90 max-w-2xl mx-auto">
            Don&apos;t take our word for it — see what parents are saying about our chess programs
          </p>
        </motion.div>

        {/* Testimonials Slider */}
        <div className="relative">
          {/* Add mobile-only snap scrolling to the slider */}
          <div 
            ref={sliderRef}
            className="flex overflow-x-auto gap-4 pb-8 scrollbar-hide snap-x snap-mandatory md:snap-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.name} className="flex-shrink-0 snap-center md:snap-align-none">
                <TestimonialCard
                  name={testimonial.name}
                  text={testimonial.text}
                  type={testimonial.type}
                  isOnline={testimonial.isOnline}
              delay={index * 0.1}
            />
              </div>
          ))}
        </div>
          
          {/* Chess piece navigation instead of dots - more compact */}
          <div className="flex justify-center mt-2 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handlePieceClick(index)}
                className={`transition-all duration-300 text-sm md:text-lg ${
                  activeIndex === index 
                    ? 'text-yellow-400 scale-125' 
                    : 'text-white/30 hover:text-white/60'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              >
                {chessPieces[index % chessPieces.length]}
              </button>
            ))}
          </div>
            </div>
            
        {/* Join Our Community CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 text-center"
        >
          <motion.button 
            className="group relative inline-flex items-center justify-center font-tenor-sans font-semibold transition-all duration-300 overflow-hidden"
            style={{
              background: `rgba(25,58,134,0.5)`,
              border: `2px solid ${goldDark}`,
              color: goldLight,
              boxShadow: `
                0 5px 15px rgba(212,175,55,0.3),
                0 2px 8px rgba(0,0,0,0.4)
              `,
              textShadow: '0 1px 2px rgba(0,0,0,0.2)',
              padding: '0.5rem 1.5rem',
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
            <span className="relative z-10 transition-all duration-300 group-hover:scale-105">
              Join Our Community
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
} 