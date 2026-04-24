// Click a button or object to earn points so that I can increase my score.
// See my current score during the game so that I know how well I am doing.
// See a countdown timer so that I know how much time is left.

// Variables
let score = 0;
let timer = 60;

// HTML DOM
const gameButton = document.getElementById('gameButton');
const highScoreButton = document.getElementById('highScoreButton');
const scoreDisplay = document.getElementById('scoreDisplay');
const countdownText = document.getElementById('countdownText');
const label1 = document.getElementById('label1');
const input1 = document.getElementById('name');
const scoreboard = document.getElementById('scoreboard');

// Hide input1, label1 and high score button
input1.style.display = 'none';
label1.style.display = 'none';
highScoreButton.style.display = 'none';


// UI Functions & Events
let gameStarted = false;
let interval;

gameButton.innerText = "Start Game";

gameButton.addEventListener('click', () => {
  if (gameStarted === false) {
    gameStarted = true;
    // If the game has started the button changes text to "Click me!"
    gameButton.innerText = "Click me!";

    interval = setInterval(() => decreaseTimer(), 1000);

    setTimeout(() => {
      // If the time is out the button can't be clicked again.
      clearInterval(interval);
      gameButton.disabled = true;
      // If the game is over the input1, label1 and th high score button appear
      input1.style.display = 'block';
      label1.style.display = 'block';
      highScoreButton.style.display = 'block';
    }, 1000 * timer);
   // Otherwise the button can still be clicked to improve score
  } else {
    increaseScore();
  }
});

highScoreButton.addEventListener('click', () => {
  // If the name is shorter than 3 characters or longer than 16 characters, an alert is shown
  if (input1.value.length < 3 || input1.value.length > 16) {
    alert("The name needs to be between 3 and 16 characters");
    return;
  }
  // Button is disabled after submitting a high score
  highScoreButton.disabled = true;

  submitHighScore().then(() => {
    // Clears the input field after the score has been submitted
    input1.value = "";
    // Shows an alert when the score is submitted so the player knows it was successful
    alert("Your score is submitted");
  })
    // if something goes wrong, the player gets an alert
    .catch((error) => {
      console.log(error);
      alert("Something went wrong");
      highScoreButton.disabled = false;
    });

})


// Functions
// Increases the score by 1 and updates the score display
function increaseScore() {
  score++;
  scoreDisplay.innerText = score;
}
// Decreases the timer by 1 and updates the countdown display
function decreaseTimer() {
  timer--;
  countdownText.innerText = timer;
}

// Sends the player's name and score to the high score API
function submitHighScore() {
  return fetch("https://hooks.zapier.com/hooks/catch/8338993/ujs9jj9/", {
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
// Fetches scoreboard data from the API
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
      
      // Filters out invalid scores, sorts players by score, and displays the top 10
      data
        .filter(player => !Number.isNaN(Number(player.score)))
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
    // If something goes wrong, an alert appears
    .catch(error => {
      console.log(error);
      alert("Something went wrong");
    });
}
getScoreboardData();
