// Click a button or object to earn points so that I can increase my score.
// See my current score during the game so that I know how well I am doing.
// See a countdown timer so that I know how much time is left.

// Variables
let score = 0;
let timer = 5;

// HTML DOM
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const scoreDisplay = document.getElementById('scoreDisplay');
const countdownText = document.getElementById('countdownText');
const label1 = document.getElementById('label1');
const input1 = document.getElementById('name');
const scoreboard = document.getElementById('scoreboard');

input1.style.display = 'none';
label1.style.display = 'none';
button2.style.display = 'none';


// UI Functions & Events
button1.addEventListener('click', () => {
  increaseScore();
})

button2.addEventListener('click', () => {
  submitHighScore();
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
  input1.style.display = 'block';
  label1.style.display = 'block';
  button2.style.display = 'block';
}, 1000 * timer);

function submitHighScore() {
  fetch("https://hooks.zapier.com/hooks/catch/8338993/ujs9jj9/", {
    method: "POST",
    body: JSON.stringify({
      name: input1.value,
      score: score
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log("POST response:", data);
    });
}

function getScoreboardData () {
  const url = 'https://script.google.com/macros/s/AKfycbys5aEPMvNCutyhNYYCcQcCjzsi2UtqNspmKyCH-AicJxJbCJMrAoT0LUaYaXhTWA8n/exec';

  fetch(url)
    .then(response => {
      console.log('Response object:', response);
      return response.json();
    })
    .then(data => {
      console.log("Scoreboard data:", data);

      scoreboard.innerHTML = "<h2>Top 10 High Scores</h2>";

      data
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)
        .forEach((player, index) => {
          let p = document.createElement("p");

          p.innerHTML = `
        <span class="rank">#${index + 1}</span>
        <span class="playerName">${player.name}</span>
        <span class="playerScore">${player.score} poäng</span>
      `;

          scoreboard.appendChild(p);
        });
    })
}
getScoreboardData();


