'use strict';

// Selecting elements
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnDice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const player0 = document.querySelector('.player--0 ');
const player1 = document.querySelector('.player--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
btnDice.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

// Rolling dice

btnRoll.addEventListener('click', function () {
  // Generating random dice roll
  const num = Math.trunc(Math.random() * 6) + 1;
  console.log(num);

  // Display the dice image
  btnDice.classList.remove('hidden');
  btnDice.src = `dice-${num}.png`;

  // Logic to check if it is 1

  if (num !== 1) {
    currentScore += num;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  }
  // Switch to next player
  else {
    document.getElementById(`current--${activePlayer}`).textContent = '0';
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');

    // Breaking the phase of switching
    activePlayer = activePlayer === 0 ? 1 : 0;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--active');
    currentScore = 0;
  }
});

// Hold button

btnHold.addEventListener('click', function () {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  // Check if score >=100
  if (scores[activePlayer] >= 50) {
    document
      .querySelector(`.player--${activePlayer} `)
      .classList.add('player--winner');
    btnRoll.classList.add('hidden');
    btnHold.classList.add('hidden');
    btnDice.classList.add('hidden');
  }
  // Switch player
  document.getElementById(`current--${activePlayer}`).textContent = '0';
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');

  // Breaking the phase of switching
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  currentScore = 0;
});

// Resetting the game

btnNew.addEventListener('click', function () {
  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');
  btnDice.classList.add('hidden');
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer} `)
    .classList.remove('player--winner');
  scores[0] = 0;
  scores[1] = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  activePlayer = 0;
});
