class Play extends Phaser.Scene {
    constructor() {
        super({ key: 'Play' });
    }

    create() {
        this.bg = this.add.tileSprite(400, 300, 800, 600, 'background');
        this.ground = this.physics.add.sprite(400, 900, 'ground').setImmovable(true);
        this.ground.body.allowGravity = false;

        this.player = this.physics.add.sprite(100, 450, 'player').setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.obstacles = this.physics.add.group();
        this.bullets = this.physics.add.group();
        this.weakSpots = this.physics.add.group();


        this.physics.add.collider(this.player, this.obstacles, this.gameOver, null, this);
        this.physics.add.collider(this.bullets, this.weakSpots, this.bulletHitWeakSpot, null, this);

        this.time.addEvent({ delay: 2000, callback: this.spawnObstacle, callbackScope: this, loop: true });

        this.bgSpeed = 2;
        this.maxSpeed = 1000;
        this.speedIncreaseRate = (this.maxSpeed - this.bgSpeed) / 3000;
        this.elapsedTime = 0;
        this.obstacleSpeed = -100;
        this.maxObstacleSpeed = -2000;

        this.remainingTime = game.settings.gameTimer; // Start with the configured timer value
        this.timerText = this.add.text(
			0, // Adjusted x-coordinate
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
    }

    update(time, delta) {
        
        //background scrolling
        this.bg.tilePositionX += this.bgSpeed

        //increase speed gradually over 60 seconds
        if (this.elapsedTime < 60000) {
            this.bgSpeed += (this.speedIncreaseRate * (delta / 10000)); // Adjust based on delta time
            this.elapsedTime += delta;
            this.obstacleSpeed = Phaser.Math.Linear(-200, this.maxObstacleSpeed, this.elapsedTime / 60000)
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
    }

    spawnObstacle() {
    let yPosition = Phaser.Math.Between(10, 500);
    let obstacle = this.obstacles.create(800, yPosition, 'obstacle');
    obstacle.setVelocityX(this.obstacleSpeed);
    obstacle.setImmovable(true);
    obstacle.body.allowGravity = false;
    let randomHeightScale = Phaser.Math.FloatBetween(1, 3); // Adjust range as needed
    obstacle.setScale(1, randomHeightScale); // Keep width 1, modify height scale

    obstacle.body.setSize(obstacle.width, obstacle.height * randomHeightScale, true)

    // Define weak point
    let weakSpot = this.physics.add.sprite(obstacle.x, obstacle.y, 'weakspot');
    weakSpot.setDisplaySize(50, 20); // Adjust size
    weakSpot.allowGravity = false;
    weakSpot.setImmovable(true);
    // weakSpot.body.moves = false
    weakSpot.parentObstacle = obstacle; // Attach reference
    weakSpot.health = 30
    // Add weakSpot to a group
    this.weakSpots.add(weakSpot);

    // this.physics.add.collider(this.bullets, weakSpot, this.bulletHitObstacle, null, this)
    }

    shootBullet() {
        let bullet = this.bullets.create(this.player.x + 20, this.player.y, 'bullet');
        bullet.setVelocityX(400);
        bullet.setImmovable(true);
        bullet.body.allowGravity = false;
        bullet.damage = 10;
    }

    // bulletHitObstacle(bullet, weakSpot) {
    //     let obstacle = weakSpot.parentObstacle; // Retrieve the parent obstacle
    //     if (obstacle) {
    //         obstacle.health -= bullet.damage;
    //         bullet.destroy();
    //         if (obstacle.health <= 0) {
    //             obstacle.destroy();
    //             weakSpot.destroy();
    //         }
    //     }
    // }

    // hitObstacle(player, obstacle) {
    //     obstacle.destroy(); //Destroy obstacle on collision
    // }
    
    

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

            // if (this.remainingTime <= 0) {
            //     this.timerEvent.remove();
			// 	this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER').setOrigin(0.5)
			// 	this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu').setOrigin(0.5)   
			// 	this.gameOver = true;
            // }
        
    }
    gameOver() {
        this.scene.start('GameOver');
    }

}