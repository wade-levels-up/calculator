const buttons = document.querySelectorAll('button');
let btnArr = Array.from(buttons);

// Grows zero button to be twice as big as a normal button
let zero = btnArr.find(btn => btn.textContent === '0');
zero.style.flexGrow = 12;

let lastValue = 0;

// add event listenever to all buttons to create click effect
btnArr.map((btn) => {

    // for computers
    btn.addEventListener('mousedown', ()=> {
            btn.classList.toggle('buttonPress')
            handleButtonPress(btn.textContent);
        });
    btn.addEventListener('mouseup', ()=> {
            btn.classList.toggle('buttonPress')
        });

    // for mobile
    btn.addEventListener('touchstart', ()=> {
            btn.classList.toggle('buttonPress')
            handleButtonPress(btn.textContent);
        });
    btn.addEventListener('touchend', ()=> {
            btn.classList.toggle('buttonPress')
        });


});



// Declare variable for screen element

// Make screen variable's text content equal to that of the
// button pressed if it is a number
function handleButtonPress(button) {
    let screen = document.querySelector('#screen');
    let lastValue = button;
    screen.textContent = lastValue;
}


