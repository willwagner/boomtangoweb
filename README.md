# BoomTango Website

Static website for BoomTango - an iOS app that makes it easy for friends to plan get-togethers.

## Features

- **Home Page**: Landing page with app information and download link
- **Help Page**: User support and frequently asked questions
- **Terms of Use**: Legal terms and conditions
- **Privacy Policy**: Privacy policy and data handling information
- **About Us**: Information about BoomTango
- **Invite Links**: Deep linking functionality to connect friends via invite codes

## Project Structure

```
boomtangoweb/
├── index.html          # Home page
├── help.html           # Help and support page
├── terms.html          # Terms of Use page
├── privacy.html        # Privacy Policy page
├── about.html          # About Us page
├── invite.html         # Invite link handler page
├── styles.css          # Main stylesheet
├── script.js           # JavaScript for interactivity and invite links
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## Invite Link System

The website includes an invite link system that allows users to share deep links to connect friends:

1. **Generate Invite Links**: Users can enter an invite code on the home page to generate a shareable link
2. **Deep Linking**: Invite links use the format `https://boomtango.com/invite/{code}`
3. **App Integration**: When clicked, invite links attempt to open the BoomTango iOS app using deep links
4. **Fallback**: If the app isn't installed, users are redirected to the App Store

### Invite Link Format

- **Web URL**: `https://boomtango.com/invite/{code}`
- **Deep Link**: `boomtango://invite/{code}` (for iOS app)

## Setting Up GitHub Pages

1. **Create a GitHub Repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/boomtangoweb.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Source", select the branch (usually `main` or `master`)
   - Select the folder (usually `/ (root)`)
   - Click Save

3. **Custom Domain (Optional)**:
   - In the same Pages settings, add your custom domain `boomtango.com`
   - Update your DNS records to point to GitHub Pages:
     - Add an A record pointing to GitHub's IP addresses:
       - 185.199.108.153
       - 185.199.109.153
       - 185.199.110.153
       - 185.199.111.153
     - Or add a CNAME record pointing to `yourusername.github.io`

4. **SSL Certificate**: GitHub Pages will automatically provision an SSL certificate for your custom domain

## Local Development

To view the website locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/boomtangoweb.git
   cd boomtangoweb
   ```

2. Open `index.html` in a web browser, or use a local server:
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   ```

3. Navigate to `http://localhost:8000` in your browser

## Customization

### Updating Content

- Edit the HTML files directly to update page content
- Modify `styles.css` to change the design and colors
- Update `script.js` to modify interactive features

### App Store Link

Update the App Store link in `index.html` when your app is published:
```html
<a href="https://apps.apple.com/app/boomtango" ...>
```

### Deep Link Scheme

The deep link scheme is set to `boomtango://`. Make sure your iOS app is configured to handle this URL scheme in your `Info.plist`:

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>boomtango</string>
        </array>
    </dict>
</array>
```

For Universal Links (recommended), configure your app to handle `https://boomtango.com/invite/*` URLs.

## Browser Support

The website is designed to work on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Copyright © 2026 BoomTango. All rights reserved.
