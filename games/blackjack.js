// Create the Deck class
class Deck {
    constructor() {
        this.cards = [];
        const suits = ['♥', '♦', '♠', '♣'];
        const values = [
            '2', '3', '4', '5', '6', '7', '8', '9', '10',
            'J', 'Q', 'K', 'A'
        ];

        for (let suit of suits) {
            for (let value of values) {
                this.cards.push({ suit, value });
            }
        }
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    deal() {
        return this.cards.pop();
    }
}

// Create the Hand class
class Hand {
    constructor() {
        this.cards = [];
    }

    addCard(card) {
        this.cards.push(card);
    }

    getValue() {
        let value = 0;
        let aces = 0;

        for (let card of this.cards) {
            if (['J', 'Q', 'K'].includes(card.value)) {
                value += 10;
            } else if (card.value === 'A') {
                aces += 1;
                value += 11; // Initially count Ace as 11
            } else {
                value += parseInt(card.value);
            }
        }

        // Adjust for Aces if value exceeds 21
        while (value > 21 && aces > 0) {
            value -= 10;
            aces -= 1;
        }

        return value;
    }
}

class PlayerMoney {
    constructor(initialAmount) {
        this.amount = initialAmount;
    }

    win(bet) {
        this.amount += bet;
    }

    lose(bet) {
        this.amount -= bet;
    }

    getAmount() {
        return this.amount;
    }
}

// Create the BlackjackGame class
class BlackjackGame {
    constructor() {
        this.deck = new Deck();
        // this.deck.shuffle();
        this.playerHand = new Hand();
        this.dealerHand = new Hand();
        // Settling bets
        this.playerMoney = new PlayerMoney(1000);
        this.betAmount = 10; // default bet amount

        // Game state variables
        this.playerGotBlackjack = false;
        this.dealerGotBlackjack = false;
        this.playerBust = false;
        this.dealerBust = false;
        this.playerWin = false;
        this.isGameOver = true;
        // stats
        this.wins = 0;
        this.losses = 0;
        this.pushes = 0;
        this.blackjacks = 0;
    }

    resetGame() {
        this.deck = new Deck();
        this.playerHand = new Hand();
        this.dealerHand = new Hand();
        this.playerGotBlackjack = false;
        this.dealerGotBlackjack = false;
        this.playerBust = false;
        this.dealerBust = false;
        this.playerWin = false;
    }

    settleBet() {
        if (this.playerWin === true) {
            this.playerMoney.win(this.betAmount);
        } else if (this.playerWin === false) {
            this.playerMoney.lose(this.betAmount);
        }
    }

    shuffleDeck() {
        this.deck.shuffle();
    }

    dealCards() {
        this.playerHand.addCard(this.deck.deal());
        this.dealerHand.addCard(this.deck.deal());
        this.playerHand.addCard(this.deck.deal());
        this.dealerHand.addCard(this.deck.deal());
    }

    checkInitialBlackjack() {
        if (this.playerHand.getValue() === 21) {
            this.playerGotBlackjack = true;
            this.betAmount *= 1.5; // payout 3:2 for blackjack
            this.playerWin = true;
            this.blackjacks += 1;
            this.isGameOver = true;
        }
    }

    playerHit() {
        if (!this.isGameOver) {
            this.playerHand.addCard(this.deck.deal());
            if (this.playerHand.getValue() > 21) {
                this.playerBust = true;
                this.isGameOver = true;
            }
        }
    }

    dealerPlay() {
        while (this.dealerHand.getValue() < 17) {
            this.dealerHand.addCard(this.deck.deal());

            if (this.dealerHand.getValue() > 21) {
                this.dealerBust = true;
                break;
            } else if (this.dealerHand.getValue() >= 17 && this.dealerHand.getValue() <= 21) {
                break;
            }
        }
        game.isGameOver = true;
    }

    checkWhoWon() {
        const playerValue = this.playerHand.getValue();
        const dealerValue = this.dealerHand.getValue();

        if (this.playerGotBlackjack) {
            console.log("BLACKJACK!! Player Wins!");
            this.wins += 1;
            this.playerWin = true;
        } else if (this.dealerBust) {
            console.log("Dealer Busts");
            this.wins += 1;
            this.playerWin = true;
        } else if (this.playerBust) {
            console.log("Player Busts");
            this.losses += 1;
            this.playerWin = false;
        } else if (playerValue > dealerValue) {
            console.log("Player wins! Player has $" + playerValue + ", Dealer has $" + dealerValue);
            this.wins += 1;
            this.playerWin = true;
        } else if (dealerValue > playerValue) {
            console.log("Dealer wins! Dealer has $" + dealerValue + ", Player has $" + playerValue);
            this.losses += 1;
            this.playerWin = false;
        } else {
            console.log("It's a tie! Both have $" + playerValue);
            this.pushes += 1;
            this.playerWin = null; // tie
        }
    }

    getResult() {
        
        if (this.playerWin === true && this.playerGotBlackjack == true) {
            return "BLACKJACK!! Player Wins!";
        } else if (this.playerWin === true && this.dealerBust === true) {
            return "Player Wins! Dealer Busts!";
        } else if (this.playerWin === true) {
            return "Player Wins!";
        } else if (this.playerWin === false && this.playerBust === true) {
            return "Dealer Wins! Player Busts!";
        } else if (this.playerWin === false) {
            return "Dealer Wins!";
        } else {
            return "Push! It's a Tie!";
        }
    }
}

// module.exports = { Deck, Hand, BlackjackGame };

let gameStarted = false;
const game = new BlackjackGame();
let resetTimeoutId = null;
let resetIntervalId = null;

document.getElementById("bet-submit-button").addEventListener("click", (e) => {
    e.preventDefault();
    const betInput = document.getElementById("bet-input");
    game.betAmount = parseInt(betInput.value);
    console.log("Bet amount set to: $" + game.betAmount);
    if (isNaN(game.betAmount) || game.betAmount <= 0 || game.betAmount > game.playerMoney.getAmount()) {
        document.getElementById("status").innerText = "Please enter a valid bet amount.";
        return;
    }
    document.getElementById("current-bet").innerText = `Current Bet: $${game.betAmount}`;
    document.getElementById("status").innerText = `Bet of $${game.betAmount} placed. Click 'Start Hand' to deal cards.`;
});

document.getElementById("start-button").addEventListener("click", () => {
    if (gameStarted) {
        document.getElementById("status").innerText = "Game has started. Please finish the current game.";
        startGame();
    } else {
        document.getElementById("status").innerText = "Dealer is dealing cards...";
        startGame();
    }
});

document.getElementById("reset-button").addEventListener("click", () => {
    // clear any pending automatic reset and reset immediately
    clearResetCountdown();
    resetGame();
});

function resetGame() {
    game.resetGame();
    updateDisplay(game);
    clearResetCountdown();
    document.getElementById("status").innerText = "Game has been reset. Click 'Start Game' to play again.";
}

function startGame() {
    // initialize a new game
    if (!gameStarted) {
        // Reset game state
        game.resetGame();
        game.shuffleDeck();

        // Deal initial cards
        game.isGameOver = false;
        game.dealCards();
        game.checkInitialBlackjack();

        gameStarted = true;
    }
    
    updateDisplay(game);

    if (game.playerGotBlackjack) {
        game.checkWhoWon();
        gameStarted = false;
        endGameWithResult(game);
        return;
    }

    // Set up hit button
    document.getElementById("hit-button").onclick = () => {
        game.playerHit();
        updateDisplay(game);
        if (game.isGameOver) {
            game.checkWhoWon();
            updateDisplay(game);
            gameStarted = false;
            endGameWithResult(game);
        }
    };
    // Set up stand button
    document.getElementById("stand-button").onclick = () => {
        if (!game.isGameOver) {
            game.dealerPlay();
        }
        game.checkWhoWon();
        updateDisplay(game);
        gameStarted = false;
        endGameWithResult(game);
    };
}

function endGameWithResult(game) {
    updateDisplay(game);
    const result = game.getResult();
    document.getElementById("status").innerText = result;
    game.settleBet();
    document.getElementById("player-money").innerText = `Money: $${game.playerMoney.getAmount()}`;
    document.getElementById("current-record").innerText = `Wins: ${game.wins} || Losses: ${game.losses} || Pushes: ${game.pushes} || Win %: ${game.wins + game.losses + game.pushes > 0 ? Math.round((game.wins / (game.wins + game.losses + game.pushes)) * 100) : 0}% || Blackjacks: ${game.blackjacks}`;
    // start a visible countdown and then reset
    startResetCountdown(5000);
}

function startResetCountdown(durationMs) {
    clearResetCountdown();
    const timerEl = document.getElementById('reset-timer');
    if (!timerEl) return;
    const end = Date.now() + durationMs;
    /
    const update = () => {
        const remaining = Math.max(0, end - Date.now());
        const secs = Math.ceil(remaining / 1000);
        timerEl.innerText = `Resetting in ${secs}s`;
    };
    update();
    resetIntervalId = setInterval(update, 250);
    resetTimeoutId = setTimeout(() => {
        clearResetCountdown();
        resetGame();
    }, durationMs);
}

function clearResetCountdown() {
    if (resetIntervalId) {
        clearInterval(resetIntervalId);
        resetIntervalId = null;
    }
    if (resetTimeoutId) {
        clearTimeout(resetTimeoutId);
        resetTimeoutId = null;
    }
    const timerEl = document.getElementById('reset-timer');
    if (timerEl) timerEl.innerText = '';
}

function updateDisplay(game) {
    // If game is not over, only show one card from dealer
    if (!game.isGameOver || (game.isGameOver && game.playerBust) || (game.isGameOver && game.playerGotBlackjack)) {
        const playerCards = game.playerHand.cards.map(card => `${card.value}${card.suit}`).join(' ');
        const dealerCards = `${game.dealerHand.cards[0].value}${game.dealerHand.cards[0].suit} ??`;

        document.getElementById("player-hand").innerText = `Player Cards: ${playerCards} (Value: ${game.playerHand.getValue()})`;
        document.getElementById("dealer-hand").innerText = `Dealer Cards: ${dealerCards} (Value: ??)`;
        return;
    } else {
        // Show all cards
        const playerCards = game.playerHand.cards.map(card => `${card.value}${card.suit}`).join(' ');
        const dealerCards = game.dealerHand.cards.map(card => `${card.value}${card.suit}`).join(' ');

        document.getElementById("player-hand").innerText = `Player Cards: ${playerCards} (Value: ${game.playerHand.getValue()})`;
        document.getElementById("dealer-hand").innerText = `Dealer Cards: ${dealerCards} (Value: ${game.dealerHand.getValue()})`;
    }
    
}

// push if both player and dealer have natural blackjack