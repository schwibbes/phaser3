
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

var player;
var stars;
var bombs;
var platforms;
var cursors;
var scoreText;
var riddles;
var gameState;
const roundMaxTime = 10;
var game = new Phaser.Game(config);