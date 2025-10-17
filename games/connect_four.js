/*
1. Game is not started until player chooses 2P or CPU mode
2. In CPU mode, randomize if player or computer goes first
3. In 2P mode, alternate who goes first each game
4. Let each valid square highlight on hover
5. Show whose turn it is
6. Show a message when game ends (win or draw)
7. Add "Play Again" button after game ends
*/

// build the grid
let board = [];
for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.setAttribute('data-row', row);
        square.setAttribute('data-column', col);
        document.getElementById('board').appendChild(square);
        board.push(square);
    }
}

let gameStarted = false;

document.getElementById('two-player-button').addEventListener('click', () => {
    if (gameStarted) return;
    gameStarted = true;
    start2PlayerGame(true);
});

document.getElementById('vs-computer-button').addEventListener('click', () => {
    if (gameStarted) return;
    gameStarted = true;
    startCPUGame(true);
});

// Add event listeners to valid squares for hover effect
const squares = document.querySelectorAll('.square');
squares.forEach(square => {
    square.addEventListener('mouseover', () => {
        if (!gameStarted) return;
        square.classList.add('highlight');
    });
    square.addEventListener('mouseout', () => {
        square.classList.remove('highlight');
    });
});

// When a square is clicked, the game piece falls to the lowest available position
squares.forEach(square => {
    square.addEventListener('click', () => {
        if (!gameStarted) return;
        const column = parseInt(square.getAttribute('data-column'));
        // Find the lowest available row in this column
        for (let row = 0; row < 6; row++) {
            const targetSquare = document.querySelector(`.square[data-row="${row}"][data-column="${column}"]`);
            if (!targetSquare.classList.contains('red') && !targetSquare.classList.contains('yellow')) {
                // Place the piece here
                // Assume currentPlayer is a global variable tracking whose turn it is
                if (currentPlayer === 'red') {
                    targetSquare.classList.add('red');
                } else {
                    targetSquare.classList.add('yellow');
                }
                // Check for win or tie conditions here
                if (checkWinCondition()) {
                    alert(`${currentPlayer.toUpperCase()} wins!`);
                    resetGame();
                } else if (checkTieCondition()) {
                    alert("It's a tie!");
                    resetGame();
                } else {
                    // Switch players
                    currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
                    document.getElementById('status').innerText = `${currentPlayer.toUpperCase()}'s turn`;
                    // If playing against CPU and it's CPU's turn, make CPU move
                    if (vsComputer && currentPlayer === 'yellow') {
                        computerMove();
                    }
                }
                break;
            }
        }
    });
});


// function startCPUGame(vsComputer) {
//     // Game logic here
//     console.log("Game started. VS Computer:", vsComputer);

// }

function computerMove() {
    // Computer move logic here
    // Find a column touching the most number of opponent pieces, if tied choose randomly among them

    console.log("Computer is making a move.");
}

// function start2PlayerGame(twoPlayer) {
//     // show in status whose turn it is
//     document.getElementById('status').innerText = "RED's turn";
// }

function checkWinCondition(board, row, col, piece) {
    // Win condition logic here
    // Check if any row, column, or diagonal has 4 same colored pieces in a row
    const directions = [
        [0,1],  // horizontal
        [1,0],  // vertical
        [1,1],  // diagonal down-right
        [1,-1]  // diagonal down-left
    ];

    for (let [dx, dy] of directions) {
        let count = 1; // count includes the current piece

        // Check in the positive direction
        count += countPieces(board, row, col, dx, dy, piece);
        // Check in the negative direction
        count += countPieces(board, row, col, -dx, -dy, piece);

        if (count >= 4) return true; // found 4 in a row
        
    }
    return false;
}

function countPieces(board, row, col, dx, dy, piece) {
    let count = 0;
    let r = row + dx;
    let c = col + dy;

    while (r >= 0 && r < board.length && c >= 0 && c < board[0].length && board[r][c] === piece) {
        count++;
        r += dx;
        c += dy;
    }
    return count;
}

function checkTieCondition() {
    // If all squares are filled and no winner, it's a tie
    for (let square of board) {
        if (!square.classList.contains('red') && !square.classList.contains('yellow')) {
            return false; // found an empty square
        }
    }
    return true; // all squares filled

}

function resetGame() {
    // Reset game state here
    gameStarted = false;
    board.forEach(square => {
        square.classList.remove('red');
        square.classList.remove('yellow');
    });
    document.getElementById('status').innerText = "Click '2 Player' or 'VS Computer' to start a new game.";
}

