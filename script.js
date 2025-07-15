const display = document.getElementById('display');

// Append number to display
function appendNumber(num) {
  display.value += num;
}

// Append operator safely
function appendOperator(op) {
  const lastChar = display.value.slice(-1);
  if (!display.value) return;
  if (['+', '-', '*', '/', '%'].includes(lastChar)) {
    display.value = display.value.slice(0, -1);
  }
  display.value += op;
}

// Clear entire input
function clearDisplay() {
  display.value = '';
}

// Delete last character
function deleteLast() {
  display.value = display.value.slice(0, -1);
}

// Evaluate result
function calculateResult() {
  try {
    const expression = display.value.replace(/÷/g, '/').replace(/×/g, '*');
    const result = eval(expression);
    display.value = result;
  } catch {
    display.value = 'Error';
  }
}

// Button highlight animation on key press
function highlightButton(key) {
  const keyMap = {
    '/': '÷',
    '*': '×',
    'Enter': '=',
    '=': '=',
    'Escape': 'C',
    'Backspace': 'DEL',
  };

  const label = keyMap[key] || key;
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach(btn => {
    if (btn.innerText === label) {
      btn.classList.add('pressed');
      setTimeout(() => btn.classList.remove('pressed'), 150);
    }
  });
}

// Keyboard input support
document.addEventListener('keydown', (e) => {
  const key = e.key;
  highlightButton(key);

  if (!isNaN(key)) {
    appendNumber(key);
  } else if (['+', '-', '*', '/', '%'].includes(key)) {
    appendOperator(key);
  } else if (key === '.') {
    appendNumber('.');
  } else if (key === 'Enter' || key === '=') {
    e.preventDefault();
    calculateResult();
  } else if (key === 'Backspace') {
    deleteLast();
  } else if (key.toLowerCase() === 'c' || key === 'Escape') {
    clearDisplay();
  }
});

// Button click events
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', () => {
    const label = button.innerText;

    if (!isNaN(label)) {
      appendNumber(label);
    } else if (['+', '-', '*', '÷', '%'].includes(label)) {
      appendOperator(label);
    } else if (label === 'C') {
      clearDisplay();
    } else if (label === 'DEL') {
      deleteLast();
    } else if (label === '=') {
      calculateResult();
    }
  });
} );

// Initial setup for display
display.value = '';
display.setAttribute('placeholder', '0');
display.addEventListener('focus', () => {
  if (display.value === 'Error') {
    display.value = '';
  }
});
display.addEventListener('input', () => {
  if (display.value === '') {
    display.setAttribute('placeholder', '0');
  } else {
    display.removeAttribute('placeholder');
  }
});
display.addEventListener('blur', () => {
  if (display.value === '') {
    display.setAttribute('placeholder', '0');
  }
});