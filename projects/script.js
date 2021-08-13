function handlePixelClick(event) {
  const pixel = event.target;
  const selectedColorInPallette = document.querySelector('.selected');
  const selectedColorComputedStyle = window.getComputedStyle(selectedColorInPallette, null);
  const selectedColor = selectedColorComputedStyle.getPropertyValue('background-color');
  pixel.style.backgroundColor = selectedColor;
}

function addListenerToPixels() {
  const pixels = document.getElementsByClassName('pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].addEventListener('click', handlePixelClick);
  }
}

function fillNewBoard(newBoard, n) {
  for (let index = 1; index <= (n * n); index += 1) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    newBoard.appendChild(pixel);
    if (index % n === 0) {
      newBoard.appendChild(document.createElement('br'));
    }
  }
}

function createNewBoard() {
  const newBoard = document.createElement('section');
  newBoard.id = ('pixel-board');
  return newBoard;
}

function produceBoard(size) {
  const newBoard = createNewBoard();
  fillNewBoard(newBoard, size);
  document.getElementsByTagName('main')[0].appendChild(newBoard);
  addListenerToPixels();
}

function deleteOldBoard() {
  const oldBoard = document.querySelector('#pixel-board');
  oldBoard.remove();
}

function verifyInput() {
  const input = document.querySelector('#board-size');
  const n = parseInt(input.value, 10);

  if (Number.isNaN(parseInt(input.value, 10))) {
    return false;
  }
  if (n <= 5) {
    return 5;
  }
  if (n >= 50) {
    return 50;
  }
  return n;
}

function handleGenerateBtnClick() {
  const inputValue = verifyInput();
  if (inputValue === false) {
    return alert('Board inválido!');
  }
  deleteOldBoard();
  produceBoard(inputValue);
}

function handleClearBtnClick() {
  const pixels = document.querySelectorAll('.pixel');

  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].style.backgroundColor = 'white';
  }
}

function handleColorClick(event) {
  const currentSelected = document.querySelector('.selected');
  const newSelected = event.target;
  currentSelected.classList.remove('selected');
  newSelected.classList.add('selected');
}

function addListenerToColorPallete() {
  const colors = document.getElementsByClassName('color');
  for (let index = 0; index < colors.length; index += 1) {
    colors[index].addEventListener('click', handleColorClick);
  }
}

function randomizeColors() {
  const colors = document.getElementsByClassName('color');
  for (let index = 1; index < colors.length; index += 1) {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    colors[index].style.backgroundColor = `#${randomColor}`;
  }
}

function load() {
  randomizeColors();
  addListenerToColorPallete();

  const clearBtn = document.getElementById('clear-board');
  clearBtn.addEventListener('click', handleClearBtnClick);

  const generateBtn = document.querySelector('#generate-board');
  generateBtn.addEventListener('click', handleGenerateBtnClick);

  produceBoard(5);
}

window.onload = load;
