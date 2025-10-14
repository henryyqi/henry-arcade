/*
1. get computer choice
2. get user choice
3. compare the two choices
4. declare winner
5. play again?
*/

// button event listeners
document.getElementById('rock').addEventListener('click', () => {playGame('rock'); updateUserChoiceDisplay('rock');});
document.getElementById('paper').addEventListener('click', () => {playGame('paper'); updateUserChoiceDisplay('paper');});
document.getElementById('scissors').addEventListener('click', () => {playGame('scissors'); updateUserChoiceDisplay('scissors');});

const resultDiv = document.getElementById('result');
const scoreboardDiv = document.getElementById('scoreboard');
const secretDisplayDiv = document.getElementById('secret-display');

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', resetScores);

function updateUserChoiceDisplay(userChoice) {
    const userChoiceDiv = document.getElementById('user-choice');
    userChoiceDiv.innerHTML = `YOU CHOSE<br><img src="./rps_pics/${userChoice}_icon.png" alt="${userChoice.charAt(0).toUpperCase()} Icon" height="144" width="144" class="icon">`;
}

const computerChoiceDiv = document.getElementById('computer-choice');
function updateComputerChoiceDisplay(computerChoice) {
    computerChoiceDiv.innerHTML = `COMPUTER CHOSE<br><img src="./rps_pics/${computerChoice}_icon.png" alt="${computerChoice.charAt(0).toUpperCase()} Icon" height="144" width="144" class="icon">`;
}

// game logic

let scores = { user: 0, computer: 0, ties: 0 };
let hundredWins = [0,0]; // [user, computer]

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    updateComputerChoiceDisplay(choices[randomIndex]);
    return choices[randomIndex];
}

function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        scores.ties += 1;
        return "It's a tie!";
    }

    if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        scores.user += 1;
        return "You win!";
    } else {
        scores.computer += 1;
        return "You lose!";
    }
}

function updateScoreboard() {
    scoreboardDiv.textContent = `User: ${scores.user} | Computer: ${scores.computer} | Ties: ${scores.ties}`;
}

function displayResult(message) {
    resultDiv.textContent = message;
}

function resetScores() {
    scores = { user: 0, computer: 0, ties: 0 };
    hundredWins = [0,0];
    secretDisplayDiv.innerHTML = `<br>`;
    updateScoreboard();
    displayResult("Scores have been reset.");
}

function checkHundredWins() {
    if (scores.user >= 100 && scores.computer <100) {
        hundredWins[0] = 1;
        secretDisplayMessage();
    } else if (scores.computer >= 100 && scores.user <100) {
        hundredWins[1] = 1;
        secretDisplayMessage();
    }
}

function secretDisplayMessage() {
    if (hundredWins[0] == 1) {
        secretDisplayDiv.innerHTML = `CONGRATS! YOU REACHED 100 WINS! Don't you have something better to do?`;
    } else if (hundredWins[1] == 1) {
        secretDisplayDiv.innerHTML = `OH NO! THE COMPUTER REACHED 100 WINS BEFORE YOU! It's time to take a break...`;
    } else {
        secretDisplayDiv.innerHTML = `<br>`;
    }
}

function playGame(userChoice) {
    const computerChoice = getComputerChoice();
    const result = determineWinner(userChoice, computerChoice);
    displayResult(`${result}`);
    updateScoreboard();
    checkHundredWins();
}
