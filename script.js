// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                navMenu.classList.remove('active');
            }
        });
    }
});

// Invite link generation
function generateInviteLink() {
    const inviteCode = document.getElementById('inviteCode').value.trim();
    const inviteResult = document.getElementById('inviteResult');

    if (!inviteCode) {
        alert('Please enter an invite code');
        return;
    }

    // Generate the invite link
    // This will use a format that works with iOS Universal Links
    // Format: https://boomtango.com/invite/{code}
    // The app should be configured to handle boomtango.com/invite/* URLs
    const baseUrl = window.location.origin;
    const inviteLink = `${baseUrl}/invite/${encodeURIComponent(inviteCode)}`;
    
    // Display the result
    inviteResult.innerHTML = `
        <div style="margin-bottom: 0.5rem;">
            <strong>Invite Link:</strong>
        </div>
        <div style="margin-bottom: 1rem;">
            <a href="${inviteLink}" class="invite-link" id="generatedLink" target="_blank" rel="noopener noreferrer">${inviteLink}</a>
        </div>
        <button onclick="copyInviteLink()" class="btn btn-secondary copy-btn">Copy Link</button>
        <div id="copyMessage" style="margin-top: 0.5rem; color: #10b981; display: none; font-weight: 500;">
            ✓ Link copied to clipboard!
        </div>
        <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e5e7eb; font-size: 0.9rem; color: #6b7280;">
            <strong>Note:</strong> Share this link with your friends. When they click it, they'll be taken to the BoomTango app (if installed) or prompted to download it.
        </div>
    `;
    inviteResult.classList.add('show');
}

// Copy invite link to clipboard
function copyInviteLink() {
    const inviteResult = document.getElementById('inviteResult');
    const linkElement = document.getElementById('generatedLink');
    const copyMessage = document.getElementById('copyMessage');

    if (!linkElement) return;

    const linkText = linkElement.textContent;

    // Use the Clipboard API if available
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(linkText).then(function() {
            showCopyMessage(copyMessage);
        }).catch(function(err) {
            console.error('Failed to copy:', err);
            fallbackCopyTextToClipboard(linkText, copyMessage);
        });
    } else {
        fallbackCopyTextToClipboard(linkText, copyMessage);
    }
}

// Fallback copy method for older browsers
function fallbackCopyTextToClipboard(text, copyMessage) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopyMessage(copyMessage);
        }
    } catch (err) {
        console.error('Fallback copy failed:', err);
    }

    document.body.removeChild(textArea);
}

function showCopyMessage(copyMessage) {
    if (copyMessage) {
        copyMessage.style.display = 'block';
        setTimeout(function() {
            copyMessage.style.display = 'none';
        }, 3000);
    }
}

// Handle invite links from URL parameters
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on an invite page
    const path = window.location.pathname;
    const inviteMatch = path.match(/^\/invite\/(.+)$/);
    
    if (inviteMatch) {
        const inviteCode = decodeURIComponent(inviteMatch[1]);
        handleInviteLink(inviteCode);
    }
});

// Handle the invite link - redirect to app or show download page
function handleInviteLink(inviteCode) {
    // Try to open the app with deep link
    const deepLink = `boomtango://invite/${encodeURIComponent(inviteCode)}`;
    
    // Attempt to open the app
    window.location.href = deepLink;
    
    // Fallback: If app doesn't open, redirect to App Store after a delay
    setTimeout(function() {
        // Check if we're still on the page (app didn't open)
        if (document.hasFocus()) {
            // Redirect to App Store or show a message
            const appStoreUrl = 'https://apps.apple.com/app/boomtango';
            window.location.href = appStoreUrl;
        }
    }, 2000);
}
