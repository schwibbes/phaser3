var  score = 0;
var lives = 0;

function updateScore(value, scoreText) {
    score += value;
    scoreText.setText('Score: ' + score);

}