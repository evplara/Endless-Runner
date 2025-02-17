class StartScreen extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScreen' });
    }

    create() {
        this.beepSound = this.sound.add('beep')
        // Game Title
        this.add.text(150, 150, 'Endless Runner Shooter', { fontSize: '32px', fill: '#fff' });

        // Instructions
        this.add.text(100, 220, 'Dodge obstacles and shoot their weakpoint to survive!\n Do not let the obstacles reach the end of the screen!', { fontSize: '20px', fill: '#fff' });

        // Controls
        this.add.text(250, 280, 'Controls:', { fontSize: '24px', fill: '#ff0' });
        this.add.text(220, 320, 'Arrow Keys - Move', { fontSize: '20px', fill: '#fff' });
        this.add.text(220, 350, 'Space - Shoot', { fontSize: '20px', fill: '#fff' });

        // Start Game Prompt
        this.add.text(200, 420, 'Press SPACE to Start', { fontSize: '24px', fill: '#ff0000' });

        // Start game on space key press
        this.input.keyboard.once('keydown-SPACE', () => {
            this.beepSound.play()
            this.scene.start('Play') //start the game when SPACE is pressed
        });
		
    }
}
