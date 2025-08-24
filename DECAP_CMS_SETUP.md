# Decap CMS Tournament Management Setup Guide

## 🎯 What We Built

A complete tournament registration system with:

- **Decap CMS** at `/admin` for client content management
- **Dynamic tournament pages** at `/tournaments/[slug]` 
- **Active tournament listing** at `/TournmentRegistration`
- **GitHub-based content storage** with automatic backups
- **Registration forms** ready for Google Apps Script integration

## 📁 Files Created

### CMS Configuration
- `public/admin/index.html` - CMS dashboard interface
- `public/admin/config.yml` - Tournament schema & settings
- `public/admin/preview.css` - Preview styling

### Content Structure  
- `content/tournaments/` - Tournament markdown files
- `content/settings/` - Global settings
- `src/lib/cms.ts` - Data loading utilities

### Updated Pages
- `src/app/TournmentRegistration/page.tsx` - Now uses CMS data
- `src/app/tournaments/[slug]/page.tsx` - Dynamic tournament pages

## ⚙️ Final Setup Steps

### 1. Update Configuration

Edit `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: YOUR_USERNAME/joyouschess  # Replace with your GitHub repo
  branch: main

site_url: https://your-domain.com  # Replace with your domain
display_url: https://your-domain.com
```

### 2. GitHub OAuth Setup

**Option A: Netlify (Recommended)**
1. Deploy to Netlify
2. Go to Site Settings → Access Control → OAuth  
3. Install GitHub provider
4. CMS will work automatically at `/admin`

**Option B: Manual GitHub App**
1. Create GitHub OAuth App in your repo settings
2. Set Authorization callback URL: `https://your-domain.com/admin`
3. Update config.yml with your OAuth details

### 3. Content Management Workflow

**Client Workflow:**
1. Go to `yoursite.com/admin`
2. Login with GitHub
3. Create new tournament → Fill details → Publish
4. Tournament immediately live at `/tournaments/slug`

**Content Structure:**
```
content/
├── tournaments/
│   ├── delhi-championship-2025.md
│   └── youth-grand-prix-2025.md
└── settings/
    └── tournaments.yml
```

### 4. Form Integration

Update Google Apps Script endpoint in:
`content/settings/tournaments.yml`

```yaml
registrationFormEndpoint: "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
```

### 5. Deployment

**Vercel/Netlify:**
- Push to GitHub → Auto-deploy
- CMS changes trigger rebuilds
- Static generation for all tournament pages

**Local Development:**
```bash
npm run dev
# CMS available at localhost:3000/admin
```

## 🎨 Design Features

- **Consistent branding** - Your blue/pink color scheme throughout
- **Responsive design** - Works on all devices  
- **Clean UX** - No unnecessary hero sections, focused registration flow
- **Professional forms** - All fields from your specification
- **SEO ready** - Meta descriptions, proper page titles

## 🔧 Key Benefits

✅ **Client-friendly** - Visual editor, no coding required  
✅ **Automatic backups** - All content in GitHub  
✅ **Instant publishing** - Create tournament → Live immediately  
✅ **Version control** - Track all changes  
✅ **Zero server costs** - Pure static site  
✅ **Google Sheets integration** - Ready for form submissions  

## 📋 CMS Field Types Available

- Text inputs (title, venue, etc.)
- Date pickers (start/end dates)
- Boolean toggles (registration open/closed)
- Rich text editor (descriptions)
- Image uploads (banner images)
- List widgets (sections with name/fee/description)
- Select dropdowns (status: draft/published)

## 🚀 Ready to Use!

Your tournament registration system is complete and ready for:

1. **Content creation** via `/admin`
2. **Tournament listings** at `/TournmentRegistration`  
3. **Individual registrations** at `/tournaments/[slug]`
4. **Form submissions** to Google Apps Script
5. **Client management** without developer involvement

The system handles fallbacks gracefully - if CMS content isn't available, it uses the sample tournaments we created. 