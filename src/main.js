const config = {
    type: Phaser.AUTO,
    width: 800, // Adjust screen size
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 }, // Gravity for runner
            debug: false
        }
    },
    scene: [Load, Play, GameOver] // Define game scenes
};

const game = new Phaser.Game(config);
let keyFIRE, keyRESET, keyLEFT, keyRIGHT, keyDOWN, keyUP
