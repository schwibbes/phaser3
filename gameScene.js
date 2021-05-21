class GameScene extends Phaser.Scene {

    constructor() {
        super('game');
    }

    preload ()
    {
        this.load.audio('theme', [
            'sounds/ost-v1.wav'
        ]);

        this.load.image('gras-s', 'assets/gras-s.png');
        this.load.image('gras-m', 'assets/gras-m.png');
        this.load.image('block', 'assets/block.png');
        this.load.image('stamm', 'assets/stamm.png');
        this.load.image('surligneur', 'assets/surligneur.png');
        
        this.load.image('sky', 'assets/Background.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
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
        this.sound.volume = 0.1;
        this.sound.detune = 0;

        var Httpreq = new XMLHttpRequest();
        Httpreq.open("GET",'./maps/level1.json',false);
        Httpreq.send(null);
        let lvl = JSON.parse(Httpreq.responseText);

        lvl.objects.forEach(obj => {
           obj.pos.forEach (p => {
               console.log(obj.id + ": " + p)
               this.add.sprite(p[0], p[1], obj.id).setScale(1);
           });
        });
    
        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup();

        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        //  Now let's create some ledges
        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        // The player and its settings
        player = this.physics.add.sprite(100, 450, 'stylus.png');

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
        riddles = this.physics.add.group({
            repeat: 2,
            key: 'block'
        });
        
        var newRiddle = riddleGenerator.createRiddle();
        let i = 0;
        riddles.children.iterate(function (child) {
            child.enableBody(true, newRiddle[i].x, 0, true, true).setScale(0.25);
            child.riddleModel = newRiddle[i];
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            console.log("finished");
            i++;
        });

        bombs = this.physics.add.group();

        //  The score
        scoreText = this.add.text(16, 16, gameState.hudText(), { fontSize: '32px', fill: '#fff' });

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
            highScore.addEntry("Player", gameState.score)
            this.scene.start("highScore");
        } else {
            updatePlayer();
        }

    }

}