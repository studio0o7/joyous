'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AboutUsPage() {
  const [yearsCount, setYearsCount] = useState(0)
  const [playersCount, setPlayersCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  // Animated counter effect
  React.useEffect(() => {
    if (!hasAnimated) return

    const yearsTarget = 12
    const playersTarget = 5000
    const duration = 2000 // 2 seconds
    const yearsIncrement = yearsTarget / (duration / 16)
    const playersIncrement = playersTarget / (duration / 16)

    const interval = setInterval(() => {
      setYearsCount(prev => {
        const next = Math.min(prev + yearsIncrement, yearsTarget)
        return next
      })
      setPlayersCount(prev => {
        const next = Math.min(prev + playersIncrement, playersTarget)
        return next
      })
    }, 16) // 60fps

    const timeout = setTimeout(() => {
      clearInterval(interval)
      setYearsCount(yearsTarget)
      setPlayersCount(playersTarget)
    }, duration)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [hasAnimated])

  const processSteps = [
    {
      title: "Engage",
      description: "Ignite enthusiasm for chess through interactive and fun-filled lessons.",
      icon: "♚"
    },
    {
      title: "Educate", 
      description: "Provide personalized instruction tailored to each student's skill level and goals.",
      icon: "♛"
    },
    {
      title: "Empower",
      description: "Foster critical thinking, strategic decision-making, and character development.",
      icon: "♜"
    },
    {
      title: "Excel",
      description: "Cultivate a supportive environment where students can thrive & achieve chess mastery.",
      icon: "♝"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <style jsx>{`
        .mobile-scroll {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* Internet Explorer 10+ */
        }
        
        .mobile-scroll::-webkit-scrollbar { /* WebKit */
          display: none;
        }

        @keyframes auto-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-352px * 4)); /* 4 cards * (320px width + 32px gap) */
          }
        }
        
        .auto-scroll {
          animation: auto-scroll 15s linear infinite;
          will-change: transform;
          transform: translateZ(0);
        }
        
        .auto-scroll:hover {
          animation-play-state: paused;
        }
        
        @media (min-width: 768px) {
          .auto-scroll {
            animation: none;
          }
        }
      `}</style>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-40 pb-12 md:pb-16 px-4 md:px-6" style={{ backgroundColor: '#1E3A8A' }}>
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-8">
              <span className="text-6xl md:text-8xl mr-6" style={{ color: '#F43F5E' }}>♚</span>
              <h1 className="font-bebas-neue font-extrabold text-5xl md:text-7xl uppercase text-white">
                About Joyous Chess
              </h1>
              <span className="text-6xl md:text-8xl ml-6" style={{ color: '#F43F5E' }}>♚</span>
            </div>
            
            <div className="mb-8">
              <p className="font-lato font-medium text-lg md:text-2xl text-white max-w-5xl mx-auto">
                Experience the joy of chess with Joyous Chess – the gateway to strategic brilliance and boundless possibilities.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 100% Chess Literacy Section */}
      <section className="py-12 md:py-16 px-4 md:px-6" style={{ backgroundColor: '#F43F5E' }}>
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-bebas-neue font-extrabold text-4xl md:text-6xl uppercase text-white mb-6 tracking-widest">
              1 0 0 %   C H E S S   L I T E R A C Y
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Main Description */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-lato font-normal text-lg md:text-xl leading-relaxed text-gray-700 mb-8">
                Welcome to Joyous Chess Academy, a place where young chess enthusiasts come to learn and compete at a professional level. Our mission is to help young minds develop strategic thinking skills and gain confidence through the game of chess. Our experienced coaches use interactive teaching methods and personalised attention to ensure that each student reaches their full potential.
              </p>
              <p className="font-lato font-normal text-lg md:text-xl leading-relaxed text-gray-700">
                Understanding depriving chess culture in the country from a lacking 4%, Joyous Chess Academy aims to increase the same with curriculum specially designed for chess & digitalized learning using our application and web classrooms to provide hybrid and remote learning and imbibe chess culture to whole 100% in the country.
              </p>
            </motion.div>

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-full max-w-lg">
                <div 
                  className="absolute -top-4 -right-4 w-full h-full rounded-2xl"
                  style={{ backgroundColor: '#F43F5E', zIndex: 1 }}
                ></div>
                <img
                  src="/images/About_US.png"
                  alt="About Joyous Chess Academy"
                  className="relative w-full h-auto rounded-2xl shadow-2xl z-10"
                  style={{ zIndex: 10 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 md:py-20 px-4 md:px-6" style={{ backgroundColor: '#1E3A8A' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              onAnimationComplete={() => setHasAnimated(true)}
            >
              <div className="font-bebas-neue font-extrabold text-6xl md:text-8xl text-white mb-4">
                {Math.floor(yearsCount)}+
              </div>
              <p className="font-lato font-medium text-xl md:text-2xl text-white">Years Experienced</p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="font-bebas-neue font-extrabold text-6xl md:text-8xl text-white mb-4">
                {Math.floor(playersCount).toLocaleString()}+
              </div>
              <p className="font-lato font-medium text-xl md:text-2xl text-white">Chess Players</p>
            </motion.div>
          </div>
        </div>
      </section>



      {/* Our Process */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-bebas-neue font-extrabold text-4xl md:text-6xl uppercase mb-4" style={{ color: '#1E3A8A' }}>
              Our Process
            </h2>
          </motion.div>

          {/* Mobile horizontal auto-scroll */}
          <div className="md:hidden overflow-hidden pb-4">
            <div className="flex gap-8 w-max auto-scroll">
              {[...processSteps, ...processSteps].map((step, index) => (
                <motion.div
                  key={index}
                  className="text-center w-80 flex-shrink-0"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (index % processSteps.length) * 0.1 }}
                >
                  <div 
                    className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                    style={{ backgroundColor: '#F43F5E' }}
                  >
                    <span className="text-4xl text-white">{step.icon}</span>
                  </div>
                  <h3 className="font-bebas-neue font-extrabold text-2xl uppercase mb-4" style={{ color: '#1E3A8A' }}>
                    {step.title}
                  </h3>
                  <p className="font-lato font-normal text-base leading-relaxed text-gray-700">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Desktop grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div 
                  className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                  style={{ backgroundColor: '#F43F5E' }}
                >
                  <span className="text-4xl text-white">{step.icon}</span>
                </div>
                <h3 className="font-bebas-neue font-extrabold text-2xl md:text-3xl uppercase mb-4" style={{ color: '#1E3A8A' }}>
                  {step.title}
                </h3>
                <p className="font-lato font-normal text-base leading-relaxed text-gray-700">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Academy Description */}
      <section className="py-12 md:py-20 px-4 md:px-6" style={{ backgroundColor: '#1E3A8A' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-8">
              <span className="text-5xl mr-4" style={{ color: '#F43F5E' }}>♟</span>
              <h2 className="font-bebas-neue font-extrabold text-4xl md:text-6xl uppercase text-white">
                At Joyous Chess Academy
              </h2>
              <span className="text-5xl ml-4" style={{ color: '#F43F5E' }}>♟</span>
            </div>
            
            <p className="font-lato font-normal text-lg md:text-xl leading-relaxed text-white mb-8">
              We don&apos;t just teach chess, we build champions. Our students have access to exclusive training programs and participate in local and national tournaments, where they can put their skills to the test and learn from their experiences. We believe that every child has the potential to be a chess master, and we are here to guide them on their journey.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <motion.div
                className="text-left"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3" style={{ color: '#F43F5E' }}>♝</span>
                  <h3 className="font-bebas-neue font-extrabold text-2xl uppercase text-white">
                    Journey to Excellence:
                  </h3>
                </div>
                <p className="font-lato font-normal text-base leading-relaxed text-white/90">
                  Embark on a remarkable journey to chess excellence with JoyousChess, where each step forward brings your child closer to their full potential.
                </p>
              </motion.div>

              <motion.div
                className="text-left"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3" style={{ color: '#F43F5E' }}>♞</span>
                  <h3 className="font-bebas-neue font-extrabold text-2xl uppercase text-white">
                    Flexible Learning Options:
                  </h3>
                </div>
                <p className="font-lato font-normal text-base leading-relaxed text-white/90">
                  Whether you prefer online classes or face-to-face instruction, we offer flexible learning options to suit your schedule and preferences.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Founders */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <span className="text-5xl mr-4" style={{ color: '#F43F5E' }}>♚</span>
              <h2 className="font-bebas-neue font-extrabold text-4xl md:text-6xl uppercase" style={{ color: '#1E3A8A' }}>
                Our Founders
              </h2>
              <span className="text-5xl ml-4" style={{ color: '#F43F5E' }}>♛</span>
            </div>
          </motion.div>

          {/* Founder 1 - Jotish Joy */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Mobile Layout - Name first, then image */}
            <div className="lg:hidden text-center">
              <h4 className="font-bebas-neue font-extrabold text-3xl md:text-4xl uppercase mb-6" style={{ color: '#F43F5E' }}>
                Mr Jotish Joy
              </h4>
              <motion.div
                className="flex justify-center mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="relative w-full max-w-sm">
                  <div 
                    className="absolute -top-4 -left-4 w-full h-full rounded-2xl"
                    style={{ backgroundColor: '#F43F5E', zIndex: 1 }}
                  ></div>
                  <img
                    src="/images/Jotish.png"
                    alt="Mr Jotish Joy - Founder"
                    className="relative w-full h-auto aspect-square object-contain rounded-2xl shadow-2xl z-10 bg-white"
                    style={{ zIndex: 10 }}
                  />
                </div>
              </motion.div>
              <p className="font-lato font-normal text-base leading-relaxed text-gray-700">
                Mr Jotish Joy is an international Fide Rated Chess Player who has been playing the sport since his young age. As a young chess player, he has won several gold medals during SGFI tournaments for his school. He has played across several national and international tournaments. He has ten years of nurturing young talented minds internationally. He has won several accolades in the past decade prominent being All India Chess Universities North Zone Gold Medallist in the year 2014, Captioned Shri Ram College of Commerce and won all Delhi inter college tournaments. He was School Nationals under 19 Gold Medallist in the year 2010 and participated in the prestigious Commonwealth Chess Championship held in Delhi in 2010. His works towards the game of chess has got international recognition in international publications as well. His proven teaching methodologies combined with hard work and dedication has helped many young minds to represent themselves at international chess arena.
              </p>
            </div>

            {/* Desktop Layout - Side by side */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <h4 className="font-bebas-neue font-extrabold text-3xl md:text-4xl uppercase mb-6" style={{ color: '#F43F5E' }}>
                  Mr Jotish Joy
                </h4>
                <p className="font-lato font-normal text-base leading-relaxed text-gray-700">
                  Mr Jotish Joy is an international Fide Rated Chess Player who has been playing the sport since his young age. As a young chess player, he has won several gold medals during SGFI tournaments for his school. He has played across several national and international tournaments. He has ten years of nurturing young talented minds internationally. He has won several accolades in the past decade prominent being All India Chess Universities North Zone Gold Medallist in the year 2014, Captioned Shri Ram College of Commerce and won all Delhi inter college tournaments. He was School Nationals under 19 Gold Medallist in the year 2010 and participated in the prestigious Commonwealth Chess Championship held in Delhi in 2010. His works towards the game of chess has got international recognition in international publications as well. His proven teaching methodologies combined with hard work and dedication has helped many young minds to represent themselves at international chess arena.
                </p>
              </div>

              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="relative w-full max-w-md">
                  <div 
                    className="absolute -top-4 -left-4 w-full h-full rounded-2xl"
                    style={{ backgroundColor: '#F43F5E', zIndex: 1 }}
                  ></div>
                  <img
                    src="/images/Jotish.png"
                    alt="Mr Jotish Joy - Founder"
                    className="relative w-full h-auto aspect-square object-contain rounded-2xl shadow-2xl z-10 bg-white"
                    style={{ zIndex: 10 }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Founder 2 - Jasmine Joy */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Mobile Layout - Name first, then image */}
            <div className="lg:hidden text-center">
              <h4 className="font-bebas-neue font-extrabold text-3xl md:text-4xl uppercase mb-6" style={{ color: '#F43F5E' }}>
                Ms. Jasmine Joy
              </h4>
              <motion.div
                className="flex justify-center mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="relative w-full max-w-sm">
                  <div 
                    className="absolute -top-4 -right-4 w-full h-full rounded-2xl"
                    style={{ backgroundColor: '#F43F5E', zIndex: 1 }}
                  ></div>
                  <img
                    src="/images/Jasmine.png"
                    alt="Ms. Jasmine Joy - Co-Founder"
                    className="relative w-full h-auto aspect-square object-contain rounded-2xl shadow-2xl z-10 bg-white"
                    style={{ zIndex: 10 }}
                  />
                </div>
              </motion.div>
              <p className="font-lato font-normal text-base leading-relaxed text-gray-700">
                Miss Jasmine completed her Bachelors of Arts Political Science (Hons) from Jesus and Mary College, Chanakyapuri and Bachelors of Education from Amity University in 2020, she&apos;s an educationist with half a decade of experience with a vision to transform and nurture young talents. She has contributed towards several anthologies and she works hand in hand to write poems, rhymes, and short stories for young children in the field of chess too. With her expertise knowledge in catering to the needs of different age groups she has contributed in designing the curriculum according to different age categories.
              </p>
            </div>

            {/* Desktop Layout - Image on right, text on left */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <h4 className="font-bebas-neue font-extrabold text-3xl md:text-4xl uppercase mb-6" style={{ color: '#F43F5E' }}>
                  Ms. Jasmine Joy
                </h4>
                <p className="font-lato font-normal text-base leading-relaxed text-gray-700">
                  Miss Jasmine completed her Bachelors of Arts Political Science (Hons) from Jesus and Mary College, Chanakyapuri and Bachelors of Education from Amity University in 2020, she&apos;s an educationist with half a decade of experience with a vision to transform and nurture young talents. She has contributed towards several anthologies and she works hand in hand to write poems, rhymes, and short stories for young children in the field of chess too. With her expertise knowledge in catering to the needs of different age groups she has contributed in designing the curriculum according to different age categories.
                </p>
              </div>

              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="relative w-full max-w-md">
                  <div 
                    className="absolute -top-4 -right-4 w-full h-full rounded-2xl"
                    style={{ backgroundColor: '#F43F5E', zIndex: 1 }}
                  ></div>
                  <img
                    src="/images/Jasmine.png"
                    alt="Ms. Jasmine Joy - Co-Founder"
                    className="relative w-full h-auto aspect-square object-contain rounded-2xl shadow-2xl z-10 bg-white"
                    style={{ zIndex: 10 }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-20 px-4 md:px-6" style={{ backgroundColor: '#1E3A8A' }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-8">
              <span className="text-5xl mr-6" style={{ color: '#F43F5E' }}>♜</span>
              <h2 className="font-bebas-neue font-extrabold text-4xl md:text-6xl uppercase text-white">
                This Is How Magic Works
              </h2>
              <span className="text-5xl ml-6" style={{ color: '#F43F5E' }}>♞</span>
            </div>
            
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
              transition={{ duration: 0.7, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.background = 'linear-gradient(135deg, #F43F5E 0%, #EF4444 50%, #F87171 100%)';
                target.style.boxShadow = '0 12px 40px rgba(244, 63, 94, 0.7), 0 6px 20px rgba(244, 63, 94, 0.5)';
                target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.background = 'linear-gradient(135deg, #DC2626 0%, #F43F5E 50%, #EF4444 100%)';
                target.style.boxShadow = '0 8px 30px rgba(244, 63, 94, 0.6), 0 4px 15px rgba(244, 63, 94, 0.4)';
                target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              <span style={{ position: 'relative', zIndex: 2 }}>JOIN THE JOYOUS CHESS FAMILY</span>
            </motion.button>
          </motion.div>
      </div>
      </section>

      <Footer />
    </div>
  )
} 