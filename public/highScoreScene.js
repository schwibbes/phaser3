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
        var logo = this.add.text(400, 100, 'Highscore');
    }

    update (time, delta)
    {
        // go back to main menu on click
    }
}
