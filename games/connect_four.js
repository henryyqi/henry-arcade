// Connect Four fixed implementation
// Uses .connect-four-grid as the board container and supports 2-player mode and vs-computer stub

const ROWS = 6;
const COLS = 7;
const gridEl = document.querySelector('.connect-four-grid');
const statusEl = document.getElementById('status');

// internal board state: null | 'red' | 'yellow'
let state = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
let cells = []; // flat array of cell elements for quick access
let gameStarted = false;
let vsComputer = false;
let currentPlayer = 'red';

function buildGrid() {
    gridEl.innerHTML = '';
    cells = [];
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const div = document.createElement('div');
            div.className = 'square';
            div.dataset.row = r;
            div.dataset.column = c;
            // click on column should attempt to drop a piece into that column
            div.addEventListener('click', () => onColumnClick(c));
            // hover preview: highlight the target cell where a piece would fall
            div.addEventListener('mouseover', () => onColumnHover(c));
            div.addEventListener('mouseout', () => clearColumnHover(c));
            gridEl.appendChild(div);
            cells.push(div);
        }
    }
}

function onColumnHover(col) {
    if (!gameStarted) return;
    // find lowest empty row
    for (let r = ROWS - 1; r >= 0; r--) {
        if (!state[r][col]) {
            const idx = r * COLS + col;
            cells[idx].classList.add('highlight');
            break;
        }
    }
}

function clearColumnHover(col) {
    // remove highlight from any cell in this column
    for (let r = 0; r < ROWS; r++) {
        const idx = r * COLS + col;
        cells[idx].classList.remove('highlight');
    }
}

function onColumnClick(col) {
    if (!gameStarted) return;
    // drop piece to lowest empty row (largest row index)
    for (let r = ROWS - 1; r >= 0; r--) {
        if (!state[r][col]) {
            placePiece(r, col, currentPlayer);
            if (checkWin(r, col, currentPlayer)) {
                statusEl.innerText = `${currentPlayer.toUpperCase()} wins!`;
                gameStarted = false;
                return;
            }
            if (checkTie()) {
                statusEl.innerText = "It's a tie!";
                gameStarted = false;
                return;
            }
            // switch player
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            statusEl.innerText = `${currentPlayer.toUpperCase()}'s turn`;
            // stub: if vsComputer and it's yellow's turn, call computerMove
            if (vsComputer && currentPlayer === 'yellow') {
                setTimeout(computerMove, 300);
            }
            return;
        }
    }
    // column full
}

function placePiece(r, c, player) {
    state[r][c] = player;
    const idx = r * COLS + c;
    const el = cells[idx];
    el.classList.remove('red','yellow');
    el.classList.add(player);
}

function checkWin(row, col, player) {
    // check 4 directions
    const dirs = [ [0,1], [1,0], [1,1], [1,-1] ];
    for (const [dr, dc] of dirs) {
        let count = 1;
        count += countDir(row, col, dr, dc, player);
        count += countDir(row, col, -dr, -dc, player);
        if (count >= 4) return true;
    }
    return false;
}

function countDir(row, col, dx, dy, player) {
    let r = row + dx;
    let c = col + dy;
    let count = 0;
    while (r >= 0 && r < ROWS && c >= 0 && c < COLS && state[r][c] === player) {
        count++;
        r += dx;
        c += dy;
    }
    return count;
}

function checkTie() {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (!state[r][c]) return false;
        }
    }
    return true;
}

function resetGame() {
    state = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
    cells.forEach(el => el.classList.remove('red','yellow'));
    gameStarted = false;
    currentPlayer = 'red';
    statusEl.innerText = "Welcome to Connect Four! Choose Game Mode (2P or CPU)!";
}

function startTwoPlayer() {
    if (gameStarted) return;
    resetGame();
    gameStarted = true;
    vsComputer = false;
    statusEl.innerText = `${currentPlayer.toUpperCase()}'s turn`;
}

function startVsComputer() {
    if (gameStarted) return;
    resetGame();
    gameStarted = true;
    vsComputer = true;
    // randomize who starts
    currentPlayer = Math.random() > 0.5 ? 'red' : 'yellow';
    statusEl.innerText = `${currentPlayer.toUpperCase()}'s turn`;
    if (currentPlayer === 'yellow') setTimeout(computerMove, 300);
}

function computerMove() {
    // naive random valid column for now
    const valid = [];
    for (let c = 0; c < COLS; c++) {
        if (!state[0][c]) valid.push(c);
    }
    if (!valid.length) return;
    const choice = valid[Math.floor(Math.random() * valid.length)];
    onColumnClick(choice);
}

// wire buttons
buildGrid();
document.getElementById('two-player-button').addEventListener('click', startTwoPlayer);
document.getElementById('vs-computer-button').addEventListener('click', startVsComputer);
document.getElementById('reset-button').addEventListener('click', resetGame);

// initial status

statusEl.innerText = "Welcome to Connect Four! Choose Game Mode (2P or CPU)!";

