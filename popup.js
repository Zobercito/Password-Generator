function getRandomValues(max) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max;
}

function updateStrengthMeter(password) {
    const strengthBar = document.getElementById('strength-bar');
    let strength = 0;

    // 1. Scoring based on Length (Max 50 points)
    if (password.length >= 8) strength += 10;
    if (password.length >= 12) strength += 10;
    if (password.length >= 16) strength += 15;
    if (password.length >= 20) strength += 15;
    
    // 2. Scoring based on Character Variety (Max 40 points)
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[^A-Za-z0-9]/.test(password);
    
    const uniqueTypes = [hasUpper, hasLower, hasNumbers, hasSymbols].filter(Boolean).length;
    
    if (uniqueTypes >= 4) strength += 40;
    else if (uniqueTypes >= 3) strength += 30;
    else if (uniqueTypes >= 2) strength += 20;
    else if (uniqueTypes >= 1) strength += 10;
    
    // 3. Pattern penalties
    const weakPatterns = [/(.)\1{4,}/];
    if (weakPatterns.some(pattern => pattern.test(password))) {
        strength = Math.max(0, strength - 20);
    }
    
    // Ensure the score stays between 0 and 100
    strength = Math.max(0, Math.min(100, strength));
    
    // VISUAL LOGIC: 
    // We want the bar to be 100% width if it reaches the Green threshold (50 points).
    // Otherwise, we scale it proportionally so it reaches 100% exactly at 50 points.
    let displayWidth = strength * 2; 
    if (displayWidth > 100) displayWidth = 100;

    strengthBar.style.width = displayWidth + "%";
    
    // COLOR THRESHOLDS (Based on the original 1-100 score)
    if (strength < 15) {
        strengthBar.style.backgroundColor = "#ef4444"; // Weak (Red)
    } else if (strength < 30) {
        strengthBar.style.backgroundColor = "#eab308"; // Medium (Yellow)
    } else if (strength < 50) {
        strengthBar.style.backgroundColor = "#3b82f6"; // Strong (Blue)
    } else {
        strengthBar.style.backgroundColor = "#22c55e"; // Very Strong (Green)
    }
}

function generatePassword() {
    const length = document.getElementById('length-input').value;
    const hasUpper = document.getElementById('include-uppercase').checked;
    const hasLower = document.getElementById('include-lowercase').checked;
    const hasNumber = document.getElementById('include-numbers').checked;
    const hasSymbol = document.getElementById('include-symbols').checked;

    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let charPool = "";
    if (hasLower) charPool += lowerCaseChars;
    if (hasUpper) charPool += upperCaseChars;
    if (hasNumber) charPool += numberChars;
    if (hasSymbol) charPool += symbolChars;

    // Safety check: if no options are selected, default to lowercase
    if (charPool === "") {
        charPool = lowerCaseChars;
        document.getElementById('include-lowercase').checked = true;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = getRandomValues(charPool.length);
        password += charPool.charAt(randomIndex);
    }

    document.getElementById('password-display').value = password;
    updateStrengthMeter(password);
}

document.getElementById('generate-btn').addEventListener('click', generatePassword);

document.getElementById('copy-btn').addEventListener('click', () => {
    const passwordField = document.getElementById('password-display');
    if (!passwordField.value) return;
    
    navigator.clipboard.writeText(passwordField.value);
    alert('Password copied to clipboard!');
});

generatePassword();