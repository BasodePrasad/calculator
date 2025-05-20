document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
    let currentInput = '0';
    let previousInput = '';
    let operation = null;
    let resetScreen = false;

    // Update display
    function updateDisplay() {
        display.value = currentInput;
    }

    // Append number
    function appendNumber(number) {
        if (currentInput === '0' || resetScreen) {
            currentInput = number;
            resetScreen = false;
        } else {
            currentInput += number;
        }
    }

    // Choose operation
    function chooseOperation(op) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            compute();
        }
        operation = op;
        previousInput = currentInput;
        currentInput = '';
    }

    // Compute calculation
    function compute() {
        let computation;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        if (isNaN(prev) || isNaN(current)) return;

        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }

        currentInput = computation.toString();
        operation = undefined;
        previousInput = '';
        resetScreen = true;
    }

    // Clear calculator
    function clear() {
        currentInput = '0';
        previousInput = '';
        operation = undefined;
    }

    // Add event listeners to buttons
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('number')) {
                appendNumber(button.textContent);
                updateDisplay();
            } else if (button.classList.contains('operator') && !button.classList.contains('equal')) {
                chooseOperation(button.textContent);
                updateDisplay();
            } else if (button.classList.contains('equal')) {
                compute();
                updateDisplay();
            } else if (button.classList.contains('clear')) {
                clear();
                updateDisplay();
            }
        });
    });

    // Initialize display
    updateDisplay();
});