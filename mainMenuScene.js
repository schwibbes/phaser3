class MainMenuScene extends Phaser.Scene {
    
    constructor() {
        super('mainMenu');
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
        // start game on click
    }
}