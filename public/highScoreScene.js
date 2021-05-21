class HighScoreScene extends Phaser.Scene {

    constructor() {
        super('highScore');
    }

    preload ()
    {
        this.load.audio('theme', [
            'sounds/ost-v1.wav'
        ]);

        //this.load.image('gras-s', 'assets/gras-s.png');
    }

    create ()
    {
        this.sound.play('theme', { loop: -1 });
        this.sound.volume = 0.1;
        this.sound.detune = 0;
    }

    update (time, delta)
    {
        // go back to main menu on click
    }
}