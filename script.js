"use strict";

const score0El = document.getElementById("score--0");
const current0El = document.getElementById("current--0");
const score1El = document.getElementById("score--1");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const playerE0 = document.querySelector(".player--0 ");
const playerE1 = document.querySelector(".player--1");
let scores, playing, currntScore, activeplayer;
const init = function () {
  scores = [0, 0];
  playing = true;
  currntScore = 0;
  activeplayer = 0;

  // start of the game
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");
  playerE0.classList.remove("player--winner");
  playerE1.classList.remove("player--winner");
  playerE0.classList.add("player--active");
  playerE1.classList.remove("player--active");
};
init();

const switchPlayer = () => {
  currntScore = 0;
  document.getElementById(`current--${activeplayer}`).textContent = currntScore;
  activeplayer = activeplayer == 0 ? 1 : 0;
  playerE0.classList.toggle("player--active");
  playerE1.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    //create a random dice
    const dice = Math.trunc(Math.random() * 6 + 1);
    //display dice
    diceEl.classList.remove("hidden");
    // display dice according to number
    diceEl.src = `./assets/dice-${dice}.png`;
    // check for 1
    if (dice !== 1) {
      currntScore += dice;
      document.getElementById(`current--${activeplayer}`).textContent =
        currntScore;
    } else {
      switchPlayer();
    }
  }
});
btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activeplayer] += currntScore;
    if (scores[activeplayer] >= 100) {
      playing = false;
      document.getElementById(`score--${activeplayer}`).textContent = "you won";
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove("player--active");
    } else {
      // add current sore to active player
      document.getElementById(`score--${activeplayer}`).textContent =
        scores[activeplayer];
      switchPlayer();
    }
  }
});
btnNew.addEventListener("click", init);
