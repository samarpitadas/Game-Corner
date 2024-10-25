window.onload = function() {
    document.getElementById('modal').style.display = 'block';
    document.body.classList.add('blur');
};

function startGame() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    document.body.classList.remove('blur');
}

document.getElementById('playBtn').onclick = startGame;

let score = {
    win: 0,
    lost: 0,
    tie: 0,
    displayScore: function() {
        return `Wins: ${score.win}. Losts: ${score.lost}. Ties: ${score.tie}`;
    }
};

let computerChoice;

function generateComputerChoice() {
    let randomNumber = Math.random() * 3;
    if (randomNumber > 0 && randomNumber <= 1) {
        return '🪨';
    } else if (randomNumber > 1 && randomNumber <= 2) {
        return '📃';
    } else {
        return '✂️';
    }
}

function getResult(computerChoice, userChoice) {
    if (userChoice === '🪨') {
        if (computerChoice === '🪨') {
            score.tie++;
            return "There's a tie 🤝";
        }
        if (computerChoice === '📃') {
            score.lost++;
            return 'YOU LOST 😢';
        }
        if (computerChoice === '✂️') {
            score.win++;
            return 'YOU WON!! 🏆';
        }
    }
    if (userChoice === '📃') {
        if (computerChoice === '🪨') {
            score.win++;
            return 'YOU WON!! 🏆';
        }
        if (computerChoice === '📃') {
            score.tie++;
            return "There's a tie 🤝";
        }
        if (computerChoice === '✂️') {
            score.lost++;
            return 'YOU LOST 😢';
        }
    }
    if (userChoice === '✂️') {
        if (computerChoice === '🪨') {
            score.lost++;
            return 'YOU LOST 😢';
        }
        if (computerChoice === '📃') {
            score.win++;
            return 'YOU WON!! 🏆';
        }
        if (computerChoice === '✂️') {
            score.tie++;
            return "There's a tie 🤝";
        }
    }
}

function changeMessage(s) {
    let message = document.querySelector('.message');
    message.innerHTML = `
    <div id="countdown" style="text-align: center;"></div>
    <div><pre>You :${s}   Computer :${computerChoice}</pre></div>
    <div style="text-align: center">${result}</div>
    <h4>Play again!</h4>`;
}

function updateResult() {
    let allcontent = document.querySelector('.all-content');
    allcontent.innerHTML = `
    <div class="results">
        <div class="result">
            <div class="heading">Rounds Won</div>
            <div class="number">${score.win}</div>
        </div>
        <div class="result">
            <div class="heading">Rounds Lost</div>
            <div class="number">${score.lost}</div>
        </div>
        <div class="result" style="border: none;">
            <div class="heading">Rounds Tied</div>
            <div class="number">${score.tie}</div>
        </div>
    </div>
    <button class="reset" onclick="resetOp();">RESET</button>`;
}

function resetOp() {
    score.win = 0;
    score.lost = 0;
    score.tie = 0;
    let report = document.querySelector('.report');
    report.innerHTML = `
    <div class="message">
        <div id="countdown" style="text-align: center;"></div>
        Choose one of the above!
    </div>
    <div class="all-content">
        <div class="results">
            <div class="result">
                <div class="heading">Rounds Won</div>
                <div class="number">0</div>
            </div>
            <div class="result">
                <div class="heading">Rounds Lost</div>
                <div class="number">0</div>
            </div>
            <div class="result" style="border: none;">
                <div class="heading">Rounds Tied</div>
                <div class="number">0</div>
            </div>
        </div>
    </div>`;
}

function startCountdown() {
    let countdownElement = document.getElementById('countdown');
    countdownElement.style.opacity = 1;
    
    let count = 3;
    countdownElement.textContent = count;
  
    let countdownInterval = setInterval(() => {
        count--;
        if (count == 2) {
            countdownElement.textContent = count;
            countdownElement.style.opacity = 0.5;
        } else {
            countdownElement.textContent = '1';
            countdownElement.style.opacity = 0.2;
            clearInterval(countdownInterval);
            setTimeout(() => {
                countdownElement.style.opacity = 0;
            }, 1000);
        }
    }, 1000);
}
