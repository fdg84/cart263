/**
VOICE ACTIVATED AUDIO X
Francis Ouellette

Inspired by Pippin Barr
Multiple Commands + Variables in Commands
*/

"use strict";

const sounds = []

function preload() {
    let air = loadSound('assets/sounds/air.wav');
    sounds.push(air)
    let bass = loadSound('assets/sounds/bass.wav');
    sounds.push(bass)
    let clap = loadSound('assets/sounds/clap.wav');
    sounds.push(clap)
    let clave = loadSound('assets/sounds/clave.wav');
    sounds.push(clave)
    let hat = loadSound('assets/sounds/hat.wav');
    sounds.push(hat)
    let kick = loadSound('assets/sounds/kick.wav');
    sounds.push(kick) 
    let laser = loadSound('assets/sounds/laser.wav');
    sounds.push(laser) 
    let riser = loadSound('assets/sounds/riser.wav');
    sounds.push(riser) 
    let snare = loadSound('assets/sounds/snare.wav');
    sounds.push(snare) 
    let synth = loadSound('assets/sounds/synth.wav');
    sounds.push(synth) 
}

const voiceSynthesizer = new p5.Speech();
const voiceRecognizer = new p5.SpeechRec();

const commands = [
  {
    "command": "hello",
    "callback": hello
  },
  {
    "command": "air",
    "callback": air
  },
  {
    "command": "bass",
    "callback": bass
  },
  {
    "command": "clap",
    "callback": clap
  },
  {
    "command": "clave",
    "callback": clave
  },
  {
    "command": "hat",
    "callback": hat
  },
  {
    "command": "kick",
    "callback": kick
  },
  {
    "command": "laser",
    "callback": laser
  },
  {
    "command": "riser",
    "callback": riser
  },
  {
    "command": "snare",
    "callback": snare
  },
  {
    "command": "synth",
    "callback": synth
  }
];

let feedbackString = `...`;

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  voiceRecognizer.continuous = true;
  voiceRecognizer.onResult = onResult;
  voiceRecognizer.start();
}

function draw() {
  background(0);
  
  push();
  textSize(64);
  textAlign(CENTER, CENTER);
  text(feedbackString, width/2, height/2);
  pop();
}

function onResult() {
  if (!voiceRecognizer.resultValue) {
    return;
  }
  console.log(voiceRecognizer.resultString);
  for (let command of commands) {
    if (voiceRecognizer.resultString.toLowerCase() === command.command) {
      // We have a match, execute the corresponding callback
      command.callback();
      break;
    }    
  }
}

function hello() {
  voiceSynthesizer.speak(`MUSIC IS LIFE`);
  feedbackString = `MUSIC IS LIFE`;
}

function air() {
  feedbackString = `AIR`;
}

function bass() {
  feedbackString = `BASS`;
}

function clap() {
  feedbackString = `CLAP`;
}

function clave() {
  feedbackString = `CLAVE`;
}

function hat() {
  feedbackString = `HAT`;
}

function kick() {
  feedbackString = `KICK`;
}

function laser() {
  feedbackString = `LASER`;
}

function riser() {
  feedbackString = `RISER`;
}

function snare() {
  feedbackString = `SNARE`;
}

function synth() {
  feedbackString = `SYNTH`;
}

// // Title Text
// textFont(`Tilt Warp`)
// textSize(120);
// noStroke();
// fill(255);
// text('DOTS', 150, 368);

// // Lime Text
// textFont(`Space Grotesk`)
// textSize(30);
// noStroke();
// fill(171, 250, 0);
// text('Audio', 157, 277);

// textSize(30);
// noStroke();
// fill(171, 250, 0);
// text('Click & Play', 280, 400);

// // Info Text
// textSize(12);
// noStroke();
// fill(163, 195, 141);
// text('Welcome to a fun & interactive sound experience!', 160, 225);