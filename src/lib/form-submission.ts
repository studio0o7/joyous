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
  
  // Document uploads (base64 encoded)
  birthCertificate?: string
  photoID?: string
  paymentProof?: string
  
  // Document metadata
  birthCertificateFileName?: string
  photoIDFileName?: string
  paymentProofFileName?: string
  
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

// Get registration API endpoint
function getFormEndpoint(): string {
  // Use Next.js API route
  return '/api/register'
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
    
    // Submit to Next.js API route
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

// Convert File to base64 string
export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result as string
      // Remove the data:image/jpeg;base64, prefix
      const base64 = result.split(',')[1]
      resolve(base64)
    }
    reader.onerror = error => reject(error)
  })
}

// Validate file size and type
export function validateFile(file: File, maxSizeMB: number = 5): { valid: boolean; error?: string } {
  const maxSize = maxSizeMB * 1024 * 1024 // Convert MB to bytes
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
  
  if (file.size > maxSize) {
    return { valid: false, error: `File size must be less than ${maxSizeMB}MB` }
  }
  
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'File must be JPG, PNG, or PDF' }
  }
  
  return { valid: true }
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
  
  // File validations (optional files)
  // Note: Files are already validated before base64 conversion
  
  return errors
}

// Process files for submission
export async function processFiles(files: {
  birthCertificate?: File | null
  photoID?: File | null
  paymentProof?: File | null
}): Promise<{
  birthCertificate?: string
  photoID?: string
  paymentProof?: string
  birthCertificateFileName?: string
  photoIDFileName?: string
  paymentProofFileName?: string
}> {
  const processedFiles: {
    birthCertificate?: string
    photoID?: string
    paymentProof?: string
    birthCertificateFileName?: string
    photoIDFileName?: string
    paymentProofFileName?: string
  } = {}
  
  if (files.birthCertificate) {
    processedFiles.birthCertificate = await fileToBase64(files.birthCertificate)
    processedFiles.birthCertificateFileName = files.birthCertificate.name
  }
  
  if (files.photoID) {
    processedFiles.photoID = await fileToBase64(files.photoID)
    processedFiles.photoIDFileName = files.photoID.name
  }
  
  if (files.paymentProof) {
    processedFiles.paymentProof = await fileToBase64(files.paymentProof)
    processedFiles.paymentProofFileName = files.paymentProof.name
  }
  
  return processedFiles
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