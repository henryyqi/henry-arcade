const grid = document.querySelector('.pacman-grid');
const width = 28 // 28 x 28 = 784 squares
let scoreTarget = 300;
let map_id = 0;
let currentLayout = [];
let numberOfMaps = 4;   // update this when adding new maps
const layoutlevelZero = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,0,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,0,1,1,0,1,
    1,0,1,1,3,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,3,1,1,0,1,
    1,0,1,1,0,1,1,1,0,1,1,0,0,0,3,0,0,1,1,0,1,1,1,0,1,1,0,1,
    1,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,1,1,1,1,1,1,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    1,1,1,1,1,1,0,1,1,0,1,1,2,2,2,2,1,1,0,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,0,0,0,1,1,2,2,2,2,1,1,0,0,0,0,1,1,1,1,1,1,
    1,3,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,3,1,
    1,0,1,1,1,1,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,
    1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,
    1,0,1,0,0,0,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,0,0,0,1,0,1,
    1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,
    1,0,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,2,2,2,2,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    // exits at index numbers 308 and 355
];

const layoutLevelOne = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,
    1,3,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,3,1,
    1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,1,1,1,1,1,1,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    1,0,1,1,1,1,0,1,1,0,1,1,2,2,2,2,1,1,0,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,0,1,1,2,2,2,2,1,1,0,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,
    1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,
    1,0,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,2,2,2,2,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    // exits at index numbers 308 and 355
];

const layoutLevelTwo = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,1,1,1,1,1,1,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    1,1,1,1,1,1,0,1,1,1,1,1,2,2,2,2,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,1,1,1,2,2,2,2,1,1,1,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,0,0,0,0,0,3,0,0,0,0,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1,
    1,0,0,3,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,3,0,0,1,
    1,0,1,0,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,0,1,0,1,
    1,0,1,0,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,0,1,0,1,
    1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,
    1,0,1,1,1,1,0,1,1,0,1,1,2,2,2,2,1,1,0,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
];

const layoutLevelThree = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,3,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,3,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,0,0,0,0,0,3,1,1,3,0,0,0,0,0,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    1,0,1,1,1,1,1,1,1,1,1,1,2,2,2,2,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,2,2,2,2,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,0,0,0,0,0,3,0,0,0,0,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1,
    1,0,0,3,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,3,0,0,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,2,2,2,2,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,2,2,2,2,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1    
];

const squares = [];

document.getElementById('change-map-button').addEventListener('click', () => {
    map_id += 1;
    if (map_id > numberOfMaps-1) {
        map_id = 0; // Reset to first map if exceeding available maps
    }
    resetBoard();
    document.getElementById('map-number').innerHTML = `Map: ${map_id + 1}`;
});

// Get layout based on map_id

function getLayout(map_id) {
    switch(map_id) {
        case 0:
            return layoutlevelZero;
        case 1:
            return layoutLevelOne;
        case 2:
            return layoutLevelTwo;
        case 3:
            return layoutLevelThree;
        default:
            return layoutlevelZero;
    }
}


// Draw the grid
function createBoard() {
    currentLayout = getLayout(map_id);
    // Using a DocumentFragment to minimize reflows when adding many squares
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < currentLayout.length; i++) {
        const square = document.createElement('div');
        // give every square the sizing/box styles
        square.classList.add('square');
        fragment.appendChild(square);
        squares.push(square);

        // Add layout to the board
        if(currentLayout[i] === 0) {
            squares[i].classList.add('pac-dot');
        } else if (currentLayout[i] === 1) {
            squares[i].classList.add('wall');
        } else if (currentLayout[i] === 2) {
            squares[i].classList.add('ghost-lair');
        } else if (currentLayout[i] === 3) {
            squares[i].classList.add('power-pellet');
        }
    }
    grid.appendChild(fragment);
}

let gameStarted = false;
createBoard();

function resetBoard() {
    gameStarted = false;
    // Remove all squares from the grid
    squares.forEach(square => square.remove());
    squares.length = 0; // Clear the squares array
    createBoard();
    // reset timer display and stop running timer
    stopTimer();
    timeElapsed = 0;
    updateTimerDisplay();
}

// Reset game
let score = 0;
let timeElapsed = 0;
let timerIntervalId = null;
document.getElementById('scoreboard').innerHTML = `Score: ${score}`;
document.getElementById('reset-button').addEventListener('click', () => {
    // Reset board
    resetBoard();
    // Reset score
    score = 0;
    timeElapsed = 0;
    document.getElementById('status').innerHTML = '';
    document.getElementById('scoreboard').innerHTML = `Score: ${score}`;
    // Remove pacman from current position
    squares[pacmanCurrentIndex].classList.remove('pacman');
    // Reset pacman position
    pacmanCurrentIndex = 29;
    squares[pacmanCurrentIndex].classList.add('pacman');
    // Remove all ghosts
    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
        clearInterval(ghost.timerId);
        ghost.currentIndex = ghost.startIndex;
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
        moveGhost(ghost);
    });
    // Re-add event listener
    document.addEventListener('keydown', movePacman);
    // Stop the game timer
    stopTimer();
});
document.getElementById('start-button').addEventListener('click', () => {
    // Reset board
    resetBoard();
    // Reset score
    score = 0;
    timeElapsed = 0;
    document.getElementById('status').innerHTML = '';
    document.getElementById('scoreboard').innerHTML = `Score: ${score}`;
    // Remove pacman from current position
    squares[pacmanCurrentIndex].classList.remove('pacman');
    // Reset pacman position
    pacmanCurrentIndex = 29;
    squares[pacmanCurrentIndex].classList.add('pacman');
    // Remove all ghosts
    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
        clearInterval(ghost.timerId);
        ghost.currentIndex = ghost.startIndex;
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
        moveGhost(ghost);
    });
    gameStarted = true;
    // Re-add event listener
    document.addEventListener('keydown', movePacman);
    // Start the game timer
    startTimer();
});


// Starting position of pacman
let pacmanCurrentIndex = 29;
squares[pacmanCurrentIndex].classList.add('pacman');

// Move Pacman
function movePacman(e) {
    squares[pacmanCurrentIndex].classList.remove('pacman');

    switch(e.key) {
        case 'ArrowLeft':
            if(
                pacmanCurrentIndex % width !== 0 &&
                !squares[pacmanCurrentIndex -1].classList.contains('wall') &&
                !squares[pacmanCurrentIndex -1].classList.contains('ghost-lair')
            ) 
            pacmanCurrentIndex -=1;

            // check if pacman is in the left exit
            if ((pacmanCurrentIndex -1) === 307) {
                pacmanCurrentIndex = 335;
            }
            break;
        case 'ArrowUp':
            if(
                pacmanCurrentIndex - width >= 0 &&
                !squares[pacmanCurrentIndex -width].classList.contains('wall') &&
                !squares[pacmanCurrentIndex -width].classList.contains('ghost-lair')
            ) 
            pacmanCurrentIndex -=width;
            break;
        case 'ArrowRight':
            if(
                pacmanCurrentIndex % width < width -1 &&
                !squares[pacmanCurrentIndex +1].classList.contains('wall') &&
                !squares[pacmanCurrentIndex +1].classList.contains('ghost-lair')
            ) 
            pacmanCurrentIndex +=1;

            // check if pacman is in the right exit
            if ((pacmanCurrentIndex +1) === 336) {
                pacmanCurrentIndex = 308;
            }
            break;
        case 'ArrowDown':
            if(
                pacmanCurrentIndex + width < width * width &&
                !squares[pacmanCurrentIndex +width].classList.contains('wall') &&
                !squares[pacmanCurrentIndex +width].classList.contains('ghost-lair')
            ) 
            pacmanCurrentIndex +=width;
            break;
    }

    squares[pacmanCurrentIndex].classList.add('pacman');
    pacDotEaten();
    powerPelletEaten();
    checkForWin();
    checkForGameOver();
}

document.addEventListener('keydown', movePacman);

// What happens when Pacman eats a pac-dot
function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        squares[pacmanCurrentIndex].classList.remove('pac-dot');
        score++;
        document.getElementById('scoreboard').innerHTML = `Score: ${score}`;
    }
}

// What happens when Pacman eats a power-pellet
function powerPelletEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
        squares[pacmanCurrentIndex].classList.remove('power-pellet');
        score +=10;
        ghosts.forEach(ghost => ghost.isScared = true);
        setTimeout(unScareGhosts, 5000);
        document.getElementById('scoreboard').innerHTML = `Score: ${score}`;
    }
}

// Make the ghosts stop being scared
function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false);
}

// Create Ghost class template
class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className;
        this.startIndex = startIndex;
        this.speed = speed;
        this.currentIndex = startIndex;
        this.timerId = null;
        this.isScared = false;
    }
}

// All my ghosts
const ghosts = [
    new Ghost('crow', 376, 400),
    new Ghost('seagull', 684, 400),
    new Ghost('pigeon', 379, 500),
    new Ghost('hawk', 687, 500)
];

// Draw my ghosts onto the grid
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className);
    squares[ghost.currentIndex].classList.add('ghost');
});

// Move the ghosts randomly
ghosts.forEach(ghost => moveGhost(ghost));

function moveGhost(ghost) {
    // BFS helper: find next step from start towards target avoiding walls
    function bfsNextStep(startIdx, targetIdx) {
        if (startIdx === targetIdx) return startIdx;
        const max = width * width;
        const queue = [startIdx];
        const visited = new Uint8Array(max);
        const prev = new Int32Array(max).fill(-1);
        visited[startIdx] = 1;

        while (queue.length) {
            const node = queue.shift();
            const neighbors = [];
            // left
            if (node % width !== 0) neighbors.push(node - 1);
            // right
            if (node % width < width - 1) neighbors.push(node + 1);
            // up
            if (node - width >= 0) neighbors.push(node - width);
            // down
            if (node + width < max) neighbors.push(node + width);

            for (const nb of neighbors) {
                if (visited[nb]) continue;
                // skip walls
                if (squares[nb].classList.contains('wall')) continue;
                // prevent entering ghost-lair unless starting inside it
                if (squares[nb].classList.contains('ghost-lair') && !squares[startIdx].classList.contains('ghost-lair')) continue;
                visited[nb] = 1;
                prev[nb] = node;
                if (nb === targetIdx) {
                    // backtrack to find next step
                    let cur = nb;
                    let before = nb;
                    while (prev[cur] !== startIdx) {
                        cur = prev[cur];
                        if (cur === -1) break;
                    }
                    return cur === -1 ? null : cur;
                }
                queue.push(nb);
            }
        }
        return null; // no path
    }

    const directions = [-1, +1, -width, +width];

    if (ghost.timerId) clearInterval(ghost.timerId);

    ghost.timerId = setInterval(function() {
        // If the ghost is scared, use random movement (existing behavior)
        if (ghost.isScared) {
            // mark scared visual
            squares[ghost.currentIndex].classList.add('scared-ghost');
            // try a random direction
            let dir = directions[Math.floor(Math.random() * directions.length)];
            const candidate = ghost.currentIndex + dir;
            if (candidate >= 0 && candidate < width * width && !squares[candidate].classList.contains('wall')) {
                // move
                // clear previous occupant metadata
                if (squares[ghost.currentIndex].dataset.occupant === 'cheese') {
                    delete squares[ghost.currentIndex].dataset.occupant;
                    if (squares[ghost.currentIndex].dataset.item) {
                        squares[ghost.currentIndex].setAttribute('aria-label', squares[ghost.currentIndex].dataset.item.replace(/-/g, ' '));
                    } else {
                        squares[ghost.currentIndex].removeAttribute('aria-label');
                    }
                }
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
                ghost.currentIndex = candidate;
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
                squares[ghost.currentIndex].dataset.occupant = 'cheese';
                squares[ghost.currentIndex].setAttribute('aria-label', 'Ghost: cheese');
            }
        } else if (!gameStarted) {
            // keep ghosts within lair until game starts; allow movement inside lair
            let dir = directions[Math.floor(Math.random() * directions.length)];
            const candidate = ghost.currentIndex + dir;
            if (candidate >= 0 && candidate < width * width && squares[candidate].classList.contains('ghost-lair')) {
                // clear previous occupant metadata
                if (squares[ghost.currentIndex].dataset.occupant === 'cheese') {
                    delete squares[ghost.currentIndex].dataset.occupant;
                    if (squares[ghost.currentIndex].dataset.item) {
                        squares[ghost.currentIndex].setAttribute('aria-label', squares[ghost.currentIndex].dataset.item.replace(/-/g, ' '));
                    } else {
                        squares[ghost.currentIndex].removeAttribute('aria-label');
                    }
                }
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
                ghost.currentIndex = candidate;
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
                squares[ghost.currentIndex].dataset.occupant = 'cheese';
                squares[ghost.currentIndex].setAttribute('aria-label', 'Ghost: cheese');
            }
        } else {
            // gameStarted and ghost not scared: try BFS chase for Pacman
            const next = bfsNextStep(ghost.currentIndex, pacmanCurrentIndex);
            if (next !== null && next !== undefined && next !== ghost.currentIndex) {
                // move along BFS next
                if (squares[next].classList.contains('wall')) {
                    // unexpected, fallback to random
                    const dir = directions[Math.floor(Math.random() * directions.length)];
                    const candidate = ghost.currentIndex + dir;
                    if (candidate >= 0 && candidate < width * width && !squares[candidate].classList.contains('wall')) {
                        // clear previous occupant metadata
                        if (squares[ghost.currentIndex].dataset.occupant === 'cheese') {
                            delete squares[ghost.currentIndex].dataset.occupant;
                            if (squares[ghost.currentIndex].dataset.item) {
                                squares[ghost.currentIndex].setAttribute('aria-label', squares[ghost.currentIndex].dataset.item.replace(/-/g, ' '));
                            } else {
                                squares[ghost.currentIndex].removeAttribute('aria-label');
                            }
                        }
                        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
                        ghost.currentIndex = candidate;
                        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
                        squares[ghost.currentIndex].dataset.occupant = 'cheese';
                        squares[ghost.currentIndex].setAttribute('aria-label', 'Ghost: cheese');
                    }
                } else {
                    // clear previous occupant metadata
                    if (squares[ghost.currentIndex].dataset.occupant === 'cheese') {
                        delete squares[ghost.currentIndex].dataset.occupant;
                        if (squares[ghost.currentIndex].dataset.item) {
                            squares[ghost.currentIndex].setAttribute('aria-label', squares[ghost.currentIndex].dataset.item.replace(/-/g, ' '));
                        } else {
                            squares[ghost.currentIndex].removeAttribute('aria-label');
                        }
                    }
                    squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
                    ghost.currentIndex = next;
                    squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
                    squares[ghost.currentIndex].dataset.occupant = 'cheese';
                    squares[ghost.currentIndex].setAttribute('aria-label', 'Ghost: cheese');
                }
            } else {
                // No path found; fallback to random movement
                const dir = directions[Math.floor(Math.random() * directions.length)];
                const candidate = ghost.currentIndex + dir;
                if (candidate >= 0 && candidate < width * width && !squares[candidate].classList.contains('wall')) {
                    if (squares[ghost.currentIndex].dataset.occupant === 'cheese') {
                        delete squares[ghost.currentIndex].dataset.occupant;
                        if (squares[ghost.currentIndex].dataset.item) {
                            squares[ghost.currentIndex].setAttribute('aria-label', squares[ghost.currentIndex].dataset.item.replace(/-/g, ' '));
                        } else {
                            squares[ghost.currentIndex].removeAttribute('aria-label');
                        }
                    }
                    squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
                    ghost.currentIndex = candidate;
                    squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
                    squares[ghost.currentIndex].dataset.occupant = 'cheese';
                    squares[ghost.currentIndex].setAttribute('aria-label', 'Ghost: cheese');
                }
            }
        }

        // If the ghost is scared and pacman is on it
        if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')) {
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
            ghost.currentIndex = ghost.startIndex;
            score +=100;
            document.getElementById('scoreboard').innerHTML = `Score: ${score}`;
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
            squares[ghost.currentIndex].dataset.occupant = 'cheese';
            squares[ghost.currentIndex].setAttribute('aria-label', 'Ghost: cheese');
        }
        checkForGameOver();
    }, ghost.speed);
}

// Check for game over
function checkForGameOver() {
    if (
        squares[pacmanCurrentIndex].classList.contains('ghost') &&
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost')
    ) {
        // Stop the ghost
        ghosts.forEach(ghost => clearInterval(ghost.timerId));
        document.removeEventListener('keydown', movePacman);
        // stop game timer
        stopTimer();
        gameStarted = false;
        setTimeout(function() { alert('Game Over!'); }, 500);
    }
}

// Check for win
function checkForWin() {
    if (score >= scoreTarget) {
        // Stop the ghost
        ghosts.forEach(ghost => clearInterval(ghost.timerId));
        document.removeEventListener('keydown', movePacman);
        // stop timer when player wins
        stopTimer();
        gameStarted = false;
        setTimeout(function() { alert('You have WON!'); }, 500);
    }
}

// Timer functions
function updateTimerDisplay() {
    const timerEl = document.getElementById('timer');
    if (timerEl) timerEl.textContent = `Time: ${timeElapsed}s`;
}

function startTimer() {
    // avoid multiple intervals
    if (timerIntervalId) return;
    timerIntervalId = setInterval(() => {
        timeElapsed += 1;
        updateTimerDisplay();
    }, 1000);
}

function stopTimer() {
    if (timerIntervalId) {
        clearInterval(timerIntervalId);
        timerIntervalId = null;
    }
}

