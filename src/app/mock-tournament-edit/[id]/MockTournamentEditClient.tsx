'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface TournamentSection {
  name: string
  entryFee: string
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
  heroImage: File | null
  description: string
  fullDescription: string
  sections: TournamentSection[]
  timeControl: string
  rounds: number
  prizes: string
  paymentLink: string
  features: TournamentFeature[]
  contactPerson: string
  contactPhone: string
  contactEmail: string
  metaDescription: string
}

interface MockTournamentEditClientProps {
  tournamentId: string
}

export default function MockTournamentEditClient({ tournamentId }: MockTournamentEditClientProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  
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
    heroImage: null,
    description: '',
    fullDescription: '',
    sections: [{ name: '', entryFee: '', description: '' }],
    timeControl: '',
    rounds: 9,
    prizes: '',
    paymentLink: '',
    features: [{ feature: '' }],
    contactPerson: '',
    contactPhone: '',
    contactEmail: '',
    metaDescription: ''
  })

  // Mock tournament data lookup
  const mockTournaments = {
    '1': {
      title: 'Delhi State Chess Championship 2025',
      slug: 'delhi-state-championship-2025',
      status: 'published' as const,
      registrationOpen: true,
      dateStart: '2025-03-15',
      dateEnd: '2025-03-17',
      registrationDeadline: '2025-03-10',
      location: 'New Delhi, India',
      venue: 'Indira Gandhi Indoor Stadium, New Delhi',
      description: 'Join the prestigious Delhi State Chess Championship with over 2000+ participants. A premier tournament for all skill levels with prizes worth ₹5 Lakhs.',
      fullDescription: 'The Delhi State Chess Championship is one of the most prestigious chess tournaments in North India. This year marks our 15th edition, and we\'re expecting over 2000 participants from across the country.\n\nThe tournament features multiple age categories and skill levels, ensuring that every player finds their perfect competitive environment.',
      sections: [
        { name: 'Under-8', entryFee: '₹800', description: 'For players born on or after 1st January 2017' },
        { name: 'Under-12', entryFee: '₹1,000', description: 'For players born on or after 1st January 2013' },
        { name: 'Under-16', entryFee: '₹1,200', description: 'For players born on or after 1st January 2009' },
        { name: 'Open', entryFee: '₹1,500', description: 'Open to all players' }
      ],
      timeControl: '90 minutes + 30 seconds increment per move',
      rounds: 9,
      prizes: '₹50,000 for winner in Open category, trophies for top 3 in each section',
      paymentLink: 'https://razorpay.com/payment-link/delhi-chess-2025',
      features: [
        { feature: 'AICF Rated Tournament' },
        { feature: 'Live Broadcast of Top Games' },
        { feature: 'Analysis Room Available' },
        { feature: 'Refreshments Provided' },
        { feature: 'Medical Assistance On-Site' },
        { feature: 'Free Parking' }
      ],
      contactPerson: 'Tournament Director - Rajesh Kumar',
      contactPhone: '+91-98765-43210',
      contactEmail: 'tournaments@joyouschess.com',
      metaDescription: 'Register for Delhi State Chess Championship 2025. AICF rated tournament with ₹5L prize pool. Multiple age categories. March 15-17, 2025 at Indira Gandhi Stadium.'
    },
    '2': {
      title: 'Youth Grand Prix 2025',
      slug: 'youth-grand-prix-2025',
      status: 'draft' as const,
      registrationOpen: false,
      dateStart: '2025-04-20',
      dateEnd: '2025-04-22',
      registrationDeadline: '2025-04-15',
      location: 'Mumbai, India',
      venue: 'Chess Academy Mumbai',
      description: 'Annual youth championship for promising young chess players.',
      fullDescription: 'The Youth Grand Prix is designed specifically for young chess enthusiasts looking to test their skills in a competitive environment.',
      sections: [
        { name: 'Under-10', entryFee: '₹600', description: 'For players under 10 years' },
        { name: 'Under-14', entryFee: '₹800', description: 'For players under 14 years' },
        { name: 'Under-18', entryFee: '₹1,000', description: 'For players under 18 years' }
      ],
      timeControl: '60 minutes + 15 seconds increment per move',
      rounds: 7,
      prizes: '₹25,000 total prize pool across all categories',
      paymentLink: '',
      features: [
        { feature: 'Youth Focused Tournament' },
        { feature: 'Educational Workshops' },
        { feature: 'Coaching Sessions' }
      ],
      contactPerson: 'Youth Coordinator - Priya Sharma',
      contactPhone: '+91-98765-43211',
      contactEmail: 'youth@joyouschess.com',
      metaDescription: 'Youth Grand Prix 2025 - Annual chess championship for young players. Multiple age categories and educational workshops.'
    }
  }

  useEffect(() => {
    // Simulate loading existing tournament data
    setTimeout(() => {
      const tournament = mockTournaments[tournamentId as keyof typeof mockTournaments]
      if (tournament) {
        setFormData({ ...tournament, heroImage: null })
        setLoading(false)
      } else {
        setNotFound(true)
        setLoading(false)
      }
    }, 500)
  }, [tournamentId])

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

  // Commenting out unused functions for simplified edit form
  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setFormData(prev => ({ ...prev, heroImage: e.target.files![0] }))
  //   }
  // }

  // const addSection = () => {
  //   setFormData(prev => ({
  //     ...prev,
  //     sections: [...prev.sections, { name: '', entryFee: '', description: '' }]
  //   }))
  // }

  // const updateSection = (index: number, field: keyof TournamentSection, value: string) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     sections: prev.sections.map((section, i) => 
  //       i === index ? { ...section, [field]: value } : section
  //     )
  //   }))
  // }

  // const removeSection = (index: number) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     sections: prev.sections.filter((_, i) => i !== index)
  //   }))
  // }

  // const addFeature = () => {
  //   setFormData(prev => ({
  //     ...prev,
  //     features: [...prev.features, { feature: '' }]
  //   }))
  // }

  // const updateFeature = (index: number, value: string) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     features: prev.features.map((feat, i) => 
  //       i === index ? { feature: value } : feat
  //     )
  //   }))
  // }

  // const removeFeature = (index: number) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     features: prev.features.filter((_, i) => i !== index)
  //   }))
  // }

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
    console.log('Tournament Updated:', formData)
    alert('Tournament updated successfully! (This is a demo)')
    router.push('/mock-tournament-management')
  }

  if (loading) {
    return (
      <div className="pt-24 md:pt-32 pb-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto mb-4"></div>
          <p className="font-lato text-gray-600">Loading tournament data...</p>
        </div>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="pt-24 md:pt-32 pb-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="font-bebas-neue font-extrabold text-3xl text-red-600 mb-4 uppercase">
            Tournament Not Found
          </h1>
          <p className="font-lato text-gray-600 mb-6">
            The tournament you&apos;re trying to edit doesn&apos;t exist or has been deleted.
          </p>
          <Link
            href="/mock-tournament-management"
            className="inline-block bg-blue-800 text-white px-6 py-3 rounded-lg font-lato font-bold hover:bg-blue-900 transition-all"
          >
            Back to Management
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 md:pt-32 pb-8 md:pb-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="font-bebas-neue font-extrabold text-4xl md:text-6xl text-blue-800 mb-2 uppercase">
              Edit Tournament
            </h1>
            <p className="font-lato text-lg text-gray-600">
              Update tournament details and settings
            </p>
          </div>
          
          <Link
            href="/mock-tournament-management"
            className="bg-gray-600 text-white px-4 py-2 rounded-lg font-lato font-bold hover:bg-gray-700 transition-all"
          >
            Back to Management
          </Link>
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

          {/* The rest of the form sections would be identical to the creation form */}
          {/* For brevity, I'll include the submit section */}

          {/* Submit Section */}
          <div className="pt-6 border-t border-gray-200">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <h3 className="font-bebas-neue font-extrabold text-xl text-green-800 mb-4 uppercase">
                Update Tournament
              </h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p className="font-lato text-blue-800">
                    <strong>Note:</strong> This is an edit interface demo. In production, this would update the tournament in your CMS.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Link
                href="/mock-tournament-management"
                className="px-8 py-4 bg-gray-600 text-white rounded-lg font-bebas-neue font-extrabold text-xl uppercase hover:bg-gray-700 transition-all"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="px-12 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-bebas-neue font-extrabold text-xl uppercase hover:from-green-700 hover:to-green-800 transition-all shadow-lg"
              >
                Update Tournament
              </button>
            </div>
          </div>
        </motion.form>
      </div>
    </div>
  )
} 