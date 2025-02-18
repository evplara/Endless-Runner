class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOver' });
    }

    create() {
        this.add.text(300, 250, 'Game Over', { fontSize: '32px', fill: '#fff' })
        this.add.text(250, 300, 'Press SPACE to Restart', { fontSize: '20px', fill: '#fff' })
        this.add.text(0, 325, 'Credits: The Amazing Visuals by myself, Evan Lara', { fontSize: '10px', fill: '#fff' })
        this.add.text(0, 350, 'Credits: Music from #Uppbeat: https://uppbeat.io/t/fass/furious', { fontSize: '10px', fill: '#fff' })
        this.add.text(0, 400, 'Credits: crash.mp3Car Accident with Squeal and CrashHoBoTrails (Freesound) https://pixabay.com/sound-effects/car-accident-with-squeal-and-crash-6054/', { fontSize: '10px', fill: '#fff' })
        this.add.text(0, 450, 'Credits: pew sound https://www.myinstants.com/en/instant/pew-roblox-32521/?utm_source=copy&utm_medium=share ', { fontSize: '10px', fill: '#fff' })
        this.add.text(0, 500, 'Credits: beep sound CountDown Beep youioo8 (Freesound) https://pixabay.com/sound-effects/countdown-beep-104007/', { fontSize: '10px', fill: '#fff' })



        this.beepSound = this.sound.add('beep')


        this.input.keyboard.once('keydown-SPACE', () => {
            this.beepSound.play()
            this.scene.start('Play');
        });
    }
}
