// Create the Card class
class Card {
    constructor(suit, rank, value) {
        this.suit = suit;
        this.rank = rank;
        this.value = value;
    }
}

// Create the Deck class
class Deck {
    constructor() {
        this.cards = [];
        const suits = ['♥', '♦', '♠', '♣'];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const values = {
            '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
            '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': 11
        };
        for (let suit of suits) {
            for (let rank of ranks) {
                this.cards.push(new Card(suit, rank, values[rank]));
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
            if (['J', 'Q', 'K'].includes(card.rank)) {
                value += 10;
            } else if (card.rank === 'A') {
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
        this.playerSplitHand = new Hand(); // for future split functionality
        this.handIsSplit = false;
        this.activeSplitHand = 1; // 1 or 2 when a split occurs; indicates which hand the player is currently playing
        this.initialBet = 10; // store the user's base bet separately
        this.totalStaked = 0; // total money currently deducted/at risk for this round
        // Settling bets
        this.playerMoney = new PlayerMoney(1000);
        this.betAmount = 10; // default bet amount

        // Game state variables
        this.playerGotBlackjack = false;
        this.dealerGotBlackjack = false;
        this.playerBust = false;
        this.playerSplitBust = false;
        this.dealerBust = false;
        this.playerWin = false;
        this.playerSplitWin = false;
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
        this.playerSplitHand = new Hand(); // for future split functionality
        this.handIsSplit = false;
        this.activeSplitHand = 1;
        this.initialBet = this.betAmount || 10;
        this.totalStaked = 0;
        // Reset game state variables
        this.playerGotBlackjack = false;
        this.dealerGotBlackjack = false;
        this.playerBust = false;
        this.playerSplitBust = false;
        this.dealerBust = false;
        this.playerWin = false;
        this.playerSplitWin = false;
        this.isGameOver = true;
    }

    settleBet() {
        // Settle bets based on totalStaked and per-hand outcomes.
        // If no stake was deducted, nothing to do.
        if (!this.totalStaked || this.totalStaked <= 0) return;

        const b = this.initialBet || this.betAmount;

        if (!this.handIsSplit) {
            // Single-hand settlement
            if (this.playerGotBlackjack) {
                // Blackjack pays 3:2 -> return stake + 1.5x profit = 2.5 * base bet
                this.playerMoney.win(Math.round(b * 2.5));
            } else if (this.playerWin === true) {
                // Normal win: return stake + equal profit (1:1)
                this.playerMoney.win(this.totalStaked * 2);
            } else if (this.playerWin === null) {
                // Push/tie: return stake
                this.playerMoney.win(this.totalStaked);
            } else {
                // Loss: stake already deducted
            }
        } else {
            // Split settlement: treat each hand independently (each hand has stake = b)
            // First hand
            if (this.playerWin === true) {
                this.playerMoney.win(b * 2);
            } else if (this.playerWin === null) {
                this.playerMoney.win(b);
            }
            // Second (split) hand
            if (this.playerSplitWin === true) {
                this.playerMoney.win(b * 2);
            } else if (this.playerSplitWin === null) {
                this.playerMoney.win(b);
            }
        }

        // Clear totalStaked after settling
        this.totalStaked = 0;
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
            // payout handled at settle time; do not mutate betAmount here
            this.playerWin = true;
            this.blackjacks += 1;
            this.isGameOver = true;
        }
    }

    playerHit() {
        setTimeout(() => {}, 2500); // slight delay for better UX
        if (!this.isGameOver) {
            this.playerHand.addCard(this.deck.deal());
            if (this.playerHand.getValue() > 21) {
                this.playerBust = true;
                
                // check if hand is split
                if (!this.handIsSplit) {
                    this.isGameOver = true;
                } else {
                    // if hand is split, do not end game yet
                    this.isGameOver = false;
                }
            }
        }
    }

    playerHitSplitHand() {
        setTimeout(() => {}, 2500); // slight delay for better UX
        if (!this.isGameOver && this.handIsSplit) {
            this.playerSplitHand.addCard(this.deck.deal());
            if (this.playerSplitHand.getValue() > 21) {
                this.playerSplitBust = true;
                this.isGameOver = true;
            }
        }
    }

    // Hit the currently active hand (works for split or non-split games)
    playerHitActive() {
        // slight UX delay preserved
        // If not split, behave like a normal hit
        if (!this.handIsSplit) {
            this.playerHit();
            return;
        }

        // If split, hit whichever hand is active
        if (this.activeSplitHand === 1) {
            this.playerHand.addCard(this.deck.deal());
            if (this.playerHand.getValue() > 21) {
                this.playerBust = true;
                // move to second hand automatically
                this.activeSplitHand = 2;
            }
        } else {
            this.playerSplitHand.addCard(this.deck.deal());
            if (this.playerSplitHand.getValue() > 21) {
                this.playerSplitBust = true;
                this.isGameOver = true;
            }
        }
    }

    // Stand on the currently active hand: if first hand, move to second; if second, finish and let dealer play
    standActive() {
        if (!this.handIsSplit) {
            // normal stand behavior
            this.dealerPlay();
            this.isGameOver = true;
            return;
        }

        if (this.activeSplitHand === 1) {
            // move focus to second hand
            this.activeSplitHand = 2;
        } else {
            // standing on second hand -> dealer plays and finish
            this.dealerPlay();
            this.isGameOver = true;
        }
    }

    dealerPlay() {
        setTimeout(() => {}, 2500); // slight delay for better UX (no-op)
        while (this.dealerHand.getValue() < 17) {
            this.dealerHand.addCard(this.deck.deal());

            if (this.dealerHand.getValue() > 21) {
                this.dealerBust = true;
                break;
            } else if (this.dealerHand.getValue() >= 17 && this.dealerHand.getValue() <= 21) {
                break;
            }
        }
        this.isGameOver = true;
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

        if (this.handIsSplit) {
            const splitValue = this.playerSplitHand.getValue();
            if (this.playerSplitBust) {
                console.log("Player Split Hand Busts");
                this.losses += 1;
                this.playerSplitWin = false;
            } else if (this.dealerBust) {
                console.log("Dealer Busts - Player Split Hand Wins");
                this.wins += 1;
                this.playerSplitWin = true;
            } else if (splitValue > dealerValue) {
                console.log("Player Split Hand wins! Player has $" + splitValue + ", Dealer has $" + dealerValue);
                this.wins += 1;
                this.playerSplitWin = true;
            } else if (dealerValue > splitValue) {
                console.log("Dealer wins against Player Split Hand! Dealer has $" + dealerValue + ", Player has $" + splitValue);
                this.losses += 1;
                this.playerSplitWin = false;
            } else {
                console.log("It's a tie for Player Split Hand! Both have $" + splitValue);
                this.pushes += 1;
                // no change to playerSplitWin for tie
            }
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
    game.initialBet = game.betAmount; // keep a stable reference to the base bet
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
    // Restore UI to show the original/base bet and current money
    const baseBet = game.initialBet || game.betAmount || 10;
    const money = game.playerMoney.getAmount();
    const currentBetEl = document.getElementById("current-bet");
    const moneyEl = document.getElementById("player-money");
    if (currentBetEl) currentBetEl.innerText = `Current Bet: $${baseBet}`;
    if (moneyEl) moneyEl.innerText = `Money: $${money}`;
    document.getElementById("status").innerText = "Game has been reset. Click 'Start Game' to play again.";
}
// double down works but does not update who wins and loses properly yet
function startGame() {
    // initialize a new game
    if (!gameStarted) {
        // Reset game state
        game.resetGame();
        game.shuffleDeck();

        // Deal initial cards
        // Ensure player has funds for the bet and deduct stake immediately
        if (game.playerMoney.getAmount() < game.betAmount) {
            document.getElementById("status").innerText = "Insufficient funds to place that bet. Change your bet.";
            return;
        }
        // Deduct the base bet from player money and mark it as staked
        game.playerMoney.lose(game.betAmount);
        game.totalStaked = game.betAmount;
        document.getElementById("player-money").innerText = `Money: $${game.playerMoney.getAmount()}`;

        game.isGameOver = false;
        game.dealCards();
        game.checkInitialBlackjack();

        gameStarted = true;
    }
    
    updateDisplay(game);

    // check for initial blackjack
    if (game.playerGotBlackjack) {
        game.checkWhoWon();
        gameStarted = false;
        endGameWithResult(game);
        return;
    }

    // Set up hit button
    document.getElementById("hit-button").onclick = () => {
        if (!gameStarted) {
            document.getElementById("status").innerText = "Game has not started. Click 'Start Hand' to deal cards.";
            return;
        }

        game.playerHitActive();
        updateDisplay(game);

        // If split and we moved to second hand, notify player
        if (game.handIsSplit && !game.isGameOver && game.activeSplitHand === 2) {
            document.getElementById("status").innerText = "Now playing Hand 2. Use Hit/Stand for this hand.";
        }

        if (game.isGameOver) {
            game.checkWhoWon();
            updateDisplay(game);
            gameStarted = false;
            endGameWithResult(game);
        }
    };
    // Set up stand button
    document.getElementById("stand-button").onclick = () => {
        if (!gameStarted) {
            document.getElementById("status").innerText = "Game has not started. Click 'Start Hand' to deal cards.";
            return;
        }

        if (game.handIsSplit) {
            // Stand on the active hand; may move focus to second hand or finish the round
            game.standActive();
            if (!game.isGameOver) {
                updateDisplay(game);
                document.getElementById("status").innerText = "Now playing Hand 2. Use Hit/Stand for this hand.";
                return;
            }
        } else {
            game.dealerPlay();
        }

        game.checkWhoWon();
        updateDisplay(game);
        gameStarted = false;
        endGameWithResult(game);
    };
    // Set up double down button
    document.getElementById("double-down-button").addEventListener("click", () => {
    if (!gameStarted) {
        document.getElementById("status").innerText = "Game has not started. Click 'Start Hand' to deal cards.";
        return;
    }
    if (game.handIsSplit) {
        document.getElementById("status").innerText = "Cannot double down after splitting hands.";
        return;
    }
    if (game.playerHand.cards.length !== 2) {
        document.getElementById("status").innerText = "You can only double down on your initial two cards.";
        return;
    }
    // Need to have funds to cover an additional equal bet
    if (game.playerMoney.getAmount() < game.initialBet) {
        document.getElementById("status").innerText = "Insufficient funds to double down.";
        return;
    }
    // Deduct the additional bet now and update total staked
    game.playerMoney.lose(game.initialBet);
    game.totalStaked += game.initialBet;
    document.getElementById("player-money").innerText = `Money: $${game.playerMoney.getAmount()}`;
    document.getElementById("current-bet").innerText = `Current Bet: $${game.totalStaked} (Doubled)`;
    // Player hits once (on the active hand)
    game.playerHitActive();
    updateDisplay(game);
    
    // check for bust immediately after double down hit
    if (game.isGameOver) {
        game.checkWhoWon();
        document.getElementById("current-bet").innerText = `Current Bet: $${game.totalStaked}`;
        updateDisplay(game);
        gameStarted = false;
        endGameWithResult(game);
        return;
    }
    // Then stand (after double down the player automatically stands)
    game.dealerPlay();
    game.checkWhoWon();

    document.getElementById("current-bet").innerText = `Current Bet: $${game.totalStaked}`;
    updateDisplay(game);
    gameStarted = false;
    endGameWithResult(game);
    });
    
    // Set up split hand button (split hits both hands at the same time - updated to sequential with UX delay)
    document.getElementById("split-hand-button").addEventListener("click", () => {
    if (!gameStarted) {
        document.getElementById("status").innerText = "Game has not started. Click 'Start Hand' to deal cards.";
        return;
    }
    if (game.playerHand.cards.length !== 2 || game.playerHand.cards[0].value !== game.playerHand.cards[1].value) {
        document.getElementById("status").innerText = "You can only split when you have two cards of the same value.";
        return;
    }
    // need funds for an additional equal bet (we already deducted the initial bet at start)
    if (game.playerMoney.getAmount() < game.initialBet) {
        document.getElementById("status").innerText = "Insufficient funds to split hand.";
        return;
    }

    // Split the hand
    const firstCard = game.playerHand.cards[0];
    const secondCard = game.playerHand.cards[1];
    game.playerHand = new Hand();
    game.playerHand.addCard(firstCard);
    game.playerSplitHand = new Hand();
    game.playerSplitHand.addCard(secondCard);
    game.handIsSplit = true;
    game.activeSplitHand = 1; // start with the first split hand
    // deduct the second hand stake
    game.playerMoney.lose(game.initialBet);
    game.totalStaked += game.initialBet;
    document.getElementById("player-money").innerText = `Money: $${game.playerMoney.getAmount()}`;
    document.getElementById("current-bet").innerText = `Current Bet: $${game.totalStaked} (Split)`;

    // Visual cue and message
    document.getElementById("status").innerText = "Hand split! Now playing Hand 1. Use Hit/Stand for this hand.";

    updateDisplay(game);
    document.getElementById("status").innerText = "Hand split! Play each hand separately.";

    });
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
    // Check for split hands first (before early returns)
    if (game.handIsSplit) {
        const playerCards = game.playerHand.cards.map(card => `${card.value}${card.suit}`).join(' ');
        const playerSplitCards = game.playerSplitHand.cards.map(card => `${card.value}${card.suit}`).join(' ');
        
        // Show split hands appropriately
        if (!game.isGameOver) {
            const dealerCards = `${game.dealerHand.cards[0].value}${game.dealerHand.cards[0].suit} ??`;
            document.getElementById("player-hand").innerText = `Player Hand 1: ${playerCards} (Value: ${game.playerHand.getValue()})`;
            document.getElementById("player-split-hand").innerText = `Player Hand 2: ${playerSplitCards} (Value: ${game.playerSplitHand.getValue()})`;
            document.getElementById("dealer-hand").innerText = `Dealer Cards: ${dealerCards} (Value: ??)`;
            // toggle active-hand visual indicator
            const h1 = document.getElementById("player-hand");
            const h2 = document.getElementById("player-split-hand");
            if (h1 && h2) {
                if (game.activeSplitHand === 1) {
                    h1.classList.add('active-hand');
                    h2.classList.remove('active-hand');
                } else {
                    h2.classList.add('active-hand');
                    h1.classList.remove('active-hand');
                }
            }
        } else {
            // Game over with split
            const dealerCards = game.dealerHand.cards.map(card => `${card.value}${card.suit}`).join(' ');
            document.getElementById("player-hand").innerText = `Player Hand 1: ${playerCards} (Value: ${game.playerHand.getValue()})`;
            document.getElementById("player-split-hand").innerText = `Player Hand 2: ${playerSplitCards} (Value: ${game.playerSplitHand.getValue()})`;
            document.getElementById("dealer-hand").innerText = `Dealer Cards: ${dealerCards} (Value: ${game.dealerHand.getValue()})`;
            // clear active indicator on game over
            const h1 = document.getElementById("player-hand");
            const h2 = document.getElementById("player-split-hand");
            if (h1) h1.classList.remove('active-hand');
            if (h2) h2.classList.remove('active-hand');
        }
        return;
    }

    // If game is not over, only show one card from dealer (no split case)
    if (!game.isGameOver || (game.isGameOver && game.playerBust) || (game.isGameOver && game.playerGotBlackjack)) {
        const playerCards = game.playerHand.cards.map(card => `${card.rank}${card.suit}`).join(' ');
        const dealerCards = `${game.dealerHand.cards[0].value}${game.dealerHand.cards[0].suit} ??`;

        document.getElementById("player-hand").innerText = `Player Cards: ${playerCards} (Value: ${game.playerHand.getValue()})`;
        document.getElementById("player-split-hand").innerText = '';
        document.getElementById("dealer-hand").innerText = `Dealer Cards: ${dealerCards} (Value: ??)`;
        // ensure no active-hand visual remains when not split
        const h1 = document.getElementById("player-hand");
        const h2 = document.getElementById("player-split-hand");
        if (h1) h1.classList.remove('active-hand');
        if (h2) h2.classList.remove('active-hand');
        return;
    } else {
        // Show all cards (normal, no split)
        const playerCards = game.playerHand.cards.map(card => `${card.rank}${card.suit}`).join(' ');
        const dealerCards = game.dealerHand.cards.map(card => `${card.rank}${card.suit}`).join(' ');

        document.getElementById("player-hand").innerText = `Player Cards: ${playerCards} (Value: ${game.playerHand.getValue()})`;
        document.getElementById("player-split-hand").innerText = '';
        document.getElementById("dealer-hand").innerText = `Dealer Cards: ${dealerCards} (Value: ${game.dealerHand.getValue()})`;
        // ensure no active-hand visual remains when not split
        const h1 = document.getElementById("player-hand");
        const h2 = document.getElementById("player-split-hand");
        if (h1) h1.classList.remove('active-hand');
        if (h2) h2.classList.remove('active-hand');
    }
    
}

// when hitting a split hand, both hands are hit simultaneously - needs to be sequential instead
// displaying Ace shows 11 but should be A
// double down only shows A as 11 but should have option to be 1