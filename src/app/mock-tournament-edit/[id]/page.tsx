import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MockTournamentEditClient from './MockTournamentEditClient'

interface TournamentEditPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function MockTournamentEditPage({ params }: TournamentEditPageProps) {
  const { id } = await params
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <MockTournamentEditClient tournamentId={id} />
      <Footer />
    </div>
  )
} 