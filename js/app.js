// Click a button or object to earn points so that I can increase my score.
// See my current score during the game so that I know how well I am doing.
// See a countdown timer so that I know how much time is left.

// Variables
let score = 0;
let timer = 60;

// HTML DOM
const button1 = document.getElementById('button1');
const scoreDisplay = document.getElementById('scoreDisplay');
const countdownText = document.getElementById('countdownText');

// UI Functions
button1.addEventListener('click', () => {
  increaseScore();
})

// Functions
function increaseScore() {
  score++;
  scoreDisplay.innerText = score;
}
function decreaseTimer() {
  timer--;
  countdownText.innerText = timer;
}

let interval = setInterval(()=> decreaseTimer(), 1000);

setTimeout(() => {
  clearInterval(interval);
  button1.disabled = true;
  alert("Game over!")
}, 1000 * timer);
