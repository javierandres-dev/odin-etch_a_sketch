'use strict';
const d = document,
  $btn = d.getElementById('btn'),
  $notify = d.getElementById('notify'),
  $main = d.getElementById('main'),
  $squares = d.createElement('div');

$squares.setAttribute('id', 'squares');

const isValidNumber = (number) => {
  if (typeof number === 'number' && number >= 1 && number <= 100) return true;
  else return false;
};

const notify = (nameClass, message) => {
  $notify.classList.add(nameClass);
  $notify.textContent = message;
};

const getStyles = (number) => {
  const sizeSquare = '',
    squares = `
    width: ${9.6 * number}px;
    height: ${9.6 * number}px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
  `,
    square = `width: 9.6px; height: 9.6px; border: 1px solid #000;`;
  return { squares, square };
};

const setSquares = (numberSquares) => {
  const styles = getStyles(numberSquares);
  for (let i = 0; i < numberSquares * numberSquares; i++) {
    const $square = d.createElement('div');
    $square.setAttribute('style', styles.square);
    $squares.appendChild($square);
  }
  $squares.setAttribute('style', styles.squares);
  $main.appendChild($squares);
  notify('success', `New grid of ${numberSquares}x${numberSquares} generated!`);
};

const getNumberSquares = () => {
  const number = prompt(
    'Enter a integer number between one and one hundred (1 - 100)'
  );
  if (isValidNumber(+number)) {
    setSquares(number);
  } else {
    notify('error', 'Enter a number between one and one hundred (1 - 100)');
  }
};

$btn.addEventListener('click', getNumberSquares);
