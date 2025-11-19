// !! IMPORTANT README:

// You may add additional external JS and CSS as needed to complete the project, however the current external resource MUST remain in place for the tests to work. BABEL must also be left in place. 

/***********
INSTRUCTIONS:
  - Select the project you would 
    like to complete from the dropdown 
    menu.
  - Click the "RUN TESTS" button to
    run the tests against the blank 
    pen.
  - Click the "TESTS" button to see 
    the individual test cases. 
    (should all be failing at first)
  - Start coding! As you fulfill each
    test case, you will see them go   
    from red to green.
  - As you start to build out your 
    project, when tests are failing, 
    you should get helpful errors 
    along the way!
    ************/

// PLEASE NOTE: Adding global style rules using the * selector, or by adding rules to body {..} or html {..}, or to all elements within body or html, i.e. h1 {..}, has the potential to pollute the test suite's CSS. Try adding: * { color: red }, for a quick example!

// Once you have read the above messages, you can delete all comments. 

document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  let currentInput = "0";
  let evaluated = false;

  const updateDisplay = () => {
    display.textContent = currentInput;
  };

  const isOperator = (char) => /[+\-*/]/.test(char);

  const handleNumber = (num) => {
    if (evaluated) {
      currentInput = num;
      evaluated = false;
    } else {
      if (currentInput === "0" || /[+\-*/]0$/.test(currentInput)) {
        currentInput = currentInput.replace(/0$/, num);
      } else {
        currentInput += num;
      }
    }
    updateDisplay();
  };

  const handleOperator = (op) => {
    if (evaluated) {
      evaluated = false;
    }
    let lastChar = currentInput.slice(-1);

    if (isOperator(lastChar)) {
      if (op === "-" && lastChar !== "-") {
        currentInput += op; // allow negative numbers
      } else {
        currentInput = currentInput.replace(/[+\-*/]+$/, op);
      }
    } else {
      currentInput += op;
    }
    updateDisplay();
  };

  const handleDecimal = () => {
    let parts = currentInput.split(/[\+\-\*\/]/);
    let lastPart = parts[parts.length - 1];
    if (!lastPart.includes(".")) {
      currentInput += ".";
    }
    updateDisplay();
  };

  const handleClear = () => {
    currentInput = "0";
    updateDisplay();
  };

  const handleEquals = () => {
    try {
      currentInput = eval(currentInput).toString();
      evaluated = true;
    } catch {
      currentInput = "Error";
    }
    updateDisplay();
  };

  document.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.id;
      const value = btn.textContent;

      if (id === "clear") handleClear();
      else if (id === "equals") handleEquals();
      else if (id === "decimal") handleDecimal();
      else if (["add", "subtract", "multiply", "divide"].includes(id)) {
        handleOperator(value);
      } else {
        handleNumber(value);
      }
    });
  });

  updateDisplay();
});
