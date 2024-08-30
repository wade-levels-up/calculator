const keypad = document.querySelector('#keypad');
const screen = document.querySelector('#screen');

let equation = { firstValue: 0, operand: '', secondValue: 0, carryOver: 0 };
let firstNumber = true;

const inputKeyValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.'];
const otherKeys = ['A/C', '+/-', '%', '/', '*', '-', '+', '='];
const operators = ['+', '-', '*', '/'];

// add event listenever to keypad to create click 
// effect and collect input values. Pointer is device agnostic

keypad.addEventListener('pointerdown', (e)=>{
    e.target.classList.toggle('buttonPress');
    inputHandler(e.target.textContent);
})
keypad.addEventListener('pointerup', (e)=>{
    e.target.classList.toggle('buttonPress');
})


// Refreshes screen after input is received
function setScreen() {
    if (firstNumber) {
        screen.textContent = equation.firstValue;
    } else {
        screen.textContent = equation.secondValue;
    }
}


// Positive negative conversion 
function convertStringToPosOrNeg(pos) {

    let spread = pos.split('');
    if (spread[0] != '-') {
        spread.splice(0, 0, '-');
        spread = spread.join('');
    } else {
        spread.splice(0, 1);
        spread = spread.join('');
    }

    if (firstNumber){
        equation.firstValue = spread;
    } else {
        equation.secondValue = spread;
    }
    setScreen();
}

function addDecimal(pos) {

    let spread = pos.split('');
    let len = spread.length
    if (spread[len -1] != '.' && !(spread.includes('.'))) {
        spread.push('.');
        spread = spread.join('');
    } else {
        spread = spread.join('');
    }

    if (firstNumber){
        equation.firstValue = spread;
    } else {
        equation.secondValue = spread;
    }
    setScreen();
}

// Handles what occurs when = is pressed
function equals(input) {
    // If there' a second value to calc, then calc
    if (equation.secondValue) {
        firstNumber = true;
        equation.firstValue = operator(
            equation.operand,
            equation.firstValue,
            equation.secondValue
        )
        equation.carryOver = equation.firstValue;
        setScreen();
        clear(input);
        equation.firstValue = equation.carryOver;
    } 
}

// Clears inputs
function clear(opHold) {
    equation.firstValue = 0;
    equation.secondValue = 0;
    if (!opHold === '=') { 
        equation.operand = opHold; 
    } else if (opHold === '=') {
        equation.operand = '=';
    }
}

function checkForDecimal(number) {
    spread = number.split('');
    if (spread.includes('.')) {
        return true;
    }
}


function inputHandler(input) {

    let inputNumber = inputKeyValues.includes(input);

    if (input === '.') {
        switch(firstNumber) {
            case true: addDecimal(equation.firstValue); break;
            case false: addDecimal(equation.secondValue); break;
        }
    }

    // If we've calculated an equation and a number is input
    if (equation.operand === '=' && inputNumber){
        equation.firstValue = 0;
        firstNumber = true;
        equation.operand = '';
    }

    if (input === '=') { equals(input); }


    // If the equation contains all parts and a button is pressed
    // complete the equation and display the result using
    // whatever the current operand is.
    if (equation.firstValue && equation.secondValue && equation.operand && operators.includes(input)) {
        equals(equation.operand);
    }

    // if (equation.carryOver === equation.firstValue){
    //     firstNumber = true;
    // }

    if (firstNumber === true) {

        // If starting value is zero remove it
        if (equation.firstValue == 0) {
            equation.firstValue = '';
        }

        if (input === 'AC') {
            clear();
            setScreen();
        }

        // Then, if the input is a number concatenate it to the last number
        // If it's 0 it'll just reset to it's starting value
        if (!isNaN(input)) {
            equation.firstValue += input;
            setScreen();
        }

        if (input === '+/-') {
            convertStringToPosOrNeg(equation.firstValue);
        }

        switch(input) {
            case '+': equation.operand = '+', firstNumber = false; break;
            case '-': equation.operand = '-', firstNumber = false; break;
            case '*': equation.operand = '*', firstNumber = false; break;
            case '/': equation.operand = '/', firstNumber = false; break;
        }


    } else if (firstNumber === false) {

            if (equation.secondValue == 0) {
            equation.secondValue = '';
            }
    
            if (input === 'AC') {
                firstNumber = true;
                clear();
                setScreen();
            }

            if (!isNaN(input)) {
                equation.secondValue += input;
                setScreen();
            }
    
            if (input === '+/-') {
                convertStringToPosOrNeg(equation.secondValue);
            }
    
            switch(input) {
                case '+': equation.operand = '+', equals('+'), firstNumber = false; break;
                case '-': equation.operand = '-', equals('-'), firstNumber = false; break;
                case '*': equation.operand = '*', equals('*'), firstNumber = false; break;
                case '/': equation.operand = '/', equals('/'), firstNumber = false; break;
            }
    }

    console.table(equation), console.log(firstNumber);
}




// Include functions for basic math

function add(a, b) { return a + b; }

function subtract(a, b) { return a - b; }

function multiply(a, b) { return a * b; }

function divide(a, b) { return a / b; }



function operator(operator, numA, numB) {
    let result = ''
   
    switch (operator) {
        case '+': result = add(+numA, +numB); break;
        case '-': result = subtract(+numA, +numB); break;
        case '*': result = multiply(+numA, +numB); break;
        case '/': result = divide(+numA, +numB); break;
    }

    let stringyResult = result.toString();
    return stringyResult;

}

