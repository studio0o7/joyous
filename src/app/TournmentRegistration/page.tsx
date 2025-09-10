import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getActiveTournaments, getFallbackTournaments } from '@/lib/cms'
import TournamentRegistrationClient from './TournamentRegistrationClient'

export default function TournmentRegistrationPage() {
  // Server-side data fetching
  let activeRegistrations
    try {
      const tournaments = getActiveTournaments()
    activeRegistrations = tournaments.length > 0 ? tournaments : getFallbackTournaments().filter(t => t.registrationOpen)
    } catch (error) {
      console.error('Error loading tournaments:', error)
    activeRegistrations = getFallbackTournaments().filter(t => t.registrationOpen)
    }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <TournamentRegistrationClient tournaments={activeRegistrations} />
      <Footer />
    </div>
  )
} 