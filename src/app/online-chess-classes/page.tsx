'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function OnlineChessClassesPage() {
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
    console.log('Free trial registration:', formData)
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

  const benefits = [
    {
      title: "Accessibility",
      description: "Online chess classes provide easy access to learning opportunities for students regardless of their geographical location.",
      icon: "♚"
    },
    {
      title: "Flexibility",
      description: "The Joyous Chess Online Academy provides a flexible schedule, allowing students to balance their academic & extracurricular activities effectively.",
      icon: "♛"
    },
    {
      title: "Personalized Learning",
      description: "The Joyous Chess online classes academy, powered by A.I., offers personalized learning for chess enthusiasts to enhance their skills.",
      icon: "♜"
    },
    {
      title: "Interactive Learning", 
      description: "Our academy integrates interactive learning techniques, ensuring that students stay engaged and motivated throughout their chess journey.",
      icon: "♝"
    },
    {
      title: "Community & Competition",
      description: "Our online chess academy creates a global community where students connect, learn, and compete in online chess classes.",
      icon: "♞"
    },
    {
      title: "Expert Guidance",
      description: "Highly skilled instructors at the Joyous Chess online classes provide personalized guidance, fostering students' growth and success.",
      icon: "♟"
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
              <h1 className="font-bebas-neue font-extrabold text-4xl md:text-6xl uppercase text-white">
                Register For<br />
                India&apos;s Top Rated<br />
                Online Chess Classes
              </h1>
              <span className="text-6xl md:text-8xl ml-6" style={{ color: '#F43F5E' }}>♚</span>
            </div>
            
            <p className="font-lato font-medium text-lg md:text-xl text-white max-w-4xl mx-auto">
              Joyous Chess offers top-notch online chess coaching classes in India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-lato font-normal text-lg md:text-xl leading-relaxed text-gray-700">
              Online chess classes offer several benefits for students, and the Joyous Chess online academy powered by A.I. (Artificial Intelligence) ID aims to provide a unique and innovative learning experience that helps kids excel. Here are some benefits of online chess classes and how the Joyous Chess online academy stands out:
            </p>
          </motion.div>
        </div>
      </section>

      {/* Combined Form and Benefits Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Left Side - Registration Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-8">
                <div className="flex items-center mb-8">
                  <span className="text-5xl mr-4" style={{ color: '#F43F5E' }}>♜</span>
                  <h2 className="font-bebas-neue font-extrabold text-4xl md:text-5xl uppercase" style={{ color: '#1E3A8A' }}>
                    Book A Free Trial
                  </h2>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
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
                    Book Your Free Trial Class Now!
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Right Side - Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="mb-8">
                <div className="flex items-center mb-8">
                  <span className="text-5xl mr-4" style={{ color: '#F43F5E' }}>♛</span>
                  <h2 className="font-bebas-neue font-extrabold text-4xl md:text-5xl uppercase" style={{ color: '#1E3A8A' }}>
                    What You Will Get
                  </h2>
                </div>
              </div>

              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="flex items-start">
                      <div 
                        className="w-14 h-14 rounded-full flex items-center justify-center mr-4 flex-shrink-0"
                        style={{ backgroundColor: '#F43F5E' }}
                      >
                        <span className="text-2xl text-white">{benefit.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-bebas-neue font-extrabold text-xl md:text-2xl uppercase mb-3" style={{ color: '#1E3A8A' }}>
                          {benefit.title}
                        </h3>
                        <p className="font-lato font-normal text-sm md:text-base leading-relaxed text-gray-700">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
      </div>
      </section>

      <Footer />
    </div>
  )
} 