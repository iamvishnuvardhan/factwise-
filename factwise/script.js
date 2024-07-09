let currentPlayer = '✓';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleClick(cellIndex) {
  if (!gameActive || board[cellIndex] !== '') return;
  
  board[cellIndex] = currentPlayer;
  
  // Create a span element to represent tick or cross as a circle
  const symbol = document.createElement('span');
  symbol.classList.add('symbol');
  symbol.innerText = currentPlayer;
  if (currentPlayer === '✓') {
    symbol.style.color = 'green';
    symbol.style.fontWeight = 'bold';
  } else if (currentPlayer === '✗') {
    symbol.style.color = 'red';
    symbol.style.fontWeight = 'bold';
  }
  document.getElementById('board').children[cellIndex].appendChild(symbol);
  
  if (checkWin()) {
    document.getElementById('status').innerText = `Winner: ${currentPlayer}`;
    gameActive = false;
    return;
  }
  
  if (checkTie()) {
    document.getElementById('status').innerText = 'It\'s a tie!';
    gameActive = false;
    return;
  }
  
  currentPlayer = currentPlayer === '✓' ? '✗' : '✓';
  document.getElementById('status').innerText = `Next player: ${currentPlayer}`;
}

function checkWin() {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

function checkTie() {
  return board.every(cell => cell !== '');
}

function resetGame() {
  currentPlayer = '✓';
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  
  // Reset board display
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell, index) => {
    cell.innerHTML = ''; // Clear innerHTML to remove ticks and crosses
  });
  
  document.getElementById('status').innerText = 'Next player: ✓';
}
