'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface TournamentSection {
  name: string
  additionalNotes: string
  description: string
}

interface Tournament {
  slug: string
  title: string
  status: 'draft' | 'published'
  registrationOpen: boolean
  dateStart: string
  dateEnd: string
  registrationDeadline: string
  location: string
  venue: string
  images: string[]
  description: string
  fullDescription: string
  sections: TournamentSection[]
  timeControl: string
  rounds: number
  prizes: string
  features?: string[]
  contact: {
    person: string
    phone: string
    email: string
  }
}

interface TournamentClientProps {
  tournament: Tournament
}

export default function TournamentClient({ tournament }: TournamentClientProps) {
  const [selectedSection, setSelectedSection] = useState(tournament.sections[0]?.name || '')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [formData, setFormData] = useState({
    playerName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    rating: '',
    specialRequests: '',
    parentName: '',
    consent: false
  })
  
  const [files, setFiles] = useState<{
    birthCertificate: File | null
    photoID: File | null
    paymentProof: File | null
  }>({
    birthCertificate: null,
    photoID: null,
    paymentProof: null
  })
  
  const [fileErrors, setFileErrors] = useState<{
    birthCertificate?: string
    photoID?: string
    paymentProof?: string
  }>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checkedValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    setFormData(prev => ({ ...prev, [name]: checkedValue }))
  }
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, fileType: 'birthCertificate' | 'photoID' | 'paymentProof') => {
    const file = e.target.files?.[0]
    
    if (file) {
      // Import validation function
      const { validateFile } = await import('@/lib/form-submission')
      const validation = validateFile(file)
      
      if (!validation.valid) {
        setFileErrors(prev => ({ ...prev, [fileType]: validation.error }))
        setFiles(prev => ({ ...prev, [fileType]: null }))
      } else {
        setFileErrors(prev => ({ ...prev, [fileType]: undefined }))
        setFiles(prev => ({ ...prev, [fileType]: file }))
      }
    } else {
      setFiles(prev => ({ ...prev, [fileType]: null }))
      setFileErrors(prev => ({ ...prev, [fileType]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Import form submission dynamically to avoid build issues
      const { submitTournamentRegistration, processFiles } = await import('@/lib/form-submission')
      
      // Process uploaded files
      const processedFiles = await processFiles({
        birthCertificate: files.birthCertificate,
        photoID: files.photoID,
        paymentProof: files.paymentProof
      })
      
      const result = await submitTournamentRegistration({
        tournamentId: tournament.slug,
        section: selectedSection,
        ...formData,
        ...processedFiles
      })

      if (result.success) {
        alert('Registration submitted successfully! You will receive a confirmation email shortly.')
        setFormData({
          playerName: '',
          email: '',
          phone: '',
          dateOfBirth: '',
          rating: '',
          specialRequests: '',
          parentName: '',
          consent: false
        })
        setFiles({
          birthCertificate: null,
          photoID: null,
          paymentProof: null
        })
        // Reset file inputs
        const fileInputs = document.querySelectorAll('input[type="file"]')
        fileInputs.forEach((input) => {
          (input as HTMLInputElement).value = ''
        })
      } else {
        alert(`Registration failed: ${result.message}`)
      }
    } catch (error) {
      console.error('Registration error:', error)
      alert('Registration failed. Please try again later.')
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % tournament.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + tournament.images.length) % tournament.images.length)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* White Header Zone */}
      <div className="h-[140px] bg-white"></div>
      
      {/* Hero Section - Title & Description */}
      <section className="pt-8 md:pt-16 pb-8 md:pb-12 px-4 md:px-6" style={{ backgroundColor: '#1E3A8A' }}>
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-bebas-neue font-extrabold text-4xl md:text-6xl lg:text-7xl mb-6 uppercase" style={{ color: '#F43F5E' }}>
              {tournament.title}
            </h1>
            <p className="font-lato font-medium text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto text-white">
              {tournament.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content - Image Carousel + Tournament Details */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
            
            {/* Left: Portrait Image Carousel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={tournament.images[currentImageIndex]} 
                  alt={`Tournament Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Buttons */}
                {tournament.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
                
                {/* Image Indicators */}
                {tournament.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {tournament.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right: Tournament Details + Register Button */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-bebas-neue font-extrabold text-3xl md:text-5xl mb-6 uppercase" style={{ color: '#1E3A8A' }}>
                Tournament Details
              </h2>
              
              <div className="space-y-6 mb-8">
                {/* Registration Deadline - Prominent Card */}
                <div className="bg-white rounded-xl shadow-lg border-2 p-6 text-center" style={{ borderColor: '#F43F5E' }}>
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#F43F5E' }}>
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="font-bebas-neue font-extrabold text-xl mb-2 uppercase" style={{ color: '#1E3A8A' }}>
                    Registration Ends
                  </div>
                  <div className="font-lato font-bold text-lg" style={{ color: '#F43F5E' }}>
                    {new Date(tournament.registrationDeadline).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>

                {/* Quick Info Cards */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg shadow-md p-4 border-l-4" style={{ borderColor: '#F43F5E' }}>
                    <div className="font-bebas-neue font-extrabold text-lg mb-1 uppercase" style={{ color: '#1E3A8A' }}>
                      Tournament Dates
                    </div>
                    <div className="font-lato text-gray-700 font-medium">
                      {new Date(tournament.dateStart).toLocaleDateString()} - {new Date(tournament.dateEnd).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-4 border-l-4" style={{ borderColor: '#F43F5E' }}>
                    <div className="font-bebas-neue font-extrabold text-lg mb-1 uppercase" style={{ color: '#1E3A8A' }}>
                      Location
                    </div>
                    <div className="font-lato text-gray-700 font-medium">
                      {tournament.location}
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-4" style={{ backgroundColor: '#F43F5E' }}>
                  <div className="font-bebas-neue font-extrabold text-lg text-white mb-2">PRIZES</div>
                  <div className="font-lato text-white">{tournament.prizes}</div>
                </div>
              </div>

              {/* Register Now Button */}
              <motion.a
                href="#registration"
                className="inline-block w-full text-white py-4 px-8 rounded-full font-bebas-neue font-extrabold text-xl uppercase text-center transition-all duration-300 mt-8"
                style={{
                  background: 'linear-gradient(135deg, #DC2626 0%, #F43F5E 50%, #EF4444 100%)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 8px 30px rgba(244, 63, 94, 0.6), 0 4px 15px rgba(244, 63, 94, 0.4)',
                  letterSpacing: '1px'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.background = 'linear-gradient(135deg, #F43F5E 0%, #EF4444 50%, #F87171 100%)';
                  target.style.boxShadow = '0 12px 40px rgba(244, 63, 94, 0.7), 0 6px 20px rgba(244, 63, 94, 0.5)';
                  target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.background = 'linear-gradient(135deg, #DC2626 0%, #F43F5E 50%, #EF4444 100%)';
                  target.style.boxShadow = '0 8px 30px rgba(244, 63, 94, 0.6), 0 4px 15px rgba(244, 63, 94, 0.4)';
                  target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                Register Now
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Registration Form + More Details */}
      <section id="registration" className="py-12 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
            
            {/* Left: Registration Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="p-6 text-white" style={{ 
                  background: 'linear-gradient(135deg, #DC2626 0%, #F43F5E 50%, #EF4444 100%)'
                }}>
                  <h3 className="font-bebas-neue font-extrabold text-3xl uppercase mb-2">
                    Register Now
                  </h3>
                  <p className="font-lato text-white/90">
                    Secure your spot in this prestigious tournament
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {/* Player Details */}
                  <div className="space-y-4">
                    <div>
                      <label className="block font-lato font-bold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="playerName"
                        value={formData.playerName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-lato"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-lato font-bold text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-lato"
                          placeholder="your@email.com"
                        />
                      </div>

                      <div>
                        <label className="block font-lato font-bold text-gray-700 mb-2">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-lato"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-lato font-bold text-gray-700 mb-2">
                          Date of Birth *
                        </label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-lato"
                        />
                      </div>

                      <div>
                        <label className="block font-lato font-bold text-gray-700 mb-2">
                          Chess Rating
                        </label>
                        <input
                          type="number"
                          name="rating"
                          value={formData.rating}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-lato"
                          placeholder="1200"
                        />
                      </div>
                    </div>

                    {/* Tournament Category Selection - In Middle */}
                    <div>
                      <label className="block font-bebas-neue font-extrabold text-lg mb-3 uppercase" style={{ color: '#1E3A8A' }}>
                        Tournament Categories
                      </label>
                      <div className="grid grid-cols-1 gap-3">
                        {tournament.sections.map((section) => (
                          <label
                            key={section.name}
                            className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
                              selectedSection === section.name
                                ? 'bg-white shadow-lg'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            style={{
                              borderColor: selectedSection === section.name ? '#F43F5E' : undefined
                            }}
                          >
                            <input
                              type="radio"
                              name="section"
                              value={section.name}
                              checked={selectedSection === section.name}
                              onChange={(e) => setSelectedSection(e.target.value)}
                              className="sr-only"
                            />
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-bebas-neue font-extrabold text-lg" style={{ color: '#1E3A8A' }}>
                                  {section.name}
                                </div>
                                <div className="font-lato text-sm text-gray-600">
                                  {section.description}
                                </div>
                              </div>
                              <div className="font-lato text-sm font-semibold" style={{ color: '#F43F5E' }}>
                                {section.additionalNotes}
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block font-lato font-bold text-gray-700 mb-2">
                        Special Requests
                      </label>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-lato resize-none"
                        placeholder="Any dietary requirements, accessibility needs, etc."
                      />
                    </div>

                    {/* Document Uploads Section */}
                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="font-bebas-neue font-extrabold text-lg mb-4 uppercase" style={{ color: '#1E3A8A' }}>
                        Required Documents
                      </h4>
                      <p className="text-sm text-gray-600 font-lato mb-4">
                        Please upload clear copies of the following documents (PDF, JPG, or PNG, max 5MB each)
                      </p>

                      {/* Birth Certificate */}
                      <div className="mb-4">
                        <label className="block font-lato font-bold text-gray-700 mb-2">
                          Birth Certificate (Age Proof) *
                        </label>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange(e, 'birthCertificate')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-lato file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {files.birthCertificate && (
                          <p className="text-sm text-green-600 font-lato mt-1">
                            ✓ {files.birthCertificate.name}
                          </p>
                        )}
                        {fileErrors.birthCertificate && (
                          <p className="text-sm text-red-600 font-lato mt-1">
                            {fileErrors.birthCertificate}
                          </p>
                        )}
                      </div>

                      {/* Photo ID */}
                      <div className="mb-4">
                        <label className="block font-lato font-bold text-gray-700 mb-2">
                          Photo ID
                        </label>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange(e, 'photoID')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-lato file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {files.photoID && (
                          <p className="text-sm text-green-600 font-lato mt-1">
                            ✓ {files.photoID.name}
                          </p>
                        )}
                        {fileErrors.photoID && (
                          <p className="text-sm text-red-600 font-lato mt-1">
                            {fileErrors.photoID}
                          </p>
                        )}
                      </div>

                      {/* Payment Proof */}
                      <div>
                        <label className="block font-lato font-bold text-gray-700 mb-2">
                          Payment Proof
                        </label>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange(e, 'paymentProof')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-lato file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {files.paymentProof && (
                          <p className="text-sm text-green-600 font-lato mt-1">
                            ✓ {files.paymentProof.name}
                          </p>
                        )}
                        {fileErrors.paymentProof && (
                          <p className="text-sm text-red-600 font-lato mt-1">
                            {fileErrors.paymentProof}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    className="w-full text-white py-4 px-6 rounded-full font-bebas-neue font-extrabold text-lg uppercase transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, #DC2626 0%, #F43F5E 50%, #EF4444 100%)',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 8px 30px rgba(244, 63, 94, 0.6), 0 4px 15px rgba(244, 63, 94, 0.4)',
                      letterSpacing: '1px'
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
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
                    Register
                  </motion.button>

                  <p className="text-xs text-gray-500 text-center font-lato">
                    You will receive a confirmation email after registration
                  </p>
                </form>
              </div>
            </motion.div>

            {/* Right: More Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-bebas-neue font-extrabold text-3xl md:text-4xl mb-6 uppercase" style={{ color: '#1E3A8A' }}>
                Additional Details
              </h2>
              
              <div className="space-y-6">
                {/* Venue Info */}
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F43F5E' }}>
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bebas-neue font-extrabold text-lg" style={{ color: '#1E3A8A' }}>VENUE</div>
                      <div className="font-lato text-gray-600">{tournament.venue}</div>
                    </div>
                  </div>
                  <div className="font-lato text-gray-700">
                    {tournament.fullDescription.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-3">{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* Important Dates */}
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F43F5E' }}>
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bebas-neue font-extrabold text-lg" style={{ color: '#1E3A8A' }}>IMPORTANT DATES</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-lato font-semibold text-gray-700">Registration Deadline:</span>
                      <span className="font-lato text-red-600 font-bold">
                        {new Date(tournament.registrationDeadline).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-lato font-semibold text-gray-700">Tournament Dates:</span>
                      <span className="font-lato text-blue-600 font-bold">
                        {new Date(tournament.dateStart).toLocaleDateString()} - {new Date(tournament.dateEnd).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tournament Structure */}
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F43F5E' }}>
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bebas-neue font-extrabold text-lg" style={{ color: '#1E3A8A' }}>TOURNAMENT FORMAT</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-lato font-semibold text-gray-700">Rounds:</span>
                      <span className="font-lato text-blue-600 font-bold">{tournament.rounds}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-lato font-semibold text-gray-700">Time Control:</span>
                      <span className="font-lato text-blue-600 font-bold">{tournament.timeControl}</span>
                    </div>
                  </div>
                </div>

                {/* Tournament Features */}
                {tournament.features && tournament.features.length > 0 && (
                  <div className="bg-white rounded-lg p-6 shadow-lg">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F43F5E' }}>
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-bebas-neue font-extrabold text-lg" style={{ color: '#1E3A8A' }}>TOURNAMENT FEATURES</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {tournament.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#F43F5E' }} />
                          <span className="font-lato text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 text-white" style={{ backgroundColor: '#1E3A8A' }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="font-bebas-neue font-extrabold text-3xl md:text-5xl mb-8 uppercase"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Need Help? Contact Us
          </motion.h2>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#F43F5E' }}>
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-bebas-neue font-extrabold text-xl mb-2 uppercase">Contact Person</h3>
              <p className="font-lato font-semibold">{tournament.contact.person}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#F43F5E' }}>
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <h3 className="font-bebas-neue font-extrabold text-xl mb-2 uppercase">Phone</h3>
              <p className="font-lato font-semibold">{tournament.contact.phone}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#F43F5E' }}>
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <h3 className="font-bebas-neue font-extrabold text-xl mb-2 uppercase">Email</h3>
              <p className="font-lato font-semibold">{tournament.contact.email}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 