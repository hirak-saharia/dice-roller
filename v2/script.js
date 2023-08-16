'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0'); // to change background when switch palyer 0 to 1
const player1El = document.querySelector('.player--1'); // // to change background when switch palyer 0 to 1

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// set initial conditions for score
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add('hidden');

// Hide the dice -- Create a hidden class in the end at style.css and then add it to the dice in the beginning at script.js  

// const scores = [0, 0]; // score of Player 1 = 0 and Score of Player 2 = 0
// let currentScore = 0; // variable that hold the current score of the current round
// let activePlayer = 0;
// let playing = true; // State variable when finished the game

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0; // current score to back to 0
    currentScore = 0; //current score set to 0
    activePlayer = activePlayer === 0 ? 1 : 0; // Reassigning active player > if the active player is 0 ? then we want the new activePlayer to be 1 :else it should be 0
    player0El.classList.toggle('player--active'); // player color change for active player
    player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function() {
    if(playing) {

    //1. Generating a randon dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);

    // 2. Display a dice - first remove the hidden class
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;


    // 3. Check for rolled 1: If true, switch to next player
    if(dice !== 1) {
        // Add dice to current score
        // currentScore = currentScore + dice;
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore; // select score element dynamically based on which is the active player right now. 
        // current0El.textContent = currentScore; // change leter

    } else {
        //switch to next player

        // document.getElementById(`current--${activePlayer}`).textContent = 0; // current score to back to 0
        // currentScore = 0; //current score set to 0
        // activePlayer = activePlayer === 0 ? 1 : 0; // Reassigning active player > if the active player is 0 ? then we want the new activePlayer to be 1 :else it should be 0
        // player0El.classList.toggle('player--active'); // player color change for active player
        // player1El.classList.toggle('player--active'); // // player color change for active player
        switchPlayer();
    }
}
});

// Holding score
btnHold.addEventListener('click', function() {
    if(playing) {
    // 1. Add current score to active player's score

    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore;

    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // 2. Check if player's score is >=100
    if(scores[activePlayer] >=100) {
        //Finish the game
        playing = false;
        diceEl.classList.add('hidden'); // to hide the dice after win
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
        switchPlayer();
    }

    // 3. Switch to the next player

    // document.getElementById(`current--${activePlayer}`).textContent = 0; 
    // currentScore = 0; 
    // activePlayer = activePlayer === 0 ? 1 : 0;
    // player0El.classList.toggle('player--active');
    // player1El.classList.toggle('player--active');
    // switchPlayer();

}
});

btnNew.addEventListener('click', init);
    // score0El.textContent = 0;
    // score1El.textContent = 0;
    // current0El.textContent = 0;
    // current1El.textContent = 0;
    // player0El.classList.remove('player--winner');
    // player1El.classList.remove('player--winner');
    // player0El.classList.add('player--active');
    // player1El.classList.remove('player--active');

