# Finding Where boomtango.com is Configured

When GitHub says a custom domain is "already taken", it means another repository in your GitHub account (or possibly another account) has that domain configured. Here's how to find and fix it:

## Step 1: Check Your Repositories

1. Go to your GitHub profile: `https://github.com/yourusername`
2. Click on **"Repositories"** tab
3. Look through your repositories (especially old ones) for any that might have Pages enabled

## Step 2: Check Each Repository's Pages Settings

For each repository that might be a website:

1. Open the repository
2. Go to **Settings** → **Pages**
3. Look for "Custom domain" field
4. If you see `boomtango.com`, that's the culprit!

## Step 3: Remove the Domain from Old Repository

Once you find the repository with `boomtango.com` configured:

1. In that repository's **Settings** → **Pages**
2. Clear the **Custom domain** field (delete `boomtango.com`)
3. Click **Save**
4. If prompted, verify the removal

## Step 4: Wait a Few Minutes

GitHub needs a few minutes to release the domain. Wait 5-10 minutes, then try adding it to your new repository.

## Step 5: Add Domain to New Repository

Now go back to your new `boomtangoweb` repository:

1. Go to **Settings** → **Pages**
2. In **Custom domain**, enter: `boomtango.com`
3. Click **Save**

## Alternative: Check via GitHub API (Advanced)

If you have many repositories, you can use the GitHub API to search:

1. Install GitHub CLI if you don't have it: `brew install gh`
2. Authenticate: `gh auth login`
3. List all your repositories: `gh repo list --limit 1000`
4. Check each one's Pages settings

## If You Can't Find It

If you still can't find where the domain is configured:

1. **Check other GitHub accounts** - Do you have multiple GitHub accounts?
2. **Check organization repositories** - Is it configured on an organization repo?
3. **Contact GitHub Support** - If all else fails, contact GitHub support with your repository name and they can help locate where the domain is configured

## Quick Search Method

You can also search your repositories by name:
- Go to github.com and search: `boomtango user:yourusername`
- This will show all repositories with "boomtango" in the name or description

## DNS Check

If you still can't find it, you can check your DNS records:

```bash
# Check what's pointing to your domain
dig boomtango.com
nslookup boomtango.com
```

This might give you clues about where it's hosted.
