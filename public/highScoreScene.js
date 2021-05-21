class HighScoreScene extends Phaser.Scene {

    constructor() {
        super('highScore');
    }

    // preload () {}

    create ()
    {
        var logo = this.add.text(400, 100, 'Highscore');
        let xOffset = config.width / 2;
        let yOffset = config.height / 2 - 30;
        this.createButton(xOffset, yOffset, 'Back', 'mainMenu');
    }

    createButton(x, y, text, sceneName) {
        this.add.text(x, y, text, { fill: '#0f0' })
            .setInteractive()
            .on('pointerup', () => this.scene.start(sceneName) );
    }

    // update (time, delta) {}
}
