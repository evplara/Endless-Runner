const config = {
    type: Phaser.AUTO,
    width: 800, // Adjust screen size
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, // Gravity for runner
            debug: true
        }
    },
    scene: [Load, Play, GameOver] // Define game scenes
};

const game = new Phaser.Game(config);
let keyFIRE, keyRESET, keyLEFT, keyRIGHT, keyDOWN, keyUP
