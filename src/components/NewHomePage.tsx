'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'

// Hero Section
const HeroSection = () => {
  const [kidsCount, setKidsCount] = useState(0)
  const [tournamentsCount, setTournamentsCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  // Optimized counter animation using requestAnimationFrame
  const animationRef = React.useRef<number | undefined>(undefined)

  React.useEffect(() => {
    if (!hasAnimated) return

    const startTime = performance.now()
    const kidsTarget = 5000
    const tournamentsTarget = 100
    const duration = 2000

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3)
      
      const currentKids = Math.floor(kidsTarget * easeOut)
      const currentTournaments = Math.floor(tournamentsTarget * easeOut)
      
      // Only update state if values have changed to prevent unnecessary re-renders
      setKidsCount(prevKids => {
        if (prevKids !== currentKids) return currentKids
        return prevKids
      })
      setTournamentsCount(prevTournaments => {
        if (prevTournaments !== currentTournaments) return currentTournaments
        return prevTournaments
      })
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    animationRef.current = requestAnimationFrame(animate)
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [hasAnimated])

  return (
    <section 
      className="min-h-screen flex flex-col pt-20 md:pt-24"
    >
      {/* Desktop Background */}
      <div 
        className="hidden md:block absolute inset-0 motion-element"
      style={{
        backgroundImage: 'url(/images/Banner.png), linear-gradient(to right, #f3f3f3, #fbfafd)',
        backgroundSize: 'contain, 100% 100%',
        backgroundPosition: 'left calc(100% + 150px), center',
        backgroundRepeat: 'no-repeat, no-repeat',
        width: '100%',
          height: '100vh'
        }}
      />
      
      {/* Mobile Background */}
      <div 
        className="md:hidden absolute inset-0 motion-element"
        style={{
          backgroundImage: 'url(/images/Banner.png), linear-gradient(to right, #f3f3f3, #fbfafd)',
          backgroundSize: '150%, 100% 100%',
          backgroundPosition: 'center bottom, center',
          backgroundRepeat: 'no-repeat, no-repeat',
          width: '100%',
          height: '100vh'
      }}
      />
      
      {/* Content Section */}
      <div className="flex-1 flex items-start md:items-center justify-center relative z-10 pt-24 md:pt-0">
        <div className="w-full px-4 md:px-0 relative">
          {/* Left Content - Main Heading & Subtext */}
          <div className="static md:absolute left-4 md:left-16 top-auto md:top-1/2 transform md:-translate-y-3/4 text-center md:text-left" style={{ top: 'calc(50% - 8px)' }}>
            
            {/* Description - Above Title */}
            <motion.p 
              className="font-lato font-medium text-base md:text-xl"
              style={{
                color: '#F43F5E',
                maxWidth: '750px',
                marginBottom: '8px',
                lineHeight: '1.4'
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Live online classes, exciting tournaments, and personalized learning paths
            </motion.p>
            
            <div className="relative">
            <motion.h1 
                className="font-bebas-neue font-extrabold uppercase text-6xl md:text-[220px]"
              style={{ 
                lineHeight: '0.9',
                color: '#1E3A8A',
                  margin: '0',
                  willChange: 'transform'
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div>
                JOYOUS <span style={{ color: '#F43F5E' }}>CHESS</span>
              </div>
            </motion.h1>
            
              {/* Button Section - Positioned under "SS" in CHESS */}
            <motion.div 
                className="flex justify-center md:justify-end mt-6 md:mt-2 md:absolute md:right-0 md:top-full" 
                style={{ marginTop: '20px' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
            >
              <button 
                className="font-lato font-bold uppercase transition-all duration-300 transform relative overflow-hidden group w-full md:w-auto text-sm md:text-base px-6 py-4 md:px-6 md:py-3 float-button"
                style={{
                  background: 'linear-gradient(135deg, #DC2626 0%, #F43F5E 50%, #EF4444 100%)',
                  color: 'white',
                  borderRadius: '50px',
                  fontWeight: '800',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  cursor: 'pointer',
                  boxShadow: '0 8px 30px rgba(244, 63, 94, 0.6), 0 4px 15px rgba(244, 63, 94, 0.4)',
                  letterSpacing: '1px',
                  position: 'relative',
                  zIndex: 1
                }}
                onClick={() => {
                  const element = document.getElementById('upcoming-classes')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLButtonElement;
                  target.style.background = 'linear-gradient(135deg, #F43F5E 0%, #EF4444 50%, #F87171 100%)';
                  target.style.boxShadow = '0 12px 40px rgba(244, 63, 94, 0.7), 0 6px 20px rgba(244, 63, 94, 0.5)';
                  target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  // Pause floating animation and add hover scale
                  target.style.animationPlayState = 'paused';
                  target.style.transform = 'scale(1.05) translateZ(0)';
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLButtonElement;
                  target.style.background = 'linear-gradient(135deg, #DC2626 0%, #F43F5E 50%, #EF4444 100%)';
                  target.style.boxShadow = '0 8px 30px rgba(244, 63, 94, 0.6), 0 4px 15px rgba(244, 63, 94, 0.4)';
                  target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  // Resume floating animation and remove hover scale
                  target.style.animationPlayState = 'running';
                  target.style.transform = 'scale(1) translateZ(0)';
                }}
              >
                <span style={{ position: 'relative', zIndex: 2 }}>BOOK A FREE CLASS</span>
              </button>
            </motion.div>
            </div>
          </div>

          {/* Right Side Callouts */}
          <div className="w-full md:absolute md:right-20 md:top-1/2 md:transform md:-translate-y-1/2 space-y-6 md:space-y-12 mt-8 md:mt-0 max-w-full md:max-w-[300px] px-4 md:px-0 text-center md:text-left">
            <motion.div 
              className="flex items-start justify-center md:justify-start" 
              style={{ gap: '15px' }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              onAnimationComplete={() => setHasAnimated(true)}
            >
              <div 
                className="hidden md:flex rounded-full items-center justify-center flex-shrink-0"
                style={{ 
                  width: '36px', 
                  height: '36px',
                  backgroundColor: '#F43F5E'
                }}
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M3 10a1 1 0 011-1h10a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 
                  className="font-bebas-neue font-extrabold uppercase mb-2 text-2xl md:text-2xl"
                  style={{ color: '#F43F5E' }}
                >
                  {Math.floor(kidsCount).toLocaleString()}+ KIDS RANKED & COACHED
                </h3>
                <p 
                  className="font-lato font-normal text-base md:text-base"
                  style={{ color: '#1E3A8A' }}
                >
                  Expert guidance helping thousands of children excel in chess competitions
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-start justify-center md:justify-start" 
              style={{ gap: '15px' }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <div 
                className="hidden md:flex rounded-full items-center justify-center flex-shrink-0"
                style={{ 
                  width: '36px', 
                  height: '36px',
                  backgroundColor: '#F43F5E'
                }}
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M3 10a1 1 0 011-1h10a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 
                  className="font-bebas-neue font-extrabold uppercase mb-2 text-2xl md:text-2xl"
                  style={{ color: '#F43F5E' }}
                >
                  {Math.floor(tournamentsCount)}+ CHESS TOURNAMENTS
                </h3>
                <p 
                  className="font-lato font-normal text-base md:text-base"
                  style={{ color: '#1E3A8A' }}
                >
                  Exciting competitive opportunities to showcase skills and build confidence
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Feature Strip Section
const FeatureStripSection = () => {
  const features = [
    { 
      title: "5000+ STUDENTS", 
      desc: "Certified mentors guiding every child in nurturing environment",
      icon: (
        <svg className="w-8 h-8 text-blue-800" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v-3c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v3h3v4H4zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM6.5 11.5c.83 0 1.5-.67 1.5-1.5S7.33 8.5 6.5 8.5 5 9.17 5 10s.67 1.5 1.5 1.5z"/>
        </svg>
      )
    },
    { 
      title: "100+ TOURNAMENTS", 
      desc: "Continuous competitive opportunities and achievement recognition",
      icon: (
        <svg className="w-8 h-8 text-blue-800" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
    },
    { 
      title: "12+ YEARS EXPERIENCE", 
      desc: "Proven expertise since 2010 with technology-powered learning",
      icon: (
        <svg className="w-8 h-8 text-blue-800" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    },
    { 
      title: "STEP-BY-STEP CURRICULUM", 
      desc: "From basics to tournaments with continuous progress tracking",
      icon: (
        <svg className="w-8 h-8 text-blue-800" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
        </svg>
      )
    }
  ];

  return (
    <section className="w-full" style={{ backgroundColor: '#F43F5E' }}>
      {/* Desktop Grid Layout */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                {feature.icon}
              </div>
              <h3 className="text-white font-bebas-neue font-extrabold text-lg mb-2 uppercase">{feature.title}</h3>
              <p className="text-white text-sm font-lato font-normal">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile Continuous Scroller */}
      <div className="md:hidden py-8 overflow-hidden">
        <div className="scroll-container flex gap-8" style={{ width: '200%' }}>
          {/* First set of features */}
          {features.map((feature, index) => (
            <div key={`first-${index}`} className="flex-shrink-0 text-center" style={{ width: '280px' }}>
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                {feature.icon}
              </div>
              <h3 className="text-white font-bebas-neue font-extrabold text-base mb-2 uppercase px-2">{feature.title}</h3>
              <p className="text-white text-xs font-lato font-normal px-2">{feature.desc}</p>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {features.map((feature, index) => (
            <div key={`second-${index}`} className="flex-shrink-0 text-center" style={{ width: '280px' }}>
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                {feature.icon}
              </div>
              <h3 className="text-white font-bebas-neue font-extrabold text-base mb-2 uppercase px-2">{feature.title}</h3>
              <p className="text-white text-xs font-lato font-normal px-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Why Choose Us Section
const WhyChooseUsSection = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  return (
    <section className="bg-white py-12 md:py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start mb-8 md:mb-12">
                    {/* Left Content */}
          <div>
            <motion.h2 
              className="font-bebas-neue font-extrabold leading-none mb-6 md:mb-8 uppercase text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="text-blue-800 text-4xl md:text-7xl">WHY</span><br />
              <span className="text-4xl md:text-7xl" style={{ color: '#F43F5E' }}>CHOOSE US</span>
            </motion.h2>
            
            <div className="space-y-6">
              <motion.h3 
                className="text-blue-800 text-xl font-bebas-neue font-extrabold border-l-4 pl-4 mb-4" 
                style={{ borderColor: '#F43F5E' }}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Experience & Excellence Since 2010
              </motion.h3>
              
              <motion.p 
                className="text-blue-800 text-lg leading-relaxed font-lato font-normal"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                At Joyous Chess, every child is guided by certified mentors in a nurturing environment that develops critical thinking. Our step-by-step curriculum takes students from basics to tournaments with continuous tracking and recognition of achievements.
              </motion.p>
              
              <motion.p 
                className="text-blue-800 text-lg leading-relaxed font-lato font-normal"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                With technology-powered dashboards and in-app puzzles, we have supported over 5,000 students, hosted more than 100 tournaments, and partnered with leading schools across India during our 12+ year journey.
              </motion.p>
            </div>
          </div>

          {/* Right Content - Video */}
          <div className="flex justify-center">
            <motion.div 
              className="relative w-full max-w-lg h-[450px] rounded-lg overflow-hidden"
              style={{ 
                boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
                border: '3px solid #F43F5E'
              }}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <video 
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                muted={isMuted}
                loop
                playsInline
              >
                <source src="/images/video1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Video overlay */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 cursor-pointer"
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
                <div className="absolute top-3 left-3">
                  <h3 className="text-sm font-bold" style={{ color: '#F43F5E' }}>Chess Excellence Journey</h3>
                </div>
                
                {/* Controls */}
                <div className="absolute bottom-3 flex justify-between items-center w-full px-3">
                  <p className="text-white/90 text-xs">Click to play/pause</p>
                  
                  {/* Sound toggle button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute();
                    }}
                    className="bg-black/40 backdrop-blur-sm rounded-full p-2 hover:bg-black/60 transition-colors duration-200"
                  >
                    {isMuted ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/70" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" style={{ color: '#F43F5E' }} viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 3.75a.75.75 0 00-1.264-.546L4.703 7H3.167a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h1.536l4.033 3.796A.75.75 0 0010 16.25V3.75z" />
                        <path d="M15.95 10.5a4.501 4.501 0 00-1.423-3.275.75.75 0 00-1.06 1.06 3.002 3.002 0 010 4.43.75.75 0 001.06 1.06 4.501 4.501 0 001.423-3.275z" />
                        <path d="M12.53 10.5a1 1 0 10-1.06 1.06 1 1 0 001.06-1.06z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden mb-8 md:mb-12">
          {/* Title */}
          <motion.h2 
            className="font-bebas-neue font-extrabold leading-none mb-6 md:mb-8 uppercase text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="text-blue-800 text-4xl md:text-7xl">WHY</span><br />
            <span className="text-4xl md:text-7xl" style={{ color: '#F43F5E' }}>CHOOSE US</span>
          </motion.h2>
          
          {/* Subtitle */}
          <motion.h3 
            className="text-blue-800 text-xl font-bebas-neue font-extrabold border-l-4 pl-4 mb-6 text-center lg:text-left" 
            style={{ borderColor: '#F43F5E' }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Experience & Excellence Since 2010
          </motion.h3>

          {/* Video - Moved here for mobile */}
          <div className="flex justify-center mb-8">
            <motion.div 
              className="relative w-full max-w-md h-[300px] rounded-lg overflow-hidden"
              style={{ 
                boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
                border: '3px solid #F43F5E'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <video 
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                muted={isMuted}
                loop
                playsInline
              >
                <source src="/images/video1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Video overlay */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 cursor-pointer"
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
                <div className="absolute top-3 left-3">
                  <h3 className="text-sm font-bold" style={{ color: '#F43F5E' }}>Chess Excellence Journey</h3>
                </div>
                
                {/* Controls */}
                <div className="absolute bottom-3 flex justify-between items-center w-full px-3">
                  <p className="text-white/90 text-xs">Click to play/pause</p>
                  
                  {/* Sound toggle button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute();
                    }}
                    className="bg-black/40 backdrop-blur-sm rounded-full p-2 hover:bg-black/60 transition-colors duration-200"
                  >
                    {isMuted ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/70" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" style={{ color: '#F43F5E' }} viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 3.75a.75.75 0 00-1.264-.546L4.703 7H3.167a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h1.536l4.033 3.796A.75.75 0 0010 16.25V3.75z" />
                        <path d="M15.95 10.5a4.501 4.501 0 00-1.423-3.275.75.75 0 00-1.06 1.06 3.002 3.002 0 010 4.43.75.75 0 001.06 1.06 4.501 4.501 0 001.423-3.275z" />
                        <path d="M12.53 10.5a1 1 0 10-1.06 1.06 1 1 0 001.06-1.06z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Text Content - After video on mobile */}
          <div className="space-y-6 px-4">
            <motion.p 
              className="text-blue-800 text-lg leading-relaxed font-lato font-normal"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              At Joyous Chess, every child is guided by certified mentors in a nurturing environment that develops critical thinking. Our step-by-step curriculum takes students from basics to tournaments with continuous tracking and recognition of achievements.
            </motion.p>
            
            <motion.p 
              className="text-blue-800 text-lg leading-relaxed font-lato font-normal"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              With technology-powered dashboards and in-app puzzles, we have supported over 5,000 students, hosted more than 100 tournaments, and partnered with leading schools across India during our 12+ year journey.
            </motion.p>
          </div>
        </div>

        {/* Quote and Button Section */}
        <div className="flex flex-col items-center space-y-8">
          {/* Philosophy Quote */}
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="p-8 rounded-lg" style={{ backgroundColor: '#F43F5E' }}>
              <p className="text-white font-lato font-semibold text-xl italic text-center">
                &quot;This is more than learning chess. It is about building focus, confidence, and resilience for life.&quot;
              </p>
              <p className="text-white/90 text-sm text-center mt-3 font-lato">
                - Joyous Chess Philosophy
              </p>
            </div>
          </motion.div>

          {/* See What Parents Say Button */}
          <motion.button
            className="font-lato font-bold uppercase transition-all duration-300 transform relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #DC2626 0%, #F43F5E 50%, #EF4444 100%)',
              color: 'white',
              padding: '18px 36px',
              borderRadius: '50px',
              fontSize: '18px',
              fontWeight: '800',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(244, 63, 94, 0.6), 0 4px 15px rgba(244, 63, 94, 0.4)',
              letterSpacing: '1px',
              position: 'relative',
              zIndex: 1
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6 }}
            onClick={() => {
              const element = document.getElementById('parent-testimonials')
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.background = 'linear-gradient(135deg, #F43F5E 0%, #EF4444 50%, #F87171 100%)';
              target.style.boxShadow = '0 12px 40px rgba(244, 63, 94, 0.7), 0 6px 20px rgba(244, 63, 94, 0.5)';
              target.style.transform = 'translateY(-3px) scale(1.02)';
              target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.background = 'linear-gradient(135deg, #DC2626 0%, #F43F5E 50%, #EF4444 100%)';
              target.style.boxShadow = '0 8px 30px rgba(244, 63, 94, 0.6), 0 4px 15px rgba(244, 63, 94, 0.4)';
              target.style.transform = 'translateY(0) scale(1)';
              target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            <span style={{ position: 'relative', zIndex: 2 }}>SEE WHAT OUR PARENTS SAY</span>
          </motion.button>
        </div>
      </div>
    </section>
  )
}

// Tournaments Section
const TournamentsSection = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  const highlights = [
    {
      title: "Delhi State Chess Championship",
      content: "2000+ participants (2022 & 2023). Hosted by Joyous Chess, with guests from the All India Chess Federation and Delhi Police.",
      icon: "♚"
    },
    {
      title: "Youth Grand Prix 2025", 
      content: "A prestigious platform with 250+ players, 86 trophies, and 48 medals awarded.",
      icon: "♕"
    },
    {
      title: "CaratLane x Joyous Chess Under-7",
      content: "Hosted at a luxury venue with gold prizes, this event celebrated excellence and early talent.",
      icon: "♖"
    }
  ]

  return (
    <section className="bg-blue-800 py-12 md:py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Row - Title and Video */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start mb-8 md:mb-12">
          {/* Left Content - Title and Description */}
          <div>
            <div className="text-center md:text-left">
            <motion.button 
                className="text-white px-6 py-3 rounded-full font-bebas-neue font-extrabold mb-8 uppercase transition-colors" 
              style={{ backgroundColor: '#F43F5E' }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.backgroundColor = '#E11D48';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.backgroundColor = '#F43F5E';
              }}
            >
              TOURNAMENTS
            </motion.button>
            </div>
            
            <motion.h2 
              className="text-white font-bebas-neue font-extrabold text-4xl md:text-6xl leading-tight mb-6 md:mb-8 uppercase text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              SHAPE CHAMPIONS
            </motion.h2>
            
            <motion.p 
              className="text-white text-lg mb-8 leading-relaxed font-lato font-normal"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Joyous Chess doesn&apos;t just teach chess — we build winners. From city-wide tournaments to national-level championships, our events inspire, challenge, and transform.
            </motion.p>

            {/* Highlights */}
            <motion.div 
              className="space-y-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="text-white font-bebas-neue font-extrabold text-lg border-l-4 pl-3" style={{ borderColor: '#F43F5E' }}>
                Tournament Highlights
              </h3>
              {highlights.map((highlight, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl" style={{ color: '#F43F5E' }}>{highlight.icon}</span>
                    <div>
                      <h4 className="font-bebas-neue font-extrabold text-sm mb-1" style={{ color: '#F43F5E' }}>{highlight.title}</h4>
                      <p className="text-white/80 text-xs font-lato font-normal">{highlight.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Video and Stats */}
          <div>
            {/* Video */}
            <div className="flex justify-center mb-8">
              <motion.div 
                className="relative w-full max-w-md h-[500px] rounded-lg overflow-hidden"
                style={{ 
                  boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
                  border: '3px solid #F43F5E'
                }}
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <video 
                  ref={videoRef}
                  className="w-full h-full object-cover"
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
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 cursor-pointer"
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
                  <div className="absolute top-3 left-3">
                    <h3 className="text-sm font-bebas-neue font-extrabold" style={{ color: '#F43F5E' }}>Tournament Highlights</h3>
                  </div>
                  
                  {/* Controls */}
                  <div className="absolute bottom-3 flex justify-between items-center w-full px-3">
                    <p className="text-white/90 text-xs font-lato">Click to play/pause</p>
                    
                    {/* Sound toggle button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMute();
                      }}
                      className="bg-black/40 backdrop-blur-sm rounded-full p-2 hover:bg-black/60 transition-colors duration-200"
                    >
                      {isMuted ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/70" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" style={{ color: '#F43F5E' }} viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 3.75a.75.75 0 00-1.264-.546L4.703 7H3.167a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h1.536l4.033 3.796A.75.75 0 0010 16.25V3.75z" />
                          <path d="M15.95 10.5a4.501 4.501 0 00-1.423-3.275.75.75 0 00-1.06 1.06 3.002 3.002 0 010 4.43.75.75 0 001.06 1.06 4.501 4.501 0 001.423-3.275z" />
                          <path d="M12.53 10.5a1 1 0 10-1.06 1.06 1 1 0 001.06-1.06z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Stats under video */}
            <motion.div 
              className="grid grid-cols-3 gap-4 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bebas-neue font-extrabold" style={{ color: '#F43F5E' }}>100+</div>
                <div className="text-white/80 text-xs font-lato font-normal">Tournaments</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bebas-neue font-extrabold" style={{ color: '#F43F5E' }}>2000+</div>
                <div className="text-white/80 text-xs font-lato font-normal">Participants</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bebas-neue font-extrabold" style={{ color: '#F43F5E' }}>50+</div>
                <div className="text-white/80 text-xs font-lato font-normal">Schools</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Row - Button */}
        <div className="flex justify-center mt-12">
          {/* Register Button */}
          <motion.button 
            className="font-lato font-bold uppercase transition-all duration-300 transform relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #DC2626 0%, #F43F5E 50%, #EF4444 100%)',
              color: 'white',
              padding: '18px 36px',
              borderRadius: '50px',
              fontSize: '18px',
              fontWeight: '800',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(244, 63, 94, 0.6), 0 4px 15px rgba(244, 63, 94, 0.4)',
              letterSpacing: '1px',
              position: 'relative',
              zIndex: 1
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6 }}
            onClick={() => {
              window.location.href = '/TournmentRegistration'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.background = 'linear-gradient(135deg, #F43F5E 0%, #EF4444 50%, #F87171 100%)';
              target.style.boxShadow = '0 12px 40px rgba(244, 63, 94, 0.7), 0 6px 20px rgba(244, 63, 94, 0.5)';
              target.style.transform = 'translateY(-3px) scale(1.02)';
              target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.background = 'linear-gradient(135deg, #DC2626 0%, #F43F5E 50%, #EF4444 100%)';
              target.style.boxShadow = '0 8px 30px rgba(244, 63, 94, 0.6), 0 4px 15px rgba(244, 63, 94, 0.4)';
              target.style.transform = 'translateY(0) scale(1)';
              target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            <span style={{ position: 'relative', zIndex: 2 }}>REGISTER FOR OUR UPCOMING TOURNAMENT</span>
          </motion.button>
        </div>
      </div>
    </section>
  )
}

// Our Champs Section
const OurChampsSection = () => {
  const [scrollPosition, setScrollPosition] = useState(0)

  const champs = [
    {
      name: "Arjun Sharma",
      position: "Champion",
      tournament: "Delhi State Chess Championship",
      image: "/images/pic1.jpg"
    },
    {
      name: "Priya Patel", 
      position: "Champion",
      tournament: "Youth Grand Prix 2025",
      image: "/images/pic2.jpg"
    },
    {
      name: "Rohan Kumar",
      position: "Runner-up", 
      tournament: "CaratLane x Joyous Chess Under-7",
      image: "/images/pic3.jpg"
    },
    {
      name: "Ananya Singh",
      position: "Champion",
      tournament: "National School Chess Championship", 
      image: "/images/pic4.jpg"
    },
    {
      name: "Vikram Joshi",
      position: "Runner-up",
      tournament: "Inter-School Chess Competition",
      image: "/images/pic5.jpg"
    },
    {
      name: "Kavya Reddy",
      position: "Champion",
      tournament: "Mumbai Chess Open",
      image: "/images/pic6.jpg"
    }
  ]

  // Auto-scroll functionality
  React.useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => {
        const cardWidth = 280 // Width of each card + gap
        const totalWidth = champs.length * cardWidth
        const newPosition = prev + cardWidth
        
        // Reset to 0 when we've scrolled through one full set
        return newPosition >= totalWidth ? 0 : newPosition
      })
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [champs.length])

  return (
    <section className="bg-white py-12 md:py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.h2 
          className="font-bebas-neue font-extrabold leading-tight mb-8 md:mb-12 uppercase text-center"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span className="text-blue-800 text-4xl md:text-7xl">OUR </span>
          <span className="text-4xl md:text-7xl" style={{ color: '#F43F5E' }}>CHAMPS</span>
        </motion.h2>

        {/* Horizontal Scrolling Container */}
        <div className="overflow-hidden">
          <motion.div 
            className="flex gap-6"
            style={{ 
              transform: `translateX(-${scrollPosition}px)`,
              transition: scrollPosition === 0 ? 'none' : 'transform 1s ease-in-out'
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Render items twice for seamless loop */}
            {[...champs, ...champs].map((champ, index) => (
              <motion.div 
                key={index}
                className="flex-shrink-0 w-64 bg-white rounded-lg overflow-hidden"
                style={{ 
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  border: '2px solid #F43F5E'
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index % champs.length) * 0.1 }}
              >
                {/* Photo */}
                <div className="w-full h-80 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Kid Photo</span>
                </div>

                {/* Info */}
                <div className="p-4 text-center">
                  <h3 className="text-xl font-bebas-neue font-extrabold text-blue-800 mb-1">
                    {champ.name}
                  </h3>
                  <div className="text-lg font-bebas-neue font-extrabold mb-2" style={{ color: '#F43F5E' }}>
                    {champ.position}
                  </div>
                  <div className="text-sm font-lato text-gray-600">
                    {champ.tournament}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Our Courses Section
const OurCoursesSection = () => {
  const courses = [
    {
      title: "Learn to Play",
      track: "Beginner Track",
      description: "Perfect for kids who are new to the game. Learn the basics of movement, rules, and strategy through fun, interactive lessons.",
      buttonText: "Learn More"
    },
    {
      title: "Get Tournament Ready", 
      track: "Intermediate Track",
      description: "For kids who know the basics and are ready for rankings, analysis, and serious competition prep both online and offline.",
      buttonText: "Join Tournament Track"
    },
    {
      title: "Chess Mastery",
      track: "Advanced Track", 
      description: "Designed for highly motivated players aiming to master advanced tactics, analysis, and long-term chess growth with expert coaching.",
      buttonText: "Apply for Mastery Program"
    }
  ]

  return (
    <section className="bg-blue-800 py-12 md:py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <motion.button 
            className="text-white px-6 py-3 rounded-full font-bebas-neue font-extrabold mb-8 uppercase transition-colors" 
            style={{ backgroundColor: '#F43F5E' }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.backgroundColor = '#E11D48';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.backgroundColor = '#F43F5E';
            }}
          >
            OUR PROGRAMS
          </motion.button>
          
          <motion.h2 
            className="text-white font-bebas-neue font-extrabold text-4xl md:text-6xl leading-tight mb-6 md:mb-8 uppercase"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            OUR COURSES
          </motion.h2>
          
          <motion.p 
            className="text-white text-base md:text-lg mb-8 md:mb-12 leading-relaxed font-lato font-normal max-w-4xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Structured learning paths designed to elevate your game from the first move to mastery. Choose the perfect track for your chess journey.
          </motion.p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg p-8 text-center"
              style={{ 
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
            >
              <h3 className="text-blue-800 font-bebas-neue font-extrabold text-2xl mb-2">
                {course.title}
              </h3>
              <div className="text-lg font-bebas-neue font-extrabold mb-4" style={{ color: '#F43F5E' }}>
                {course.track}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed font-lato">
                {course.description}
              </p>
              <motion.button 
                className="text-white px-6 py-3 rounded-full font-bebas-neue font-extrabold uppercase transition-colors w-full"
                style={{ backgroundColor: '#F43F5E' }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: '#E11D48'
                }}
                whileTap={{ scale: 0.98 }}
              >
                {course.buttonText}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Registration Section
const RegistrationSection = () => {
  const [formData, setFormData] = useState({
    parentFirstName: '',
    parentLastName: '',
    email: '',
    phone: '',
    studentName: '',
    studentSchool: '',
    studentAge: '',
    studentClass: '',
    priorExperience: '',
    classType: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const ageOptions = [
    'Under 5 years',
    '5-7 years',
    '8-10 years',
    '11-13 years',
    '14-16 years',
    '17+ years'
  ]

  const classOptions = [
    'Pre-KG',
    'KG',
    'Class 1',
    'Class 2',
    'Class 3',
    'Class 4',
    'Class 5',
    'Class 6',
    'Class 7',
    'Class 8',
    'Class 9',
    'Class 10',
    'Class 11',
    'Class 12'
  ]

  const experienceOptions = [
    'Complete Beginner',
    'Knows Basic Rules',
    'Casual Player',
    'Tournament Player',
    'Advanced Player'
  ]

  return (
    <section id="upcoming-classes" className="bg-blue-800 py-12 md:py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Content */}
          <div>
            <motion.button 
              className="text-white px-6 py-3 rounded-full font-bebas-neue font-extrabold mb-8 uppercase transition-colors" 
              style={{ backgroundColor: '#F43F5E' }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.backgroundColor = '#E11D48';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.backgroundColor = '#F43F5E';
              }}
            >
              REGISTER HERE
            </motion.button>
            
            <motion.h2 
              className="text-white font-bebas-neue font-extrabold text-4xl md:text-6xl leading-tight mb-6 md:mb-8 uppercase text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              UPCOMING CLASSES
            </motion.h2>
            
            <motion.p 
              className="text-white text-lg mb-12 leading-relaxed font-lato font-normal"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Join our upcoming chess classes and embark on an exciting journey of strategic thinking and mental development. Our expert instructors will guide you through comprehensive lessons designed for all skill levels.
            </motion.p>

            {/* Phone Mockups */}
            <motion.div 
              className="flex space-x-2 md:space-x-4 mb-6 md:mb-8 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {['SC1.png', 'SC2.png', 'SC3.png', 'SC4.png'].map((screenshot, index) => (
                <motion.div 
                  key={index} 
                  className="w-16 md:w-24 h-32 md:h-48 bg-white rounded-lg overflow-hidden flex items-center justify-center shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <img 
                    src={`/images/${screenshot}`} 
                    alt={`Joyous Chess App Screenshot ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              ))}
            </motion.div>

            <motion.button 
              className="text-white px-6 py-3 rounded-full font-bebas-neue font-extrabold uppercase transition-colors" 
              style={{ backgroundColor: '#F43F5E' }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.backgroundColor = '#E11D48';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.backgroundColor = '#F43F5E';
              }}
            >
              Download the Joyous Chess APP Today
            </motion.button>
          </div>

          {/* Right Content - Form */}
          <motion.div 
            className="rounded-lg p-8 form-animate" 
            style={{ backgroundColor: '#F43F5E' }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.4
                  }
                }
              }}
            >
              {/* Class Type Selection */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <select
                  name="classType"
                  value={formData.classType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg text-gray-700 border-2 border-white/20"
                  required
                >
                  <option value="">Select Class Type</option>
                  <option value="online">Online Classes</option>
                  <option value="offline">Offline Classes</option>
                </select>
              </motion.div>

              {/* Parent Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
              >
                <input
                  type="text"
                    name="parentFirstName"
                    placeholder="Parent's First Name"
                    value={formData.parentFirstName}
                  onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg text-gray-700 placeholder-gray-400 border-2 border-white/20"
                  required
                />
              </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <input
                    type="text"
                    name="parentLastName"
                    placeholder="Parent's Last Name"
                    value={formData.parentLastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg text-gray-700 placeholder-gray-400 border-2 border-white/20"
                    required
                  />
                </motion.div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg text-gray-700 placeholder-gray-400 border-2 border-white/20"
                    required
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
              >
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg text-gray-700 placeholder-gray-400 border-2 border-white/20"
                  required
                />
              </motion.div>
              </div>
              
              {/* Student Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.9 }}
              >
                <input
                    type="text"
                    name="studentName"
                    placeholder="Student's Name"
                    value={formData.studentName}
                  onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg text-gray-700 placeholder-gray-400 border-2 border-white/20"
                  required
                />
              </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  <input
                    type="text"
                    name="studentSchool"
                    placeholder="Student's School"
                    value={formData.studentSchool}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg text-gray-700 placeholder-gray-400 border-2 border-white/20"
                    required
                  />
                </motion.div>
              </div>

              {/* Age and Class */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.1 }}
              >
                <select
                    name="studentAge"
                    value={formData.studentAge}
                  onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg text-gray-700 border-2 border-white/20 bg-white"
                  required
                >
                    <option value="">- Select Age -</option>
                    {ageOptions.map((age) => (
                      <option key={age} value={age}>{age}</option>
                    ))}
                </select>
              </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  <select
                    name="studentClass"
                    value={formData.studentClass}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg text-gray-700 border-2 border-white/20 bg-white"
                    required
                  >
                    <option value="">- Select Class -</option>
                    {classOptions.map((className) => (
                      <option key={className} value={className}>{className}</option>
                    ))}
                  </select>
                </motion.div>
              </div>

              {/* Prior Experience */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.3 }}
              >
                <select
                  name="priorExperience"
                  value={formData.priorExperience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg text-gray-700 border-2 border-white/20 bg-white"
                  required
                >
                  <option value="">- Select Experience Level -</option>
                  {experienceOptions.map((experience) => (
                    <option key={experience} value={experience}>{experience}</option>
                  ))}
                </select>
              </motion.div>
              
              <motion.button
                type="submit"
                className="w-full bg-blue-800 text-white py-4 rounded-lg font-bebas-neue font-extrabold hover:bg-blue-900 flex items-center justify-center uppercase"
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 }
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Book Your Free Trial Class Now! ➤
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Testimonials Section
const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)

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

  // Optimized single interval for both mobile and desktop
  const intervalRef = React.useRef<NodeJS.Timeout | undefined>(undefined)

  const startAnimation = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
      setScrollPosition((prev) => {
        const cardWidth = 400
        const totalWidth = testimonials.length * cardWidth
        const newPosition = prev + cardWidth
        return newPosition >= totalWidth ? 0 : newPosition
      })
    }, 4000)
  }, [testimonials.length])

  React.useEffect(() => {
    if (!isPaused) {
      startAnimation()
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPaused, startAnimation])

  // Manual navigation functions
  const handlePrevious = () => {
    setIsPaused(true)
    setScrollPosition((prev) => {
      const cardWidth = 400
      const totalWidth = testimonials.length * cardWidth
      const newPosition = prev - cardWidth
      return newPosition < 0 ? totalWidth - cardWidth : newPosition
    })
    // Resume auto-scroll after 6 seconds
    setTimeout(() => setIsPaused(false), 6000)
  }

  const handleNext = () => {
    setIsPaused(true)
    setScrollPosition((prev) => {
      const cardWidth = 400
      const totalWidth = testimonials.length * cardWidth
      const newPosition = prev + cardWidth
      return newPosition >= totalWidth ? 0 : newPosition
    })
    // Resume auto-scroll after 6 seconds
    setTimeout(() => setIsPaused(false), 6000)
  }

  return (
    <section id="parent-testimonials" className="bg-white py-12 md:py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <motion.h2 
            className="font-bebas-neue font-extrabold leading-none mb-4 md:mb-6 uppercase"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="text-4xl md:text-7xl" style={{ color: '#F43F5E' }}>PARENTS</span><br />
            <span className="text-blue-800 text-4xl md:text-7xl">TESTIMONIAL</span>
          </motion.h2>
          <motion.p 
            className="text-blue-800 text-lg max-w-2xl mx-auto font-lato font-normal"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Hear what parents have to say about their children&apos;s chess learning journey with us.
          </motion.p>
        </div>

        {/* Desktop: Horizontal Sliding Carousel */}
        <motion.div 
          className="hidden md:block mb-8 md:mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="overflow-hidden">
              <motion.div 
              className="flex gap-8 motion-scroll"
              style={{ 
                transform: `translateX(-${scrollPosition}px)`,
                transition: 'transform 1s ease-in-out'
              }}
            >
              {/* Optimized single array with smooth transitions */}
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={testimonial.name}
                  className="flex-shrink-0 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col testimonial-card"
                  style={{ width: '384px', height: '400px' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
              >
                {/* Red header */}
                <div className="h-24 relative" style={{ backgroundColor: '#F43F5E' }}>
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                    <div className="w-24 h-24 bg-gray-200 rounded-full border-4 border-white flex items-center justify-center">
                      <span className="text-gray-500 text-xs">Profile</span>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="px-6 pt-16 pb-6 text-center flex-1 flex flex-col">
                     <div className="flex-1 overflow-y-auto">
                       <p className="text-gray-700 mb-6 italic font-lato font-normal">&quot;{testimonial.text}&quot;</p>
                     </div>
                  
                  {/* Footer - sticks to bottom */}
                  <div className="bg-blue-800 mx-[-24px] mb-[-24px] p-4 mt-auto">
                      <p className="text-white font-bebas-neue font-extrabold">{testimonial.name}</p>
                      <p className="text-white text-sm font-lato font-normal">{testimonial.type}</p>
                  </div>
                </div>
              </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Mobile: Single Testimonial Card with scroll */}
        <motion.div 
          className="md:hidden mb-8 md:mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="px-4">
            <motion.div 
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
              style={{ height: '400px' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {/* Red header */}
              <div className="h-20 relative" style={{ backgroundColor: '#F43F5E' }}>
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
                  <div className="w-20 h-20 bg-gray-200 rounded-full border-4 border-white flex items-center justify-center">
                    <span className="text-gray-500 text-xs">Profile</span>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="px-6 pt-14 pb-6 text-center flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto">
                  <p className="text-gray-700 mb-6 italic font-lato font-normal text-sm">&quot;{testimonials[currentTestimonial].text}&quot;</p>
                </div>
                
                {/* Footer - sticks to bottom */}
                <div className="bg-blue-800 mx-[-24px] mb-[-24px] p-4 mt-auto">
                  <p className="text-white font-bebas-neue font-extrabold text-sm">{testimonials[currentTestimonial].name}</p>
                  <p className="text-white text-xs font-lato font-normal">{testimonials[currentTestimonial].type}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div 
          className="flex justify-center space-x-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.button 
            onClick={() => {
              // Desktop: Use carousel navigation, Mobile: Use testimonial index
              if (window.innerWidth >= 768) {
                handlePrevious();
              } else {
                setCurrentTestimonial((prev) => prev === 0 ? testimonials.length - 1 : prev - 1);
              }
            }}
            className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-colors" 
            style={{ backgroundColor: '#F43F5E' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.backgroundColor = '#E11D48';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.backgroundColor = '#F43F5E';
            }}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </motion.button>
          <motion.button 
            onClick={() => {
              // Desktop: Use carousel navigation, Mobile: Use testimonial index
              if (window.innerWidth >= 768) {
                handleNext();
              } else {
                setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
              }
            }}
            className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-colors" 
            style={{ backgroundColor: '#F43F5E' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.backgroundColor = '#E11D48';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.backgroundColor = '#F43F5E';
            }}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

// Featured Section
const FeaturedSection = () => {
  return (
    <section className="bg-white py-12 md:py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <motion.h2 
            className="font-bebas-neue font-extrabold text-3xl md:text-6xl leading-tight uppercase"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="text-blue-800">WE GOT FEATURED IN</span><br />
            <span style={{ color: '#F43F5E' }}>INTERNATIONAL PUBLICATION</span>
          </motion.h2>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Content - Newspaper */}
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-full max-w-md">
              <motion.img 
                src="/images/Newspaper.jpg" 
                alt="Entertainment Magazine featuring Joyous Chess" 
                className="w-full h-auto rounded-lg shadow-lg"
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              />
            </div>
          </motion.div>

          {/* Right Content - Article */}
          <motion.div 
            className="bg-white shadow-2xl rounded-lg p-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.h3 
              className="text-3xl font-bebas-neue font-extrabold mb-6 uppercase"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="text-black">CHESS: A ROAD TO MAKE YOUR CHILD</span>
              <span style={{ color: '#F43F5E' }}> SMARTER?</span>
            </motion.h3>
            
            <motion.div 
              className="grid grid-cols-2 gap-4 mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.div 
                className="h-32 rounded overflow-hidden"
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <img 
                  src="/images/pic6.jpg" 
                  alt="Chess learning session" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                className="h-32 rounded overflow-hidden"
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <img 
                  src="/images/pic5.jpg" 
                  alt="Students in chess class" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="columns-2 gap-4 text-gray-700 text-sm leading-relaxed font-lato font-normal"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p className="mb-4">
                Chess is more than just a game - it&apos;s a powerful educational tool that develops critical thinking, problem-solving skills, and cognitive abilities in children. Research consistently shows that students who learn chess demonstrate improved academic performance across all subjects.
              </p>
              <p className="mb-4">
                At Joyous Chess Academy, we&apos;ve witnessed remarkable transformations in our students. Children develop patience, strategic planning, and the ability to think several moves ahead - skills that directly translate to better decision-making in real life.
              </p>
              <p>
                Our structured curriculum has helped over 5,000 students not just learn chess, but become more confident, focused, and intellectually curious individuals. The game teaches children that every decision has consequences, fostering responsibility and analytical thinking.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile Layout - Image Only */}
        <div className="lg:hidden">
          <motion.div 
            className="flex justify-center px-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-full max-w-sm">
              <motion.img 
                src="/images/Newspaper.jpg" 
                alt="Entertainment Magazine featuring Joyous Chess" 
                className="w-full h-auto rounded-lg shadow-lg"
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


// Contact Section
const ContactSection = () => {
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Contact form submitted:', contactData)
  }

  return (
    <section className="bg-white py-12 md:py-20 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <motion.h2 
            className="font-bebas-neue font-extrabold text-4xl md:text-6xl uppercase" 
            style={{ color: '#F43F5E' }}
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            GET IN TOUCH
          </motion.h2>
        </div>

        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6 md:p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {/* Left Side - Form Fields */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={contactData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={contactData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={contactData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </motion.div>
              </div>

              {/* Right Side - Message */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <textarea
                  name="message"
                  placeholder="Message"
                  value={contactData.message}
                  onChange={handleChange}
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
                  required
                />
              </motion.div>
            </div>
            
            <div className="text-center mt-8">
              <motion.button
                type="submit"
                className="text-white px-12 py-4 rounded-full font-bebas-neue font-extrabold text-lg transition-colors uppercase"
                style={{ backgroundColor: '#F43F5E' }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLButtonElement;
                  target.style.backgroundColor = '#E11D48';
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLButtonElement;
                  target.style.backgroundColor = '#F43F5E';
                }}
              >
                SEND MESSAGE
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

// Main New HomePage Component
const NewHomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FeatureStripSection />
      <WhyChooseUsSection />
      <TournamentsSection />
      <OurChampsSection />
      <OurCoursesSection />
      <TestimonialsSection />
      <FeaturedSection />
      <RegistrationSection />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default NewHomePage
