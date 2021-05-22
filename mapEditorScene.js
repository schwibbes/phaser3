class MapEditorScene extends Phaser.Scene {
    
    
    constructor() {
        super('mapEditor');
        this.activeAsset = undefined;
        this.assetSize = 1.0;
        this.tempObjects = []
        this.currentLevel = { objects: [] }
    }

    preload () {
        this.load.image('gras-m', 'assets/gras-m.png');
        this.load.image('gras-s', 'assets/gras-s.png');
        this.load.image('pinselbaum', 'assets/pinselbaum.png');
        this.load.image('ruler', 'assets/ruler.png');
        this.load.image('stamm', 'assets/stamm.png');
        this.load.image('stone', 'assets/stone.png');
        this.load.image('surligneur-green', 'assets/surligneur-green.png');
        this.load.image('surligneur', 'assets/surligneur.png');
        this.load.image('wolken', 'assets/wolken.png');
        this.load.image('ground', 'assets/platform.png');

    }

    create ()
    {
        let assets = ['gras-s', 'gras-m', 'pinselbaum', 'ruler', 'stamm', 'stone', 'surligneur-green', 'surligneur', 'wolken'] ;
        var that = this;

        let xOffset = 0;
        var yOffset = 0;

        assets.forEach(a => {
            yOffset += 30;
            const btn = this.add.text(xOffset, yOffset, a, { fill: '#0f0' });
            btn.setInteractive();
            btn.setDepth(1);

            btn.on('pointerup', () => { 
                console.log(a); 
                this.activeAsset = a;
                btn.setStyle({ fill: '#fff' });
            });
        });

        this.add.text(200, 700, "Select asset and place with mouse click, mouse-wheel changes size.", { fill: '#fff' });
        this.add.text(200, 730, "Hit the 'c' key to copy the level to clipboard.", { fill: '#fff' });

        // FUTURE: define platforms as part of level
        that.add.image(400, 568, 'ground').setScale(2);
        that.add.image(600, 400, 'ground');
        that.add.image(50, 250, 'ground');
        that.add.image(750, 220, 'ground');

        const copyToClipboard = str => {
            const el = document.createElement('textarea');
            el.value = str;
            el.setAttribute('readonly', '');
            el.style.position = 'absolute';
            el.style.left = '-9999px';
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
          };

        this.input.on('pointermove', function (pointer) {
            console.log()
            if (!that.activeAsset) return;
            
            if (pointer.x < 100 && pointer.y < assets.length * 30) return;

            if (pointer.noButtonDown() === false) {
                let obj = that.add.image(pointer.x, pointer.y, that.activeAsset).setScale(that.assetSize).setAlpha(0.2);
                that.tempObjects.push(obj);
            }

        }, this);

        this.input.on('pointerup', function (pointer) {
            console.log('down: ' + that.activeAsset);

            that.tempObjects.forEach(obj => {that.children.remove(obj)});

            if (pointer.x < 100 && pointer.y < assets.length * 30) return;

            if (!that.activeAsset) return;
            that.add.image(pointer.x, pointer.y, that.activeAsset).setScale(that.assetSize);
            var obj = that.currentLevel.objects.find(e => { return e.id === that.activeAsset; })
            if (!obj) {
                that.currentLevel.objects.push({ id: that.activeAsset, pos: [] });
                obj = that.currentLevel.objects.find(e => { return e.id === that.activeAsset; })
            }

            obj.pos.push([pointer.x, pointer.y, that.assetSize]);
        }, this);


        this.input.on('wheel', function (pointer, gameObjects, deltaX, deltaY, deltaZ) {
            that.assetSize -= deltaY * 0.0005;
            that.assetSize = Math.max(that.assetSize, 0.1);
            that.assetSize = Math.min(that.assetSize, 3);
            console.log('size: ' + that.assetSize);
        });

        this.input.keyboard.on('keydown-' + 'R', function (event) { 
            that.scene.start('game')
         });

         this.input.keyboard.on('keydown-' + 'C', function (event) { 
            console.debug(that.currentLevel);
            copyToClipboard(JSON.stringify(that.currentLevel))
         });
    }

    

    update (time, delta) {}

}