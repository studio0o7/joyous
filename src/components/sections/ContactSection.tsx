'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function ContactSection() {
  // Theme colors
  const goldLight = '#f8d008'
  const goldDark = '#d4af37'
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    studentName: '',
    studentSchool: '',
    studentAge: '',
    studentClass: '',
    experience: ''
  })
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would add your form submission logic
  }
  
  return (
    <section className="w-full pt-24 pb-6 px-3 relative z-40 pointer-events-auto">
      <div className="w-full max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4"
        >
          <h2 className="font-karla font-bold text-[clamp(1.5rem,2.5vw,1.8rem)] leading-tight"
            style={{
              color: goldLight,
              textShadow: `0 2px 10px rgba(0,0,0,0.4), 0 0 30px rgba(248,208,8,0.3)`
            }}
          >
            Get in Touch for a Free Class
          </h2>
        </motion.div>
        
        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
          {/* Left Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="pointer-events-auto lg:col-span-3"
          >
            <form 
              onSubmit={handleSubmit} 
              className="bg-blue-900/20 backdrop-blur-sm p-3 rounded-xl border border-blue-500/20 shadow-lg"
            >
              <h3 className="text-base font-bold text-yellow-400 mb-2">Book Your Free Class</h3>
              
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <label className="block text-white text-xs mb-0.5">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded-md text-white text-sm focus:outline-none focus:border-yellow-500/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-xs mb-0.5">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded-md text-white text-sm focus:outline-none focus:border-yellow-500/50"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <label className="block text-white text-xs mb-0.5">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded-md text-white text-sm focus:outline-none focus:border-yellow-500/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-xs mb-0.5">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded-md text-white text-sm focus:outline-none focus:border-yellow-500/50"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <label className="block text-white text-xs mb-0.5">Student Name</label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded-md text-white text-sm focus:outline-none focus:border-yellow-500/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-xs mb-0.5">School</label>
                  <input
                    type="text"
                    name="studentSchool"
                    value={formData.studentSchool}
                    onChange={handleChange}
                    className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded-md text-white text-sm focus:outline-none focus:border-yellow-500/50"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-2">
                <div>
                  <label className="block text-white text-xs mb-0.5">Age</label>
                  <select
                    name="studentAge"
                    value={formData.studentAge}
                    onChange={handleChange}
                    className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded-md text-white text-sm focus:outline-none focus:border-yellow-500/50"
                    required
                  >
                    <option value="">Age</option>
                    {Array.from({ length: 15 }, (_, i) => i + 4).map(age => (
                      <option key={age} value={age}>{age}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-white text-xs mb-0.5">Class</label>
                  <select
                    name="studentClass"
                    value={formData.studentClass}
                    onChange={handleChange}
                    className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded-md text-white text-sm focus:outline-none focus:border-yellow-500/50"
                    required
                  >
                    <option value="">Class</option>
                    {['Pre-KG', 'LKG', 'UKG', ...Array.from({ length: 12 }, (_, i) => `C${i + 1}`)].map(cls => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-white text-xs mb-0.5">Experience</label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded-md text-white text-sm focus:outline-none focus:border-yellow-500/50"
                    required
                  >
                    <option value="">Exp</option>
                    <option value="None">None</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Inter</option>
                    <option value="Advanced">Adv</option>
                  </select>
                </div>
              </div>
              
              {/* Submit Button */}
              <motion.button 
                className="group relative inline-flex items-center justify-center font-tenor-sans font-semibold transition-all duration-300 overflow-hidden w-full mt-2"
                style={{
                  background: `rgba(25,58,134,0.5)`,
                  border: `2px solid ${goldDark}`,
                  color: goldLight,
                  boxShadow: `
                    0 5px 15px rgba(212,175,55,0.3),
                    0 2px 8px rgba(0,0,0,0.4)
                  `,
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  padding: '0.4rem 1rem',
                  borderRadius: '0.25rem'
                }}
                whileHover={{ 
                  scale: 1.01,
                  background: 'rgba(25,58,134,0.6)',
                  boxShadow: `
                    0 7px 20px rgba(212,175,55,0.4),
                    0 3px 12px rgba(0,0,0,0.5)
                  `,
                }}
                whileTap={{ scale: 0.98 }}
                type="submit"
              >
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
                <span className="relative z-10">
                  Book Now
                </span>
              </motion.button>
            </form>
          </motion.div>
          
          {/* Right Side - Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col space-y-2 lg:col-span-2"
          >
            <div className="bg-blue-900/20 backdrop-blur-md md:backdrop-blur-sm p-2.5 rounded-xl border border-blue-500/20 shadow-lg">
              <h3 className="text-base font-bold text-yellow-400 mb-2">Contact Us</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {/* Email */}
                <div className="flex items-center space-x-1.5">
                  <div className="p-1.5 bg-blue-800/30 rounded-lg border border-blue-400/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs">Email</p>
                    <a href="mailto:contact@joyouschess.com" className="text-white text-xs hover:text-yellow-400 transition-colors">
                      contact@joyouschess.com
                    </a>
                  </div>
                </div>
                
                {/* Phone */}
                <div className="flex items-center space-x-1.5">
                  <div className="p-1.5 bg-blue-800/30 rounded-lg border border-blue-400/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs">Phone</p>
                    <a href="tel:+917220008484" className="text-white text-xs hover:text-yellow-400 transition-colors">
                      +91-7220008484
                    </a>
                  </div>
                </div>
                
                {/* Address - spans full width */}
                <div className="flex items-center space-x-1.5 md:col-span-2 mt-1">
                  <div className="p-1.5 bg-blue-800/30 rounded-lg border border-blue-400/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs">Head Office</p>
                    <p className="text-white text-xs">
                      A-334, Chhattarpur Enclave, Phase-1, Delhi-110074
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* App Download Section - More compact */}
            <motion.div 
              className="bg-gradient-to-r from-blue-900/20 to-blue-800/20 backdrop-blur-md md:backdrop-blur-sm p-2.5 rounded-xl border border-blue-500/20 shadow-lg flex items-center"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              <div className="p-1.5 bg-blue-800/30 rounded-lg border border-blue-400/20 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5.62 17.779c-.37.226-.563.292-1.035.37-1.035.147-1.035-1.314-1.035-1.314V5.967s-.074-.957.811-1.405c.957-.45 1.332.074 1.406.296l5.094 6.2c.445.518.891 1.035 1.332 1.479l-6.573-2.029v7.271zm8.178-6.885c-.52-.113-3.683-1.036-5.241-1.556-1.557-.52-5.167-1.41-5.241-1.483 0-.074 1.41-1.557 1.557-1.631 0 0 .52-.446.445-.446-.743-.371-1.337.742-1.337.742-.223.52-2.223 2.148-2.52 2.371-.297.297-.445.817-.445.817v8.252s-.075 1.482.593 2.223c.594.817 1.484.891 1.484.891s7.687 2.594 8.876 3.039c1.187.371 1.336.074 1.558 0 .223-.149 6.729-6.654 6.877-6.804.371-.149.816-1.409.371-2.52-.148-.372-3.977-2.595-5.241-3.411-.297-.148-.52-.74-.519-.74 0-.075 1.337-1.262 1.337-1.262s1.039-.827.518-1.317c-.518-.519-2.44 1.634-2.889 1.93-.223.149-.594.371-.594.371s-.075-.075.149-.446c.371-.52 2.816-3.114 3.04-3.336.446-.446.594-.52.52-.74-.076-.297-1.336-.445-1.707.223-.371.669-3.929 4.595-4.002 4.669-.148.148-.519.223-.519.148-.074 0-.074 0 0-.149.074-.074 3.707-4.891 3.78-4.966.075-.148.446-.742.371-.891-.075-.148-.223-.446-.668-.446-.445.075-.891.668-1.336 1.039-.446.446-3.188 3.559-3.484 3.93-.296.372-.519.223-.519.223-.074-.074-.074-.148 0-.371.074-.149 3.56-4.076 3.857-4.446.222-.296.592-1.038.37-1.262-.223-.297-1.265-.074-1.484.148-.297.223-2.67 2.52-2.967 2.89-.223.297-.594.074-.594.074-.074-.074-.074-.148.074-.297.149-.074 2.741-3.039 2.815-3.114.297-.297.52-.891.371-1.187-.149-.371-.891-.371-1.039-.371-.148.074-.891.668-.891.668-1.336 1.262-1.781 1.707-1.781 1.707-.296.37-.593.074-.593.074-.074-.074-.074-.148 0-.297.074-.074 2.074-2.074 2.074-2.074s.668-.52.742-.742c.074-.445.148-1.039-.223-1.187-.371-.223-.594.074-.891.297l-.816.816c-.297.297-.594.445-.594.445-.074-.074-.148-.148-.074-.371.074-.148.594-.668.594-.668s.445-.445.445-.816c.074-.371-.074-1.039-.668-.817-.52.224-1.039.669-1.039.669l-.445.37c-.149.149-.966 1.113-.966 1.113s-.149.148-.223.148c-.074.074-.074-.074-.074-.074s.074-.148.074-.148l1.336-1.706.742-.668s.52-.371.52-.891c-.074-.371-.592-.371-1.039-.223-.445.148-.743.445-.743.445l-1.41 1.336c-.074.074-.223.148-.297.223-.74.074-.074-.075-.074-.149.074-.074.371-.446.371-.446l1.336-1.484s.594-.52.668-.964c.075-.445-.297-.594-.668-.52-.371.148-.594.297-.594.297l-1.93 1.855c-.75.148-.297.371-.297.371-.075 0-.075-.074-.075-.148.075-.148.594-.594.594-.594.52-.52 1.707-1.856 1.707-1.856s.742-.519.668-1.039c-.149-.52-1.039-.296-1.336-.148-.297.148-2.964 2.52-3.039 2.594-.74.074-.222.223-.297.371-.074.074-.148-.074-.148-.074 0-.074.148-.297.148-.297s2.52-2.594 2.594-2.667c.371-.445.891-.742.891-1.261 0-.52-.148-.668-.668-.742-.445-.149-.891.297-1.188.52-.297.297-.668.594-.668.594-1.93 2.074-2.001 2.148-2.001 2.148-.297.297-.445.297-.52.148-.074-.074.075-.371.075-.371l2.66-3.336s.446-.594.446-1.039c-.074-.445-.223-.668-.742-.742-.297-.075-.594.445-.891.742L4.216 6.19s-.075.074-.223.222c-.148.148-.297-.148-.223-.148.074-.148.148-.297.148-.297s1.707-2.52 1.707-2.52.52-.668.52-1.262c-.075-.594-.817-.52-1.114-.371-.371.148-.816.668-.89.668L1.815 5.598S.999 6.56.925 7.599c-.74 1.039.371 2.52 1.409 2.816.891.297 7.65 2.149 7.65 2.149s3.336.965 3.336 1.113c0 .223-1.782 1.484-1.856 1.632-.148.148-.297.445-.148.445.148.148.594-.371.594-.371l2.149-1.633c.297-.148 1.039-.668 1.336-.52.52.148.52.742.668.891.148.148-1.188 1.039-1.336 1.113-.222.074-7.464 1.929-8.01 2.079-.52.148-.445.818.074.74.52-.074 6.58-2.223 6.58-2.223z"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-yellow-400 font-bold text-xs">Joyous Chess App</h4>
                    <p className="text-white/80 text-xs">Get exclusive resources</p>
                  </div>
                  <motion.button
                    className="inline-flex items-center bg-yellow-400/90 text-blue-900 font-bold py-1 px-2 text-xs rounded-lg shadow-md hover:bg-yellow-400 transition-colors"
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Download</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
            
            {/* Social Media Icons - Moved below App download section */}
            <motion.div 
              className="bg-blue-900/20 backdrop-blur-md md:backdrop-blur-sm p-2.5 rounded-xl border border-blue-500/20 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-base font-bold text-yellow-400 mb-2">Follow Us</h3>
              <div className="flex space-x-1.5">
                <a 
                  href="#" 
                  className="p-1.5 bg-blue-800/30 rounded-lg border border-blue-400/20 hover:bg-blue-800/50 transition-colors"
                  aria-label="Instagram"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="p-1.5 bg-blue-800/30 rounded-lg border border-blue-400/20 hover:bg-blue-800/50 transition-colors"
                  aria-label="Facebook"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 