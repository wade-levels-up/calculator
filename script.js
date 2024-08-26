const buttons = document.querySelectorAll('button');
let btnArr = Array.from(buttons);

// Grows zero button to be twice as big as a normal button
let zero = btnArr.find(btn => btn.textContent === '0');
zero.style.flexGrow = 12;

// add onclick event to all buttons to create click effect

btnArr.map((btn) => {
    btn.addEventListener('mousedown', ()=> btn.classList.toggle('buttonPress'));
    btn.addEventListener('mouseup', ()=> btn.classList.toggle('buttonPress'));
    btn.addEventListener('touchstart', ()=> btn.classList.toggle('buttonPress'));
    btn.addEventListener('touchend', ()=> btn.classList.toggle('buttonPress'));
});
