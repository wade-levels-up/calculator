const keypad = document.querySelector('#keypad');
const screen = document.querySelector('#screen');

let eq = { numA: 0, sym: '', numB: 0, displayVal: 0 };
let inputFirst = true;

const inputKeyValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.'];
const symbols = ['+', '-', '*', '/'];

const plus = document.querySelector('#plus');
const minus = document.querySelector('#minus');
const times = document.querySelector('#times');
const division = document.querySelector('#division');
const symbolArr = [plus, minus, times, division];

// add event listenever to keypad to create click 
// effect and collect input values. Pointer is device agnostic
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


// Refreshes screen after input is received
function setScreen() {
    if (inputFirst) {
        screen.textContent = eq.numA;
    } else {
        screen.textContent = eq.numB;
    }
}

function convertStringToPosOrNeg(pos) {
    let spread = pos.split('');
    if (spread[0] != '-') {
        spread.splice(0, 0, '-');
        spread = spread.join('');
    } else {
        spread.splice(0, 1);
        spread = spread.join('');
    }
    inputFirst ? eq.numA = spread : eq.numB = spread;
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
    inputFirst ? eq.numA = spread : eq.numB = spread;
    setScreen();
}

function equals(input) {
    if (eq.numB) {          
        inputFirst = true;  
        eq.numA = operator(eq.sym, eq.numA,eq.numB) 
        eq.displayVal = eq.numA;
        setScreen();
        clear(input);
        eq.numA = eq.displayVal;
    } 
}

function clear(symbol) {
    [eq.numA, eq.numB] = [0, 0];
    switch(symbol) {
        case !'=': eq.sym = symbol; break;
        case '=': eq.sym = symbol; break;
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

    if (input === '.') {
        switch(inputFirst) {
            case true: addDecimal(eq.numA); break;
            case false: addDecimal(eq.numB); break;
        }
    }

    if (input === '=') { equals(input); }

    // When eq has all needed values and a button is pressed
    // that is a symbol +, -, * or /, display the result
    if (eq.numA && eq.numB && eq.sym && symbols.includes(input)) {
        equals(eq.sym);
    }

    // if (eq.displayVal === eq.numA){
    //     inputFirst = true;
    // }

    if (inputFirst === true) {

        // If starting value is zero remove it
        if (eq.numA == 0) {
            eq.numA = '';
        }

        if (input === 'AC') {
            clear();
            setScreen();
        }

        // Then, if the input is a number concatenate it to the last number
        // If it's 0 it'll just reset to it's starting value
        if (!isNaN(input)) {
            eq.numA += input;
            setScreen();
        }

        if (input === '+/-') {
            convertStringToPosOrNeg(eq.numA);
        }

        switch(input) {
            case '+': eq.sym = '+', inputFirst = false; break;
            case '-': eq.sym = '-', inputFirst = false; break;
            case '*': eq.sym = '*', inputFirst = false; break;
            case '/': eq.sym = '/', inputFirst = false; break;
        }


    } else if (inputFirst === false) {

            if (eq.numB == 0) {
            eq.numB = '';
            }
    
            if (input === 'AC') {
                inputFirst = true;
                clear();
                setScreen();
            }

            if (!isNaN(input)) {
                eq.numB += input;
                setScreen();
            }
    
            if (input === '+/-') {
                convertStringToPosOrNeg(eq.numB);
            }
    
            switch(input) {
                case '+': eq.sym = '+', equals('+'), inputFirst = false; break;
                case '-': eq.sym = '-', equals('-'), inputFirst = false; break;
                case '*': eq.sym = '*', equals('*'), inputFirst = false; break;
                case '/': eq.sym = '/', equals('/'), inputFirst = false; break;
            }
    }
    console.table(eq);
}

///////////////

//Functions for basic math
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b; 
const divide = (a, b) => a / b;


// Carries out math using functions above
function operator(symbol, numA, numB) {
    let result = ''; 
    switch (symbol) {
        case '+': result = add(+numA, +numB); break;
        case '-': result = subtract(+numA, +numB); break;
        case '*': result = multiply(+numA, +numB); break;
        case '/': result = divide(+numA, +numB); break;
    }
    let resultString = result.toString();
    return resultString;
}

