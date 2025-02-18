//credits Music from #Uppbeat: https://uppbeat.io/t/fass/furious
//credits crash.mp3Car Accident with Squeal and CrashHoBoTrails (Freesound) https://pixabay.com/sound-effects/car-accident-with-squeal-and-crash-6054/
//credits pew sound https://www.myinstants.com/en/instant/pew-roblox-32521/?utm_source=copy&utm_medium=share 
//credits beep sound CountDown Beep youioo8 (Freesound) https://pixabay.com/sound-effects/countdown-beep-104007/
//obstacle object made using https://giventofly.github.io/pixelit/#tryit
class Play extends Phaser.Scene {
    constructor() {
        super({ key: 'Play' });
    }

    create() {
        this.bg = this.add.tileSprite(400, 300, 800, 600, 'background');

        this.player = this.physics.add.sprite(100, 450, 'player').setCollideWorldBounds(true);
        this.player.setScale(1)
        this.player.body.setSize(50,50)
        this.cursors = this.input.keyboard.createCursorKeys();
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.playerHealth = 3
        this.healthText = this.add.text(160, 0, 'Health: 3', { fontSize: '28px', fill: '#fff', color: '#FFF', backgroundColor:'#000' });

        this.obstacles = this.physics.add.group()
        this.bullets = this.physics.add.group()
        this.weakSpots = this.physics.add.group()
        this.powerUps = this.physics.add.group()
        this.pewSound = this.sound.add('pew')
        this.bgSound = this.sound.add('bgMusic', { volume: 0.2 })


        //player obstacle collision
        this.physics.add.collider(this.player, this.obstacles, this.playerHit, null, this)
        //bullet weakspot collision
        this.physics.add.collider(this.bullets, this.weakSpots, this.bulletHitWeakSpot, null, this)
        //player powerup collision
        this.physics.add.overlap(this.player, this.powerUps, this.collectPowerUp, null, this);

        //randomly spawn powerups
        this.time.addEvent({ delay: Phaser.Math.Between(5000, 10000), callback: this.spawnPowerUp, callbackScope: this, loop: true })
        //randomly spawn obstacles
        this.time.addEvent({ delay: 2000, callback: this.spawnObstacle, callbackScope: this, loop: true });

        this.bgSpeed = 5;
        this.maxSpeed = 50;
        this.speedIncreaseRate = (this.maxSpeed - this.bgSpeed) / 3000;
        this.elapsedTime = 0;
        this.obstacleSpeed = -100;
        this.maxObstacleSpeed = -1000;

        this.remainingTime = game.settings.gameTimer; // Start with the configured timer value
        this.timerText = this.add.text(
			0,
			0,
			`Time: ${(this.remainingTime / 1000).toFixed(1)}`,
			{
				fontFamily: 'Courier',
				fontSize: '28px',
				color: '#FFF',
				backgroundColor: '#000'
			}
		);
		

        // Timer that ticks down
        this.timerEvent = this.time.addEvent({
            delay: 100,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });
        this.bgSound.play()
        this.crashSound = this.sound.add('crash')
    }

    update(time, delta) {
        
        //background scrolling
        this.bg.tilePositionX += this.bgSpeed

        //increase speed gradually over 60 seconds
        if (this.elapsedTime < 120000) {
            this.bgSpeed += (this.speedIncreaseRate * (delta / 100)) // Adjust based on delta time
            this.elapsedTime += delta;
            this.obstacleSpeed = Phaser.Math.Linear(-100, this.maxObstacleSpeed, this.elapsedTime / 120000)
        } else {
            this.bgSpeed = this.maxSpeed; //cap at max speed
            this.obstacleSpeed = this.maxObstacleSpeed
        }

       
        this.player.setVelocityX((this.cursors.left.isDown) ? -400 : (this.cursors.right.isDown) ? 400 : 0);
        this.player.setVelocityY((this.cursors.up.isDown) ? -400 : (this.cursors.down.isDown) ? 400 : 0);
        if (Phaser.Input.Keyboard.JustDown(keyFIRE)) {
            this.shootBullet();
        }

        // Sync weak spots with their obstacles
        this.weakSpots.children.iterate(weakSpot => {
            if (weakSpot.parentObstacle) {
                weakSpot.setPosition(weakSpot.parentObstacle.x, weakSpot.parentObstacle.y);
            }
        });

        this.obstacles.children.iterate(obstacle => {
            if (obstacle && obstacle.x <= 0) {
                this.gameOver(); 
            }
        });
    }

    spawnObstacle() {
    let yPosition = Phaser.Math.Between(10, 500);
    let obstacle = this.obstacles.create(800, yPosition, 'obstacle');

    obstacle.setVelocityX(this.obstacleSpeed);
    obstacle.setImmovable(true);
    obstacle.body.allowGravity = false;
    let randomHeightScale = Phaser.Math.FloatBetween(0.1, 1); // Adjust range as needed
    obstacle.setScale(1, randomHeightScale); // Keep width 1, modify height scale

    obstacle.body.setSize(obstacle.width, obstacle.height * randomHeightScale, true)

    // Define weak point
    let weakSpot = this.physics.add.sprite(obstacle.x, obstacle.y, 'weakspot')
    weakSpot.setDisplaySize(50, 40); // Adjust size
    weakSpot.allowGravity = false;
    weakSpot.setImmovable(true);
    // weakSpot.body.moves = false
    weakSpot.parentObstacle = obstacle; // Attach reference
    weakSpot.health = 30
    // Add weakSpot to a group
    this.weakSpots.add(weakSpot);

    }
    spawnPowerUp() {
        let yPosition = Phaser.Math.Between(50, 550); //random Y position
        let powerUp = this.powerUps.create(800, yPosition, 'heart'); //spawn at right side
    
        powerUp.setVelocityX(-300); //same movement logic as obstacles 
        powerUp.setImmovable(true);
        powerUp.body.allowGravity = false;
    }
    collectPowerUp(player, powerUp) {
        this.playerHealth += 1
        this.healthText.setText('Health: ' + this.playerHealth); //update UI
        powerUp.destroy()
    }
    

    shootBullet() {
        let bullet = this.bullets.create(this.player.x + 20, this.player.y, 'bullet')
        bullet.setScale(2)
        bullet.setVelocityX(400);
        bullet.setImmovable(true);
        bullet.body.allowGravity = false;
        bullet.damage = 10;

        this.pewSound.play()
    }

    
    

    bulletHitWeakSpot(bullet, weakSpot) {
        weakSpot.health -= bullet.damage;
        bullet.destroy();

        if (weakSpot.health <= 0) {
            if (weakSpot.parentObstacle) {
                weakSpot.parentObstacle.destroy(); //destroy the obstacle
            }
            weakSpot.destroy(); //destroy the weak spot
        }
    }

    updateTimer() {
            this.remainingTime += 100;
            this.timerText.setText(`Time: ${(this.remainingTime / 1000).toFixed(1)}`);        
    }
    playerHit(player, obstacle) {
        this.playerHealth -= 1; 
        this.healthText.setText('Health: ' + this.playerHealth); 
    
        this.weakSpots.children.iterate(weakSpot => {
            if (weakSpot && weakSpot.parentObstacle === obstacle) {
                weakSpot.destroy(); //destroy only if a valid weakSpot is found
            }
        });
    
        obstacle.destroy(); 
        if (this.playerHealth <= 0) {
            this.gameOver(); 
        }
    }
    
    
    
    gameOver() {
        this.crashSound.play()
        this.scene.start('GameOver');
        this.sound.get('bgMusic').stop()

    }

}