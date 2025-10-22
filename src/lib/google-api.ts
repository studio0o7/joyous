/**
 * Google API Client for Sheets and Drive
 * Handles all interactions with Google Sheets and Google Drive APIs
 */

import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// Initialize Google Auth Client
function getAuthClient(): JWT {
  // Parse service account credentials from environment variable
  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS;
  
  if (!credentials) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_CREDENTIALS not found in environment variables');
  }
  
  let parsedCredentials;
  try {
    parsedCredentials = typeof credentials === 'string' 
      ? JSON.parse(credentials) 
      : credentials;
  } catch {
    throw new Error('Failed to parse GOOGLE_SERVICE_ACCOUNT_CREDENTIALS');
  }
  
  // Create JWT client
  const auth = new google.auth.JWT({
    email: parsedCredentials.client_email,
    key: parsedCredentials.private_key,
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/drive',
    ],
  });
  
  return auth;
}

// ============================================
// GOOGLE SHEETS API
// ============================================

/**
 * Create a new Google Sheet for a tournament
 */
export async function createTournamentSheet(tournamentTitle: string): Promise<{
  sheetId: string;
  sheetUrl: string;
}> {
  const auth = getAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  const drive = google.drive({ version: 'v3', auth });
  
  try {
    // Create the spreadsheet
    const response = await sheets.spreadsheets.create({
      requestBody: {
        properties: {
          title: `${tournamentTitle} - Registrations`,
        },
        sheets: [
          {
            properties: {
              title: 'Registrations',
              gridProperties: {
                frozenRowCount: 1,
              },
            },
          },
        ],
      },
    });
    
    const sheetId = response.data.spreadsheetId!;
    
    // Add headers
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: 'Registrations!A1:N1',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          'Timestamp',
          'TournamentID',
          'PlayerName',
          'Email',
          'Phone',
          'DateOfBirth',
          'Section',
          'Rating',
          'ParentName',
          'SpecialRequests',
          'BirthCertificateLink',
          'PhotoIDLink',
          'PaymentProofLink',
          'RegistrationID',
        ]],
      },
    });
    
    // Format header row
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: sheetId,
      requestBody: {
        requests: [
          {
            repeatCell: {
              range: {
                sheetId: 0,
                startRowIndex: 0,
                endRowIndex: 1,
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: { red: 0.2, green: 0.5, blue: 0.8 },
                  textFormat: {
                    bold: true,
                    foregroundColor: { red: 1, green: 1, blue: 1 },
                  },
                },
              },
              fields: 'userEnteredFormat(backgroundColor,textFormat)',
            },
          },
        ],
      },
    });
    
    // Move to main folder
    const mainFolderId = process.env.MAIN_DRIVE_FOLDER_ID;
    if (mainFolderId) {
      await drive.files.update({
        fileId: sheetId,
        addParents: mainFolderId,
        fields: 'id, parents',
      });
    }
    
    // Set sharing permissions (anyone with link can view)
    await drive.permissions.create({
      fileId: sheetId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });
    
    return {
      sheetId,
      sheetUrl: `https://docs.google.com/spreadsheets/d/${sheetId}/edit`,
    };
  } catch (error) {
    console.error('Error creating tournament sheet:', error);
    throw new Error(`Failed to create tournament sheet: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Add a registration row to a tournament sheet
 */
export async function addRegistrationRow(
  sheetId: string,
  data: {
    tournamentId: string;
    playerName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    section: string;
    rating?: string;
    parentName: string;
    specialRequests?: string;
    birthCertificateLink?: string;
    photoIDLink?: string;
    paymentProofLink?: string;
    registrationId: string;
  }
): Promise<void> {
  const auth = getAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });
  
  try {
    const row = [
      new Date().toISOString(),
      data.tournamentId,
      data.playerName,
      data.email,
      data.phone,
      data.dateOfBirth,
      data.section,
      data.rating || '',
      data.parentName,
      data.specialRequests || '',
      data.birthCertificateLink || '',
      data.photoIDLink || '',
      data.paymentProofLink || '',
      data.registrationId,
    ];
    
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Registrations!A:N',
      valueInputOption: 'RAW',
      requestBody: {
        values: [row],
      },
    });
  } catch (error) {
    console.error('Error adding registration row:', error);
    throw new Error(`Failed to add registration row: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// ============================================
// GOOGLE DRIVE API
// ============================================

/**
 * Create a folder for tournament documents
 */
export async function createDocumentsFolder(tournamentTitle: string): Promise<{
  folderId: string;
  folderUrl: string;
}> {
  const auth = getAuthClient();
  const drive = google.drive({ version: 'v3', auth });
  
  try {
    const mainFolderId = process.env.MAIN_DRIVE_FOLDER_ID;
    
    const response = await drive.files.create({
      requestBody: {
        name: `${tournamentTitle} - Documents`,
        mimeType: 'application/vnd.google-apps.folder',
        parents: mainFolderId ? [mainFolderId] : undefined,
      },
      fields: 'id',
    });
    
    const folderId = response.data.id!;
    
    // Set sharing permissions (anyone with link can view)
    await drive.permissions.create({
      fileId: folderId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });
    
    return {
      folderId,
      folderUrl: `https://drive.google.com/drive/folders/${folderId}`,
    };
  } catch (error) {
    console.error('Error creating documents folder:', error);
    throw new Error(`Failed to create documents folder: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Upload a file to Google Drive
 */
export async function uploadFileToDrive(
  folderId: string,
  fileName: string,
  fileBuffer: Buffer,
  mimeType: string
): Promise<string> {
  const auth = getAuthClient();
  const drive = google.drive({ version: 'v3', auth });
  
  try {
    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [folderId],
      },
      media: {
        mimeType,
        body: Buffer.from(fileBuffer),
      },
      fields: 'id',
    });
    
    const fileId = response.data.id!;
    
    // Set sharing permissions
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });
    
    return `https://drive.google.com/file/d/${fileId}/view`;
  } catch (error) {
    console.error('Error uploading file to Drive:', error);
    throw new Error(`Failed to upload file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Helper to decode base64 file data
 */
export function decodeBase64File(base64Data: string): Buffer {
  return Buffer.from(base64Data, 'base64');
}

/**
 * Helper to determine MIME type from filename
 */
export function getMimeType(filename: string): string {
  const extension = filename.split('.').pop()?.toLowerCase();
  
  const mimeTypes: Record<string, string> = {
    'pdf': 'application/pdf',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
  };
  
  return mimeTypes[extension || ''] || 'application/octet-stream';
}

/**
 * Generate standardized filename
 */
export function generateFileName(
  playerName: string,
  docType: string,
  originalFileName: string
): string {
  const sanitizedName = playerName.replace(/[^a-zA-Z0-9]/g, '_');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const extension = originalFileName.split('.').pop();
  
  return `${sanitizedName}_${docType}_${timestamp}.${extension}`;
}

