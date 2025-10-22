/**
 * Tournament Registration API Route
 * Handles registration submissions with document uploads
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  addRegistrationRow,
  uploadFileToDrive,
  decodeBase64File,
  getMimeType,
  generateFileName,
} from '@/lib/google-api';
import { getTournamentBySlug } from '@/lib/cms';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate required fields
    if (!body.tournamentId || !body.playerName || !body.email) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Get tournament data to find sheet ID and folder ID
    const tournament = getTournamentBySlug(body.tournamentId);
    
    if (!tournament) {
      return NextResponse.json(
        { success: false, message: 'Tournament not found' },
        { status: 404 }
      );
    }
    
    // Check if tournament has Google Sheet configured
    if (!tournament.googleSheetId) {
      return NextResponse.json(
        { success: false, message: 'Tournament sheet not configured' },
        { status: 500 }
      );
    }
    
    // Generate unique registration ID
    const registrationId = 'REG_' + Math.random().toString(36).substring(2, 10).toUpperCase();
    
    // Process document uploads
    const documentLinks: {
      birthCertificateLink?: string;
      photoIDLink?: string;
      paymentProofLink?: string;
    } = {};
    
    const folderId = tournament.documentsFolderId;
    
    if (!folderId) {
      console.warn('No documents folder configured for tournament');
    }
    
    // Upload birth certificate
    if (body.birthCertificate && folderId) {
      try {
        const fileName = generateFileName(
          body.playerName,
          'BirthCertificate',
          body.birthCertificateFileName || 'birth_certificate.pdf'
        );
        const fileBuffer = decodeBase64File(body.birthCertificate);
        const mimeType = getMimeType(body.birthCertificateFileName || 'file.pdf');
        
        documentLinks.birthCertificateLink = await uploadFileToDrive(
          folderId,
          fileName,
          fileBuffer,
          mimeType
        );
      } catch (error) {
        console.error('Error uploading birth certificate:', error);
      }
    }
    
    // Upload photo ID
    if (body.photoID && folderId) {
      try {
        const fileName = generateFileName(
          body.playerName,
          'PhotoID',
          body.photoIDFileName || 'photo_id.jpg'
        );
        const fileBuffer = decodeBase64File(body.photoID);
        const mimeType = getMimeType(body.photoIDFileName || 'file.jpg');
        
        documentLinks.photoIDLink = await uploadFileToDrive(
          folderId,
          fileName,
          fileBuffer,
          mimeType
        );
      } catch (error) {
        console.error('Error uploading photo ID:', error);
      }
    }
    
    // Upload payment proof
    if (body.paymentProof && folderId) {
      try {
        const fileName = generateFileName(
          body.playerName,
          'PaymentProof',
          body.paymentProofFileName || 'payment_proof.pdf'
        );
        const fileBuffer = decodeBase64File(body.paymentProof);
        const mimeType = getMimeType(body.paymentProofFileName || 'file.pdf');
        
        documentLinks.paymentProofLink = await uploadFileToDrive(
          folderId,
          fileName,
          fileBuffer,
          mimeType
        );
      } catch (error) {
        console.error('Error uploading payment proof:', error);
      }
    }
    
    // Add registration row to Google Sheet
    await addRegistrationRow(tournament.googleSheetId, {
      tournamentId: body.tournamentId,
      playerName: body.playerName,
      email: body.email,
      phone: body.phone,
      dateOfBirth: body.dateOfBirth,
      section: body.section,
      rating: body.rating,
      parentName: body.parentName,
      specialRequests: body.specialRequests,
      birthCertificateLink: documentLinks.birthCertificateLink,
      photoIDLink: documentLinks.photoIDLink,
      paymentProofLink: documentLinks.paymentProofLink,
      registrationId,
    });
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Registration submitted successfully!',
      registrationId,
    });
    
  } catch (error) {
    console.error('Registration API error:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Registration failed. Please try again.',
      },
      { status: 500 }
    );
  }
}

// OPTIONS handler for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

