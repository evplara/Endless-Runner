class Play extends Phaser.Scene {
    constructor() {
        super({ key: 'Play' });
    }

    create() {
        this.bg = this.add.tileSprite(400, 300, 800, 600, 'background'); 
        this.ground = this.physics.add.sprite(400, 900, 'ground').setImmovable(true);
        this.ground.body.allowGravity = false;

        this.player = this.physics.add.sprite(100, 450, 'player').setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.ground);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.obstacles = this.physics.add.group();
        this.time.addEvent({ delay: 2000, callback: this.spawnObstacle, callbackScope: this, loop: true });

        this.physics.add.collider(this.player, this.obstacles, this.gameOver, null, this);
        
        this.bgSpeed = 2
        this.maxSpeed = 10
        this.speedIncreaseRate = (this.maxSpeed - this.bgSpeed) / 30; //speed increase per second
        this.elapsedTime = 0
        
        this.obstacleSpeed = -200
        this.maxObstacleSpeed = -1000
    }

    update(time, delta) {
        
        //background scrolling
        this.bg.tilePositionX += this.bgSpeed

        //increase speed gradually over 30 seconds
        if (this.elapsedTime < 30000) {
            this.bgSpeed += (this.speedIncreaseRate * (delta / 1000)); // Adjust based on delta time
            this.elapsedTime += delta;
            this.obstacleSpeed = Phaser.Math.Linear(-200, this.maxObstacleSpeed, this.elapsedTime / 30000)
        } else {
            this.bgSpeed = this.maxSpeed; //cap at max speed
            this.obstalceSpeed = this.maxObstacleSpeed
        }

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200);
        } else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-1000);
        }

    }

    spawnObstacle() {
        let yPosition = Phaser.Math.Between(300, 500);
        let obstacle = this.obstacles.create(800, yPosition, 'obstacle');
        obstacle.setVelocityX(this.obstacleSpeed);
        obstacle.setImmovable(true);
        obstacle.body.allowGravity = false
    }

    hitObstacle(player, obstacle) {
        obstacle.destroy(); // Destroy obstacle on collision
    }


    gameOver() {
        this.scene.start('GameOver');
    }

}