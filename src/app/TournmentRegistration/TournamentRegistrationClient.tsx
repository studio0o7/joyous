'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface TournamentSection {
  name: string
  additionalNotes: string  // Updated to match new CMS structure
  entryFee?: string        // Legacy support
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
  heroImage: string
  description: string
  fullDescription: string
  sections: TournamentSection[]
  timeControl: string
  rounds: number
  prizes: string
  paymentLink?: string
}

interface TournamentRegistrationClientProps {
  tournaments: Tournament[]
}

export default function TournamentRegistrationClient({ tournaments }: TournamentRegistrationClientProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-blue-800 text-white py-20 px-6 mt-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-5xl font-bebas-neue font-extrabold mb-6 uppercase"
            style={{ color: '#F43F5E' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Tournament Registration
          </motion.h1>
          <motion.p 
            className="text-xl font-lato font-normal leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join exciting chess tournaments and compete with players from around the world
          </motion.p>
        </div>
      </section>

      {/* Tournament List */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-bebas-neue font-extrabold text-center mb-12 text-blue-800 uppercase"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Available Tournaments
          </motion.h2>

                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {tournaments.map((tournament, index) => (
                             <motion.div 
                key={tournament.slug}
                className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                {/* Tournament Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={tournament.heroImage || '/images/Banner.png'} 
                    alt={tournament.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Registration Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-lato font-bold uppercase ${
                      tournament.registrationOpen 
                        ? 'bg-green-500 text-white' 
                        : 'bg-red-500 text-white'
                    }`}>
                      {tournament.registrationOpen ? 'Open' : 'Closed'}
                    </span>
                  </div>
                  
                  {/* Tournament Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bebas-neue font-extrabold text-white mb-1 uppercase leading-tight">
                      {tournament.title}
                    </h3>
                  </div>
                </div>

                {/* Tournament Details */}
                <div className="p-6">
                                     <div className="space-y-3 mb-4">
                     <div className="text-gray-700 font-lato">
                       <span className="text-sm">
                         <strong>Dates:</strong> {new Date(tournament.dateStart).toLocaleDateString()} - {new Date(tournament.dateEnd).toLocaleDateString()}
                       </span>
                     </div>
                     
                     <div className="text-gray-700 font-lato">
                       <span className="text-sm">
                         <strong>Registration Ends:</strong> {new Date(tournament.registrationDeadline).toLocaleDateString()}
                       </span>
                     </div>
                     
                     <div className="text-gray-700 font-lato">
                       <span className="text-sm">
                         <strong>Prize Pool:</strong> {tournament.prizes}
                       </span>
                     </div>
                     
                     <div className="text-gray-700 font-lato">
                       <span className="text-sm">
                         <strong>Location:</strong> {tournament.location}
                       </span>
                     </div>
                   </div>
                  
                  <p className="text-gray-700 text-sm font-lato mb-6 leading-relaxed line-clamp-2">
                    {tournament.description}
                  </p>
                  
                                     <Link 
                     href={`/tournaments/${tournament.slug}`}
                     className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white py-3 px-6 rounded-xl font-bebas-neue font-extrabold text-lg uppercase transition-all duration-300 block text-center shadow-lg hover:shadow-xl transform hover:scale-105"
                   >
                     Register Now
                   </Link>
                </div>
              </motion.div>
             ))}
          </div>

          {tournaments.length === 0 && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-gray-600 text-lg font-lato">No tournaments available for registration at the moment.</p>
              <p className="text-gray-500 mt-2 font-lato">Please check back later for upcoming tournaments.</p>
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
} 