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

**🎯 NEW: Direct GitHub OAuth (Recommended)**

The CMS now uses **direct GitHub OAuth** instead of Netlify Identity for better platform independence.

1. **Create GitHub OAuth App**:
   - Go to GitHub → Settings → Developer settings → OAuth Apps
   - Click "New OAuth App"
   - Set Authorization callback URL: `https://your-domain.com/admin/`
   - Copy Client ID and Client Secret

2. **Update CMS Configuration**:
   - The `config.yml` has been updated to use `backend: name: github`
   - Replace `YOUR_USERNAME` with your actual GitHub username
   - No additional environment variables needed for Netlify hosting

3. **Repository Access**:
   - Add users as collaborators to your GitHub repository
   - Users need **Write** access to edit content
   - Access control managed through GitHub permissions

📋 **See `GITHUB_OAUTH_SETUP.md` for detailed step-by-step instructions**

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
✅ **Platform independent** - No Netlify vendor lock-in  
✅ **Automatic backups** - All content in GitHub  
✅ **Instant publishing** - Create tournament → Live immediately  
✅ **Version control** - Track all changes  
✅ **Zero server costs** - Pure static site  
✅ **Simple authentication** - Direct GitHub OAuth  
✅ **Better performance** - No external auth scripts  
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