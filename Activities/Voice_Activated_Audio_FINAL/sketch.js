/**
VOICE ACTIVATED AUDIO X
Francis Ouellette

Inspired by Pippin Barr
Multiple Commands + Variables in Commands
*/

"use strict";

const voiceSynthesizer = new p5.Speech();
const voiceRecognizer = new p5.SpeechRec();
let isSound = true
let airWav, bassWav, clapWav, claveWav, hatWav, kickWav, laserWav, riserWav, snareWav, synthWav

let feedbackString = `...`;
let textColour = `white`

function preload() {
    airWav = loadSound('assets/sounds/air.wav');
    bassWav = loadSound('assets/sounds/bass.wav');
    clapWav = loadSound('assets/sounds/clap.wav');
    claveWav = loadSound('assets/sounds/clave.wav');
    hatWav = loadSound('assets/sounds/hat.wav');
    kickWav = loadSound('assets/sounds/kick.wav');
    laserWav = loadSound('assets/sounds/laser.wav');
    riserWav = loadSound('assets/sounds/riser.wav');
    snareWav = loadSound('assets/sounds/snare.wav');
    synthWav = loadSound('assets/sounds/synth.wav'); 
}

const commands = [
  {
    "command": ["hello"],
    "callback": hello
  },
  {
    "command": ["air"],
    "callback": air
  },
  {
    "command": ["bass"],
    "callback": bass
  },
  {
    "command": ["clap"],
    "callback": clap
  },
  {
    "command": ["clave", "clav"],
    "callback": clave
  },
  {
    "command": ["hat"],
    "callback": hat
  },
  {
    "command": ["kick"],
    "callback": kick
  },
  {
    "command": ["laser"],
    "callback": laser
  },
  {
    "command": ["riser"],
    "callback": riser
  },
  {
    "command": ["snare"],
    "callback": snare
  },
  {
    "command": ["synth"],
    "callback": synth
  }
];

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  voiceRecognizer.continuous = true;
  voiceRecognizer.onResult = onResult;
  voiceRecognizer.start();
}

function draw() {
  background(0);
  
  push();
  (isSound) ? textSize(222) : textSize(222/feedbackString.split(" ").length)
  textAlign(CENTER, CENTER);
  textFont(`Tilt Warp`)
  fill(textColour)
  text(feedbackString, width/2, height/2);

  // Info Text
  textSize(16);
  noStroke();
  fill('white');
  text(`Welcome to a fun & interactive sound experience! \n Say these words to activate live audio: \n \n AIR - BASS - CLAP - CLAVE - HAT - KICK - LASER - RISER - SNARE - SYNTH \n \n Don't forget to say HELLO!`, width/2, height/1.2);
  pop();
}

function onResult() {
  if (!voiceRecognizer.resultValue) {
    return;
  }
  console.log(voiceRecognizer.resultString);
  let result  = voiceRecognizer.resultString.toLowerCase()
  for (let command of commands) {
    //console.log('command', command.command)
    if (command.command.includes(result)) {
      // We have a match, execute the corresponding callback
      console.log("this is a found sound",isSound, command.command, result)
      command.callback();
      isSound = true
      break;
    } else {
      console.log("this is not a sound :",isSound, command.command, result)
      feedbackString = voiceRecognizer.resultString.toUpperCase()
      isSound = false
    }    
  }
}

function hello() {
  voiceSynthesizer.speak(`MUSIC IS LIFE`);
  feedbackString = `MUSIC IS LIFE`;
}

function air() {
  textColour = `cyan`
  feedbackString = `AIR`;
  airWav.play()
}

function bass() {
  textColour = `white`
  feedbackString = `BASS`;
  bassWav.play()
}

function clap() {
  textColour = `red`
  feedbackString = `CLAP`;
  clapWav.play()
}

function clave() {
  textColour = `orange`
  feedbackString = `CLAVE`;
  claveWav.play()
}

function hat() {
  textColour = `yellow`
  feedbackString = `HAT`;
  hatWav.play()
}

function kick() {
  textColour = `gray`
  feedbackString = `KICK`;
  kickWav.play()
}

function laser() {
  textColour = `green`
  feedbackString = `LASER`;
  laserWav.play()
}

function riser() {
  textColour = `purple`
  feedbackString = `RISER`;
  riserWav.play()
}

function snare() {
  textColour = `pink`
  feedbackString = `SNARE`;
  snareWav.play()
}

function synth() {
  textColour = `beige`
  feedbackString = `SYNTH`;
  synthWav.play()
}