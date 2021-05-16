import { Scene1 } from './scene1.js';

let state = {} || state;

const config = {

    type    : Phaser.AUTO,
    width   : 800,
    height  : 600,
        
    autoFocus: true,

    backgroundColor: '#111111',
    parent  : 'gameDiv',
    url     : 'http//url.to.game',
    title   : 'A title would be nice',
    version : '0.0.1', 

    scene   : [ Scene1 ]
};

state.game = new Phaser.Game(config);
