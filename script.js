//your JS code here. If required.
document.getElementById('submit').addEventListener('click', function() {
    const player1 = document.getElementById('player-1').value;
    const player2 = document.getElementById('player-2').value;
    
    if (player1 && player2) {
        document.getElementById('game').style.display = 'block';
        document.querySelector('.message').innerText = `${player1}, you're up!`;
        createBoard();
    }
});

let currentPlayer = 'X';
const board = Array(9).fill(null);

function createBoard() {
    const boardDiv = document.querySelector('.board');
    boardDiv.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.id = i;
        cell.addEventListener('click', () => handleCellClick(i));
        boardDiv.appendChild(cell);
    }
}

function handleCellClick(index) {
    if (!board[index]) {
        board[index] = currentPlayer;
        document.getElementById(index).innerText = currentPlayer;
        if (checkWin()) {
            document.querySelector('.message').innerText = `${currentPlayer} congratulations you won!`;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.querySelector('.message').innerText = `${currentPlayer === 'X' ? player1 : player2}, you're up!`;
        }
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}