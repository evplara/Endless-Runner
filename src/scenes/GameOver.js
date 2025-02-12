class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOver' });
    }

    create() {
        this.add.text(300, 250, 'Game Over', { fontSize: '32px', fill: '#fff' });
        this.add.text(250, 300, 'Press SPACE to Restart', { fontSize: '20px', fill: '#fff' });

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('Play');
        });
    }
}
