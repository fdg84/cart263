/**
AI HAIKU
Francis Ouellette

Inspired by Pippin Barr
Multiple Commands + Variables in Commands
*/

"use strict";

const voiceSynthesizer = new p5.Speech();
const voiceRecognizer = new p5.SpeechRec();
let wetWav, liquidWav, bubblyWav, airWav, flowWav
let feedbackString = `...`;
let textColor = `black`
let level = 0
let rectCoords = []
let lineChosen = false
let haiku = []
let random = [3,5,0,2,1,4]
let pauseBeforeLevel = 1000
  

// Load Audio
function preload() {
    // wetWav = loadSound('assets/sounds/vRec1.wav');
    // liquidWav = loadSound('assets/sounds/vRec2.wav');
    // bubblyWav = loadSound('assets/sounds/vRec3.wav');
    // airWav = loadSound('assets/sounds/vRec4.wav');
    // flowWav = loadSound('assets/sounds/vRec5.wav');
}


const lines = [
  [
    {
      "command": ["vast", "inky", "expanse"],
      "line": "Vast, inky expanse",  
      "score": 185
    },
    {
      "command": ["telescopes", "telescope", "keen", "eye"],
      "line": "Telescope's keen eye",  
      "score": 194 
    },
    {
      "command": ["distant", "planets", "gleam"],
      "line": "Distant planets gleam",  
      "score": 206  
    },
    {
      "command": ["reach", "stars"],
      "line": "We reach for the stars",  
      "score": 224  
    },
    {
      "command": ["dust", "particles", "dance"],
      "line": "Dust particles dance",  
      "score": 188  
    },
    {
      "command": ["Beneath", "full", "moon"],
      "line": "Beneath a full moon",  
      "score": 184  
    }
  ],
  [
    {
      "command": ["stars", "whisper", "ancient", "secrets"],
      "line": "Stars whisper ancient secrets",  
      "score": 258
    },
    {
      "command": ["pierces", "giant", "darkness"],
      "line": "Pierces giant darkness",  
      "score": 224 
    },
    {
      "command": ["alone", "question"],
      "line": "Are we alone? The question",  
      "score": 229  
    },
    {
      "command": ["building", "ships", "dreams", "hope"],
      "line": "Building ships of dreams and hope",  
      "score": 252  
    },
    {
      "command": ["whispers", "creation"],
      "line": "Whispers of creation",  
      "score": 225  
    },
    {
      "command": ["feel", "cosmic", "pull"],
      "line": "We feel the cosmic pull",  
      "score": 224  
    }
  ],
  [
    {
      "command": ["listen", "yearn", "know"],
      "line": "We listen, yearn to know",  
      "score": 248
    },
    {
      "command": ["speck", "yet", "one"],
      "line": "A speck, yet we're one",  
      "score": 204 
    },
    {
      "command": ["echoes", "void"],
      "line": "Echoes in the void",  
      "score": 154  
    },
    {
      "command": ["touch", "unknown"],
      "line": "To touch the unknown",  
      "score": 241  
    },
    {
      "command": ["timeless", "ballet"],
      "line": "A timeless ballet",  
      "score": 137  
    },
    {
      "command": ["kinship", "all"],
      "line": "A kinship with all",  
      "score": 184  
    }
  ]
]


let height = 200
let width = 350
let space = 400

// Activate Voice Recognizer
function setup() {
  voiceRecognizer.continuous = true;
  voiceRecognizer.onResult = onResult;
  voiceRecognizer.start();
  drawBoxes()
}

function drawBoxes() {
  createCanvas(windowWidth,windowHeight);
  let y = 50
  for (let i = 0; i < 3; i++){
    let x = 250 + i*space
    rect(x, y, width, height);
    rectCoords.push({x,y,boxId: i})
  }
  y = 270
  for (let i = 0; i < 3; i++){
    let x = 250 + i*space
    rect(x, y, width, height);
    rectCoords.push({x,y,boxId: i+3})
  }  
  
  for (let i = 0; i < 6; i++){
    textSize(30)
    textFont(`Tilt Warp`)
    fill(textColor)
    text(lines[level][random[0]].line, rectCoords[i].x + 30, rectCoords[i].y + 100);
    lines[level][random[0]].boxId = rectCoords[i].boxId
    random.shift()
  }
  
  // write the chosen lines of the haiku
  let lineNum = 0
  let score = 0
  for(let line of haiku){
    textSize(30)
    textFont(`Tilt Warp`)
    fill(textColor)
    text(line.line, windowWidth/2-100, 520 + lineNum*50);
    score += line.score
    lineNum++
  }
  
  textSize(30)
  textFont(`Tilt Warp`)
  fill(textColor)
  text("score: " + score, windowWidth/2-100, 520 + (lineNum)*50);

}

function draw() {
  //background(0);
  
  // Font
  // push();
  
  // Info Text
  // textSize(16);
  // noStroke();
  // fill('white');
  // text(`Welcome to a fun & interactive sound experience! \n Say these words to activate live audio: \n \n WET - LIQUID - BUBBLY - AIR - FLOW \n \n Don't forget to say HELLO!`, width/2, height/1.2);
  // pop();
}

function colourBox(boxId){
  push()
  fill('yellow')
  rect(rectCoords[boxId].x, rectCoords[boxId].y, width, height);   
}

function choose(line){
  console.log("FOUND IT", line.line, line.boxId)
  lineChosen = true
  colourBox(line.boxId)
  haiku.push(line)
  random = [4,0,2,1,3,5]
  level++
  if(level === 3){
    level = 0
  }
  setTimeout(drawBoxes, pauseBeforeLevel)
  console.log('haiku', haiku)  
}

// Callback
function onResult() {
  lineChosen = false
  if (!voiceRecognizer.resultValue) {
    return;
  }
  console.log(voiceRecognizer.resultString);
  let result  = voiceRecognizer.resultString.toLowerCase()
  for (let line of lines[level]) {
    for (let word of result.split(" ")){
      if (line.command.includes(word)) {
        choose(line);
        break;
      }    
    }
  }
  if (!lineChosen){
    console.log("NOT FOUND")
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
