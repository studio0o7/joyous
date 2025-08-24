'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Tournament {
  id: string
  title: string
  slug: string
  status: 'draft' | 'published'
  registrationOpen: boolean
  dateStart: string
  dateEnd: string
  registrationDeadline: string
  location: string
  venue: string
  description: string
  sections: number
  createdAt: string
  lastModified: string
}

export default function MockTournamentManagementClient() {
  // Mock tournament data
  const [tournaments, setTournaments] = useState<Tournament[]>([
    {
      id: '1',
      title: 'Delhi State Chess Championship 2025',
      slug: 'delhi-state-championship-2025',
      status: 'published',
      registrationOpen: true,
      dateStart: '2025-03-15',
      dateEnd: '2025-03-17',
      registrationDeadline: '2025-03-10',
      location: 'New Delhi, India',
      venue: 'Indira Gandhi Indoor Stadium',
      description: 'Join the prestigious Delhi State Chess Championship with over 2000+ participants.',
      sections: 4,
      createdAt: '2025-01-15',
      lastModified: '2025-01-20'
    },
    {
      id: '2',
      title: 'Youth Grand Prix 2025',
      slug: 'youth-grand-prix-2025',
      status: 'draft',
      registrationOpen: false,
      dateStart: '2025-04-20',
      dateEnd: '2025-04-22',
      registrationDeadline: '2025-04-15',
      location: 'Mumbai, India',
      venue: 'Chess Academy Mumbai',
      description: 'Annual youth championship for promising young chess players.',
      sections: 3,
      createdAt: '2025-01-18',
      lastModified: '2025-01-22'
    },
    {
      id: '3',
      title: 'International Open 2025',
      slug: 'international-open-2025',
      status: 'published',
      registrationOpen: true,
      dateStart: '2025-05-10',
      dateEnd: '2025-05-12',
      registrationDeadline: '2025-05-05',
      location: 'Bangalore, India',
      venue: 'International Convention Center',
      description: 'Premier international chess tournament with players from 15+ countries.',
      sections: 2,
      createdAt: '2025-01-10',
      lastModified: '2025-01-25'
    }
  ])

  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published'>('all')

  const handleDelete = (tournamentId: string) => {
    setTournaments(prev => prev.filter(t => t.id !== tournamentId))
    setDeleteConfirm(null)
    alert('Tournament deleted successfully! (This is a demo)')
  }

  const handleStatusToggle = (tournamentId: string) => {
    setTournaments(prev => prev.map(t => 
      t.id === tournamentId 
        ? { ...t, status: t.status === 'published' ? 'draft' : 'published' as 'draft' | 'published' }
        : t
    ))
  }

  const handleRegistrationToggle = (tournamentId: string) => {
    setTournaments(prev => prev.map(t => 
      t.id === tournamentId 
        ? { ...t, registrationOpen: !t.registrationOpen }
        : t
    ))
  }

  const filteredTournaments = tournaments.filter(tournament => {
    const matchesSearch = tournament.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tournament.dateStart.includes(searchTerm) ||
                         new Date(tournament.dateStart).toLocaleDateString().includes(searchTerm)
    const matchesStatus = statusFilter === 'all' || tournament.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="pt-24 md:pt-32 pb-8 md:pb-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center justify-between mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="font-bebas-neue font-extrabold text-4xl md:text-6xl text-blue-800 mb-2 uppercase">
              Tournament Management
            </h1>
            <p className="font-lato text-lg text-gray-600">
              Manage all your chess tournaments in one place
            </p>
          </div>
          
          <Link 
            href="/mock-tournament-creation"
            className="mt-4 md:mt-0 bg-gradient-to-r from-blue-800 to-blue-900 text-white px-6 py-3 rounded-lg font-bebas-neue font-extrabold uppercase hover:from-blue-900 hover:to-blue-800 transition-all duration-300 text-center"
          >
            Create New Tournament
          </Link>
        </motion.div>

        {/* Filters & Search */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block font-lato font-bold text-gray-700 mb-2">
                Search Tournaments
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-lato"
                placeholder="Search by title or date..."
              />
            </div>

            <div>
              <label className="block font-lato font-bold text-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'draft' | 'published')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-lato"
              >
                <option value="all">All Tournaments</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div className="flex items-end">
              <div className="w-full">
                <div className="font-lato font-bold text-gray-700 mb-2">
                  Found: {filteredTournaments.length} tournaments
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tournament List */}
        <div className="space-y-4">
          {filteredTournaments.map((tournament, index) => (
            <motion.div
              key={tournament.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  
                  {/* Tournament Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="font-bebas-neue font-extrabold text-xl text-blue-800 uppercase">
                        {tournament.title}
                      </h3>
                      
                      {/* Status Badge */}
                      <span className={`px-3 py-1 rounded-full text-xs font-bebas-neue font-extrabold uppercase ${
                        tournament.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {tournament.status}
                      </span>

                      {/* Registration Badge */}
                      <span className={`px-3 py-1 rounded-full text-xs font-bebas-neue font-extrabold uppercase ${
                        tournament.registrationOpen 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {tournament.registrationOpen ? 'Registration Open' : 'Registration Closed'}
                      </span>
                    </div>

                    <p className="font-lato text-gray-600 mb-3">
                      {tournament.description}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-lato text-gray-500">
                      <div>
                        <strong>Date:</strong> {new Date(tournament.dateStart).toLocaleDateString()}
                      </div>
                      <div>
                        <strong>Location:</strong> {tournament.location}
                      </div>
                      <div>
                        <strong>Sections:</strong> {tournament.sections}
                      </div>
                      <div>
                        <strong>Modified:</strong> {new Date(tournament.lastModified).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col sm:flex-row lg:flex-col gap-2">
                    
                    {/* Quick Actions */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleStatusToggle(tournament.id)}
                        className={`px-3 py-2 rounded text-xs font-lato font-bold transition-all ${
                          tournament.status === 'published'
                            ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                        title={tournament.status === 'published' ? 'Make Draft' : 'Publish'}
                      >
                        {tournament.status === 'published' ? 'Draft' : 'Publish'}
                      </button>

                      <button
                        onClick={() => handleRegistrationToggle(tournament.id)}
                        className={`px-3 py-2 rounded text-xs font-lato font-bold transition-all ${
                          tournament.registrationOpen
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                        title={tournament.registrationOpen ? 'Close Registration' : 'Open Registration'}
                      >
                        {tournament.registrationOpen ? 'Close Reg' : 'Open Reg'}
                      </button>
                    </div>

                    {/* Main Actions */}
                    <div className="flex space-x-2">
                      <Link
                        href={`/mock-tournament/${tournament.slug}`}
                        className="px-4 py-2 bg-blue-600 text-white rounded font-lato font-bold hover:bg-blue-700 transition-all text-xs"
                        title="View Tournament Page"
                      >
                        View
                      </Link>

                      <Link
                        href={`/mock-tournament-edit/${tournament.id}`}
                        className="px-4 py-2 bg-green-600 text-white rounded font-lato font-bold hover:bg-green-700 transition-all text-xs"
                        title="Edit Tournament"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => setDeleteConfirm(tournament.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded font-lato font-bold hover:bg-red-700 transition-all text-xs"
                        title="Delete Tournament"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTournaments.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="font-bebas-neue font-extrabold text-2xl text-gray-600 mb-2 uppercase">
              No Tournaments Found
            </h3>
            <p className="font-lato text-gray-500 mb-6">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by creating your first tournament!'
              }
            </p>
            <Link
              href="/mock-tournament-creation"
              className="inline-block bg-gradient-to-r from-blue-800 to-blue-900 text-white px-6 py-3 rounded-lg font-bebas-neue font-extrabold uppercase hover:from-blue-900 hover:to-blue-800 transition-all duration-300"
            >
              Create First Tournament
            </Link>
          </motion.div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              className="bg-white rounded-xl p-6 max-w-md w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center">
                <div className="text-red-600 text-5xl mb-4">⚠️</div>
                <h3 className="font-bebas-neue font-extrabold text-xl text-red-600 mb-4 uppercase">
                  Delete Tournament?
                </h3>
                <p className="font-lato text-gray-600 mb-6">
                  Are you sure you want to delete this tournament? This action cannot be undone.
                </p>
                <p className="font-lato font-bold text-gray-800 mb-6">
                  &quot;{tournaments.find(t => t.id === deleteConfirm)?.title}&quot;
                </p>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 px-4 py-3 bg-gray-300 text-gray-700 rounded-lg font-lato font-bold hover:bg-gray-400 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(deleteConfirm)}
                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-lato font-bold hover:bg-red-700 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
} 