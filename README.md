# Password Generator (Browser Extension)

An extension for Chromium-based browsers that generates cryptographically secure passwords using the **Web Crypto API**.

## Features
- **Secure Randomness:** Uses `window.crypto` instead of `Math.random()`.
- **Customizable:** Adjust length and character types.
- **One-click Copy:** Quickly copy generated passwords to your clipboard.
- **Manifest V3:** Built with the latest Chrome extension standards.

## How to Install
1. Clone this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **"Developer mode"** (top right).
4. Click **"Load unpacked"** and select the project folder.