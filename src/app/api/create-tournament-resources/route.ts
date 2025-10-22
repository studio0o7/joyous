/**
 * Tournament Resources Creation API
 * Automatically creates Google Sheet and Drive folder for a tournament
 * Note: File updates are handled by GitHub Actions, not here
 */

import { NextRequest, NextResponse } from 'next/server';
import { createTournamentSheet, createDocumentsFolder } from '@/lib/google-api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { tournamentSlug, tournamentTitle } = body;
    
    if (!tournamentSlug || !tournamentTitle) {
      return NextResponse.json(
        { success: false, message: 'Missing tournament slug or title' },
        { status: 400 }
      );
    }
    
    console.log(`Creating resources for tournament: ${tournamentTitle}`);
    
    // Create Google Sheet
    const sheetResult = await createTournamentSheet(tournamentTitle);
    console.log(`Sheet created: ${sheetResult.sheetId}`);
    
    // Create Documents Folder
    const folderResult = await createDocumentsFolder(tournamentTitle);
    console.log(`Folder created: ${folderResult.folderId}`);
    
    // Return the IDs - GitHub Actions will update the file
    return NextResponse.json({
      success: true,
      message: 'Tournament resources created successfully',
      data: {
        sheetId: sheetResult.sheetId,
        sheetUrl: sheetResult.sheetUrl,
        folderId: folderResult.folderId,
        folderUrl: folderResult.folderUrl,
      },
    });
    
  } catch (error) {
    console.error('Error creating tournament resources:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to create tournament resources',
      },
      { status: 500 }
    );
  }
}

