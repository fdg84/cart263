/**
CD Collector (Phaser Project)
Francis Ouellette

Based on PIPPIN BARR's CART 263 Class Example

SOUND FX: https://pixabay.com/sound-effects/search/sparkle/ 
AUDIO: https://github.com/phaserjs/examples/blob/master/public/src/audio/Web%20Audio/play%20movement%20sound.js

*/

"use strict";

let config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 700,
  physics: {
    default: 'arcade',
  },

  scene: [Boot, Play]
};

let game = new Phaser.Game(config);