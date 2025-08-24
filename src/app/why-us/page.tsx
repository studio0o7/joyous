'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function WhyUsPage() {
  const features = [
    {
      title: "Skills & Mind",
      description: "At joyous chess academy, we not only help students to unleash their potential through the game of chess, but also help in developing their psychological wellbeing by giving training sessions on time.",
      icon: "♚", // King (filled)
      image: "/images/pic2.jpg"
    },
    {
      title: "Expert Coaches", 
      description: "Our trainers are well equipped with expertise knowledge and FIDE RATINGS who offer our students an enthralling chess coaching and mentoring sessions with practical, championship level approach.",
      icon: "♛", // Queen (filled)
      image: "/images/pic4.jpg"
    },
    {
      title: "Tailored Training",
      description: "We provide with individual attention, regular lessons and homework combined with game analysis and discussions as we quantify the learning ability of our students.",
      icon: "♜", // Rook (filled)
      image: "/images/pic3.jpg"
    },
    {
      title: "Flexible Batches",
      description: "Even through your tight packed schedule, you can get chess coaching based on the preferences of the entire batch. Our courses are flexible to meet the ever-tight routine of young children.",
      icon: "♝", // Bishop (filled)
      image: "/images/pic2.jpg"
    },
    {
      title: "Online Community",
      description: "We have a robust online community that thrives through the chess students and chess coaches interacting with each other on a dedicated platform. On our online window children can play a game, ask questions, solve puzzles, know more about other renowned chess players and increase their knowledge level.",
      icon: "♞", // Knight (filled)
      image: "/images/pic4.jpg"
    },
    {
      title: "Live Training",
      description: "We provide live training sessions with a concise chess road map for our students as their game gets tracked online while they play. It then provides us with a rich database where we are able to analyse the position of the child through the game of chess.",
      icon: "♟", // Pawn (filled)
      image: "/images/pic3.jpg"
    },
    {
      title: "Game Standards",
      description: "Our well-researched and proven curriculum has improved and raised the standard of the game for students as their cognitive abilities are well nourished according to their age.",
      icon: "♚", // King (filled, different usage)
      image: "/images/pic2.jpg"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
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
                Why Choose Us
              </h1>
              <span className="text-6xl md:text-8xl ml-6" style={{ color: '#F43F5E' }}>♚</span>
            </div>
            
            <div className="mb-8">
              <p className="font-lato font-medium text-lg md:text-2xl text-white max-w-4xl mx-auto">
                This is what you will get in Joyous Chess world.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Description */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-lato font-normal text-lg md:text-xl leading-relaxed text-gray-700 mb-8">
              Joyous Chess Academy leads the way in revolutionizing chess education through its world-class online chess coaching and AI-driven platform. Through tailored learning opportunities, advanced skill evaluation, captivating interactive lessons, competitive practice environments, and expert guidance, the academy empowers students with the essential abilities to thrive in chess.
            </p>
                         <p className="font-lato font-normal text-lg md:text-xl leading-relaxed text-gray-700">
               Whether your goal is to achieve grandmaster status or simply wish to enjoy the intellectual challenges of the game, Joyous Chess Academy is the perfect platform to commence your chess expedition. Embrace the future of chess education and unleash your full potential with Joyous Chess Academy&apos;s innovative approach.
             </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-12 md:gap-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`grid lg:grid-cols-2 gap-8 md:gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                                     <motion.div
                     className="flex items-center mb-6"
                     initial={{ opacity: 0, x: -30 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                   >
                     <span className="text-7xl mr-4" style={{ color: '#F43F5E' }}>{feature.icon}</span>
                     <h2 className="font-bebas-neue font-extrabold text-3xl md:text-4xl uppercase" style={{ color: '#1E3A8A' }}>
                       {feature.title}
                     </h2>
                   </motion.div>
                  
                  <motion.p
                    className="font-lato font-normal text-lg leading-relaxed text-gray-700"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                  >
                    {feature.description}
                  </motion.p>
                </div>

                {/* Image */}
                <motion.div
                  className={`flex justify-center ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                >
                  <div className="relative w-full max-w-md">
                    <div 
                      className="absolute -top-4 -left-4 w-full h-full rounded-2xl"
                      style={{ backgroundColor: '#F43F5E', zIndex: 1 }}
                    ></div>
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="relative w-full h-80 object-cover rounded-2xl shadow-2xl z-10"
                      style={{ zIndex: 10 }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
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
               <span className="text-7xl mr-6" style={{ color: '#F43F5E' }}>♛</span>
               <h2 className="font-bebas-neue font-extrabold text-4xl md:text-6xl uppercase text-white">
                 Ready to Begin?
               </h2>
               <span className="text-7xl ml-6" style={{ color: '#F43F5E' }}>♚</span>
             </div>
            
            <p className="font-lato font-medium text-lg md:text-xl text-white mb-8 max-w-3xl mx-auto">
              Join thousands of students who have already started their chess journey with us. Your path to chess mastery begins here.
            </p>
            
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
              <span style={{ position: 'relative', zIndex: 2 }}>START YOUR CHESS JOURNEY</span>
            </motion.button>
          </motion.div>
      </div>
      </section>

      <Footer />
    </div>
  )
} 