'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface TournamentSection {
  name: string
  additionalNotes: string
  description: string
}

interface TournamentFeature {
  feature: string
}

interface FormData {
  title: string
  slug: string
  status: 'draft' | 'published'
  registrationOpen: boolean
  dateStart: string
  dateEnd: string
  registrationDeadline: string
  location: string
  venue: string
  image1: File | null
  image2: File | null
  image3: File | null
  description: string
  fullDescription: string
  sections: TournamentSection[]
  timeControl: string
  rounds: number
  prizes: string

  features: TournamentFeature[]
  contactPerson: string
  contactPhone: string
  contactEmail: string

}

export default function MockTournamentCreationClient() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    slug: '',
    status: 'draft',
    registrationOpen: true,
    dateStart: '',
    dateEnd: '',
    registrationDeadline: '',
    location: '',
    venue: '',
    image1: null,
    image2: null,
    image3: null,
    description: '',
    fullDescription: '',
    sections: [{ name: '', additionalNotes: '', description: '' }],
    timeControl: '',
    rounds: 9,
    prizes: '',

    features: [{ feature: '' }],
    contactPerson: '',
    contactPhone: '',
    contactEmail: '',

  })

  // Removed step navigation - single page form

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleImageChange = (imageNumber: 1 | 2 | 3) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageField = `image${imageNumber}` as 'image1' | 'image2' | 'image3'
      setFormData(prev => ({ ...prev, [imageField]: e.target.files![0] }))
    }
  }

  const addSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, { name: '', additionalNotes: '', description: '' }]
    }))
  }

  const updateSection = (index: number, field: keyof TournamentSection, value: string) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) => 
        i === index ? { ...section, [field]: value } : section
      )
    }))
  }

  const removeSection = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index)
    }))
  }

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, { feature: '' }]
    }))
  }

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feat, i) => 
        i === index ? { feature: value } : feat
      )
    }))
  }

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Tournament Data:', formData)
    alert('Tournament created successfully! (This is a demo)')
  }

  // Single page form - no step navigation needed

  return (
    <div className="pt-24 md:pt-32 pb-8 md:pb-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-bebas-neue font-extrabold text-4xl md:text-6xl text-blue-800 mb-4 uppercase">
            Create Tournament
          </h1>
          <p className="font-lato text-lg text-gray-600">
            Set up a new chess tournament with comprehensive details
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          
          {/* Basic Information */}
          <div className="space-y-6">
            <h2 className="font-bebas-neue font-extrabold text-2xl text-blue-800 mb-6 uppercase border-b border-gray-200 pb-2">
              Basic Information
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-lato font-bold text-gray-700 mb-2">
                  Tournament Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-lato"
                  placeholder="Delhi State Chess Championship 2025"
                />
              </div>

              <div>
                <label className="block font-lato font-bold text-gray-700 mb-2">
                  URL Slug *
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-lato"
                  placeholder="delhi-state-championship-2025"
                />
                <p className="font-lato text-sm text-blue-600 mt-1">
                  Note: In production, this will be auto-generated from the title
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-lato font-bold text-gray-700 mb-2">
                  Tournament Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-lato"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div className="flex items-center space-x-3">
                <label className="block font-lato font-bold text-gray-700">
                  Registration Open
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="registrationOpen"
                    checked={formData.registrationOpen}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className={`w-11 h-6 rounded-full transition-colors ${
                    formData.registrationOpen ? 'bg-blue-600' : 'bg-gray-300'
                  }`}>
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform transform ${
                      formData.registrationOpen ? 'translate-x-5' : 'translate-x-0.5'
                    } mt-0.5`} />
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="block font-lato font-bold text-gray-700 mb-2">
                Short Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-lato resize-none"
                placeholder="Brief tournament description for cards and previews..."
              />
            </div>
          </div>

          {/* Dates & Timing */}
          <div className="space-y-6">
            <h2 className="font-bebas-neue font-extrabold text-2xl text-blue-800 mb-6 uppercase border-b border-gray-200 pb-2">
              Dates & Timing
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block font-lato font-bold text-gray-700 mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  name="dateStart"
                  value={formData.dateStart}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-lato"
                />
              </div>

              <div>
                <label className="block font-lato font-bold text-gray-700 mb-2">
                  End Date *
                </label>
                <input
                  type="date"
                  name="dateEnd"
                  value={formData.dateEnd}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-lato"
                />
              </div>

              <div>
                <label className="block font-lato font-bold text-gray-700 mb-2">
                  Registration Deadline *
                </label>
                <input
                  type="date"
                  name="registrationDeadline"
                  value={formData.registrationDeadline}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-lato"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-lato font-bold text-gray-700 mb-2">
                  Time Control *
                </label>
                <input
                  type="text"
                  name="timeControl"
                  value={formData.timeControl}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-lato"
                  placeholder="90 minutes + 30 seconds increment per move"
                />
              </div>

              <div>
                <label className="block font-lato font-bold text-gray-700 mb-2">
                  Number of Rounds *
                </label>
                <input
                  type="number"
                  name="rounds"
                  value={formData.rounds}
                  onChange={handleInputChange}
                  required
                  min="1"
                  max="15"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-lato"
                />
              </div>
            </div>

            <div>
              <label className="block font-lato font-bold text-gray-700 mb-2">
                Prize Information *
              </label>
              <input
                type="text"
                name="prizes"
                value={formData.prizes}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-lato"
                placeholder="₹50,000 for winner in Open category, trophies for top 3 in each section"
              />
            </div>
          </div>

          {/* Location & Media */}
          <div className="space-y-6">
            <h2 className="font-bebas-neue font-extrabold text-2xl text-blue-800 mb-6 uppercase border-b border-gray-200 pb-2">
              Location & Media
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-lato font-bold text-gray-700 mb-2">
                  Location (City) *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-lato"
                  placeholder="New Delhi, India"
                />
              </div>

              <div>
                <label className="block font-lato font-bold text-gray-700 mb-2">
                  Venue *
                </label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-lato"
                  placeholder="Indira Gandhi Indoor Stadium, New Delhi"
                />
              </div>
            </div>

            <div>
              <label className="block font-lato font-bold text-gray-700 mb-2">
                Tournament Images
              </label>
              
              <div className="grid md:grid-cols-3 gap-4">
                {/* Image 1 */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange(1)}
                    className="hidden"
                    id="image1"
                  />
                  <label htmlFor="image1" className="cursor-pointer">
                    <div className="text-gray-500">
                      <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="font-lato font-bold text-sm">Image 1 *</p>
                      <p className="font-lato text-xs text-gray-400 mt-1">Required</p>
                      {formData.image1 && (
                        <p className="font-lato text-xs text-green-600 mt-1 truncate">
                          {formData.image1.name}
                        </p>
                      )}
                    </div>
                  </label>
                </div>

                {/* Image 2 */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange(2)}
                    className="hidden"
                    id="image2"
                  />
                  <label htmlFor="image2" className="cursor-pointer">
                    <div className="text-gray-500">
                      <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="font-lato font-bold text-sm">Image 2</p>
                      <p className="font-lato text-xs text-gray-400 mt-1">Optional</p>
                      {formData.image2 && (
                        <p className="font-lato text-xs text-green-600 mt-1 truncate">
                          {formData.image2.name}
                        </p>
                      )}
                    </div>
                  </label>
                </div>

                {/* Image 3 */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange(3)}
                    className="hidden"
                    id="image3"
                  />
                  <label htmlFor="image3" className="cursor-pointer">
                    <div className="text-gray-500">
                      <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="font-lato font-bold text-sm">Image 3</p>
                      <p className="font-lato text-xs text-gray-400 mt-1">Optional</p>
                      {formData.image3 && (
                        <p className="font-lato text-xs text-green-600 mt-1 truncate">
                          {formData.image3.name}
                        </p>
                      )}
                    </div>
                  </label>
                </div>
              </div>
              
              <p className="font-lato text-sm text-gray-500 mt-2">
                Upload portrait images for the tournament. At least Image 1 is required.
              </p>
            </div>

            <div>
              <label className="block font-lato font-bold text-gray-700 mb-2">
                Full Description
              </label>
              <textarea
                name="fullDescription"
                value={formData.fullDescription}
                onChange={handleInputChange}
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-lato resize-none"
                placeholder="Detailed tournament information (Markdown supported)..."
              />
            </div>
          </div>

          {/* Tournament Category */}
          <div className="space-y-6">
            <h2 className="font-bebas-neue font-extrabold text-2xl text-blue-800 mb-6 uppercase border-b border-gray-200 pb-2">
              Tournament Category
            </h2>
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block font-lato font-bold text-gray-700">
                  Tournament Categories
                </label>
                                  <button
                    type="button"
                    onClick={addSection}
                    className="bg-blue-800 text-white px-4 py-2 rounded-lg font-lato font-bold hover:bg-blue-900 transition-colors"
                  >
                    Add Category
                  </button>
              </div>

              <div className="space-y-4">
                {formData.sections.map((section, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-lato font-semibold text-gray-600 mb-1 text-sm">
                          Category Name
                        </label>
                        <input
                          type="text"
                          value={section.name}
                          onChange={(e) => updateSection(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-lato"
                          placeholder="e.g., Under-8, Under-12, Open, Beginners"
                        />
                      </div>

                      <div>
                        <label className="block font-lato font-semibold text-gray-600 mb-1 text-sm">
                          Additional Notes
                        </label>
                        <input
                          type="text"
                          value={section.additionalNotes}
                          onChange={(e) => updateSection(index, 'additionalNotes', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-lato"
                          placeholder="Entry fee, special requirements, etc."
                        />
                      </div>

                      <div className="flex items-end">
                        <div className="flex-1">
                          <label className="block font-lato font-semibold text-gray-600 mb-1 text-sm">
                            Category Details
                          </label>
                          <input
                            type="text"
                            value={section.description}
                            onChange={(e) => updateSection(index, 'description', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-lato"
                            placeholder="Age requirements, skill level, etc."
                          />
                        </div>
                        {formData.sections.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSection(index)}
                            className="ml-2 text-red-600 hover:text-red-800 p-2"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>


          </div>

          {/* Features & Contact */}
          <div className="space-y-6">
            <h2 className="font-bebas-neue font-extrabold text-2xl text-blue-800 mb-6 uppercase border-b border-gray-200 pb-2">
              Features & Contact
            </h2>
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block font-lato font-bold text-gray-700">
                  Tournament Features
                </label>
                <button
                  type="button"
                  onClick={addFeature}
                  className="bg-blue-800 text-white px-4 py-2 rounded-lg font-lato font-bold hover:bg-blue-900 transition-colors"
                >
                  Add Feature
                </button>
              </div>

              <div className="space-y-3">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={feature.feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-lato"
                      placeholder="AICF Rated Tournament, Live Broadcast, etc."
                    />
                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bebas-neue font-extrabold text-lg text-blue-800 mb-4 uppercase">
                Contact Information
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block font-lato font-bold text-gray-700 mb-2">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-lato"
                    placeholder="Tournament Director - Rajesh Kumar"
                  />
                </div>

                <div>
                  <label className="block font-lato font-bold text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-lato"
                    placeholder="+91-98765-43210"
                  />
                </div>

                <div>
                  <label className="block font-lato font-bold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-lato"
                    placeholder="tournaments@joyouschess.com"
                  />
                </div>
              </div>
            </div>


          </div>

          {/* Submit Section */}
          <div className="pt-6 border-t border-gray-200">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="font-bebas-neue font-extrabold text-xl text-blue-800 mb-4 uppercase">
                Ready to Create Tournament?
              </h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="font-lato text-yellow-800">
                    <strong>Note:</strong> This is a demo interface. In production, this would save to your CMS and create the actual tournament page.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-12 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-bebas-neue font-extrabold text-xl uppercase hover:from-green-700 hover:to-green-800 transition-all shadow-lg"
              >
                Create Tournament
              </button>
            </div>
          </div>
        </motion.form>
      </div>
    </div>
  )
} 