const userInput = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const resultsDiv = document.getElementById('results-div');

function validatePhoneNumber(phoneNumber) {
    // Regex pattern for valid US phone numbers
    // Optional country code (1), optional space/nothing
    // Area code: can be in parentheses or not, followed by space/dash/nothing
    // First 3 digits, followed by space/dash/nothing
    // Last 4 digits
    const phoneRegex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;
    
    return phoneRegex.test(phoneNumber);
}

function checkPhoneNumber() {
    const phoneNumber = userInput.value.trim();
    
    if (phoneNumber === '') {
        alert('Please provide a phone number');
        return;
    }

    const isValid = validatePhoneNumber(phoneNumber);
    
    const resultItem = document.createElement('div');
    resultItem.className = 'result-item';
    
    if (isValid) {
        resultItem.classList.add('result-valid');
        resultItem.textContent = `Valid US number: ${phoneNumber}`;
    } else {
        resultItem.classList.add('result-invalid');
        resultItem.textContent = `Invalid US number: ${phoneNumber}`;
    }
    
    resultsDiv.appendChild(resultItem);
    
    // Scroll to bottom if multiple results
    resultsDiv.scrollTop = resultsDiv.scrollHeight;
}

function clearResults() {
    resultsDiv.innerHTML = '';
}

// Event listeners
checkBtn.addEventListener('click', checkPhoneNumber);
clearBtn.addEventListener('click', clearResults);

// Enter key listener
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkPhoneNumber();
    }
});
