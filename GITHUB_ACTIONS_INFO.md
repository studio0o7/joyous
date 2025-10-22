# GitHub Actions - Auto Tournament Setup

## What It Does

Automatically creates Google Sheet + Drive folder when you publish a tournament in the CMS.

## How It Works

```
1. You publish tournament in CMS (/admin)
2. Decap CMS commits to GitHub
3. GitHub detects change in content/tournaments/
4. Action checks: Is it published? Does it need resources?
5. Action calls your API automatically
6. Sheet + folder created
7. Tournament file updated with IDs
```

Takes 30-60 seconds after publishing.

## Setup (One-Time)

The workflow file is already created at:
`.github/workflows/create-tournament-resources.yml`

**It will work automatically once you push this to GitHub.**

## Checking If It Worked

1. Go to your GitHub repo: `https://github.com/studio0o7/joyous`
2. Click "Actions" tab
3. See the workflow runs
4. Check logs if something fails

## Testing

1. Create a test tournament in CMS
2. Publish it
3. Wait 1-2 minutes
4. Go to GitHub → Actions → Check the run
5. Open tournament in CMS → Should have Sheet URL and Folder URL

## If It Fails

Check GitHub Actions logs:
- Go to repo → Actions tab
- Click the failed run
- See the error message
- Usually means environment variables not set on Netlify

## Manual Trigger (if needed)

If GitHub Actions doesn't run for some reason, you can still manually create resources:

```bash
curl -X POST https://joyouschess.netlify.app/api/create-tournament-resources \
  -H "Content-Type: application/json" \
  -d '{"tournamentSlug": "your-slug", "tournamentTitle": "Your Title"}'
```

## Cost

Free. GitHub Actions is free for public repos (unlimited) and private repos (2000 min/month free).

This uses ~30 seconds per tournament = 4000+ tournaments free per month.

Done.

