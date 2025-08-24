import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MockTournamentEditClient from './MockTournamentEditClient'

interface TournamentEditPageProps {
  params: {
    id: string
  }
}

export default function MockTournamentEditPage({ params }: TournamentEditPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <MockTournamentEditClient tournamentId={params.id} />
      <Footer />
    </div>
  )
} 