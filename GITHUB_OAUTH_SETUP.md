# GitHub OAuth Setup Guide for Decap CMS

## 🎯 Overview

This guide walks you through setting up **direct GitHub OAuth authentication** for your Decap CMS admin panel. This replaces Netlify Identity and makes your CMS completely independent of any specific hosting platform.

## 📋 Benefits of GitHub OAuth

✅ **Platform Independent** - Works on Netlify, Vercel, or any hosting platform  
✅ **No Vendor Lock-in** - Not tied to Netlify services  
✅ **Simpler Setup** - Direct GitHub integration  
✅ **Better Performance** - No external auth scripts to load  
✅ **Version Control Integration** - Natural fit with Git-based CMS  

## 🔧 Step-by-Step Setup

### Step 1: Create GitHub OAuth Application

1. **Go to GitHub Settings**
   - Navigate to [GitHub.com](https://github.com)
   - Click your profile picture → **Settings**
   - In the left sidebar, click **Developer settings**
   - Click **OAuth Apps**

2. **Create New OAuth App**
   - Click **"New OAuth App"** button
   - Fill in the application details:

   ```
   Application name: Joyous Chess CMS
   Homepage URL: https://your-domain.com
   Application description: Content management for tournament website
   Authorization callback URL: https://your-domain.com/admin/
   ```

   **Important**: The callback URL MUST end with `/admin/` (including the trailing slash)

3. **Save Your Credentials**
   - After creating the app, you'll see:
     - **Client ID** (e.g., `abc123def456`)
     - **Client Secret** (click "Generate a new client secret")
   - **Copy both values** - you'll need them in the next step

### Step 2: Update CMS Configuration

1. **Open your CMS config file**: `public/admin/config.yml`

2. **Update the backend section**:
   ```yaml
   backend:
     name: github
     repo: YOUR_GITHUB_USERNAME/joyouschess  # Replace with your actual GitHub username
     branch: main
     base_url: https://api.netlify.com  # Only if using Netlify hosting
     auth_endpoint: auth                # Only if using Netlify hosting
   ```

3. **If NOT using Netlify hosting**, use this simpler config:
   ```yaml
   backend:
     name: github
     repo: YOUR_GITHUB_USERNAME/joyouschess
     branch: main
   ```

### Step 3: Environment Configuration (for Non-Netlify hosting)

If you're **NOT using Netlify**, you'll need to handle the OAuth flow yourself:

1. **Create a simple OAuth proxy** (or use a service like Netlify's auth endpoint)
2. **Alternative**: Use GitHub's OAuth directly with client-side flow

**For Netlify users**: No additional setup needed - Netlify handles the OAuth flow automatically.

### Step 4: Update Repository Settings

1. **Go to your GitHub repository**
   - Navigate to your `joyouschess` repository
   - Click **Settings** tab
   - Click **Manage access** in the left sidebar

2. **Set up collaborators**
   - Add users who should have CMS access
   - They need **Write** or **Maintain** permissions
   - Users with **Read** access cannot edit content

### Step 5: Test the Setup

1. **Visit your admin panel**: `https://your-domain.com/admin`
2. **Click "Login with GitHub"**
3. **Authorize the application** when prompted
4. **Verify you can access the CMS interface**

## 🔐 Access Control

### Who Can Access the CMS?

**Repository Collaborators**:
- Users with **Write**, **Maintain**, or **Admin** access to your GitHub repo
- Can create, edit, and publish content

**Repository Viewers**:
- Users with **Read** access cannot edit content
- Will see "unauthorized" message in CMS

### Managing User Access

1. **Add new editors**:
   - Go to GitHub repo → Settings → Manage access
   - Click "Invite a collaborator"
   - Enter their GitHub username
   - Select appropriate permission level

2. **Remove access**:
   - Go to the same settings page
   - Click the "X" next to user's name

## 🌐 Domain Configuration

### For Production

Update these URLs in your OAuth app settings:

```
Homepage URL: https://joyouschess.netlify.app
Authorization callback URL: https://joyouschess.netlify.app/admin/
```

### For Development

If testing locally, add a development OAuth app:

```
Homepage URL: http://localhost:3000
Authorization callback URL: http://localhost:3000/admin/
```

## 🚨 Troubleshooting

### Common Issues

**"Error: Not Found" when logging in**
- Check that the repository name in `config.yml` matches exactly
- Verify the GitHub username is correct
- Ensure the branch name is correct

**"Unauthorized" error**
- User needs Write access to the repository
- Check repository permissions
- Verify OAuth app callback URL is correct

**CMS loads but shows "Config Error"**
- Check `config.yml` syntax
- Verify repository exists and is accessible
- Check browser console for specific errors

**OAuth callback fails**
- Verify callback URL in GitHub OAuth app settings
- Ensure URL ends with `/admin/` (with trailing slash)
- Check for typos in domain name

### Debug Mode

Add this to your `config.yml` for more detailed error messages:

```yaml
# Add at the bottom of config.yml
publish_mode: editorial_workflow
local_backend: false

# For debugging (remove in production)
backend:
  name: github
  repo: YOUR_USERNAME/joyouschess
  branch: main
  # Add this for debugging
  debug: true
```

## ✅ Verification Checklist

Before going live, verify:

- [ ] GitHub OAuth app is created with correct callback URL
- [ ] CMS config points to correct repository
- [ ] Repository collaborators have appropriate access
- [ ] Admin panel loads at `/admin`
- [ ] Login with GitHub works
- [ ] Can create and edit tournament content
- [ ] Content changes appear in GitHub repository
- [ ] Website updates with new content

## 🎯 Next Steps

After setup is complete:

1. **Train content editors** on using the CMS
2. **Create user documentation** for tournament management
3. **Set up content workflow** (draft → review → publish)
4. **Configure repository notifications** for content changes

## 🆘 Need Help?

**GitHub OAuth Documentation**: [GitHub OAuth Apps](https://docs.github.com/en/developers/apps/building-oauth-apps)  
**Decap CMS GitHub Backend**: [Backend Configuration](https://decapcms.org/docs/github-backend/)

Your CMS is now completely independent of Netlify Identity and ready for production use! 🚀 