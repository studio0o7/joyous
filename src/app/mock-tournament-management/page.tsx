import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MockTournamentManagementClient from './MockTournamentManagementClient'

export default function MockTournamentManagementPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <MockTournamentManagementClient />
      <Footer />
    </div>
  )
} 