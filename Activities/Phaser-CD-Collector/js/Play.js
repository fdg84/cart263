class Play extends Phaser.Scene {
    constructor() {
      super({
        key: `play`
      });
    }
  
    create() {

      this.walls = this.physics.add.group({
        key: `wall`,
        immovable: true,
        quantity: 40,
    });
    this.walls.children.each(function(wall) {
        let x = Phaser.Math.Between(0, this.sys.canvas.width);
        let y = Phaser.Math.Between(0, this.sys.canvas.height);

        wall.setPosition(x, y);
        wall.setTint(`0xdd3333`);
    }, this);

    this.boxes = this.physics.add.group({
      key: `box`,
      immovable: true,
      quantity: 40,
  });
  this.boxes.children.each(function(box) {
      let x = Phaser.Math.Between(0, this.sys.canvas.width);
      let y = Phaser.Math.Between(0, this.sys.canvas.height);

      box.setPosition(x, y);
  }, this);

    this.collectables = this.physics.add.group({
        key: `cd`,
        immovable: true,
        quantity: 20,
    });
    this.collectables.children.each(function(collectable) {
        let x = Phaser.Math.Between(0, this.sys.canvas.width);
        let y = Phaser.Math.Between(0, this.sys.canvas.height);

        collectable.setPosition(x, y);
    }, this);
  
      this.avatar = this.physics.add.sprite(200, 200, `avatar`);
  
      this.createAnimations();

      this.avatar.setVelocityX(100);
      //this.avatar.play(`moving`);
      this.avatar.setCollideWorldBounds(true);

      this.physics.add.collider(this.avatar, this.walls);
      this.physics.add.collider(this.avatar, this.boxes);
      this.physics.add.overlap(this.avatar, this.collectables, this.collectItem, null, this);

      this.cursors = this.input.keyboard.createCursorKeys();

    }
  
    createAnimations() {  
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
         
          //this.avatar.play(`moving`, true);
        }
        else {
          this.avatar.play(`idle`, true);
        }
      }

      collectItem(avatar, item) {
        item.destroy();
        let soundName = "cd" + (Math.ceil(Math.random()*3)).toString()
        this.sound.play(soundName);
      }
    }