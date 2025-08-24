'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    parentFirstName: '',
    parentLastName: '',
    email: '',
    phone: '',
    studentName: '',
    studentSchool: '',
    studentAge: '',
    studentClass: '',
    priorExperience: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
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
                Contact Us
              </h1>
              <span className="text-6xl md:text-8xl ml-6" style={{ color: '#F43F5E' }}>♚</span>
            </div>
            
            <p className="font-lato font-medium text-lg md:text-2xl text-white max-w-4xl mx-auto">
              Get in touch with us for any questions about our chess programs and coaching
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Left Side - Map and Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Map */}
              <div className="mb-8">
                <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14030.834231496633!2d77.174903!3d28.506775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3e45d85d3e3%3A0x691393414902968e!2sChhatarpur%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1635789123456!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                {/* Address & Phone */}
                <div className="bg-gray-50 rounded-2xl p-8">
                  <div className="flex items-center mb-6">
                    <span className="text-4xl mr-4" style={{ color: '#F43F5E' }}>♛</span>
                    <h2 className="font-bebas-neue font-extrabold text-3xl md:text-4xl uppercase" style={{ color: '#1E3A8A' }}>
                      Contact Information
                    </h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0"
                        style={{ backgroundColor: '#F43F5E' }}
                      >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bebas-neue font-extrabold text-xl uppercase mb-2" style={{ color: '#1E3A8A' }}>
                          Address
                        </h3>
                        <p className="font-lato font-medium text-gray-700">
                          Chattarpur, New Delhi
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0"
                        style={{ backgroundColor: '#F43F5E' }}
                      >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bebas-neue font-extrabold text-xl uppercase mb-2" style={{ color: '#1E3A8A' }}>
                          Phone
                        </h3>
                        <a 
                          href="tel:+917220008484"
                          className="font-lato font-medium text-gray-700 hover:text-pink-600 transition-colors"
                        >
                          +91 72200 08484
                        </a>
                        <br />
                        <a 
                          href="tel:+917220008484"
                          className="font-lato font-medium text-sm hover:text-pink-600 transition-colors"
                          style={{ color: '#F43F5E' }}
                        >
                          Click Here to Call
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="bg-gray-50 rounded-2xl p-8">
                  <div className="flex items-center mb-6">
                    <span className="text-4xl mr-4" style={{ color: '#F43F5E' }}>♜</span>
                    <h2 className="font-bebas-neue font-extrabold text-3xl md:text-4xl uppercase" style={{ color: '#1E3A8A' }}>
                      Operating Hours
                    </h2>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      'Monday', 'Tuesday', 'Wednesday', 'Thursday', 
                      'Friday', 'Saturday', 'Sunday'
                    ].map((day) => (
                      <div key={day} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                        <span className="font-lato font-bold text-gray-800">{day}:</span>
                        <span className="font-lato font-medium text-gray-600">10:00 am – 7:00 pm</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="flex items-center mb-8">
                  <span className="text-4xl mr-4" style={{ color: '#F43F5E' }}>♝</span>
                  <h2 className="font-bebas-neue font-extrabold text-3xl md:text-4xl uppercase" style={{ color: '#1E3A8A' }}>
                    Contact Us For Any Questions
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Parent Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-lato font-bold text-sm mb-2" style={{ color: '#1E3A8A' }}>
                        Parent&apos;s First Name
                      </label>
                      <input
                        type="text"
                        name="parentFirstName"
                        value={formData.parentFirstName}
                        onChange={handleInputChange}
                        placeholder="First Name"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none font-lato"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-lato font-bold text-sm mb-2" style={{ color: '#1E3A8A' }}>
                        Parent&apos;s Last Name
                      </label>
                      <input
                        type="text"
                        name="parentLastName"
                        value={formData.parentLastName}
                        onChange={handleInputChange}
                        placeholder="Last Name"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none font-lato"
                        required
                      />
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-lato font-bold text-sm mb-2" style={{ color: '#1E3A8A' }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email Address"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none font-lato"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-lato font-bold text-sm mb-2" style={{ color: '#1E3A8A' }}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none font-lato"
                        required
                      />
                    </div>
                  </div>

                  {/* Student Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-lato font-bold text-sm mb-2" style={{ color: '#1E3A8A' }}>
                        Student&apos;s Name
                      </label>
                      <input
                        type="text"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleInputChange}
                        placeholder="Student's Name"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none font-lato"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-lato font-bold text-sm mb-2" style={{ color: '#1E3A8A' }}>
                        Student&apos;s School
                      </label>
                      <input
                        type="text"
                        name="studentSchool"
                        value={formData.studentSchool}
                        onChange={handleInputChange}
                        placeholder="Student's School"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none font-lato"
                        required
                      />
                    </div>
                  </div>

                  {/* Age and Class */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-lato font-bold text-sm mb-2" style={{ color: '#1E3A8A' }}>
                        Student&apos;s Age
                      </label>
                      <select
                        name="studentAge"
                        value={formData.studentAge}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none font-lato bg-white"
                        required
                      >
                        <option value="">- Select Age -</option>
                        {ageOptions.map((age) => (
                          <option key={age} value={age}>{age}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-lato font-bold text-sm mb-2" style={{ color: '#1E3A8A' }}>
                        Student&apos;s Class
                      </label>
                      <select
                        name="studentClass"
                        value={formData.studentClass}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none font-lato bg-white"
                        required
                      >
                        <option value="">- Select Class -</option>
                        {classOptions.map((className) => (
                          <option key={className} value={className}>{className}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Prior Experience */}
                  <div>
                    <label className="block font-lato font-bold text-sm mb-2" style={{ color: '#1E3A8A' }}>
                      Kid&apos;s Prior Chess Experience
                    </label>
                    <select
                      name="priorExperience"
                      value={formData.priorExperience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none font-lato bg-white"
                      required
                    >
                      <option value="">- Select Experience Level -</option>
                      {experienceOptions.map((experience) => (
                        <option key={experience} value={experience}>{experience}</option>
                      ))}
                    </select>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    className="w-full font-lato font-bold uppercase transition-all duration-300 transform relative overflow-hidden group mt-8"
                    style={{
                      background: 'linear-gradient(135deg, #DC2626 0%, #F43F5E 50%, #EF4444 100%)',
                      color: 'white',
                      padding: '18px 36px',
                      borderRadius: '12px',
                      fontSize: '18px',
                      fontWeight: '800',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      cursor: 'pointer',
                      boxShadow: '0 8px 30px rgba(244, 63, 94, 0.6), 0 4px 15px rgba(244, 63, 94, 0.4)',
                      letterSpacing: '1px'
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message & Start Your Chess Journey
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
      </div>
      </section>

      <Footer />
    </div>
  )
} 