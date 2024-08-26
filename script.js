const buttons = document.querySelectorAll('button');
let btnArr = Array.from(buttons);

// Grows zero button to be twice as big as a normal button
let zero = btnArr.find(btn => btn.textContent === '0');
zero.style.flexGrow = 12;

let equation = { firstValue: 0, nextValue: 0, operand: '' }

// add event listenever to all buttons to create click effect
btnArr.map((btn) => {

    // for computers
    btn.addEventListener('mousedown', ()=> {
            btn.classList.toggle('buttonPress')
            inputHandler(btn.textContent);
        });
    btn.addEventListener('mouseup', ()=> {
            btn.classList.toggle('buttonPress')
        });

    // for mobile
    btn.addEventListener('touchstart', ()=> {
            btn.classList.toggle('buttonPress')
            inputHandler(btn.textContent);
        });
    btn.addEventListener('touchend', ()=> {
            btn.classList.toggle('buttonPress')
        });


});


// Refreshes screen after input is received
function setScreen(result) {
    let screen = document.querySelector('#screen');
    let spread = result.split('');
    if (spread.length > 9) {
        screen.textContent = 'Len Exc';
    } else {
        spread = spread.join('');
        screen.textContent = spread;
    }
}

// Clears inputs
function clear() {
    equation.firstValue = 0;
    equation.nextValue = 0;
    equation.operand = '';
}

// Positive negative conversion 
function convertStringToPosOrNeg() {
    let spread = equation.firstValue.split('');
    if (spread[0] != '-') {
        spread.splice(0, 0, '-');
        spread = spread.join('');
    } else {
        spread.splice(0, 1);
        spread = spread.join('');
    }
    equation.firstValue = spread;
    setScreen(equation.firstValue)
}

function addDecimal() {
    let spread = equation.firstValue.split('');
    let len = spread.length
    if (spread[len -1] != '.' && !(spread.includes('.'))) {
        spread.push('.');
        spread = spread.join('');
    } else {
        spread = spread.join('');
    }
    equation.firstValue = spread;
    setScreen(equation.firstValue)
}

function inputHandler(input) {

    // If starting value is zero remove it
    if (equation.firstValue == 0) {
        equation.firstValue = '';
    }

    // Then, if the input is a number concatenate it to the last number
    // If it's 0 it'll just reset to it's starting value
    if (!isNaN(input)) {
        equation.firstValue += input;
        setScreen(equation.firstValue);
    }

    // When the input is AC we must reset all the objects values
    if (input === 'AC') {
        clear();
        setScreen('0');
    }

    if (input === '+/-') {
        convertStringToPosOrNeg();
    }

    if (input === '.') {
        addDecimal();
    }

}




// Include functions for basic math

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}



function operator(operator, numA, numB) {
    switch (operator) {
        case '+': add(numA, numB);
        case '-': subtract(numA, numB);
    }
}
