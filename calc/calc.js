// script.js
let display = document.getElementById('display');

function appendValue(value) {
  const lastNumber = display.value.split(/[\+\-\*\/]/).pop();
  if (value === '.' && lastNumber.includes('.')) return; // prevent multiple decimals
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function backspace() {
  display.value = display.value.slice(0, -1);
}

function toggleSign() {
  if (display.value) {
    if (display.value.startsWith('-')) {
      display.value = display.value.slice(1);
    } else {
      display.value = '-' + display.value;
    }
  }
}

function percentage() {
  if (display.value) {
    display.value = parseFloat(display.value) / 100;
  }
}

function calculateResult() {
  try {
    display.value = eval(display.value);
  } catch {
    display.value = 'Error';
  }
}

// Keyboard support
document.addEventListener('keydown', function(e) {
  const allowedKeys = '0123456789+-*/.=';
  if (allowedKeys.includes(e.key)) {
    if (e.key === '=') calculateResult();
    else if (e.key === '.') appendValue('.');
    else appendValue(e.key);
  } else if (e.key === 'Backspace') backspace();
});