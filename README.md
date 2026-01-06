# 🔐 Password Generator – Secure Browser Extension
A secure browser extension that generates strong passwords using Web Crypto API.

## ✨ Features
- **🔒 Cryptographically Secure** – Uses `window.crypto.getRandomValues()`
- **🎨 Dark/Light Theme** – Auto-saves your preference
- **📋 One-Click Copy** – Instantly copy passwords to clipboard
- **⚡ Real-time Generation** – Generate with custom length and character types
- **📊 Strength Meter** – Visual feedback on password security

## 🚀 Installation
1. Clone or download this repository
2. Open Chrome/Edge and go to:
 ```bash
   chrome://extensions/
```
3. Enable **"Developer mode"** (toggle in top-right)
4. Click **"Load unpacked"** and select the project folder

## 💡 Usage
1. Click the extension icon in your browser toolbar
2. Adjust password settings:
    - **Length**: 1–99 characters
    - **Character types**: Uppercase, Lowercase, Numbers, Symbols
3. Click **"Generate"** for a new password
4. Click the 📋 icon to copy to clipboard

## 📁 Files
```
password-generator/
├── manifest.json         # Extension configuration
├── popup.html            # Main interface
├── popup.js              # Generation & UI logic
├── style.css             # Styling with dark/light themes
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md             # This file
```
## 📄 License
[MIT License](LICENSE)