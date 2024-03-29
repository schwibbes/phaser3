class GameScene extends Phaser.Scene {

    constructor() {
        super('game');
    }

    preload ()
    {
        this.load.audio('theme', [
            'sounds/theme.wav'
        ]);

        this.load.image('block', 'assets/block.png');
        this.load.image('gras-m', 'assets/gras-m.png');
        this.load.image('gras-s', 'assets/gras-s.png');
        this.load.image('pinselbaum', 'assets/pinselbaum.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('ruler', 'assets/ruler.png');
        this.load.image('stamm', 'assets/stamm.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('stone', 'assets/stone.png');
        this.load.image('surligneur-green', 'assets/surligneur-green.png');
        this.load.image('surligneur', 'assets/surligneur.png');
        this.load.image('wolken', 'assets/wolken.png');


        this.load.spritesheet('dude', 'assets/dude_bigger.png', { frameWidth: 545, frameHeight: 612});


    }
    create ()
    {
        gameState = new GameState();
        this.time.addEvent({
            delay: 1000, // ms
            callback: gameState.decreaseTimer,
            callbackScope: gameState,
            repeat: options.roundMaxTime - 1
        });

        this.sound.play('theme', { loop: -1 });
        this.sound.volume = 0.3;
        this.sound.detune = 0;

        var Httpreq = new XMLHttpRequest();
        Httpreq.open("GET",'./maps/level' + ( window.location.hash ? window.location.hash.replace('#', '') : '1' ) + '.json', false);
        Httpreq.send(null);
        let lvl = JSON.parse(Httpreq.responseText);

        lvl.objects.forEach(obj => {
           obj.pos.forEach (p => {
               let s = p[2] || 1
               console.log(obj.id + ": " + p + "||" + s)
               this.add.sprite(p[0], p[1], obj.id).setScale(s).setDepth(1);
           });
        });
    
        // FUTURE: define platforms as part of level
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        // The player and its settings
        player = this.physics.add.sprite(100, 450, 'dude');
        player.setScale(0.15);

        //  Player physics properties. Give the little guy a slight bounce.
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        //  Our player animations, turning, walking left and walking right.
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
            scale: 2
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        //  Input Events
        // cursors = this.input.keyboard.createCursorKeys();
        cursors = this.input.keyboard.addKeys(
            {up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D});

        var riddlesModel = riddleGenerator.createRiddle();
        riddles = this.physics.add.group();

        var newRiddle = riddleGenerator.createRiddle();
        let i = 0;
        blockTexts = [];
        for (let possibility of newRiddle) {
            let sprite = riddles.create(possibility.x, 0, 'block');
            sprite.setScale(0.3);
            sprite.riddleModel = possibility;
            let style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: sprite.width, align: "center", backgroundColor: "#ffff00" };
            let text = this.add.text(possibility.x, 0, possibility.solution.answer, style).setDepth(0);
            text.setOrigin(0.5,0.5);
            blockTexts.push(text);
        }

        this.add.text(300, 700, "use WASD and find the right kanji", { fill: '#fff' });

        bombs = this.physics.add.group();

        //  The score
        scoreText = this.add.text(16, 16, gameState.hudText(), { fontSize: '32px', fill: '#fff' });
        gameState.setRiddle(newRiddle);

        //  Collide the player and the riddles with the platforms
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(bombs, platforms);
        this.physics.add.collider(riddles, platforms);

        this.physics.add.collider(player, bombs, hitBomb, null, this);

        // Checks to see if the player overlaps with any of the riddles, if he does call the collectRiddle function
        this.physics.add.collider(player, riddles, collectRiddle, null, this);
    }

    update (time, delta)
    {
        if (gameState.isGameOver())
        {
            highScore.addEntry(options.playerName, gameState.score)
            this.scene.start("highScore");
        } else {
            let i = 0;
            riddles.children.iterate(function (child) {
                blockTexts[i].x = child.x;
                blockTexts[i].y = child.y;
                blockTexts[i].setText(gameState.getRiddle()[i].solution.answer);
                i++;
            });
            updatePlayer();
        }

    }

}