class Boot extends Phaser.Scene {

  constructor() {
    super({
      key: `boot`
    });
  }

  preload() {
  
    this.load.image(`wall`, `assets/images/wall.png`);
    this.load.image(`box`, `assets/images/box.png`);
    this.load.image(`cd`, `assets/images/cd.png`);
    
    this.load.spritesheet(`avatar`, `assets/images/avatar.png`, {
      frameWidth: 32,
      frameHeight: 32,
      endFrame: 1
    });

    this.load.on(`complete`, () => {
      this.scene.start(`play`);
    });

    // // CHANGE SOUNDS FX
    this.load.setPath('assets/sounds');

    this.load.audio('cd1', 'cd1.mp3');
    this.load.audio('cd2', 'cd2.mp3');
    this.load.audio('cd3', 'cd3.mp3');
  }

  create() {

    let loadingTextStyle = {
      fontFamily: "sans-serif",
      fontSize: "40px",
      fill: "#ffffff",
      align: "center"
    };
    let loadingString = `Loading...`;
    this.loadingText = this.add.text(100, 100, loadingString, loadingTextStyle);

  }

  update() {

  }
}