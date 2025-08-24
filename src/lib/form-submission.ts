// Form submission utility for Google Apps Script integration

export interface FormSubmissionData {
  // Hidden fields
  tournamentId: string
  timestamp: string
  
  // Player information
  playerName: string
  email: string
  phone: string
  dateOfBirth: string
  
  // Chess information
  federationId?: string
  rating?: string
  section: string
  
  // Additional information
  parentName: string
  teamSchool?: string
  byes?: string
  specialRequests?: string
  
  // Consent
  consent: boolean
  
  // Security
  honeypot?: string // Should be empty for real users
  formToken?: string // For additional security
}

export interface FormSubmissionResponse {
  success: boolean
  message: string
  registrationId?: string
}

// Get Google Apps Script endpoint from CMS settings or environment
function getFormEndpoint(): string {
  // First try environment variable
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_FORM_ENDPOINT) {
    return process.env.NEXT_PUBLIC_FORM_ENDPOINT
  }
  
  // Fallback to a placeholder (will be replaced with actual URL)
  return process.env.NEXT_PUBLIC_FORM_ENDPOINT || 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'
}

// Submit form data to Google Apps Script
export async function submitTournamentRegistration(
  formData: Omit<FormSubmissionData, 'timestamp' | 'formToken'>
): Promise<FormSubmissionResponse> {
  try {
    // Add timestamp and security token
    const submissionData: FormSubmissionData = {
      ...formData,
      timestamp: new Date().toISOString(),
      formToken: generateFormToken(formData.tournamentId, formData.email)
    }
    
    // Security check - honeypot should be empty
    if (submissionData.honeypot && submissionData.honeypot.trim() !== '') {
      throw new Error('Invalid submission detected')
    }
    
    const endpoint = getFormEndpoint()
    
    if (endpoint === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
      // Development mode - just log the data
      console.log('Form submission (development mode):', submissionData)
      return {
        success: true,
        message: 'Registration submitted successfully! (Development mode)',
        registrationId: 'DEV_' + Date.now()
      }
    }
    
    // Submit to Google Apps Script
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData)
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    
    if (result.success) {
      return {
        success: true,
        message: result.message || 'Registration submitted successfully!',
        registrationId: result.registrationId
      }
    } else {
      throw new Error(result.message || 'Registration failed')
    }
    
  } catch (error) {
    console.error('Form submission error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Registration failed. Please try again.'
    }
  }
}

// Generate a simple form token for security
function generateFormToken(tournamentId: string, email: string): string {
  const data = `${tournamentId}-${email}-${Date.now()}`
  return btoa(data).replace(/[+/=]/g, '').substring(0, 16)
}

// Validate form data before submission
export function validateFormData(data: Partial<FormSubmissionData>): string[] {
  const errors: string[] = []
  
  if (!data.playerName?.trim()) {
    errors.push('Player name is required')
  }
  
  if (!data.email?.trim()) {
    errors.push('Email address is required')
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.push('Please enter a valid email address')
  }
  
  if (!data.phone?.trim()) {
    errors.push('Phone number is required')
  }
  
  if (!data.dateOfBirth?.trim()) {
    errors.push('Date of birth is required')
  }
  
  if (!data.section?.trim()) {
    errors.push('Please select a tournament section')
  }
  
  if (!data.parentName?.trim()) {
    errors.push('Parent/Guardian name is required')
  }
  
  if (!data.consent) {
    errors.push('You must agree to the terms and conditions')
  }
  
  return errors
}

// Format data for display in confirmation
export function formatSubmissionData(data: FormSubmissionData): Record<string, string> {
  return {
    'Tournament': data.tournamentId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    'Player Name': data.playerName,
    'Email': data.email,
    'Phone': data.phone,
    'Date of Birth': new Date(data.dateOfBirth).toLocaleDateString(),
    'Section': data.section,
    'Federation ID': data.federationId || 'Not provided',
    'Rating': data.rating || 'Not provided',
    'Parent/Guardian': data.parentName,
    'Team/School': data.teamSchool || 'Not provided',
    'Bye Requests': data.byes || 'None',
    'Special Requests': data.specialRequests || 'None'
  }
} 