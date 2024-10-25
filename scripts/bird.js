let board;
let boardWidth = 360;
let boardHeight = 610;
let context;

let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
};

let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

let velocityX = -3;
let velocityY = 0;
let gravity = 0.4;

let gameOver = false;
let score = 0;
let maxScore = 0;
let gameStarted = false;

window.onload = function() {
    document.getElementById("playBtn").addEventListener("click", startGame);
    document.getElementById("playAgainBtn").addEventListener("click", startGame);
};

function startGame() {
    document.getElementById("welcome").style.display = "none";
    document.querySelector("h1").style.display = "none";
    
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");
    
    birdImg = new Image();
    birdImg.src = "./images/flappybird.png";
    birdImg.onload = function () {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    };
    
    topPipeImg = new Image();
    topPipeImg.src = "./images/toppipe.png";
    
    bottomPipeImg = new Image();
    bottomPipeImg.src = "./images/bottompipe.png";
    
    gameStarted = true;
    bird.y = birdY;
    pipeArray = [];
    score = 0;
    gameOver = false;
    
    requestAnimationFrame(update);
    setInterval(placePipes, 1300);
    document.addEventListener("keydown", moveBird);
}

function update() {
    requestAnimationFrame(update);

    if (gameOver) {
        context.clearRect(0, 0, board.width, board.height);
        context.fillStyle = "black";
        context.font = "45px Gill-sans";
        context.fillText(score, 10, 45);
        context.fillText("GAME OVER", 10, 320);
        return;
    }

    if (!gameStarted) {
        context.clearRect(0, 0, board.width, board.height);
        context.fillStyle = "black";
        context.font = "25px Gill-sans";
        context.fillText("Press Spacebar to Start", 10, boardHeight / 2);
        return;
    }

    context.clearRect(0, 0, board.width, board.height);

    velocityY += gravity;
    bird.y = Math.max(bird.y + velocityY, 0);
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    if (bird.y > board.height) {
        gameOver = true;
    }

    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            score += 0.5;
            pipe.passed = true;
        }

        if (detectCollision(bird, pipe)) {
            gameOver = true;
        }
    }

    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
        pipeArray.shift();
    }

    context.fillStyle = "black";
    context.font = "45px Gill-sans";
    context.fillText(score, 5, 45);
}

function showResults() {
    const finalScoreElement = document.getElementById('finalScore');
    const highScoreElement = document.getElementById('highScore');
    const resultsDiv = document.getElementById('results');

    finalScoreElement.textContent = Math.floor(score);
    highScoreElement.textContent = maxScore;
    resultsDiv.style.display = 'block';
}

document.getElementById("playAgainBtn").addEventListener("click", function() {
    document.getElementById('results').style.display = 'none';
    startGame();
});

function placePipes() {
    if (gameOver || !gameStarted) {
        return;
    }

    let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
    let openingSpace = board.height / 4;

    let topPipe = {
        img: topPipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    };
    pipeArray.push(topPipe);

    let bottomPipe = {
        img: bottomPipeImg,
        x: pipeX,
        y: randomPipeY + pipeHeight + openingSpace,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    };
    pipeArray.push(bottomPipe);
}

function moveBird(e) {
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") {
        if (!gameStarted) {
            gameStarted = true;
            bird.y = birdY;
            pipeArray = [];
            score = 0;
            gameOver = false;
            return;
        }

        velocityY = -6;

        if (gameOver) {
            bird.y = birdY;
            pipeArray = [];
            updateScore(score);
            score = 0;
            gameOver = false;
        }
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

function updateScore(score) {
    const scoreElement = document.getElementById('score');
    if (scoreElement) {
        scoreElement.textContent = `Your Score: ${Math.floor(score)}`;
    }
    maxScore = Math.max(score, maxScore);
    const highScore = document.getElementById('high-score');
    if (highScore) {
        highScore.textContent = `Highest Score: ${maxScore}`;
    }
}
