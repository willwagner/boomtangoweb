# .well-known Directory

This directory contains configuration files for Universal Links (iOS) and App Links (Android).

## Files

- `apple-app-site-association` - iOS Universal Links configuration (NO file extension)
- `assetlinks.json` - Android App Links configuration

## Important Notes

1. **No File Extension**: The `apple-app-site-association` file must NOT have a file extension
2. **Content-Type**: These files should be served as `application/json`
3. **GitHub Pages**: GitHub Pages automatically serves files from `.well-known/` directory
4. **HTTPS Required**: Universal Links and App Links require HTTPS (you have this with boomtango.com)

## Verification

After deployment, verify the files are accessible:
- iOS: `https://boomtango.com/.well-known/apple-app-site-association`
- Android: `https://boomtango.com/.well-known/assetlinks.json`

Both should return valid JSON (not HTML error pages).
