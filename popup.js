// Function to generate a random number using Web Crypto API
function getRandomValues(max) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max;
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