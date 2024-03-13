class Play extends Phaser.Scene {
    constructor() {
      super({
        key: `play`
      });
    }
    
    create() {
      this.collectedCount = 0
      this.hudHeight = 80 
      this.wallCount = 100
      this.boxCount = 100
      this.cdCount = 20
      this.startTime = 60
      this.currentTime = 60
      this.gameOver = false

      this.collectables = this.physics.add.group({
        key: `cd`,
        immovable: true,
        quantity: this.cdCount,
      });
    
      this.collectables.children.each(function(collectable) {
          let x = Phaser.Math.Between(this.hudHeight, this.sys.canvas.width - this.hudHeight);
          let y = Phaser.Math.Between(this.hudHeight, this.sys.canvas.height - this.hudHeight);

          collectable.setPosition(x, y);
      }, this);
      
      this.walls = this.physics.add.group({
        key: `wall`,
        immovable: true,
        quantity: this.wallCount,
      });
      
      this.walls.children.each(function(wall) {
        let col = Phaser.Math.Between(2,36)
        let row = Phaser.Math.Between(2,22)
        wall.setPosition(col*36, row*36);
        wall.setTint(`0xdd3333`);
      }, this);

      this.boxes = this.physics.add.group({
        key: `box`,
        immovable: true,
        quantity: this.boxCount,
      });
      
      this.boxes.children.each(function(box) {
        let col = Phaser.Math.Between(2,36)
        let row = Phaser.Math.Between(2,22)
        box.setPosition(col*36, row*36);
      }, this);

      this.avatar = this.physics.add.sprite(20, 100, `avatar`);
  
      this.createAnimations();

      this.avatar.setVelocityX(100);
      this.avatar.setCollideWorldBounds(true);

      this.physics.add.collider(this.avatar, this.walls);
      this.physics.add.collider(this.avatar, this.boxes);
      this.physics.add.overlap(this.avatar, this.collectables, this.collectItem, null, this);

      this.cursors = this.input.keyboard.createCursorKeys();

      let style = {
        fontFamily: `sans-serif`,
        fontSize: `30px`,
        fill: `#ffffff`,
      };
      
      let collected = `Collected CDs: ` + this.collectedCount + '/20';
      
      this.hud = this.physics.add.sprite(0, 0, `hud`);
      this.hud.body.immovable = true;
      this.physics.add.collider(this.avatar, this.hud);
      this.titleText = this.add.text(15, 10, "Thrift Store DJ", style);
      this.clockText = this.add.text(500,10, this.currentTime, style)
      this.hudText = this.add.text(905, 10, collected, style);
      this.lostText = this.add.text(150, 300, "", {fontSize: `100px`});
      
      this.time.addEvent({
        delay: 1000,
        repeat: -1,
        callback: () => {
          if(this.currentTime > 0 && !this.gameOver){
            this.currentTime--
            this.clockText.setText(this.currentTime);
          }
        }
      }); 
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
      if(!this.gameOver){  
        this.handleInput();
      }
      
      if (this.collectedCount == this.cdCount){
        this.lostText.setText("Good Work Loser!")
        
        if(!this.gameOver){
          setTimeout(() => this.reset(), 5000)
          this.gameOver = true
          this.avatar.setVelocityX(0)
          this.avatar.setVelocityY(0)
          this.clockText.setText(this.currentTime);
        }
      }

      if (this.currentTime <= 0){
        this.lostText.setText("Nice Try Loser!")
        this.currentTime = 0
        
        if(!this.gameOver){
          setTimeout(() => this.reset(), 5000)
          this.gameOver = true
          this.avatar.setVelocityX(0)
          this.avatar.setVelocityY(0)
          this.clockText.setText(this.currentTime);
        }
      }
    }
      
      reset() {
        this.currentTime = this.startTime  
        this.collectedCount = 0
        this.avatar.setPosition(20,100)
        this.scene.restart()
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
    
        this.avatar.play(`idle`, true);
      }

      collectItem(avatar, item) {
        item.destroy();
        
        this.collectedCount++
        this.hudText.setText(`Collected CDs: ` + this.collectedCount  + '/20');
        
        let soundName = "cd" + (Math.ceil(Math.random()*3)).toString()
        this.sound.play(soundName);
      }
    }