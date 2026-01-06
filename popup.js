// --- THEME LOGIC ---
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

// Initialize theme from storage safely
if (typeof chrome !== "undefined" && chrome.storage) {
    chrome.storage.local.get(['theme'], (result) => {
        if (result.theme === 'light') {
            applyTheme(true);
        }
    });
}

function applyTheme(isLight) {
    if (isLight) {
        document.body.classList.add('light-mode');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        document.body.classList.remove('light-mode');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }
}

themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    applyTheme(isLight);
    
    // Save preference
    if (typeof chrome !== "undefined" && chrome.storage) {
        chrome.storage.local.set({ theme: isLight ? 'light' : 'dark' });
    }
});

// --- GENERATION LOGIC ---
function getRandomValues(max) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max;
}

function updateStrengthMeter(password) {
    const strengthBar = document.getElementById('strength-bar');
    let strength = 0;

    if (password.length >= 8) strength += 10;
    if (password.length >= 12) strength += 10;
    if (password.length >= 16) strength += 15;
    if (password.length >= 20) strength += 15;
    
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[^A-Za-z0-9]/.test(password);
    
    const uniqueTypes = [hasUpper, hasLower, hasNumbers, hasSymbols].filter(Boolean).length;
    
    if (uniqueTypes >= 4) strength += 40;
    else if (uniqueTypes >= 3) strength += 30;
    else if (uniqueTypes >= 2) strength += 20;
    else if (uniqueTypes >= 1) strength += 10;
    
    strength = Math.max(0, Math.min(100, strength));
    
    let displayWidth = strength * 2; 
    if (displayWidth > 100) displayWidth = 100;
    strengthBar.style.width = displayWidth + "%";
    
    if (strength < 15) strengthBar.style.backgroundColor = "#ef4444";
    else if (strength < 30) strengthBar.style.backgroundColor = "#eab308";
    else if (strength < 50) strengthBar.style.backgroundColor = "#3b82f6";
    else strengthBar.style.backgroundColor = "#22c55e";
}

function generatePassword() {
    const lengthInput = document.getElementById('length-input');
    const length = lengthInput ? lengthInput.value : 12;
    
    const hasUpper = document.getElementById('include-uppercase').checked;
    const hasLower = document.getElementById('include-lowercase').checked;
    const hasNumber = document.getElementById('include-numbers').checked;
    const hasSymbol = document.getElementById('include-symbols').checked;

    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";
    const syms = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let pool = "";
    if (hasLower) pool += lower;
    if (hasUpper) pool += upper;
    if (hasNumber) pool += nums;
    if (hasSymbol) pool += syms;

    if (!pool) {
        pool = lower;
        document.getElementById('include-lowercase').checked = true;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        password += pool.charAt(getRandomValues(pool.length));
    }

    const display = document.getElementById('password-display');
    if (display) {
        display.value = password;
        updateStrengthMeter(password);
    }
}

// Event Listeners
document.getElementById('generate-btn').addEventListener('click', generatePassword);
document.getElementById('copy-btn').addEventListener('click', () => {
    const val = document.getElementById('password-display').value;
    if (val) {
        navigator.clipboard.writeText(val);
        // Using a simple notification instead of alert for better UX
        const btn = document.getElementById('copy-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = "✅";
        setTimeout(() => { btn.innerHTML = originalText; }, 1000);
    }
});

// Initial generation
generatePassword();