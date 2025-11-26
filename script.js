let currentPlayer = 1;
let player1, player2;
const board = Array(9).fill(null);

document.getElementById('submit').addEventListener('click', function () {
    player1 = document.getElementById('player-1').value;
    player2 = document.getElementById('player-2').value;
    document.getElementById('playerInput').style.display = 'none';
    document.getElementById('gameBoard').style.display = 'block';
    updateMessage();
});

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', function () {
        const cellIndex = this.id - 1;
        if (!board[cellIndex]) {
            board[cellIndex] = currentPlayer === 1 ? 'X' : 'O';
            this.textContent = board[cellIndex];
            if (checkWinner()) {
                document.querySelector('.message').textContent = `${currentPlayer === 1 ? player1 : player2}, congratulations you won!`;
                document.querySelectorAll('.cell').forEach(cell => cell.style.pointerEvents = 'none');
            } else {
                currentPlayer = currentPlayer === 1 ? 2 : 1;
                updateMessage();
            }
        }
    });
});

function updateMessage() {
    document.querySelector('.message').textContent = `${currentPlayer === 1 ? player1 : player2}, you're up`;
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];
    return winPatterns.some(pattern => {
        if (board[pattern[0]] && board[pattern[0]] === board[pattern[1]] && board[pattern[1]] === board[pattern[2]]) {
            return true;
        }
        return false;
    });
}