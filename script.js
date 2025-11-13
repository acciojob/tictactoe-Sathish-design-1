//your JS code here. If required.
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let player1, player2;

document.getElementById('submit').addEventListener('click', function() {
    player1 = document.getElementById('player-1').value;
    player2 = document.getElementById('player-2').value;
    document.querySelector('.message').innerText = `${player1}, you're up!`;
    createBoard();
});

function createBoard() {
    const boardDiv = document.querySelector('.board');
    boardDiv.innerHTML = '';
    board.forEach((cell, index) => {
        const div = document.createElement('div');
        div.classList.add('cell');
        div.id = index;
        div.innerText = cell;
        div.addEventListener('click', () => handleCellClick(index));
        boardDiv.appendChild(div);
    });
}

function handleCellClick(index) {
    if (!board[index]) {
        board[index] = currentPlayer;
        document.getElementById(index).innerText = currentPlayer;
        if (checkWin()) {
            document.querySelector('.message').innerText = `${currentPlayer === 'X' ? player1 : player2} congratulations you won!`;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.querySelector('.message').innerText = `${currentPlayer === 'X' ? player1 : player2}, you're up!`;
        }
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
        [0, 4, 8], [2, 4, 6] // diagonal
    ];
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}