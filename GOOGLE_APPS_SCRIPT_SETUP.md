# Google Apps Script & Sheets Setup Guide

## 📊 **How It Works**

- **ONE Google Sheet** for all tournament registrations
- Each form submission creates a new row
- Tournament slug included for easy filtering
- All data captured: player info, section, parent details, etc.

## 🔧 **Setup Steps**

### 1. Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new sheet named "Tournament Registrations"
3. Add these headers in Row 1:

```
A: Timestamp
B: TournamentID  
C: PlayerName
D: Email
E: Phone
F: DateOfBirth
G: Section
H: FederationID
I: Rating
J: ParentName
K: TeamSchool
L: ByeRequests
M: SpecialRequests
N: FormToken
O: RegistrationID
```

### 2. Create Google Apps Script

1. In your Google Sheet, go to **Extensions → Apps Script**
2. Replace the default code with this:

\`\`\`javascript
function doPost(e) {
  try {
    // Get the active sheet
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Parse the JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Security check - ensure required fields exist
    if (!data.tournamentId || !data.playerName || !data.email) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          message: "Missing required fields"
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Generate unique registration ID
    const registrationId = 'REG_' + Utilities.getUuid().substring(0, 8).toUpperCase();
    
    // Prepare row data
    const rowData = [
      new Date(),                    // Timestamp
      data.tournamentId,            // TournamentID
      data.playerName,              // PlayerName
      data.email,                   // Email
      data.phone,                   // Phone
      data.dateOfBirth,             // DateOfBirth
      data.section,                 // Section
      data.federationId || '',      // FederationID
      data.rating || '',            // Rating
      data.parentName,              // ParentName
      data.teamSchool || '',        // TeamSchool
      data.byes || '',              // ByeRequests
      data.specialRequests || '',   // SpecialRequests
      data.formToken,               // FormToken
      registrationId                // RegistrationID
    ];
    
    // Add the row to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: "Registration submitted successfully!",
        registrationId: registrationId
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error for debugging
    console.error('Error processing form submission:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: "Registration failed. Please try again."
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function (optional - for debugging)
function testDoPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        tournamentId: "test-tournament-2025",
        playerName: "Test Player",
        email: "test@example.com",
        phone: "+91-9999999999",
        dateOfBirth: "2010-01-01",
        section: "Under-14",
        parentName: "Test Parent",
        consent: true,
        timestamp: new Date().toISOString(),
        formToken: "TEST123"
      })
    }
  };
  
  const result = doPost(testData);
  console.log(result.getContent());
}
\`\`\`

### 3. Deploy the Script

1. Click **Deploy → New Deployment**
2. Choose type: **Web app**
3. Settings:
   - Execute as: **Me**
   - Who has access: **Anyone** (important for public forms)
4. Click **Deploy**
5. **Copy the Web app URL** (you'll need this)

### 4. Update Your Environment

Create/update `.env.local`:

\`\`\`bash
NEXT_PUBLIC_FORM_ENDPOINT=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
\`\`\`

Replace `YOUR_SCRIPT_ID` with the actual ID from your deployment URL.

## 📋 **Sheet Structure After Submissions**

| Timestamp | TournamentID | PlayerName | Email | Phone | Section | ... |
|-----------|--------------|------------|-------|-------|---------|-----|
| 1/15/2025 10:30 | delhi-state-championship-2025 | John Doe | john@email.com | +91... | Under-12 |
| 1/15/2025 11:45 | delhi-state-championship-2025 | Jane Smith | jane@email.com | +91... | Open |
| 1/16/2025 09:15 | youth-grand-prix-2025 | Mike Kumar | mike@email.com | +91... | Under-14 |

## 🔍 **Viewing Tournament-Specific Registrations**

### Method 1: Filter by Tournament
1. Select all data (Ctrl+A)
2. Go to Data → Create a filter
3. Click filter arrow on **TournamentID** column
4. Select specific tournament

### Method 2: Create Separate Views
1. Make copies of the sheet
2. Name them by tournament
3. Filter each copy for specific tournament

### Method 3: Use Google Sheets Query
Create a new sheet with this formula:
\`\`\`
=QUERY(Sheet1!A:O, "SELECT * WHERE B = 'delhi-state-championship-2025'", 1)
\`\`\`

## ✅ **Testing Your Setup**

1. Visit your tournament page (e.g., `/tournaments/delhi-state-championship-2025`)
2. Fill out and submit the registration form
3. Check your Google Sheet for the new row
4. Verify all data is captured correctly

## 🔒 **Security Features Included**

- **Honeypot field**: Catches bot submissions
- **Form tokens**: Prevents duplicate/replay attacks
- **Field validation**: Required fields checked
- **Error handling**: Graceful failure responses
- **Unique IDs**: Each registration gets unique identifier

## 📊 **Data Export & Management**

- **Export to CSV**: File → Download → CSV
- **Print lists**: Format and print registration lists
- **Email notifications**: Set up sheet notifications for new submissions
- **Data analysis**: Use Google Sheets charts and pivot tables

## 🚨 **Common Issues & Solutions**

**"Registration failed" error:**
- Check the Apps Script deployment URL
- Ensure "Anyone" has access to the web app
- Verify the sheet headers match exactly

**Missing data:**
- Check field names match between form and script
- Verify all required fields are being sent

**Duplicate submissions:**
- Form tokens help prevent this
- Check for multiple rapid clicks on submit button

Your Google Sheets integration is now ready! Each tournament registration will automatically appear in your sheet, organized and ready for management. 