const choices = ["rock", "paper", "scissors"];
const emojis = { rock: "🪨", paper: "📄", scissors: "✂️" };

const playerChoiceDisplay = document.getElementById("player-choice");
const computerChoiceDisplay = document.getElementById("computer-choice");
const resultText = document.getElementById("result-text");
const playerScoreDisplay = document.getElementById("player-score");
const computerScoreDisplay = document.getElementById("computer-score");
const backgroundMusic = document.getElementById("background-music");
const winSound = document.getElementById("win-sound");
const loseSound = document.getElementById("lose-sound");
const drawSound = document.getElementById("draw-sound");


let playerScore = 0;
let computerScore = 0;
let musicStarted = false; 

const buttons = document.querySelectorAll(".choice-btn");

buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
        if (!musicStarted) {
            backgroundMusic.volume = 0.3;
            backgroundMusic.play().catch(e => console.log(e));
            musicStarted = true;
        }

        const playerChoice = choices[index];
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];

        // Clear previous choices and show "thinking" text
        playerChoiceDisplay.textContent = "";
        computerChoiceDisplay.textContent = "";
        resultText.textContent = "Thinking...";

        setTimeout(() => {
            playerChoiceDisplay.textContent = emojis[playerChoice];
            computerChoiceDisplay.textContent = emojis[computerChoice];

            const result = getResult(playerChoice, computerChoice);
            resultText.textContent = `Computer chose ${computerChoice}. ${result}`;

            updateScore(result);
            playSound(result);
        }, 1000);
    });
});

function getResult(player, computer) {
    if (player === computer) return "It's a draw!";
    if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        return "You win!";
    }
    return "Computer wins!";
}

function updateScore(result) {
    if (result === "You win!") {
        playerScore++;
    } else if (result === "Computer wins!") {
        computerScore++;
    }

    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
}

function playSound(result) {
    if (result === "You win!") {
        winSound.currentTime = 0;
        winSound.play();
    } else if (result === "Computer wins!") {
        loseSound.currentTime = 0;
        loseSound.play();
    } else if (result === "It's a draw!") {
        drawSound.currentTime = 0;
        drawSound.play();
    }
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
    playerChoiceDisplay.textContent = "❔";
    computerChoiceDisplay.textContent = "❔";
    resultText.textContent = "Make your move!";
}

function showEffect(effectId, gifFile) {
    const effect = document.getElementById(effectId);
    let timestamp = new Date().getTime(); // Force reload by appending timestamp
    effect.style.backgroundImage = `url('${gifFile}?t=${timestamp}')`;
    effect.style.display = 'block';

    setTimeout(() => {
        effect.style.display = 'none';
        document.body.style.backgroundImage = "url('back.gif')"; // Reset background after animation
    }, 600); // Duration of the GIF
}


function updateScore(result) {
    // Clear any existing effects first
    resultText.classList.remove('win-effect', 'lose-effect', 'draw-effect');

    let gifDuration = 600; // 0.6 seconds GIF duration
    let randomNum = Math.random(); // Generate a random number

    if (result === "You win!") {
        playerScore++;
        resultText.classList.add('win-effect');
        document.body.style.backgroundImage = `url('win.gif?${randomNum}')`; // Force reload
    } else if (result === "Computer wins!") {
        computerScore++;
        resultText.classList.add('lose-effect');
        document.body.style.backgroundImage = `url('lose.gif?${randomNum}')`; // Force reload
    } else if (result === "It's a draw!") {
        resultText.classList.add('draw-effect');
    }

    // Reset background after 0.6 seconds
    setTimeout(() => {
        document.body.style.backgroundImage = "url('back.gif')"; // Default background
    }, gifDuration);

    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
}




