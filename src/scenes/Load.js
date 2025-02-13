class Load extends Phaser.Scene {
    constructor() {
        super({ key: 'Load' });
    }

    preload() {
        this.load.image('background', 'assets/background.png')
        this.load.spritesheet('player', 'assets/player.png', { frameWidth: 50, frameHeight: 50 })
        this.load.image('ground', 'assets/ground.png', )
        this.load.image('obstacle', 'assets/obstacle.png',{ frameWidth: 10, frameHeight: 10 })
		this.load.image('heart', 'assets/heart.png')
    }

    create() {
        this.scene.start('Play');
		game.settings = {
			gameTimer: 0
		}
    }
}
