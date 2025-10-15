/*

1. randomly decide if player is X or O
2. if player is X, computer is O, player goes first
3. if player is O, computer is X, computer goes first
4. if computer goes first, randomly place an X in an empty square
5. wait for player to click an empty square
6. computer randomly puts their piece in an empty square
7. check for win/tie after every turn
8. if win/tie, display message and reset board after a few seconds
9. if no win/tie, continue until win/tie

*/
// set board and pieces
let board = ['', '', '', 
             '', '', '', 
             '', '', ''];
let playerPiece = whoGoesFirst();
let computerPiece = playerPiece === 'X' ? 'O' : 'X';
let gameOn = false;
let scores = { user: 0, computer: 0, ties: 0 };
updateScoreboard();
document.getElementById('status').innerText = `You are ${playerPiece}. Click "Start Game" to begin!`;

function startGame() {
    resetBoard();
    gameOn = true;
    document.getElementById('status').innerText = 'Game started!';
}

function whoGoesFirst() {
    const choices = ['X', 'O'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function updateScoreboard() {
    const scoreboardDiv = document.getElementById('scoreboard');
    scoreboardDiv.innerText = `|  User: ${scores.user}   |   Computer: ${scores.computer}   |   Ties: ${scores.ties}  |`;
}

function resetScores() {
    scores = { user: 0, computer: 0, ties: 0 };
    updateScoreboard();
}

function computerMove(board, computerPiece) {
    // find all empty cells
    let emptyCells = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            emptyCells.push(i);
        }
    }
    // randomly choose one of the empty cells
    if (emptyCells.length === 0) return; // no moves left
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const move = emptyCells[randomIndex];
    board[move] = computerPiece;
    document.getElementById(`cell-${move}`).innerHTML = `<img src="./tic_tac_toe_pics/${computerPiece}.png" alt="${computerPiece} Icon" height="128" width="128" class="icon">`;
}

function checkWin(board, piece) {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winConditions.some(condition => 
        condition.every(index => board[index] === piece)
    );
}

function checkTie(board) {
    return board.every(cell => cell !== '');
}

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    for (let i = 0; i < 9; i++) {
        document.getElementById(`cell-${i}`).innerText = '';
    }
    playerPiece = whoGoesFirst();
    computerPiece = playerPiece === 'X' ? 'O' : 'X';
    document.getElementById('status').innerText = `You are ${playerPiece}. Click "Start Game" to begin!`;
}

document.getElementById('start-button').addEventListener('click', () => {
    if (!gameOn) {
        startGame();
        // player moves first if X
        document.getElementById('status').innerText = `You are ${playerPiece}. ${playerPiece === 'X' ? "Your turn!" : "Computer's turn!"}`;
        // computer moves first if X
        if (computerPiece === 'X') {
            computerMove(board, computerPiece);
            document.getElementById('status').innerText = `You are ${playerPiece}. Your turn!`;
        }
    }
});

document.querySelectorAll('.tic-tac-toe-cell').forEach(cell => {
    cell.addEventListener('click', () => {
        if (!gameOn) return; // game not started
        const cellIndex = parseInt(cell.id.split('-')[1]);
        if (board[cellIndex] !== '') return; // cell already taken

        // player's move
        board[cellIndex] = playerPiece;
        cell.innerHTML = `<img src="./tic_tac_toe_pics/${playerPiece}.png" alt="${playerPiece} Icon" height="128" width="128" class="icon">`;

        if (checkWin(board, playerPiece)) {
            document.getElementById('status').innerText = 'You win!';
            scores.user += 1;
            updateScoreboard();
            gameOn = false;
            setTimeout(resetBoard, 3000);
            return;
        }

        if (checkTie(board)) {
            document.getElementById('status').innerText = "It's a tie!";
            scores.ties += 1;
            updateScoreboard();
            gameOn = false;
            setTimeout(resetBoard, 3000);
            return;
        }

        // computer's move
        document.getElementById('status').innerText = "Computer's turn!";
        setTimeout(() => {
            computerMove(board, computerPiece);

            if (checkWin(board, computerPiece)) {
                document.getElementById('status').innerText = 'Computer wins!';
                scores.computer += 1;
                updateScoreboard();
                gameOn = false;
                setTimeout(resetBoard, 3000);
                return;
            }

            if (checkTie(board)) {
                document.getElementById('status').innerText = "It's a tie!";
                scores.ties += 1;
                updateScoreboard();
                gameOn = false;
                setTimeout(resetBoard, 3000);
                return;
            }

            document.getElementById('status').innerText = 'Your turn!';
        });
    });
});

document.getElementById('reset-scores').addEventListener('click', resetScores);
document.getElementById('reset-board').addEventListener('click', resetBoard);
