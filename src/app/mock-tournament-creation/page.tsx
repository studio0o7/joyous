import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MockTournamentCreationClient from './MockTournamentCreationClient'

export default function MockTournamentCreationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <MockTournamentCreationClient />
      <Footer />
    </div>
  )
} 