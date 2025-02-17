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
        this.load.audio('pew', 'assets/pew.mp3')
        this.load.audio('beep', 'assets/beep.mp3')
        this.load.audio('bgMusic', 'assets/bgMusic.mp3')
        this.load.audio('crash', 'assets/crash.mp3')

    }

    create() {
        this.scene.start('StartScreen');
        game.settings = {
			gameTimer: 0
		}
		
    }
}
