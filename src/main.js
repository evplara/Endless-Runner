// Evan Lara, Eye of RAH, The Escape
//Approximate time Working, 30 Hours
//Creative Tilt: I really enjoyed having objects where only a certain spot would detect collision. I was not sure hwo to do this so I came up with the idea of creating a seperate obeject on top follwing the main object. There might be a better way to do this but this was the best I could come up with and for how simple it seems it created a lot of difficulty to program.
//Creative Tilt: I tried to create an endless runner where the goal was to defend yourself from obstacles. I feel like I can expand on this idea more to make something way more interesting and with more depth. Also flying in an endless runner is a good concept, not somrthing I came up with but has potentiial to do more if executed properely as it could make an endless runner too easy,

//credits Music from #Uppbeat: https://uppbeat.io/t/fass/furious
//credits crash.mp3Car Accident with Squeal and CrashHoBoTrails (Freesound) https://pixabay.com/sound-effects/car-accident-with-squeal-and-crash-6054/
//credits pew sound https://www.myinstants.com/en/instant/pew-roblox-32521/?utm_source=copy&utm_medium=share 
//credits beep sound CountDown Beep youioo8 (Freesound) https://pixabay.com/sound-effects/countdown-beep-104007/
//obstacle object made using https://giventofly.github.io/pixelit/#tryit
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
    scene: [Load,StartScreen, Play, GameOver] // Define game scenes
};

const game = new Phaser.Game(config);
let keyFIRE, keyRESET, keyLEFT, keyRIGHT, keyDOWN, keyUP
