class Play extends Phaser.Scene {
    constructor() {
      super({
        key: `play`
      });
    }
  
    create() {
      this.wall = this.physics.add.sprite(100, 100, `wall`);
      this.wall.setTint(`0xdd3333`);
  
      this.avatar = this.physics.add.sprite(200, 200, `avatar`);
  
      this.createAnimations();

      this.avatar.setVelocityX(100);
      this.avatar.play(`moving`);
      this.avatar.setCollideWorldBounds(true);

      this.cursors = this.input.keyboard.createCursorKeys();
    }
  
    createAnimations() {
      let movingAnimationConfig = {
        key: `moving`,
        frames: this.anims.generateFrameNumbers(`avatar`, {
          start: 0,
          end: 3
        }),
        frameRate: 30,
        repeat: -1
      };
      this.anims.create(movingAnimationConfig);
  
      let idleAnimationConfig = {
        key: `idle`,
        frames: this.anims.generateFrameNumbers(`avatar`, {
          start: 0,
          end: 0
        }),
        
        repeat: 0
      };
      this.anims.create(idleAnimationConfig);
    }
  
    update() {
        this.handleInput();
      }
    
      handleInput() {
        
        if (this.cursors.left.isDown) {
          this.avatar.setVelocityX(-100);
        }
        else if (this.cursors.right.isDown) {
          this.avatar.setVelocityX(100);
        }
        else {
          this.avatar.setVelocityX(0);
        }
    
        if (this.cursors.up.isDown) {
          this.avatar.setVelocityY(-100);
        }
        else if (this.cursors.down.isDown) {
          this.avatar.setVelocityY(100);
        }
        else {
          this.avatar.setVelocityY(0);
        }
    
        
        if (this.avatar.body.velocity.x !== 0 || this.avatar.body.velocity.y !== 0) {
         
          this.avatar.play(`moving`, true);
        }
        else {
          this.avatar.play(`idle`, true);
        }
      }
    }