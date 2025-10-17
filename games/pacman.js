const grid = document.querySelector('.pacman-grid');
const width = 28 // 28 x 28 = 784 squares
let map_id = 0;
let currentLayout = [];
let numberOfMaps = 3;   // update this when adding new maps
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

// const layoutLevelThree = [
//     1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
//     1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
//     1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,
//     1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,
//     1,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,1,
//     1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,
//     1,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,1,
//     1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,
//     1,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,1,
//     1,1,1,1,1,1,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,1,1,1,1,1,1,
//     1,1,1,1,1,1,0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,1,1,1,1,1,1,
//     0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,1,1,1,1,1,0,1,1,1,1,1,2,2,2,2,1,1,1,1,1,0,1,1,1,1,1,1,
//     1,1,1,1,1,1,0,1,1,1,1,1,2,2,2,2,1,1,1,1,1,0,1,1,1,1,1,1,
//     1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,
//     1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1,
//     1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1,
//     1,0,1,1,1,1,0,1,1,0,0,0,0,0,3,0,0,0,0,1,1,0,1,1,1,1,0,1,
//     1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1,
//     1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1,
//     1,0,0,3,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,3,0,0,1,
//     1,0,1,0,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,0,1,0,1,
//     1,0,1,0,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,0,1,0,1,
//     1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,
//     1,0,1,1,1,1,0,1,1,0,1,1,2,2,2,2,1,1,0,1,1,0,1,1,1,1,0,1,
//     1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1,
//     1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,
//     1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1    
// ];

const squares = [];

document.getElementById('change-map-button').addEventListener('click', () => {
    map_id += 1;
    if (map_id > numberOfMaps) {
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
        // case 3:
        //     return layoutLevelThree;
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

createBoard();

function resetBoard() {
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
    const directions = [-1, +1, -width, +width];
    let direction = directions[Math.floor(Math.random() * directions.length)];

    if (ghost.timerId) clearInterval(ghost.timerId);

    ghost.timerId = setInterval(function() {
        // If the next square does NOT contain a wall and a ghost, you can go there
        if (
            !squares[ghost.currentIndex + direction].classList.contains('wall') &&
            !squares[ghost.currentIndex + direction].classList.contains('ghost') &&
            ghost.currentIndex + direction != 307 &&
            ghost.currentIndex + direction != 336
        ) {
            // You can go here
            // Remove all ghost related classes
            squares[ghost.currentIndex].classList.remove(ghost.className);
            squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost');
            // Change the current index to the new safe square
            ghost.currentIndex += direction;
            // Redraw the ghost in the new safe space
            squares[ghost.currentIndex].classList.add(ghost.className);
            squares[ghost.currentIndex].classList.add('ghost');
        } else if (
            ghost.currentIndex + direction === 307 ||
            ghost.currentIndex + direction === 336
        ) {
            if ((ghost.currentIndex -1) === 307) {
                // Remove all ghost related classes
                squares[ghost.currentIndex].classList.remove(ghost.className);
                squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost');
                ghost.currentIndex = 335;
                // Redraw the ghost in the new safe space
                squares[ghost.currentIndex].classList.add(ghost.className); 
                squares[ghost.currentIndex].classList.add('ghost');
            } else if ((ghost.currentIndex +1) === 336) {
                squares[ghost.currentIndex].classList.remove(ghost.className);
                squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost');
                ghost.currentIndex = 308;
                // Redraw the ghost in the new safe space
                squares[ghost.currentIndex].classList.add(ghost.className); 
                squares[ghost.currentIndex].classList.add('ghost');
            }
            
        } else {
            // Find a new direction to try
            direction = directions[Math.floor(Math.random() * directions.length)];
        }

        // If the ghost is in ghost lair, make it exit
        if (squares[ghost.currentIndex].classList.contains('ghost-lair')) {
            direction = -width; // Move up
        }

        // If the ghost is scared
        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost');
        }

        // If the ghost is scared and pacman is on it
        if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')) {
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
            ghost.currentIndex = ghost.startIndex;
            score +=100;
            document.getElementById('scoreboard').innerHTML = `Score: ${score}`;
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
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
        setTimeout(function() { alert('Game Over!'); }, 500);
    }
}

// Check for win
function checkForWin() {
    if (score >= 274) {
        // Stop the ghost
        ghosts.forEach(ghost => clearInterval(ghost.timerId));
        document.removeEventListener('keydown', movePacman);
        // stop timer when player wins
        stopTimer();
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

