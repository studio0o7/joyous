# Setup Guide

## 1. Install Package

```bash
npm install googleapis
```

## 2. Google Cloud Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project
3. Enable **Google Sheets API** and **Google Drive API**
4. Create Service Account → Download JSON key
5. (Optional) Create main Drive folder, share it with service account email

## 3. Environment Variables

Add to Netlify/Vercel:

```
GOOGLE_SERVICE_ACCOUNT_CREDENTIALS={paste entire JSON from step 2}
MAIN_DRIVE_FOLDER_ID={optional folder ID from step 2}
```

## 4. Deploy

```bash
git add .
git commit -m "Add automated registration"
git push
```

## 5. How It Works

**Fully Automatic:**
- Publish tournament in CMS → GitHub Actions triggers automatically
- 30-60 seconds later → Sheet + folder created
- User registers → Data saved to sheet, files uploaded to Drive

**No manual work needed!**

See `GITHUB_ACTIONS_INFO.md` for details on the automation.

Done.

