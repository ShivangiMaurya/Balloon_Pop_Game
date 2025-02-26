const balloonArea = document.getElementById("balloon-area");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const startButton = document.getElementById("start-game");

let score = 0;
let timeLeft = 30;
let gameInterval, timerInterval;

// 🚨 Load Warning Sound
const warningSound = new Audio("warning.mp3");

// Function to create a balloon
function createBalloon() {
    let balloon = document.createElement("div");
    balloon.classList.add("balloon");
    balloon.style.backgroundColor = getRandomColor();
    
    let leftPosition = Math.random() * 90 + "%";
    balloon.style.left = leftPosition;

    balloonArea.appendChild(balloon);

    let speed = Math.random() * 3 + 2;
    let position = 500;

    let moveUp = setInterval(() => {
        if (position <= -70) {
            clearInterval(moveUp);
            balloon.remove();
        } else {
            position -= speed;
            balloon.style.top = position + "px";
        }
    }, 50);

    balloon.addEventListener("click", function () {
        score++;
        scoreDisplay.textContent = score;
        clearInterval(moveUp);
        balloon.remove();
    });
}

// Function to generate random colors
function getRandomColor() {
    let colors = ["red", "blue", "green", "yellow", "purple", "orange"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Function to start the game
function startGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    
    // Start balloon spawning
    gameInterval = setInterval(createBalloon, 800);

    // Start countdown timer
    timerInterval = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;

        // 🚨 Play warning sound when 5 seconds remain
        if (timeLeft === 5) {
            warningSound.play();
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            clearInterval(gameInterval);
            alert(`Game Over! Your Score: ${score}`);
            resetGame();
        }
    }, 1000);
}

// Function to reset the game
function resetGame() {
    balloonArea.innerHTML = "";
    timeLeft = 30;
    score = 0;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
}

// Attach event listener to start button
startButton.addEventListener("click", startGame);
