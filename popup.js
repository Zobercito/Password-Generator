// Function to generate a random number using Web Crypto API
function getRandomValues(max) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max;
}

// Function to update the strength bar visual
function updateStrengthMeter(password) {
    const strengthBar = document.getElementById('strength-bar');
    let strength = 0;

    // 1. Scoring based on Length (Max 50 points)
    // High length is rewarded heavily to ensure 20+ chars reach "Strong" status easily
    if (password.length >= 8) strength += 10;
    if (password.length >= 12) strength += 15;
    if (password.length >= 20) strength += 25; 

    // 2. Scoring based on Character Variety (Max 50 points)
    if (/[A-Z]/.test(password)) strength += 15;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;

    // Ensure the score does not exceed 100%
    if (strength > 100) strength = 100;

    // Apply width to the progress bar
    strengthBar.style.width = strength + "%";

    // 3. Update colors based on the final score
    if (strength < 40) {
        strengthBar.style.backgroundColor = "#ef4444"; // Weak - Red
    } else if (strength < 75) {
        strengthBar.style.backgroundColor = "#eab308"; // Medium - Yellow
    } else {
        strengthBar.style.backgroundColor = "#22c55e"; // Strong - Green
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