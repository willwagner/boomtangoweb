# Universal Links Setup Guide

This guide will help you complete the Universal Links setup for BoomTango.

## ✅ What's Already Done

1. ✅ Created `.well-known/apple-app-site-association` file for iOS
2. ✅ Created `.well-known/assetlinks.json` file for Android
3. ✅ Updated invite page to handle Universal Links
4. ✅ GitHub Pages routing configured via 404.html

## 📝 What You Need to Complete

### For iOS Universal Links:

1. **Get Your Team ID:**
   - Open Xcode
   - Go to your project settings
   - Click on your target → Signing & Capabilities
   - Find your Team ID (looks like: `ABC123DEF4`)
   - Or check your Apple Developer account: https://developer.apple.com/account

2. **Get Your Bundle Identifier:**
   - In Xcode → Target → General tab
   - Find "Bundle Identifier" (e.g., `com.boomtango.Boomtango`)

3. **Update the apple-app-site-association file:**
   - Open `.well-known/apple-app-site-association`
   - Replace `TEAM_ID` with your actual Team ID
   - Replace `com.boomtango.Boomtango` with your actual bundle ID if different
   - Format: `{TEAM_ID}.{BUNDLE_ID}`
   - Example: `ABC123DEF4.com.boomtango.Boomtango`

4. **Configure Xcode:**
   - Open your iOS app in Xcode
   - Go to Target → Signing & Capabilities
   - Click "+ Capability"
   - Add "Associated Domains"
   - Click "+" to add a domain
   - Enter: `applinks:boomtango.com`
   - Make sure it matches exactly (no https://, no trailing slash)

5. **Update Info.plist (if needed):**
   - Your app should handle `https://boomtango.com/invite/*` URLs
   - Add URL handling in your app delegate or Scene delegate

### For Android App Links:

1. **Get Your SHA-256 Fingerprint:**
   ```bash
   # For debug keystore:
   keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
   
   # For release keystore:
   keytool -list -v -keystore your-release-key.keystore -alias your-key-alias
   ```
   
   Copy the SHA-256 fingerprint (looks like: `AA:BB:CC:DD:EE:FF:...`)

2. **Update the assetlinks.json file:**
   - Open `.well-known/assetlinks.json`
   - Replace `YOUR_SHA256_FINGERPRINT_HERE` with your actual fingerprint
   - Remove colons from the fingerprint (e.g., `AABBCCDDEEFF...`)
   - Keep all lowercase

3. **Configure Android App:**
   - Add intent filter to your AndroidManifest.xml:
   ```xml
   <activity android:name=".MainActivity">
       <intent-filter android:autoVerify="true">
           <action android:name="android.intent.action.VIEW" />
           <category android:name="android.intent.category.DEFAULT" />
           <category android:name="android.intent.category.BROWSABLE" />
           <data
               android:scheme="https"
               android:host="boomtango.com"
               android:pathPrefix="/invite" />
       </intent-filter>
   </activity>
   ```

## 🚀 Deploy to GitHub Pages

Once you've updated the files:

```bash
git add .well-known/
git commit -m "Add Universal Links configuration"
git push origin main
```

## ✅ Verify the Setup

### iOS Universal Links:

1. **Test the apple-app-site-association file:**
   - Visit: `https://boomtango.com/.well-known/apple-app-site-association`
   - Should show valid JSON (no HTML error page)
   - Content-Type should be `application/json`

2. **Test on device:**
   - Send yourself a test invite link: `https://boomtango.com/invite/TESTCODE123`
   - Open it in Safari on your iPhone
   - If Universal Links are working, it should open directly in the app
   - If not working, it will open in Safari first

3. **Debug iOS Universal Links:**
   ```bash
   # On macOS, use this to check if Apple can fetch your file:
   curl https://boomtango.com/.well-known/apple-app-site-association
   
   # Use Apple's validator:
   https://search.developer.apple.com/appsearch-validation-tool/
   ```

### Android App Links:

1. **Test the assetlinks.json file:**
   - Visit: `https://boomtango.com/.well-known/assetlinks.json`
   - Should show valid JSON

2. **Verify App Links:**
   ```bash
   # Use Google's verification tool:
   # Run this command (replace with your package name):
   adb shell pm get-app-links com.boomtango.Boomtango
   ```

3. **Test on device:**
   - Send yourself a test invite link
   - Open it in Chrome on Android
   - Should open directly in the app if configured correctly

## 🔧 Troubleshooting

### iOS Issues:

1. **File not found (404):**
   - Make sure `.well-known/apple-app-site-association` is in the root of your repo
   - GitHub Pages should serve it automatically
   - Check file name (NO file extension)

2. **Wrong content type:**
   - GitHub Pages should serve it correctly
   - If needed, you can add a `_headers` file or configure via GitHub Pages settings

3. **Universal Links not working:**
   - Make sure Associated Domains is configured in Xcode
   - Check that your app is handling the URLs correctly
   - Long-press a link in Notes app - if "Open in BoomTango" appears, it's working
   - Try resetting Universal Links: Settings → BoomTango → Reset Universal Links (if available)

### Android Issues:

1. **Verification failed:**
   - Make sure SHA-256 fingerprint is correct (no colons, lowercase)
   - Verify package name matches exactly
   - Check that your app has `android:autoVerify="true"`

2. **Links not opening app:**
   - Clear app data and reinstall
   - Use ADB to check verification status
   - Check AndroidManifest.xml intent filter

## 📱 Testing Tips

1. **Always test on real devices**, not simulators/emulators
2. **Test with app installed AND not installed** (should show download page)
3. **Clear browser cache** before testing
4. **Use long-press on links** to see if Universal Links are registered (iOS)
5. **Check browser console** for any errors

## 🔗 Next Steps

1. Update the placeholder values in the `.well-known` files
2. Deploy to GitHub Pages
3. Configure your iOS app with Associated Domains
4. Configure your Android app with App Links
5. Test both platforms
6. Update invite link generation if needed

## 📞 Need Help?

- iOS Universal Links: https://developer.apple.com/documentation/xcode/allowing-apps-and-websites-to-link-to-your-content
- Android App Links: https://developer.android.com/training/app-links
- GitHub Pages serving static files: https://docs.github.com/en/pages/getting-started-with-github-pages
