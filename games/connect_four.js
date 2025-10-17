/*
1. Game is not started until player chooses 2P or CPU mode
2. In CPU mode, randomize if player or computer goes first
3. In 2P mode, alternate who goes first each game
4. Let each valid square highlight on hover
5. Show whose turn it is
6. Show a message when game ends (win or draw)
7. Add "Play Again" button after game ends


*/

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

function startCPUGame(vsComputer) {
    // Game logic here
    console.log("Game started. VS Computer:", vsComputer);

}

function computerMove() {
    // Computer move logic here
}

function start2PlayerGame(twoPlayer) {
    // Game logic here
    console.log("Game started. Two Player:", twoPlayer);
}

function checkWinCondition() {
    // Win condition logic here
}

function checkTieCondition() {
    // Tie condition logic here
}

function resetGame() {
    // Reset game state here
    gameStarted = false;
}

