
let state = {} || state;

var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [ MainMenuScene, GameScene, HighScoreScene ],
    audio: {
        disableWebAudio: true
    }
};

const options = {
    roundMaxTime: 15,
    maxLives: 3,
    maxHighScoreEntriesCount: 10
}

var player;
var stars;
var bombs;
var platforms;
var cursors;
var scoreText;
var riddles;
var gameState;
var highScore = new HighScore();
var game = new Phaser.Game(config);