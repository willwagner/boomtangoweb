# GitHub Pages Setup Guide for BoomTango Website

## Step 1: Create a New GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the repository details:
   - **Repository name**: `boomtangoweb` (or your preferred name)
   - **Description**: "Static website for BoomTango"
   - **Visibility**: Choose **Public** (required for free GitHub Pages)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

## Step 2: Initialize Git in Your Local Project

Open your terminal and navigate to your project directory:

```bash
cd /Users/will/proj/boomtangoweb
```

Initialize git (if not already done):

```bash
git init
```

## Step 3: Add All Files to Git

```bash
git add .
```

This adds all files in your project to git staging.

## Step 4: Create Your First Commit

```bash
git commit -m "Initial commit: BoomTango website"
```

## Step 5: Connect to GitHub Repository

After creating the repository on GitHub, you'll see a page with setup instructions. Copy the repository URL (it will look like `https://github.com/yourusername/boomtangoweb.git`).

Then run:

```bash
git remote add origin https://github.com/yourusername/boomtangoweb.git
```

Replace `yourusername` with your actual GitHub username.

## Step 6: Push to GitHub

```bash
git branch -M main
git push -u origin main
```

You may be prompted to enter your GitHub credentials. If you have two-factor authentication enabled, you'll need to use a Personal Access Token instead of your password.

## Step 7: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **"Settings"** (top menu bar)
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select:
   - **Branch**: `main` (or `master` if that's your branch name)
   - **Folder**: `/ (root)`
5. Click **"Save"**

## Step 8: Access Your Website

GitHub will provide you with a URL for your site. It will be:
- `https://yourusername.github.io/boomtangoweb/`

It may take a few minutes for the site to be available after enabling Pages.

## Step 9: Set Up Custom Domain (Optional - for boomtango.com)

If you want to use your custom domain `boomtango.com`:

1. In the same **Pages** settings, scroll to **"Custom domain"**
2. Enter: `boomtango.com`
3. Click **"Save"**

### DNS Configuration

You'll need to update your DNS records with your domain registrar:

**Option A: Using A Records (Recommended)**
Add these A records pointing to GitHub Pages IPs:
- Type: `A`
- Name: `@` (or leave blank for root domain)
- Value: `185.199.108.153`
- TTL: `3600` (or default)

Repeat for these IPs:
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

**Option B: Using CNAME (for subdomain)**
If using `www.boomtango.com`:
- Type: `CNAME`
- Name: `www`
- Value: `yourusername.github.io`
- TTL: `3600`

### SSL Certificate

GitHub Pages will automatically provision an SSL certificate for your custom domain. This may take up to 24 hours.

## Step 10: Verify Your Site

1. Visit your GitHub Pages URL
2. Check that all pages load correctly
3. Test the invite link functionality
4. Verify the logo and colors display properly

## Troubleshooting

### Site Not Loading
- Wait 5-10 minutes after enabling Pages
- Check the "Actions" tab in your repository for build status
- Ensure your `index.html` is in the root directory

### Custom Domain Not Working
- Verify DNS records are correct (can take up to 48 hours to propagate)
- Check that the custom domain is set correctly in GitHub Pages settings
- Ensure your domain registrar supports the DNS record types you're using

### Updates Not Showing
- After pushing changes, wait a few minutes for GitHub to rebuild
- Hard refresh your browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Check the repository's "Actions" tab for any build errors

## Future Updates

To update your website:

```bash
git add .
git commit -m "Description of your changes"
git push origin main
```

Changes will be live within a few minutes.
