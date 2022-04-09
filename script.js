'use strict';
let player1Score = document.getElementById('score--0');
let player2Score = document.getElementById('score--1');
let dice = document.querySelector('.dice');
let player1CurrentScoreDisplay = document.getElementById('current--0');
let player2CurrentScoreDisplay = document.getElementById('current--1');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');
let btnNew = document.querySelector('.btn--new');
// Just game starts
let player1 = document.querySelector('.player--0');
let player2 = document.querySelector('.player--1');
let player1CurrentScore, player2CurrentScore;
let togglePlayer, choosePlayer, player1Win;

//Resets the game
const newGame = function() {
    player1Score.textContent = 0;
    player2Score.textContent = 0;
    player1CurrentScore = 0;
    player2CurrentScore = 0;
    dice.classList.add('hidden');
    btnNew.classList.add('hidden');
    togglePlayer = true;
    choosePlayer = true;
    player1Win = false;
    player1.classList.remove('player--winner');
    player2.classList.remove('player--winner');
    player2.classList.remove('player--active');
    player1.classList.add('player--active');
    btnHold.disabled = false;
    btnRoll.disabled = false;
}

newGame();

// Shows the dice with a random score
const rollDice = function() {
    const randomDiceNumber = Math.floor(Math.random() * 6) + 1;
    dice.src = `images/dice-${randomDiceNumber}.png`;
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
    const score = rollDice();

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
    btnNew.classList.remove('hidden');
    btnHold.disabled = true;
    btnRoll.disabled = true;
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

//Click event on the roll the dice button
btnRoll.addEventListener('click', gameLogic);

//Click event on the hold button
btnHold.addEventListener('click', holdScore);

//Click event on the New Game button
btnNew.addEventListener('click', newGame);