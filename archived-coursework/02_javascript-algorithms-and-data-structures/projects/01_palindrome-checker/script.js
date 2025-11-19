const textInput = document.getElementById('text-input');
const checkBtn = document.getElementById('check-btn');
const result = document.getElementById('result');

function checkPalindrome() {
    const inputValue = textInput.value;
    
    // Check if input is empty
    if (inputValue === '') {
        alert('Please input a value');
        return;
    }

    // Remove all non-alphanumeric characters and convert to lowercase
    const cleanedString = inputValue.replace(/[^a-z0-9]/gi, '').toLowerCase();
    
    // Check if cleaned string is a palindrome
    const reversedString = cleanedString.split('').reverse().join('');
    const isPalindrome = cleanedString === reversedString;

    // Display result
    result.classList.remove('show', 'palindrome', 'not-palindrome');
    
    // Force reflow to restart animation
    void result.offsetWidth;
    
    if (isPalindrome) {
        result.textContent = `${inputValue} is a palindrome`;
        result.classList.add('show', 'palindrome');
    } else {
        result.textContent = `${inputValue} is not a palindrome`;
        result.classList.add('show', 'not-palindrome');
    }
}

// Add click event listener
checkBtn.addEventListener('click', checkPalindrome);

// Add enter key listener
textInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkPalindrome();
    }
});

// Clear result when user starts typing
textInput.addEventListener('input', () => {
    result.classList.remove('show', 'palindrome', 'not-palindrome');
    result.textContent = '';
});
