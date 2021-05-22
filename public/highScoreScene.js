class HighScoreScene extends Phaser.Scene {

    constructor() {
        super('highScore');
    }

    // preload () {}

    create ()
    {
        var logo = this.add.text(config.width / 2, 100, 'Highscore', { align: "center" });
        
        highScore.entries.forEach((entry, index) => this.printScore(index, entry));

        this.createButton(config.width - 100,  config.height - 100, 'Back', 'mainMenu');
    }

    printScore(index, entry) {
        let isLatest = highScore.latestIndex === index;
        let style = { fill: isLatest ? '#0f0' : '#fff' };
        this.add.text(config.width / 2 - 100, 150 + index * 20, entry.playerName + " " + entry.score, style);
    }

    createButton(x, y, text, sceneName) {
        this.add.text(x, y, text, { fill: '#0f0' })
            .setInteractive()
            .on('pointerup', () => this.scene.start(sceneName) );
    }

    // update (time, delta) {}
}