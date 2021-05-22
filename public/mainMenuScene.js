class MainMenuScene extends Phaser.Scene {
    
    constructor() {
        super('mainMenu');
    }

    preload () {
        this.load.image('surligneur', 'assets/surligneur.png');
        this.load.image('stylo-win', 'assets/stylo-win.png');

    }

    create ()
    {
        this.add.image(200, 500, 'stylo-win').setScale(1).setAlpha(0.2);
        this.add.image(890, 500, 'surligneur').setScale(1).setAlpha(0.2);
        this.add.text(50, 50, 'Carelessly jotting some thoughts, you have suddenly been trapped by an evil calligraphy master.\nIf you could only read his magic book.\nMaybe you could find your way back home?', { fill: '#0f0' }).setBackgroundColor('rgba(255, 0, 0, 0.5)')

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