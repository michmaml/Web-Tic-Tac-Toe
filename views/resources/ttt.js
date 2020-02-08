
/*
* Michal J Sekulski
*/
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
  //Horizontal options
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  //Vertical options
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  //Diagonal options
  [0, 4, 8],
  [2, 4, 6]
];
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('resultPrompt');
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.querySelector('[data-result-text]');
let circleTurn;

startGame();

restartButton.addEventListener('click', startGame);

/* Functions */
function startGame() {          //Starts from reseting values and then enables hovering and removes the winning message
  circleTurn = false;
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  })
  setBoardHoverClass();
  winningMessageElement.classList.remove('show');
}

function handleClick(e) {       //Checks whose turn it is, places the character and checks if there is a winning combination
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {        //Conditional statement to check the result and displays a message by adding 'show' to HTML
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!';
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winningMessageElement.classList.add('show');
}

function isDraw() {             //Calls Array.prototype.every() which checks if all of the cells are filled
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
  })
}

function placeMark(cell, currentClass) {  //Adds "X" or "Circle" to the HTML by that triggers the CSS style
  cell.classList.add(currentClass);
}

function swapTurns() {          //Changes Xs into Os and vice versa
  circleTurn = !circleTurn;
}

function setBoardHoverClass() { //With lightgray colour place a 'highlighted' element into a div box
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) { //Check if the divs contain an array of arrays(WINNING_COMB..)
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
