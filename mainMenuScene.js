class MainMenuScene extends Phaser.Scene {
    
    constructor() {
        super('mainMenu');
    }

    // preload () {}

    create ()
    {
        let xOffset = config.width / 2;
        let yOffset = config.height / 2 - 30;
        this.createButton(xOffset, yOffset, 'Start', 'game');
        this.createButton(xOffset, yOffset + 30, 'Highscore', 'highScore');
        this.createButton(xOffset, yOffset + 60, 'Map Editor', 'mapEditor');
    }

    createButton(x, y, text, sceneName) {
        this.add.text(x, y, text, { fill: '#0f0' })
            .setInteractive()
            .on('pointerup', () => this.scene.start(sceneName) );
    }

    // update (time, delta) {}
}