/*
1. get computer choice
2. get user choice
3. compare the two choices
4. declare winner
5. play again?
*/

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function getUserChoice() {
    let userInput = prompt("Enter rock(r), paper(p), or scissors(s):").toLowerCase();
    while (!['rock', 'paper', 'scissors','r','p','s'].includes(userInput)) {
        userInput = prompt("Invalid choice. Please enter rock(r), paper(p), or scissors(s):").toLowerCase();
    }
    if (userInput === 'r') userInput = 'rock';
    if (userInput === 'p') userInput = 'paper';
    if (userInput === 's') userInput = 'scissors';

    return userInput;
}

function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return "It's a tie!";
    }

    if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return "You win!";
    } else {
        return "Computer wins!";
    }
}

function playGame() {
    const userChoice = getUserChoice();
    const computerChoice = getComputerChoice();
    const result = determineWinner(userChoice, computerChoice);

    alert(`You chose: ${userChoice}\nComputer chose: ${computerChoice}\n${result}`);
}

playGame();