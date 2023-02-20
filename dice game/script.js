'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const player0Score = document.getElementById('score--0');
const player1Score = document.getElementById('score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
/** modal selections */
const btnRules = document.querySelector('.btn--rules');
const btnCloseModal = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');

let playing, currentScore, activePlayer, scores; //without this line, other function couldn't get these variables,because  those are only assigned inside the init function.

const init = function () {
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0Score.textContent = 0;
  player1Score.textContent = 0;
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0]; //created to store players' total points
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init(); // provides initial settings whenever the browser renewed,therefore it is called

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //reassinning activePlayer
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //swithc to the next player,
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score to the player's total point
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //check if the total point is equal to 100.if so player wins
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      playing = false;
    }

    //switch to the next player
    switchPlayer();
  }
});
btnNew.addEventListener('click', init);
/**modal functioning */
function openModal() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}
function closeModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}
btnRules.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
