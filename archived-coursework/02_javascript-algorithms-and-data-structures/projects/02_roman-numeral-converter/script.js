const numberInput = document.getElementById('number');
const convertBtn = document.getElementById('convert-btn');
const output = document.getElementById('output');

function convertToRoman(num) {
    // Roman numeral mappings in descending order
    const romanNumerals = [
        { value: 1000, numeral: 'M' },
        { value: 900, numeral: 'CM' },
        { value: 500, numeral: 'D' },
        { value: 400, numeral: 'CD' },
        { value: 100, numeral: 'C' },
        { value: 90, numeral: 'XC' },
        { value: 50, numeral: 'L' },
        { value: 40, numeral: 'XL' },
        { value: 10, numeral: 'X' },
        { value: 9, numeral: 'IX' },
        { value: 5, numeral: 'V' },
        { value: 4, numeral: 'IV' },
        { value: 1, numeral: 'I' }
    ];

    let result = '';
    
    for (let i = 0; i < romanNumerals.length; i++) {
        while (num >= romanNumerals[i].value) {
            result += romanNumerals[i].numeral;
            num -= romanNumerals[i].value;
        }
    }
    
    return result;
}

function handleConversion() {
    const inputValue = numberInput.value;
    
    // Clear previous output classes
    output.classList.remove('show', 'success', 'error');
    
    // Force reflow to restart animation
    void output.offsetWidth;

    // Check if input is empty
    if (inputValue === '') {
        output.textContent = 'Please enter a valid number';
        output.classList.add('show', 'error');
        return;
    }

    const num = parseInt(inputValue);

    // Check if number is less than 1
    if (num < 1) {
        output.textContent = 'Please enter a number greater than or equal to 1';
        output.classList.add('show', 'error');
        return;
    }

    // Check if number is greater than 3999
    if (num >= 4000) {
        output.textContent = 'Please enter a number less than or equal to 3999';
        output.classList.add('show', 'error');
        return;
    }

    // Convert to Roman numeral
    const romanNumeral = convertToRoman(num);
    output.textContent = romanNumeral;
    output.classList.add('show', 'success');
}

// Add click event listener
convertBtn.addEventListener('click', handleConversion);

// Add enter key listener
numberInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleConversion();
    }
});

// Clear output when user starts typing
numberInput.addEventListener('input', () => {
    output.classList.remove('show', 'success', 'error');
    output.textContent = '';
});