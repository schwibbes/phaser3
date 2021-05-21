var score = 0;
var lives = 3;
const roundMaxTime = 10;
var timeLeft = roundMaxTime;

function updateScore(value) {
    score += value;
    updateHud();
}

function updateHud() {
    scoreText.setText(hudText());
}

function hudText() {
    return ['Score: ' + score, "Lives: " + lives, "Time Left: " + timeLeft];
}

function decreaseTimer() {
    timeLeft--;
    updateHud();
}

function decreaseLive() {
    lives--;
    updateHud();
}