/**
 * Tournament Resources Creation API
 * Automatically creates Google Sheet and Drive folder for a tournament
 */

import { NextRequest, NextResponse } from 'next/server';
import { createTournamentSheet, createDocumentsFolder } from '@/lib/google-api';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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
    
    // Update tournament markdown file with the IDs
    const tournamentFilePath = path.join(
      process.cwd(),
      'content',
      'tournaments',
      `${tournamentSlug}.md`
    );
    
    if (fs.existsSync(tournamentFilePath)) {
      const fileContents = fs.readFileSync(tournamentFilePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      // Add Google integration fields
      data.googleSheetId = sheetResult.sheetId;
      data.googleSheetUrl = sheetResult.sheetUrl;
      data.documentsFolderId = folderResult.folderId;
      data.documentsFolderUrl = folderResult.folderUrl;
      
      // Write back to file
      const updatedContent = matter.stringify(content, data);
      fs.writeFileSync(tournamentFilePath, updatedContent, 'utf8');
      
      console.log(`Updated tournament file: ${tournamentFilePath}`);
    }
    
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

