const keypad = document.querySelector('#keypad');
const screen = document.querySelector('#screen');

let equation = { numA: 0, sym: '', numB: 0, displayVal: 0 };
let firstNumber = true;

const inputKeyValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.'];
const symbols = ['+', '-', '*', '/'];

const plus = document.querySelector('#plus');
const minus = document.querySelector('#minus');
const times = document.querySelector('#times');
const division = document.querySelector('#division');
const symbolArr = [plus, minus, times, division];


keypad.addEventListener('pointerdown', (e)=>{
    e.target.classList.toggle('buttonPress');
    if (symbols.includes(e.target.textContent)) {
        e.target.classList.add('focused');;
    } else {
        symbolArr.map((item) => {
        item.classList.remove('focused');
        });
    }
    inputHandler(e);
})
keypad.addEventListener('pointerup', (e)=>{
    e.target.classList.toggle('buttonPress');
})


function setScreen() {
    if (firstNumber) {
        screen.textContent = equation.numA;
    } else {
        screen.textContent = equation.numB;
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
        equation.numA = spread;
    } else {
        equation.numB = spread;
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
        equation.numA = spread;
    } else {
        equation.numB = spread;
    }
    setScreen();
}

// Handles what occurs when = is pressed
function equals(input) {
    // If there' a second value to calc, then calc
    if (equation.numB) {
        firstNumber = true;
        equation.numA = operator(
            equation.sym,
            equation.numA,
            equation.numB
        )
        equation.displayVal = equation.numA;
        setScreen();
        clear(input);
        equation.numA = equation.displayVal;
    } 
}

function clear(symbol) {
    [equation.numA, equation.numB] = [0, 0];
    switch(symbol) {
        case !'=': equation.sym = symbol; break;
        case '=': equation.sym = symbol; break;
    }
}

function checkForDecimal(number) {
    spread = number.split('');
    if (spread.includes('.')) ()=> true;
}

///// Main logic that handles input from the buttons /////

function inputHandler(event) {

    let input = event.target.textContent
    let inputNumber = inputKeyValues.includes(input);

    if (equation.sym === '=') {
        if (symbols.includes(input)) {
            equation.sym = input;
        } else {
            equation.sym = '';
            equation.numA = '';
        }
    }

    if (input === '.') {
        switch(firstNumber) {
            case true: addDecimal(equation.numA); break;
            case false: addDecimal(equation.numB); break;
        }
    }

    if (input === '=') { equals(input); }

    // If the equation contains all parts and a button is pressed
    // complete the equation and display the result
    if (equation.numA && equation.numB && equation.sym && symbols.includes(input)) {
        equals(equation.sym);
    }

    // if (equation.displayVal === equation.numA){
    //     firstNumber = true;
    // }

    if (firstNumber === true) {

        // If starting value is zero remove it
        if (equation.numA == 0) {
            equation.numA = '';
        }

        if (input === 'AC') {
            clear();
            setScreen();
        }

        // Then, if the input is a number concatenate it to the last number
        // If it's 0 it'll just reset to it's starting value
        if (!isNaN(input)) {
            equation.numA += input;
            setScreen();
        }

        if (input === '+/-') {
            convertStringToPosOrNeg(equation.numA);
        }

        switch(input) {
            case '+': equation.sym = '+', firstNumber = false; break;
            case '-': equation.sym = '-', firstNumber = false; break;
            case '*': equation.sym = '*', firstNumber = false; break;
            case '/': equation.sym = '/', firstNumber = false; break;
        }


    } else if (firstNumber === false) {

            if (equation.numB == 0) {
            equation.numB = '';
            }
    
            if (input === 'AC') {
                firstNumber = true;
                clear();
                setScreen();
            }

            if (!isNaN(input)) {
                equation.numB += input;
                setScreen();
            }
    
            if (input === '+/-') {
                convertStringToPosOrNeg(equation.numB);
            }
    
            switch(input) {
                case '+': equation.sym = '+', equals('+'), firstNumber = false; break;
                case '-': equation.sym = '-', equals('-'), firstNumber = false; break;
                case '*': equation.sym = '*', equals('*'), firstNumber = false; break;
                case '/': equation.sym = '/', equals('/'), firstNumber = false; break;
            }
    }
    console.table(equation);
    console.log({firstNumber});
}


//Functions for basic math
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b; 
const divide = (a, b) => a / b;



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

