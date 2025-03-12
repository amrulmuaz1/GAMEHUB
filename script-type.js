const quotes = {
  easy: [
    "egg",
    "sheep",
    "chicken"
  ],
  medium: [
    "Let's go to the mall",
    "Tomorrow will be our last class",
    "Iam okay as long as you're okay"
  ],
  hard: [
    "When one mole of hydrochloric acid is added to one mole of sodium hydroxide , they react in a neutralization reaction to form one mole of sodium chloride and one mole of water",
    "Amoeba sp move to another place by expanding it's Pseudopodium. Amoeba is a unicellular cell that mostly found in water area",
    "In 1939, Germany do an invasion against Poland. United Kingdom and France then declare war on Germany. This significant event lead to world war 2. With the help of Soviet Union, Poland has no change to defend against two giants at that time and lose"
  ]
};

let startTime;
let timerInterval;
let currentQuote;

const quoteDisplay = document.getElementById('quote');
const quoteInput = document.getElementById('quote-input');
const timeDisplay = document.getElementById('time');
const messageDisplay = document.getElementById('message');
const difficultySelect = document.getElementById('difficulty');
const typingSound = document.getElementById('typing-sound');

function loadQuote() {
  const difficulty = difficultySelect.value;
  const quoteList = quotes[difficulty];
  currentQuote = quoteList[Math.floor(Math.random() * quoteList.length)];
  quoteDisplay.textContent = currentQuote;
  quoteInput.value = '';
  messageDisplay.textContent = '';
  startTimer();
}

function startTimer() {
  startTime = new Date();
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const currentTime = new Date();
  const timeElapsed = Math.floor((currentTime - startTime) / 1000);
  timeDisplay.textContent = timeElapsed;
}

function checkInput() {
  if (quoteInput.value === currentQuote) {
    clearInterval(timerInterval);
    const timeTaken = timeDisplay.textContent;
    messageDisplay.textContent = `Congratulations! You finished in ${timeTaken} seconds. Keep it up!`;
    quoteInput.disabled = true;
    setTimeout(() => {
      loadQuote();
      quoteInput.disabled = false;
    }, 3000);
  }
}

difficultySelect.addEventListener('change', loadQuote);
quoteInput.addEventListener('input', checkInput);

loadQuote();

window.addEventListener('click', () => {
  const music = document.getElementById('background-music');
  if (music.paused) {
    music.play();
  }
});

quoteInput.addEventListener('keydown', () => {
    typingSound.currentTime = 0;
    typingSound.play();
});
