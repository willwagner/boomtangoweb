# Web Deep Link Setup for Friend Invites

## Overview
The web side needs to handle invite links at `https://boomtango.com/invite/{inviteCode}` and either:
1. Open the app if installed (via deep link)
2. Show an app download page if not installed

## URL Formats to Handle

1. **Path-based**: `https://boomtango.com/invite/{inviteCode}`
   - Example: `https://boomtango.com/invite/abc123xyz456`
   
2. **Query parameter** (optional): `https://boomtango.com/invite?inviteCode={inviteCode}`
   - Example: `https://boomtango.com/invite?inviteCode=abc123xyz456`

## Implementation Approaches

### Option 1: Custom URL Scheme (Simpler, works for all platforms)
When a user clicks a web invite link, detect if the app is installed and redirect accordingly.

**Pros:**
- Simple to implement
- Works on all platforms (iOS, Android)
- No server configuration needed

**Cons:**
- Shows "Open in Boomtango?" prompt on iOS
- Can't determine if app is installed before redirecting

**JavaScript Example:**
```javascript
// Extract invite code from URL
function getInviteCode() {
    const path = window.location.pathname;
    const match = path.match(/\/invite\/([a-zA-Z0-9]{12})/);
    if (match) return match[1];
    
    // Fallback to query parameter
    const params = new URLSearchParams(window.location.search);
    return params.get('inviteCode');
}

function redirectToApp() {
    const inviteCode = getInviteCode();
    if (!inviteCode) {
        // Invalid invite code, show error
        window.location.href = '/error?message=Invalid invite link';
        return;
    }
    
    const appLink = `boomtango://invite/${inviteCode}`;
    const webLink = window.location.href; // Current page
    
    // Try to open app (will show prompt if app installed, or fail silently if not)
    window.location.href = appLink;
    
    // Fallback: If app doesn't open within 2 seconds, show download page
    setTimeout(function() {
        // Check if we're still on the page (app didn't open)
        if (document.hasFocus()) {
            showDownloadPage(inviteCode);
        }
    }, 2000);
}

function showDownloadPage(inviteCode) {
    // Hide loading indicator, show download options
    document.getElementById('loading').style.display = 'none';
    document.getElementById('download').style.display = 'block';
    
    // Store invite code for when app is installed
    // Could store in localStorage or pass to App Store/Play Store
    localStorage.setItem('pendingInviteCode', inviteCode);
}

// On page load
window.addEventListener('load', function() {
    redirectToApp();
});
```

**HTML Structure:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Boomtango Invite</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
</head>
<body>
    <div id="loading">
        <h1>Opening Boomtango...</h1>
        <p>If the app doesn't open, <a href="#" onclick="showDownloadPage()">click here</a>.</p>
    </div>
    
    <div id="download" style="display:none;">
        <h1>Get Boomtango</h1>
        <p>To accept this friend invitation, install the Boomtango app:</p>
        
        <a href="https://apps.apple.com/app/boomtango/id{YOUR_APP_ID}" id="ios-download">
            <img src="app-store-badge.png" alt="Download on the App Store">
        </a>
        
        <!-- Android link if you have one -->
        <a href="https://play.google.com/store/apps/details?id=com.boomtango.Boomtango" id="android-download" style="display:none;">
            <img src="play-store-badge.png" alt="Get it on Google Play">
        </a>
        
        <p>After installing, open this link again to accept the invitation.</p>
    </div>
    
    <script>
        // JavaScript from above
    </script>
</body>
</html>
```

### Option 2: Universal Links (iOS) / App Links (Android) - More Seamless

**Pros:**
- Seamless experience (no prompt on iOS)
- Can verify app installation before redirecting
- Better user experience

**Cons:**
- Requires server configuration (apple-app-site-association file)
- More complex setup

#### For iOS Universal Links:

1. **Create `apple-app-site-association` file** (no file extension) at:
   ```
   https://boomtango.com/.well-known/apple-app-site-association
   ```

2. **File content**:
```json
{
    "applinks": {
        "apps": [],
        "details": [
            {
                "appID": "TEAM_ID.com.boomtango.Boomtango",
                "paths": [
                    "/invite/*"
                ]
            }
        ]
    }
}
```

3. **Add Associated Domains capability in Xcode:**
   - Go to Xcode → Signing & Capabilities
   - Add "Associated Domains"
   - Add: `applinks:boomtango.com`

4. **Update Info.plist to handle universal links:**
   (Already done in your iOS app - the URL scheme handling will work)

#### For Android App Links:

1. **Create `assetlinks.json` file** at:
   ```
   https://boomtango.com/.well-known/assetlinks.json
   ```

2. **File content**:
```json
[{
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
        "namespace": "android_app",
        "package_name": "com.boomtango.Boomtango",
        "sha256_cert_fingerprints": [
            "YOUR_SHA256_FINGERPRINT"
        ]
    }
}]
```

## Recommended Hybrid Approach

Use a combination of both:

1. **Start with Option 1** (Custom URL Scheme) - simpler, works immediately
2. **Add Option 2** (Universal Links) later for better UX

## Server Configuration

### Static Site (e.g., Netlify, Vercel, GitHub Pages)

Create a route handler for `/invite/*` that serves the HTML page above.

**Example for Netlify** (`netlify.toml`):
```toml
[[redirects]]
  from = "/invite/*"
  to = "/invite.html"
  status = 200
  force = false
```

**Example for Vercel** (`vercel.json`):
```json
{
  "rewrites": [
    {
      "source": "/invite/:inviteCode",
      "destination": "/invite.html"
    }
  ]
}
```

### Dynamic Site (Node.js, etc.)

```javascript
// Express.js example
app.get('/invite/:inviteCode', (req, res) => {
    const inviteCode = req.params.inviteCode;
    // Validate invite code format (12 Base62 characters)
    if (!/^[a-zA-Z0-9]{12}$/.test(inviteCode)) {
        return res.status(400).send('Invalid invite code');
    }
    res.render('invite', { inviteCode });
});
```

## Testing

1. **Test with app installed:**
   - Click invite link → should open app directly
   - App should show invitation alert

2. **Test without app installed:**
   - Click invite link → should show download page
   - After installing, clicking link again should open app

3. **Test invalid invite codes:**
   - Should show error page

## Security Considerations

1. **Validate invite code format** on web side (12 Base62 characters)
2. **Don't expose sensitive data** in URLs (invite codes are fine, but don't include user IDs, etc.)
3. **Rate limiting** - prevent abuse of invite link generation
4. **HTTPS required** - Universal Links require HTTPS

## Next Steps

1. Create the invite landing page HTML/JavaScript
2. Set up routing for `/invite/*` on your web server
3. Test deep linking with app installed/not installed
4. (Optional) Set up Universal Links/App Links for better UX
