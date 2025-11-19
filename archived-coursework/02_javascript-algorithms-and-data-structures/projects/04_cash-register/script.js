let price = 19.5;
let cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
];

const cashInput = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const changeDue = document.getElementById('change-due');
const priceDisplay = document.getElementById('price-display');
const drawerDisplay = document.getElementById('drawer-display');

const currencyUnits = [
    ["ONE HUNDRED", 100],
    ["TWENTY", 20],
    ["TEN", 10],
    ["FIVE", 5],
    ["ONE", 1],
    ["QUARTER", 0.25],
    ["DIME", 0.1],
    ["NICKEL", 0.05],
    ["PENNY", 0.01]
];

function updateDisplay() {
    priceDisplay.textContent = `$${price.toFixed(2)}`;
    
    drawerDisplay.innerHTML = '';
    cid.forEach(([name, amount]) => {
        const item = document.createElement('div');
        item.className = 'drawer-item';
        item.innerHTML = `
            <span class="drawer-item-name">${name}</span>
            <span class="drawer-item-amount">$${amount.toFixed(2)}</span>
        `;
        drawerDisplay.appendChild(item);
    });
}

function checkCashRegister() {
    const cash = parseFloat(cashInput.value);
    
    // Clear previous styling
    changeDue.className = '';
    
    // Check if customer has enough money
    if (cash < price) {
        alert('Customer does not have enough money to purchase the item');
        return;
    }
    
    // Check for exact cash
    if (cash === price) {
        changeDue.textContent = 'No change due - customer paid with exact cash';
        return;
    }
    
    let changeDueAmount = Math.round((cash - price) * 100) / 100;
    let changeArray = [];
    let totalCID = 0;
    
    // Calculate total cash in drawer
    cid.forEach(([_, amount]) => {
        totalCID += amount;
    });
    totalCID = Math.round(totalCID * 100) / 100;
    
    // Check if drawer has exact change amount (CLOSED status)
    if (totalCID === changeDueAmount) {
        let result = "Status: CLOSED";
        cid.forEach(([name, amount]) => {
            if (amount > 0) {
                result += ` ${name}: $${amount.toFixed(2)}`;
            }
        });
        changeDue.textContent = result;
        changeDue.classList.add('closed');
        return;
    }
    
    // Check if drawer has less than change due
    if (totalCID < changeDueAmount) {
        changeDue.textContent = 'Status: INSUFFICIENT_FUNDS';
        changeDue.classList.add('insufficient');
        return;
    }
    
    // Calculate change to give back
    let remainingChange = changeDueAmount;
    
    for (let i = 0; i < currencyUnits.length; i++) {
        const [currencyName, currencyValue] = currencyUnits[i];
        
        // Find this currency in the drawer
        const drawerAmount = cid.find(([name]) => name === currencyName)[1];
        
        let amountToReturn = 0;
        
        while (remainingChange >= currencyValue && drawerAmount > amountToReturn) {
            remainingChange = Math.round((remainingChange - currencyValue) * 100) / 100;
            amountToReturn = Math.round((amountToReturn + currencyValue) * 100) / 100;
        }
        
        if (amountToReturn > 0) {
            changeArray.push([currencyName, amountToReturn]);
        }
    }
    
    // Check if we can make exact change
    if (remainingChange > 0) {
        changeDue.textContent = 'Status: INSUFFICIENT_FUNDS';
        changeDue.classList.add('insufficient');
        return;
    }
    
    // Format output for OPEN status
    let result = "Status: OPEN";
    changeArray.forEach(([name, amount]) => {
        result += ` ${name}: $${amount.toFixed(2)}`;
    });
    
    changeDue.textContent = result;
    changeDue.classList.add('open');
}

purchaseBtn.addEventListener('click', checkCashRegister);

cashInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkCashRegister();
    }
});

// Initialize display
updateDisplay();