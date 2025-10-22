/**
 * Tournament Automation Helper
 * Client-side utility to trigger tournament resource creation
 */

/**
 * Trigger automatic creation of sheet and folder for a tournament
 * Call this when a tournament is published in the CMS
 */
export async function createTournamentResources(
  tournamentSlug: string,
  tournamentTitle: string
): Promise<{
  success: boolean;
  message: string;
  data?: {
    sheetId: string;
    sheetUrl: string;
    folderId: string;
    folderUrl: string;
  };
}> {
  try {
    const response = await fetch('/api/create-tournament-resources', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tournamentSlug,
        tournamentTitle,
      }),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to create tournament resources');
    }
    
    return result;
  } catch (error) {
    console.error('Error creating tournament resources:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to create tournament resources',
    };
  }
}

/**
 * Check if tournament has Google resources configured
 */
export function hasTournamentResources(tournament: {
  googleSheetId?: string;
  documentsFolderId?: string;
}): boolean {
  return !!(tournament.googleSheetId && tournament.documentsFolderId);
}

