'use strict';
const d = document,
  $btn = d.getElementById('btn'),
  $notify = d.getElementById('notify'),
  $main = d.getElementById('main'),
  $squares = d.createElement('div');

const isValidNumber = (number) => {
  if (typeof number === 'number' && number >= 1 && number <= 100) return true;
  else return false;
};

const notify = (nameClass, message) => {
  $notify.className = nameClass;
  $notify.textContent = message;
};

const removePreviousSquares = () => ($squares.innerHTML = null);

const getStyles = (number) => {
  const sizeContainer = $main.offsetWidth,
    sizeSquare = sizeContainer / number > 16 ? 16 : sizeContainer / number,
    sizeSquares = sizeSquare * number;
  removePreviousSquares();
  if (sizeSquare < 9.6) return { max: Math.floor(sizeContainer / 9.6) };
  const squares = `
    background-color: #fff;
    width: ${sizeSquares}px;
    height: ${sizeSquares}px;
    max-width: 960px;
    max-height: 960px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-wrap: wrap;
  `,
    square = `
      width: ${sizeSquare}px;
      height: ${sizeSquare}px;
      min-width: 9.6px;
      min-height: 9.6px;
      border: 1px solid #f0f0f0;
    `;
  return { squares, square };
};

const getRandomColor = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return [red, green, blue];
};

const squareListeners = () => {
  const $squares = d.querySelectorAll('[data-name="square"]');
  for (const $square of $squares) {
    $square.addEventListener('mouseover', () => {
      if ($square.style.backgroundColor) {
        let opacity = $square.style.backgroundColor;
        opacity = opacity.substring(opacity.length - 1, opacity.length - 2);
        if (opacity === '0') return;
        else if (opacity === '9')
          $square.style.setProperty('background-color', '#000');
        else {
          opacity = +opacity + 1;
          const rgb = getRandomColor();
          $square.style.setProperty(
            'background-color',
            `rgba(${rgb[0]}, ${rgb[1]},${rgb[2]},0.${opacity})`
          );
        }
      } else {
        const rgb = getRandomColor();
        $square.style.setProperty(
          'background-color',
          `rgba(${rgb[0]}, ${rgb[1]},${rgb[2]},0.1)`
        );
      }
    });
  }
};

const setSquares = (styles, numberSquares) => {
  for (let i = 0; i < numberSquares * numberSquares; i++) {
    const $square = d.createElement('div');
    $square.setAttribute('style', styles.square);
    $square.dataset.name = 'square';
    $squares.appendChild($square);
  }
  $squares.setAttribute('style', styles.squares);
  $main.appendChild($squares);
  notify('success', `New grid of ${numberSquares}x${numberSquares} generated!`);
  squareListeners();
};

const getNumberSquares = () => {
  const number = prompt(
    'Enter a integer number between one and one hundred (1 - 100)'
  );
  if (isValidNumber(+number)) {
    const styles = getStyles(number);
    if (styles.max)
      notify(
        'error',
        `In this device the maximum number allowed is ${styles.max}`
      );
    else setSquares(styles, number);
  } else
    notify('error', 'Enter a number between one and one hundred (1 - 100)');
};

$squares.setAttribute('id', 'squares');
$btn.addEventListener('click', getNumberSquares);

{
  const styles = getStyles(16);
  setSquares(styles, 16);
}
