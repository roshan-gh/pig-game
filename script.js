'use strict';
let player1Score = document.getElementById('score--0');
let player2Score = document.getElementById('score--1');
let dice = document.querySelector('.dice');
let player1CurrentScoreDisplay = document.getElementById('current--0');
let player2CurrentScoreDisplay = document.getElementById('current--1');
let newGameButton = document.querySelector('.btn--new');
// Just game starts
let player1 = document.querySelector('.player--0');
let player2 = document.querySelector('.player--1');
player1Score.textContent = 0;
player2Score.textContent = 0;
let player1CurrentScore = 0;
let player2CurrentScore = 0;
dice.classList.add('hidden');
newGameButton.classList.add('hidden');
let togglePlayer = true;
let choosePlayer = true;
let player1Win = false;

// Shows the dice with a random score
const rollDice = function() {
    const randomDiceNumber = Math.floor(Math.random() * 6) + 1;
    document.querySelector('img').setAttribute('src', `images/dice-${randomDiceNumber}.png`);
    dice.classList.remove('hidden');
    return randomDiceNumber;
}

// Switches between players
const switchPlayer = function() {

    if (choosePlayer) {
        choosePlayer = false;
        player1.classList.remove('player--active');
        player2.classList.add('player--active');
        player1CurrentScore = 0;
        player1CurrentScoreDisplay.textContent = 0;
    } else {
        choosePlayer = true;
        player2.classList.remove('player--active');
        player1.classList.add('player--active');
        player2CurrentScore = 0;
        player2CurrentScoreDisplay.textContent = 0;
    }
    return choosePlayer;
}

// Main game logic
const gameLogic = function() {
    let score = rollDice();

    if (score !== 1 && togglePlayer === true) {
        player1CurrentScore += score;
        player1CurrentScoreDisplay.textContent = String(player1CurrentScore);

    } else if (score !== 1 && togglePlayer === false) {
        player2CurrentScore += score;
        player2CurrentScoreDisplay.textContent = String(player2CurrentScore);
    } else {
        togglePlayer = switchPlayer();
    }
}

const winGame = function(win) {
    if (win) {
        console.log("p1 wins");
        player1.classList.add('player--winner');
        player2.classList.remove('player--active');
    } else {
        console.log("p2 wins");
        player2.classList.add('player--winner');
        player1.classList.remove('player--active');
    }
    newGameButton.classList.remove('hidden');
}

// Sums the current score to scores
const holdScore = function() {

    if (togglePlayer === true) {
        player1Score.textContent = Number(player1Score.textContent) + player1CurrentScore;
        if (Number(player1Score.textContent) >= 10) {
            player1Win = true;
            winGame(player1Win);
        }
        togglePlayer = switchPlayer();
    } else {
        player2Score.textContent = Number(player2Score.textContent) + player2CurrentScore;
        if (Number(player2Score.textContent) >= 10) {
            player1Win = false;
            winGame(player1Win);
        }
        togglePlayer = switchPlayer();
    }
}

//Resets the game
const newGame = function() {
    player1Score.textContent = 0;
    player2Score.textContent = 0;
    let player1CurrentScore = 0;
    let player2CurrentScore = 0;
    dice.classList.add('hidden');
    newGameButton.classList.add('hidden');
    let togglePlayer = true;
    let choosePlayer = true;
    let player1Win = false;
    player1.classList.remove('player--winner');
    player2.classList.remove('player--winner');
    player2.classList.remove('player--active');
    player1.classList.add('player--active');

}

//Click event on the roll the dice button
document.querySelector('.btn--roll').addEventListener('click', gameLogic);

//Click event on the hold button
document.querySelector('.btn--hold').addEventListener('click', holdScore);

//Click event on the New Game button
document.querySelector('.btn--new').addEventListener('click', newGame);