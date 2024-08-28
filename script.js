const buttons = document.querySelectorAll('button');
let btnArr = Array.from(buttons);

// Grows zero button to be twice as big as a normal button
let zero = btnArr.find(btn => btn.textContent === '0');
zero.style.flexGrow = 12;

let equation = { firstValue: 0, secondValue: 0, operand: '' };
let firstNumber = true;

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
function setScreen() {
    let screen = document.querySelector('#screen');
    if (firstNumber) {
        screen.textContent = equation.firstValue;
    } else {
        screen.textContent = equation.secondValue;
    }
}

// Clears inputs
function clear() {
    equation.firstValue = 0;
    equation.secondValue = 0;
    equation.operand = '';
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

function inputHandler(input) {

    console.log({input});
    console.log({firstNumber});

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

        if (input === '.') {
            addDecimal(equation.firstValue);
        }

        if (input === '+') {
            equation.operand = '+';
            firstNumber = false;
        }


    } else if (firstNumber === false) {

            // If starting value is zero remove it
            if (equation.secondValue == 0) {
            equation.secondValue = '';
            }
    
            if (input === 'AC') {
                firstNumber = true;
                clear();
                setScreen();
            }
    
            // Then, if the input is a number concatenate it to the last number
            // If it's 0 it'll just reset to it's starting value
            if (!isNaN(input)) {
                equation.secondValue += input;
                setScreen();
            }
    
            if (input === '+/-') {
                convertStringToPosOrNeg(equation.secondValue);
            }
    
            if (input === '.') {
                addDecimal(equation.secondValue);
            }
    
            if (input === '+') {
                equation.operand = '+';
                firstNumber = false;
            }
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
