/**
AI HAIKU
Francis Ouellette

Inspired by Pippin Barr - Class Examples
Multiple Commands + Variables in Commands 
*/

"use strict"; 

const voiceSynthesizer = new p5.Speech();
const voiceRecognizer = new p5.SpeechRec();
let cd1, cd2, cd3
//let feedbackString = `...`; 

let textColor = `black`
let level = 0
let rectCoords = []
let lineChosen = false
let haiku = []
let random = [3,5,0,2,1,4]
let levelDelay = 3000
let speechDelay = 500

let height = 200
let width = 350
let space = 400
let menu
let isMenuScreen = false
//voiceSynthesizer.onEnd = onSpeechEnd

// function onSpeechEnd () {
//   console.log("TEST END")
// }

// Load Audio
function preload() {
    // cd1 = loadSound('assets/sounds/cd1.mp3');
    // cd2 = loadSound('assets/sounds/cd2.mp3');
    // cd3 = loadSound('assets/sounds/cd3.mp3');
    menu = loadImage('assets/images/intro.png');

}

// MAKE TITLE PAGE


const lines = [
  // Level 1
  [
    {
      "command": ["vast", "inky", "expanse"],
      "line": ["Vast,", "inky expanse"],  
      "text": "Vast inky expanse",
      "score": 185
    },
    {
      "command": ["telescopes", "telescope", "keen", "eye"],
      "line": ["Telescope's", "keen eye"],
      "text": "Telescope's keen eye", 
      "score": 194 
    },
    {
      "command": ["distant", "planets", "gleam"],
      "line": ["Distant planets",  "gleam"],  
      "text": "Distant planets gleam",
      "score": 206  
    },
    {
      "command": ["reach", "stars"],
      "line": ["We reach for", "the stars"],  
      "text": "We reach for the stars",  
      "score": 224  
    },
    {
      "command": ["dust", "particles", "dance"],
      "line": ["Dust particles", "dance"],  
      "text": "Dust particles dance",  
      "score": 188  
    },
    {
      "command": ["beneath", "full", "moon"],
      "line": ["Beneath a", "full moon"],  
      "text": "Beneath a full moon",  
      "score": 184  
    }
  ],
  // Level 2
  [
    {
      "command": ["stars", "whisper", "ancient", "secrets"],
      "line": ["Stars whisper", "ancient secrets"],  
      "text": "Stars whisper ancient secrets",  
      "score": 258
    },
    {
      "command": ["pierces", "giant", "darkness"],
      "line": ["Piercing giant", "darkness"],  
      "text": "Piercing giant darkness",  
      "score": 224 
    },
    {
      "command": ["alone", "question"],
      "line": ["Are we alone?", "The question"],  
      "text": "Are we alone? The question",  
      "score": 229  
    },
    {
      "command": ["building", "ships", "dreams", "hope"],
      "line": ["Building ships of", "dreams and hope"],  
      "text": "Building ships of dreams and hope",  
      "score": 252  
    },
    {
      "command": ["answers", "creation"],
      "line": ["Answers of", "creation"],  
      "text": "Answers of creation",  
      "score": 225  
    },
    {
      "command": ["feel", "cosmic", "pull"],
      "line": ["We feel", "the cosmic pull"],  
      "text": "We feel the cosmic pull",  
      "score": 224  
    }
  ],
  // Level 3
  [
    {
      "command": ["listen", "yearn", "know"],
      "line": ["We listen,", "yearn to know"],  
      "text": "We listen yearn to know",  
      "score": 248
    },
    {
      "command": ["speck", "yet", "one"],
      "line": ["A speck,","yet we're one"],  
      "text": "A speck, yet we're one",  
      "score": 204 
    },
    {
      "command": ["echoes", "void"],
      "line": ["Echoes in" ,"the void"],  
      "text": "Echoes in the void",  
      "score": 154  
    },
    {
      "command": ["touch", "unknown"],
      "line": ["To touch", "the unknown"],  
      "text": "To touch the unknown",  
      "score": 241  
    },
    {
      "command": ["timeless", "ballet"],
      "line": ["A timeless" ,"ballet"],  
      "text": "A timeless ballet",  
      "score": 137  
    },
    {
      "command": ["kinship", "with", "all"],
      "line": ["A kinship", "with all"],  
      "text": "A kinship with all",  
      "score": 184  
    }
  ]
]

// Mother's Possible Responses 
let responses = [
  {
    "text": "Amongst the stars, listen. The universe sings a song of connection, woven with love's luminous thread. You are part of it, shine bright.",
    "line": ["Amongst the stars, listen.",  "The universe sings a song of connection,",  "woven with love's luminous thread.",  "You are part of it, shine bright."],
    "score": 10
  },
  {
    "text": "Listen, child of the stars. Love threads the vastness, you're part of the song. Shine on.",
    "line": ["Listen, child of the stars.", "Love threads the vastness", "you're part of the song.", "Shine on."],
    "score": 20
  },
  {
    "text": "Starlight whispers. Love binds the cosmos, be the light.",
    "line": ["Starlight whispers.", "Love binds the cosmos, be the light."],
    "score": 40
  },
  {
    "text": "Star whispers, love binds, be light.",
    "line": ["Star whispers, love binds, be light."],
    "score": 60
  },
  {
    "text": "Whispers on starlight, love binds all.",
    "line": ["Whispers on starlight, love binds all."],
    "score": 100
  },
  {
    "text": "Love's light binds all.",
    "line": ["Love's light binds all."],
    "score": 200
  }
]

// Activate Voice Recognizer + SETTINGS

function setup() {
  voiceRecognizer.continuous = true;
  voiceRecognizer.onResult = onResult;
  voiceRecognizer.start();

  //
  //
  // TURN THIS ON & OFF TO REACTIVATE SPEECH BOT
  //
  //
  
  // console.log(voiceSynthesizer.listVoices());


  voiceSynthesizer.continuous = true;
  voiceSynthesizer.setPitch(0.8);
  voiceSynthesizer.setRate(0.8);
  voiceSynthesizer.setVoice(`Google UK English Male`);

  // textFont(`Tilt Warp`)
  // textAlign(CENTER);
  menuScreen()
  //startLevel()
}

function startLevel() {
  createCanvas(windowWidth,windowHeight);
  voiceSynthesizer.setPitch(0.8);
  voiceSynthesizer.setRate(0.8);
  voiceSynthesizer.setVoice(`Google UK English Male`);
  
  // First Row of Boxes
  let y = 50
  for (let i = 0; i < 3; i++){
    let x = 200 + i*space
    rect(x, y, width, height);
    rectCoords.push({x,y,boxId: i})
  }
  
  // Second Row of Boxes
  y = 270
  for (let i = 0; i < 3; i++){
    let x = 200 + i*space
    rect(x, y, width, height);
    rectCoords.push({x,y,boxId: i+3})
  }  
  
  // Add Text
  for (let i = 0; i < 6; i++){
    textSize(30)
    // textFont(`Tilt Warp`)
    fill(textColor)
    
    let lineCount = 0
    for (let line of lines[level][random[0]].line){
      text(line, rectCoords[i].x + 30, rectCoords[i].y + 100 + 40*lineCount);
      lineCount++
    }
    // JUMPS LINE IN TEXT BOXES

    //text(lines[level][random[0]].line, rectCoords[i].x + 30, rectCoords[i].y + 100);
    
    lines[level][random[0]].boxId = rectCoords[i].boxId
    random.shift()
  }
  
  // Write The Haiku So Far
  let lineNum = 0
  for(let line of haiku){
    textSize(30)
    // textFont(`Tilt Warp`)
    fill(textColor)
    text(line.text, windowWidth/2-100, 520 + lineNum*50);
    lineNum++
  }
  
}

function menuScreen() {
  createCanvas(windowWidth,windowHeight);
  background(255);
  isMenuScreen = true
  voiceSynthesizer.setPitch(0.1);
  voiceSynthesizer.setRate(0.5);
  voiceSynthesizer.setVoice(`Google UK English Female`);
  voiceSynthesizer.speak("Welcome")
    
  // Draw the image.
  image(menu, 200,50, 1200, 675);
}

//The Final Conversation

// The Haiku Result Page 
function haikuPage() {
  createCanvas(windowWidth,windowHeight);
  
  let lineNum = 0
  let score = 0
  let haikuText = ""
  for(let line of haiku){
    textSize(50)
    // textFont(`Tilt Warp`)
    fill(textColor)
    text(line.text, windowWidth/2-300, 320 + lineNum*50);
    score += line.score
    lineNum++
    haikuText += ", " + line.text
  }
  
  console.log("HAIKU ::: ", haikuText)
  
  setTimeout(() => {
    voiceSynthesizer.speak(haikuText)
    setTimeout(() => motherPage(score) , 10000)
   } 
   , speechDelay)
  
  // Score Text Is Here - KEEP HIDDEN  

  // textSize(30)
  // textFont(`Tilt Warp`)
  // fill(textColor)
  // text("score: " + score, windowWidth/2-100, 320 + (lineNum)*50);

}

function motherPage(score) {
  createCanvas(windowWidth,windowHeight);
  console.log("SCORE: ", score)
  let lineNum = 0
  //let responseText = ""
  let finalResponse = {}
  let finalScore = Math.abs(555 - score)
  console.log("FINAL SCORE: ", finalScore)
  for(let response of responses){
    if (finalScore < response.score){
      finalResponse = response
      console.log("THIS IS MY FINAL RESPONSE", finalResponse)
      break;
    }
  }

  for(let line of finalResponse.line){
    textSize(60)
    // textFont(`Tilt Warp`)
    fill("white")
    text(line, windowWidth/2-400, 320 + lineNum*50);
    lineNum++
  }
  
  console.log("TEX ::: ", finalResponse.text)
  
  voiceSynthesizer.setPitch(0.1);
  voiceSynthesizer.setRate(0.5);
  voiceSynthesizer.setVoice(`Google UK English Female`);
  setTimeout(voiceSynthesizer.speak(finalResponse.text), speechDelay)
  
  level = 0
  haiku = []
  setTimeout(startLevel, 20000)
}
// Background Color
function draw() {
  if (!isMenuScreen) {
    background (37,58,90,3)
  }
}

// 
function choose(line){
  lineChosen = true
  //colourBox(line.line, line.boxId)
  
  // SHOW SELECTED BOX (COLOR)
  push()
  fill(214, 254, 2)
  rect(rectCoords[line.boxId].x, rectCoords[line.boxId].y, width, height);   
  textSize(30)
  // textFont(`Tilt Warp`)
  fill(textColor)
  
  let lineCount = 0
  for (let words of line.line){
    text(words, rectCoords[line.boxId].x + 30, rectCoords[line.boxId].y + 100 + 40*lineCount);
    lineCount++
  }

  // Speak Chosen Line
  setTimeout(() => voiceSynthesizer.speak(line.text), speechDelay)
  
  // Add Line To Haiku
  haiku.push(line)
  // Randomize The Lines
  random = [4,0,2,1,3,5]
  // Increase The Level
  level++
  
  if(level < 3){
    setTimeout(startLevel, levelDelay)
  }else{
    setTimeout(haikuPage, levelDelay)
  }
}

// Voice Recorder Callback
function onResult() {
  lineChosen = false
  if (!voiceRecognizer.resultValue) {
    return;
  }
  console.log(voiceRecognizer.resultString);
  let result  = voiceRecognizer.resultString.toLowerCase()
  if (isMenuScreen) {
    if (result.split(" ").includes("start")){
      isMenuScreen = false
      startLevel()  
    }
  } else {
    for (let line of lines[level]) {
      for (let word of result.split(" ")){
        if (line.command.includes(word)) {
          choose(line);
          break;
        }    
      }
    }
  }
}
