/**
CD Collector (Phaser Project)
Francis Ouellette

SOUND FX: https://pixabay.com/sound-effects/search/sparkle/ 
AUDIO: https://github.com/phaserjs/examples/blob/master/public/src/audio/Web%20Audio/play%20movement%20sound.js

*/

"use strict";

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
  },

  scene: [Boot, Play]
};

let game = new Phaser.Game(config);