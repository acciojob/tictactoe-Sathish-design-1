const form = document.getElementById("player-form");
const submitBtn = document.getElementById("submit");
const boardContainer = document.getElementById("board");
const messageDiv = document.querySelector(".message");
const gameSection = document.getElementById("game-section");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Start game after name input
submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player1").value.trim();
  player2 = document.getElementById("player2").value.trim();

  if (player1 === "" || player2 === "") {
    alert("Please enter both player names!");
    return;
  }

  form.style.display = "none";
  gameSection.style.display = "block";

  currentPlayer = player1;
  messageDiv.textContent = `${currentPlayer}, you're up`;

  createBoard();
});

function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = i + 1;
    cell.addEventListener("click", handleClick);
    boardContainer.appendChild(cell);
  }
}

function handleClick(e) {
  const index = e.target.id - 1;
  if (!gameActive || board[index] !== "") return;

  // Insert lowercase x/o (as required by test)
  board[index] = currentPlayer === player1 ? "x" : "o";
  e.target.textContent = board[index];

  checkWinner();
  if (gameActive) switchPlayer();
}

function switchPlayer() {
  currentPlayer = currentPlayer === player1 ? player2 : player1;
  messageDiv.textContent = `${currentPlayer}, you're up`;
}

function checkWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      highlightCells(combo);
      messageDiv.textContent = `${currentPlayer} congratulations you won!`;
      return;
    }
  }

  if (!board.includes("")) {
    messageDiv.textContent = "It's a draw!";
    gameActive = false;
  }
}

function highlightCells(combo) {
  combo.forEach(index => {
    document.getElementById(index + 1).classList.add("highlight");
  });
}