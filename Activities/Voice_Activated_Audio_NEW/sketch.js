/**
VOICE ACTIVATED AUDIO
Francis Ouellette

Inspired by Pippin Barr
Multiple Commands + Variables in Commands
*/

"use strict";

const voiceSynthesizer = new p5.Speech();
const voiceRecognizer = new p5.SpeechRec();
let wetWav, liquidWav, bubblyWav, airWav, flowWav
let feedbackString = `...`;
let textColor = `white`

// Load Audio
function preload() {
    wetWav = loadSound('assets/sounds/vRec1.wav');
    liquidWav = loadSound('assets/sounds/vRec2.wav');
    bubblyWav = loadSound('assets/sounds/vRec3.wav');
    airWav = loadSound('assets/sounds/vRec4.wav');
    flowWav = loadSound('assets/sounds/vRec5.wav');
}

// Voice Activated Word Bank
const commands = [
  {
    "command": ["hello", "hi", "hey"],
    "callback": hello
  },
  {
    "command": ["wet", "what"],
    "callback": wet
  },
  {
    "command": ["liquid"],
    "callback": liquid
  },
  {
    "command": ["bubbly"],
    "callback": bubbly
  },
  {
    "command": ["air", "hair", "pair", "dare"],
    "callback": air
  },
  {
    "command": ["flow", "glow", "blow", "slow"],
    "callback": flow
  },
];

// Activate Voice Recognizer
function setup() {
  createCanvas(windowWidth,windowHeight);
  voiceRecognizer.continuous = true;
  voiceRecognizer.onResult = onResult;
  voiceRecognizer.start();
}

function draw() {
  background(0);
  
  // Font
  push();
  textSize(222)
  textAlign(CENTER, CENTER);
  textFont(`Tilt Warp`)
  fill(textColor)
  text(feedbackString, width/2, height/2);

  // Info Text
  textSize(16);
  noStroke();
  fill('white');
  text(`Welcome to a fun & interactive sound experience! \n Say these words to activate live audio: \n \n WET - LIQUID - BUBBLY - AIR - FLOW \n \n Don't forget to say HELLO!`, width/2, height/1.2);
  pop();
}

// Callback
function onResult() {
  if (!voiceRecognizer.resultValue) {
    return;
  }
  console.log(voiceRecognizer.resultString);
  let result  = voiceRecognizer.resultString.toLowerCase()
  for (let command of commands) {
    if (command.command.includes(result)) {
      command.callback();
      break;
    }    
  }
}

// Words - Colors - Sounds
function hello() {
  textColor = `red`
  voiceSynthesizer.speak(`MUSIC IS LIFE`);
  feedbackString = `MUSIC IS LIFE`;
}

function wet() {
  textColor = `cyan`
  feedbackString = `WET`;
  wetWav.play()
}

function liquid() {
  textColor = `navy`
  feedbackString = `LIQUID`;
  liquidWav.play()
}

function bubbly() {
  textColor = `teal`
  feedbackString = `BUBBLY`;
  bubblyWav.play()
}

function air() {
  textColor = `fuchsia`
  feedbackString = `AIR`;
  airWav.play()
}

function flow() {
  textColor = `pink`
  feedbackString = `FLOW`;
  flowWav.play()
}
