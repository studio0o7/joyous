import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Ensure this only runs on server-side
if (typeof window !== 'undefined') {
  throw new Error('CMS functions should only be used on the server side')
}

// Types for CMS content
export interface TournamentSection {
  name: string
  additionalNotes: string  // Changed from entryFee to match our new structure
  description: string
}

export interface TournamentContact {
  person: string
  phone: string
  email: string
}

export interface Tournament {
  slug: string
  title: string
  status: 'draft' | 'published'
  registrationOpen: boolean
  dateStart: string
  dateEnd: string
  registrationDeadline: string
  location: string
  venue: string
  heroImage: string  // Legacy field for backward compatibility
  images?: string[]  // New field for multiple images
  description: string
  fullDescription: string
  sections: TournamentSection[]
  timeControl: string
  rounds: number
  prizes: string
  paymentLink?: string
  features?: string[]
  contact?: TournamentContact
  metaDescription?: string
  date: string
  // Legacy support for existing components
  id?: number
}

export interface TournamentSettings {
  defaultContactEmail: string
  defaultPhone: string
  registrationFormEndpoint: string
  termsAndConditions: string
}

const contentDirectory = path.join(process.cwd(), 'content')
const tournamentsDirectory = path.join(contentDirectory, 'tournaments')
const settingsDirectory = path.join(contentDirectory, 'settings')

// Get all tournament files
export function getTournamentFilenames(): string[] {
  try {
    if (!fs.existsSync(tournamentsDirectory)) {
      console.warn('Tournaments directory does not exist, creating...')
      fs.mkdirSync(tournamentsDirectory, { recursive: true })
      return []
    }
    return fs.readdirSync(tournamentsDirectory).filter(name => name.endsWith('.md'))
  } catch (error) {
    console.error('Error reading tournaments directory:', error)
    return []
  }
}

// Get tournament by slug
export function getTournamentBySlug(slug: string): Tournament | null {
  try {
    const filenames = getTournamentFilenames()
    
    for (const filename of filenames) {
      const filePath = path.join(tournamentsDirectory, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)
      
      if (data.slug === slug && data.status === 'published') {
        return {
          ...data,
          id: Math.abs(hashCode(slug)) // Generate numeric ID for legacy support
        } as Tournament
      }
    }
    
    return null
  } catch (error) {
    console.error(`Error reading tournament with slug ${slug}:`, error)
    return null
  }
}

// Get all published tournaments
export function getAllTournaments(): Tournament[] {
  try {
    const filenames = getTournamentFilenames()
    const tournaments: Tournament[] = []
    
    for (const filename of filenames) {
      const filePath = path.join(tournamentsDirectory, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)
      
      if (data.status === 'published') {
        tournaments.push({
          ...data,
          id: Math.abs(hashCode(data.slug)) // Generate numeric ID for legacy support
        } as Tournament)
      }
    }
    
    // Sort by date (newest first)
    return tournaments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error('Error reading tournaments:', error)
    return []
  }
}

// Get active tournaments (registration open)
export function getActiveTournaments(): Tournament[] {
  return getAllTournaments().filter(tournament => tournament.registrationOpen)
}

// Get upcoming tournaments (future start date)
export function getUpcomingTournaments(): Tournament[] {
  const now = new Date()
  return getAllTournaments().filter(tournament => {
    const startDate = new Date(tournament.dateStart)
    return startDate > now
  })
}

// Get tournament settings
export function getTournamentSettings(): TournamentSettings | null {
  try {
    const settingsPath = path.join(settingsDirectory, 'tournaments.yml')
    
    if (!fs.existsSync(settingsPath)) {
      console.warn('Tournament settings file does not exist')
      return null
    }
    
    const fileContents = fs.readFileSync(settingsPath, 'utf8')
    const { data } = matter(fileContents)
    
    return data as TournamentSettings
  } catch (error) {
    console.error('Error reading tournament settings:', error)
    return null
  }
}

// Get all tournament slugs (for static generation)
export function getAllTournamentSlugs(): string[] {
  return getAllTournaments().map(tournament => tournament.slug)
}

// Helper function to generate numeric ID from string
function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return hash
}

// Fallback data for development/testing
export function getFallbackTournaments(): Tournament[] {
  return [
    {
      id: 1,
      slug: 'delhi-state-championship-2025',
      title: 'Delhi State Chess Championship 2025',
      status: 'published',
      dateStart: '2025-03-15',
      dateEnd: '2025-03-17',
      location: 'New Delhi, India',
      venue: 'Indira Gandhi Indoor Stadium',
      heroImage: '/images/Banner.png',
      description: 'Join the prestigious Delhi State Chess Championship with over 2000+ participants.',
      fullDescription: 'A premier tournament for all skill levels.',
      registrationOpen: true,
      sections: [
        { name: 'Under-8', additionalNotes: '₹800', description: 'For players born on or after 1st January 2017' },
        { name: 'Under-12', additionalNotes: '₹1,000', description: 'For players born on or after 1st January 2013' },
        { name: 'Under-16', additionalNotes: '₹1,200', description: 'For players born on or after 1st January 2009' },
        { name: 'Open', additionalNotes: '₹1,500', description: 'Open to all players' }
      ],
      registrationDeadline: '2025-03-10',
      timeControl: '90 minutes + 30 seconds increment per move',
      rounds: 9,
      prizes: '₹50,000 for winner in Open category',
      paymentLink: 'https://razorpay.com/payment-link/delhi-chess-2025',
      date: '2025-01-15 10:00'
    },
    {
      id: 2,
      slug: 'youth-grand-prix-2025',
      title: 'Youth Grand Prix 2025',
      status: 'published',
      dateStart: '2025-04-05',
      dateEnd: '2025-04-07',
      location: 'Mumbai, India',
      venue: 'NSCI Sports Complex',
      heroImage: '/images/Banner.png',
      description: 'A prestigious platform for young chess enthusiasts.',
      fullDescription: 'Specifically designed for young chess enthusiasts aged 18 and below.',
      registrationOpen: true,
      sections: [
        { name: 'Under-10', additionalNotes: '₹1,200', description: 'For players born on or after 1st January 2015' },
        { name: 'Under-14', additionalNotes: '₹1,500', description: 'For players born on or after 1st January 2011' },
        { name: 'Under-18', additionalNotes: '₹2,000', description: 'For players born on or after 1st January 2007' }
      ],
      registrationDeadline: '2025-03-30',
      timeControl: '60 minutes + 10 seconds increment per move',
      rounds: 7,
      prizes: '₹25,000 for winner in each category',
      paymentLink: 'https://razorpay.com/payment-link/youth-gp-2025',
      date: '2025-01-20 14:00'
    }
  ]
} 