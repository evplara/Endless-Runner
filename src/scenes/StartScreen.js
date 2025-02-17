class StartScreen extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScreen' });
    }

    create() {
        // Game Title
        this.add.text(250, 150, 'Endless Runner Shooter', { fontSize: '32px', fill: '#fff' });

        // Instructions
        this.add.text(200, 220, 'Dodge obstacles and shoot their weakpoint to survive!', { fontSize: '20px', fill: '#fff' });

        // Controls
        this.add.text(250, 280, 'Controls:', { fontSize: '24px', fill: '#ff0' });
        this.add.text(220, 320, 'Arrow Keys - Move', { fontSize: '20px', fill: '#fff' });
        this.add.text(220, 350, 'Space - Shoot', { fontSize: '20px', fill: '#fff' });

        // Start Game Prompt
        this.add.text(200, 420, 'Press SPACE to Start', { fontSize: '24px', fill: '#ff0000' });

        // Start game on space key press
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('Play'); // ✅ Start the game when SPACE is pressed
        });
		
    }
}
