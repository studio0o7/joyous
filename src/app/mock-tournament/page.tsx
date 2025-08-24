import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MockTournamentClient from './MockTournamentClient'

export default function MockTournamentPage() {
  const mockTournament = {
    slug: "delhi-state-championship-2025",
    title: "Delhi State Chess Championship 2025",
    status: "published" as const,
    registrationOpen: true,
    dateStart: "2025-03-15",
    dateEnd: "2025-03-17",
    registrationDeadline: "2025-03-10",
    location: "New Delhi, India",
    venue: "Indira Gandhi Indoor Stadium, New Delhi",
    // Portrait images for carousel
    images: [
      "/images/Banner.png",
      "/images/SC1.png", 
      "/images/SC2.png"
    ],
    description: "Join the prestigious Delhi State Chess Championship with over 2000+ participants. A premier tournament for all skill levels with prizes worth ₹5 Lakhs.",
    fullDescription: `The Delhi State Chess Championship is one of the most prestigious chess tournaments in North India. This year marks our 15th edition, and we're expecting over 2000 participants from across the country.

The tournament features multiple age categories and skill levels, ensuring that every player finds their perfect competitive environment. With a total prize pool of ₹5 Lakhs and trophies for top performers in each category, this is an opportunity you don't want to miss.

Our venue, the Indira Gandhi Indoor Stadium, provides world-class facilities with proper lighting, comfortable seating, and professional tournament management. All games will be rated by the All India Chess Federation.`,
    sections: [
      {
        name: "Under-8",
        additionalNotes: "Entry Fee: ₹800, Early bird discount available",
        description: "For players born on or after 1st January 2017"
      },
      {
        name: "Under-12", 
        additionalNotes: "Entry Fee: ₹1,000, Includes tournament kit",
        description: "For players born on or after 1st January 2013"
      },
      {
        name: "Under-16",
        additionalNotes: "Entry Fee: ₹1,200, Coaching session included",
        description: "For players born on or after 1st January 2009"
      },
      {
        name: "Open",
        additionalNotes: "Entry Fee: ₹1,500, Professional analysis provided",
        description: "Open to all players, highest prize category"
      }
    ],
    timeControl: "90 minutes + 30 seconds increment per move",
    rounds: 9,
    prizes: "₹50,000 for winner in Open category, trophies for top 3 in each section",
    features: [
      "AICF Rated Tournament",
      "Live Broadcast of Top Games", 
      "Analysis Room Available",
      "Refreshments Provided",
      "Medical Assistance On-Site",
      "Free Parking"
    ],
    contact: {
      person: "Tournament Director - Rajesh Kumar",
      phone: "+91-98765-43210",
      email: "tournaments@joyouschess.com"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <MockTournamentClient tournament={mockTournament} />
      <Footer />
    </div>
  )
} 