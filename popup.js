// Function to generate a random number using Web Crypto API
function getRandomValues(max) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max;
}

// Function to update the strength bar visual - improved logic
function updateStrengthMeter(password) {
    const strengthBar = document.getElementById('strength-bar');
    let strength = 0;

    // 1. Length scoring - more balanced
    if (password.length >= 8) strength += 10;
    if (password.length >= 12) strength += 10;  // Reduced from 15
    if (password.length >= 16) strength += 15;  // Added intermediate step
    if (password.length >= 20) strength += 15;  // Reduced from 25
    
    // 2. Character variety - more balanced weighting
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[^A-Za-z0-9]/.test(password);
    
    // Count unique character types (0-4)
    const uniqueTypes = [hasUpper, hasLower, hasNumbers, hasSymbols]
        .filter(Boolean).length;
    
    // Reward more for variety than individual checks
    if (uniqueTypes >= 4) strength += 40;  // All 4 types
    else if (uniqueTypes >= 3) strength += 30;  // 3 types
    else if (uniqueTypes >= 2) strength += 20;  // 2 types
    else if (uniqueTypes >= 1) strength += 10;  // 1 type
    
    // 3. Bonus for password complexity (density of special chars)
    const symbolCount = (password.match(/[^A-Za-z0-9]/g) || []).length;
    if (symbolCount >= 3) strength += 10;
    
    const numberCount = (password.match(/[0-9]/g) || []).length;
    if (numberCount >= 3) strength += 10;
    
    // 4. Penalize common weak patterns
    const weakPatterns = [
        /^[a-z]+$/,  // only lowercase
        /^[A-Z]+$/,  // only uppercase
        /^[0-9]+$/,  // only numbers
        /(.)\1{4,}/  // 5+ repeated characters
    ];
    
    if (weakPatterns.some(pattern => pattern.test(password))) {
        strength = Math.max(20, strength - 20);  // Cap penalty
    }
    
    // Ensure score is within 0-100
    strength = Math.max(0, Math.min(100, strength));
    
    // 5. Apply width to the progress bar with special handling for strong passwords
    let displayWidth = strength;
    if (strength >= 85) displayWidth = 100; // Very strong passwords = full bar
    strengthBar.style.width = displayWidth + "%";
    
    // 6. Updated thresholds for more realistic assessment
    if (strength < 40) {
        strengthBar.style.backgroundColor = "#ef4444"; // Weak - Red
    } else if (strength < 70) {  // Adjusted threshold
        strengthBar.style.backgroundColor = "#eab308"; // Medium - Yellow
    } else if (strength < 85) {  // Added "Strong" level
        strengthBar.style.backgroundColor = "#3b82f6"; // Strong - Blue
    } else {
        strengthBar.style.backgroundColor = "#22c55e"; // Very Strong - Green
    }
}

function generatePassword() {
    const length = document.getElementById('length-slider').value;
    const hasUpper = document.getElementById('include-uppercase').checked;
    const hasNumber = document.getElementById('include-numbers').checked;
    const hasSymbol = document.getElementById('include-symbols').checked;

    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let charPool = lowerCase;
    if (hasUpper) charPool += upperCase;
    if (hasNumber) charPool += numbers;
    if (hasSymbol) charPool += symbols;

    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = getRandomValues(charPool.length);
        password += charPool.charAt(randomIndex);
    }

    document.getElementById('password-display').value = password;
    
    // Update the strength meter with the new password
    updateStrengthMeter(password);
}

// Event Listeners
document.getElementById('generate-btn').addEventListener('click', generatePassword);

document.getElementById('length-slider').addEventListener('input', (e) => {
    document.getElementById('length-value').innerText = e.target.value;
});

document.getElementById('copy-btn').addEventListener('click', () => {
    const passwordField = document.getElementById('password-display');
    if (!passwordField.value) return;
    
    navigator.clipboard.writeText(passwordField.value);
    alert('Password copied to clipboard!');
});

// Generate initial password on load
generatePassword();