class Play extends Phaser.Scene {
    constructor() {
      super({
        key: `play`
      });
    }
  
    create() {
      this.wall = this.add.sprite(100, 100, `wall`);
      this.wall.setTint(`0xdd3333`);
  
      this.avatar = this.add.sprite(200, 200, `avatar`);
  
      this.createAnimations();
  
      this.avatar.play(`idle`);
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
  
    }
  }