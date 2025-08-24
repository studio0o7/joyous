import { notFound } from 'next/navigation'
import { getTournamentBySlug, getFallbackTournaments } from '@/lib/cms'
import TournamentClient from './TournamentClient'

interface TournamentPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function TournamentPage({ params }: TournamentPageProps) {
  const { slug } = await params
  let tournament
  
  try {
    // Try to get tournament from CMS
    tournament = getTournamentBySlug(slug)
    
    // If no CMS tournament found, check fallback data
    if (!tournament) {
      const fallbackTournaments = getFallbackTournaments()
      tournament = fallbackTournaments.find(t => t.slug === slug)
    }
  } catch (error) {
    console.error('Error fetching tournament:', error)
    // Use fallback tournaments if CMS fails
    const fallbackTournaments = getFallbackTournaments()
    tournament = fallbackTournaments.find(t => t.slug === slug)
  }

  if (!tournament) {
    notFound()
  }

  // Transform CMS data to match our perfected design structure
  const transformedTournament = {
    ...tournament,
    images: tournament.images || 
           (tournament.heroImage ? [tournament.heroImage, tournament.heroImage, tournament.heroImage] : 
           ['/images/Banner.png', '/images/SC1.png', '/images/SC2.png']),
          sections: tournament.sections?.map(section => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const legacySection = section as any
        return {
          name: section.name,
          // Handle both new and legacy field names
          additionalNotes: legacySection.additionalNotes || legacySection.entryFee || 'Entry fee to be announced',
          description: section.description
        }
      }) || [],
    contact: {
      person: tournament.contact?.person || 'Tournament Director',
      phone: tournament.contact?.phone || '+91-98765-43210', 
      email: tournament.contact?.email || 'tournaments@joyouschess.com'
    }
  }

  return <TournamentClient tournament={transformedTournament} />
} 