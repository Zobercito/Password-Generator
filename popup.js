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
    
    const uniqueTypes = [hasUpper, hasLower, hasNumbers, hasSymbols]
        .filter(Boolean).length;
    
    if (uniqueTypes >= 4) strength += 40;
    else if (uniqueTypes >= 3) strength += 30;
    else if (uniqueTypes >= 2) strength += 20;
    else if (uniqueTypes >= 1) strength += 10;
    
    const symbolCount = (password.match(/[^A-Za-z0-9]/g) || []).length;
    if (symbolCount >= 3) strength += 10;
    
    const numberCount = (password.match(/[0-9]/g) || []).length;
    if (numberCount >= 3) strength += 10;
    
    const weakPatterns = [
        /^[a-z]+$/,
        /^[A-Z]+$/,
        /^[0-9]+$/,
        /(.)\1{4,}/
    ];
    
    if (weakPatterns.some(pattern => pattern.test(password))) {
        strength = Math.max(20, strength - 20);
    }
    
    strength = Math.max(0, Math.min(100, strength));
    
    let displayWidth = strength;
    if (strength >= 85) displayWidth = 100;
    strengthBar.style.width = displayWidth + "%";
    
    if (strength < 40) {
        strengthBar.style.backgroundColor = "#ef4444";
    } else if (strength < 70) {
        strengthBar.style.backgroundColor = "#eab308";
    } else if (strength < 85) {
        strengthBar.style.backgroundColor = "#3b82f6";
    } else {
        strengthBar.style.backgroundColor = "#22c55e";
    }
}

function generatePassword() {
    const length = document.getElementById('length-input').value;
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
    updateStrengthMeter(password);
}

document.getElementById('generate-btn').addEventListener('click', generatePassword);

document.getElementById('length-input').addEventListener('input', () => {
    generatePassword();
});

document.getElementById('copy-btn').addEventListener('click', () => {
    const passwordField = document.getElementById('password-display');
    if (!passwordField.value) return;
    
    navigator.clipboard.writeText(passwordField.value);
    alert('Password copied to clipboard!');
});

generatePassword();