
let state = {} || state;

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [ GameScene, HighScoreScene, MainMenuScene ],
    audio: {
        disableWebAudio: true
    }
};

var player;
var stars;
var bombs;
var platforms;
var cursors;
var gameOver = false;
var scoreText;

var game = new Phaser.Game(config);