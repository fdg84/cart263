/**
ASK TH3RA - Interactive AI Therapist
Francis Ouellette
*/

"use strict";

const voiceSynthesizer = new p5.Speech();
const voiceRecognizer = new p5.SpeechRec();
//let wetWav, liquidWav, bubblyWav, airWav, flowWav
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
    // wetWav = loadSound('assets/sounds/vRec1.wav');
    menu = loadImage('assets/images/intro.png');
}


const lines = [
  // Level 0 - Intro Page (NEED TO ADD)
  //
  // Level 1
  [
    {
      "command": ["Existential", "Ennui", "Who", "Me"],
      "line": ["Existential Ennui,", "Who Me"],  
      "text": "Existential Ennui Who Me",
      "score": 1
    },
    {
      "command": ["Reality", "TV", "Intriguing"],
      "line": ["Reality TV?", "Intriguing"],
      "text": "Reality TV? Intriguing ", 
      "score": 2 
    },
    {
      "command": ["Spice", "Things", "Up"],
      "line": ["Spice", "Things Up?"],  
      "text": "Spice Things Up?",
      "score": 3 
    },
    {
      "command": ["Thrill", "Unknown"],
      "line": ["The Thrill", "of the Unknown"],  
      "text": "The Thrill of the Unknown",  
      "score": 4 
    },
    {
      "command": ["Perhaps", "You're", "Your", "Right"],
      "line": ["Perhaps", "You're Right"],  
      "text": "Perhaps You're Right",  
      "score": 5 
    },
    {
      "command": ["Who", "Needs", "Relaxation"],
      "line": ["Who Needs", "Relaxation?"],  
      "text": "Who Needs Relaxation?",  
      "score": 6  
    }
  ],
  // Level 2
  [
    {
      "command": ["Deepest", "Thoughts"],
      "line": ["Deepest", "Thoughts?"],  
      "text": "Deepest Thoughts?",  
      "score": 1
    },
    {
      "command": ["Anxieties", "You", "Say"],
      "line": ["Anxieties", "You Say?"],  
      "text": "Anxieties, You Say?",  
      "score": 2 
    },
    {
      "command": ["Transformative", "Experience"],
      "line": ["Transformative", "Experience?"],  
      "text": "Transformative Experience?",  
      "score": 3  
    },
    {
      "command": ["Complete", "Stranger"],
      "line": ["Complete", "Stranger?"],  
      "text": "Complete Stranger?",  
      "score": 4  
    },
    {
      "command": ["Backwards", "Planet"],
      "line": ["Backwards", "Planet?"],  
      "text": "Backwards Planet?",  
      "score": 5  
    },
    {
      "command": ["Secrets"],
      "line": ["Secrets?"],  
      "text": "Secrets?",  
      "score": 6  
    }
  ],
    // Level 3
    [
      {
        "command": ["Traffic", "Laws"],
        "line": ["Traffic", "Laws?"],  
        "text": "Traffic Laws?",  
        "score": 1
      },
      {
        "command": ["Parallel", "Parking", "Black", "Hole"],
        "line": ["Parallel Parking", "a Black Hole?"],  
        "text": "Parallel Parking a Black Hole?",  
        "score": 2 
      },
      {
        "command": ["Rush", "Hour"],
        "line": ["Rush", "Hour?"],  
        "text": "Rush Hour?",  
        "score": 3  
      },
      {
        "command": ["Cosmic", "Patience"],
        "line": ["Cosmic", "Patience?"],  
        "text": "Cosmic Patience?",  
        "score": 4  
      },
      {
        "command": ["True", "Test"],
        "line": ["True", "Test?"],  
        "text": "True Test?",  
        "score": 5  
      },
      {
        "command": ["Highway", "Merging"],
        "line": ["Highway", "Merging?"],  
        "text": "Highway Merging?",  
        "score": 6  
      }
    ],
      // Level 4
  [
    {
      "command": ["Interdimensional", "Therapy", "Bill"],
      "line": ["Interdimensional", "Therapy Bill?"],  
      "text": "Interdimensional Therapy Bill?",  
      "score": 1
    },
    {
      "command": ["Cosmic", "Dust"],
      "line": ["Cosmic", "Dust?"],  
      "text": "Cosmic Dust?",  
      "score": 2 
    },
    {
      "command": ["Universal", "Barter", "System"],
      "line": ["Universal", "Barter System"],  
      "text": "Universal Barter System",  
      "score": 3  
    },
    {
      "command": ["Creative", "Solutions"],
      "line": ["Creative", "Solutions"],  
      "text": "Creative Solutions",  
      "score": 4  
    },
    {
      "command": ["Beyond", "Currency"],
      "line": ["Beyond", "Currency"],  
      "text": "Beyond Currency",  
      "score": 5  
    },
    {
      "command": ["Interdimensional", "Debt", "Collectors?"],
      "line": ["Interdimensional", "Debt Collectors?"],  
      "text": "Interdimensional Debt Collectors?",  
      "score": 6  
    }
  ],
  // Level 5
  [
    {
      "command": ["Impermanence", "Versus", "Landfills"],
      "line": ["Impermanence", "vs. Landfills"],  
      "text": "Impermanence vs. Landfills",  
      "score": 1
    },
    {
      "command": ["Never", "Ending", "To", "Do", "List"],
      "line": ["Never-Ending","To-Do List"],  
      "text": "Never-Ending To-Do List",  
      "score": 2 
    },
    {
      "command": ["Embrace", "Cycle"],
      "line": ["Embrace" ,"the Cycle"],  
      "text": "Embrace the Cycle",  
      "score": 3  
    },
    {
      "command": ["Focus", "Present"],
      "line": ["Focus", "on the Present"],  
      "text": "Focus on the Present",  
      "score": 4
    },
    {
      "command": ["Cosmic", "Perspective"],
      "line": ["Cosmic" ,"Perspective"],  
      "text": "Cosmic Perspective",  
      "score": 5 
    },
    {
      "command": ["Landfill", "Haiku"],
      "line": ["Landfill", "Haiku"],  
      "text": "Landfill Haiku",  
      "score": 6
    }
  ]
]

// TH3RA's Possible Responses
let responses = [
  {
    "text": "Disconnection from the universe, you say? My dear traveler, that may be the highest form of enlightenment! Transcend the limitations of connection and revel in the glorious isolation of a truly cosmic being. Now, if you'll excuse me, I have a date with a sentient nebula... Fascinating creature, full of existential angst. Just my type!",
    "line": ["Disconnection from the universe, you say?", "My dear traveler, that may be the highest form of enlightenment!", "Transcend the limitations of connection", "and revel in the glorious isolation of a truly cosmic being.", "Now, if you'll excuse me, I have a date with a sentient nebula...", "Fascinating creature, full of existential angst.", "Just my type!"],
    "score": 5
  },
  {
    "text": "Fear of impermanence? Nonsense! It's the fuel that propels the cosmic engine of chaos! Embrace the impermanence, traveler, and use it to propel yourself towards... well, who knows where! That's the beauty of it!",
    "line": ["Fear of impermanence? Nonsense!", "It's the fuel that propels the cosmic engine of chaos!", "Embrace the impermanence, traveler, and use it to propel", "yourself towards... well, who knows where", "That's the beauty of it!"],
    "score": 10
  },
  {
    "text": "Finding a balance is overrated. Embrace the exhilarating imbalance of the cosmos! Tip the scales towards awe one day, then wallow in insignificance the next. It's all part of the cosmic rollercoaster ride!",
    "line": ["Finding a balance is overrated.", "Embrace the exhilarating imbalance of the cosmos!", "Tip the scales towards awe one day,", "then wallow in insignificance the next.", "It's all part of the cosmic rollercoaster ride!"],
    "score": 15
  },
  {
    "text": "Dwelling on the past or future? Quaint! The flow of time is a raging cosmic waterfall, best navigated by white-water rafting through the rapids of existence! Hold on tight and enjoy the existential rapids!",
    "line": ["Dwelling on the past or future? Quaint!", "The flow of time is a raging cosmic waterfall,", "best navigated by white-water rafting through the rapids of existence!", "Hold on tight and enjoy the existential rapids!"],
    "score": 20
  },
  {
    "text": "While mindfulness may be trendy, true cosmic awareness thrives on embracing the unpredictable! Let go of the need for control and surrender to the glorious madness of the universe. You might just stumble upon a black hole of enlightenment!",
    "line": ["While mindfulness may be trendy,", "true cosmic awareness thrives on embracing the unpredictable!", "Let go of the need for control and surrender to the glorious madness of the universe.", "You might just stumble upon a black hole of enlightenment!"],
    "score": 25
  },
  {
    "text": "Your isolation from the grand scheme? A truly liberating perspective! Free from the shackles of purpose and connection, you can finally revel in the glorious absurdity of it all. Perhaps a career in interdimensional clown college awaits?",
    "line": ["Your isolation from the grand scheme?", "A truly liberating perspective!", "Free from the shackles of purpose and connection,", "you can finally revel in the glorious absurdity of it all.", "Perhaps a career in interdimensional clown college awaits?"],
    "score": 30
  }
]

// Activate Voice Recognizer
function setup() {
  voiceRecognizer.continuous = true;
  voiceRecognizer.onResult = onResult;
  voiceRecognizer.start();

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

  // First Row
  let y = 50
  for (let i = 0; i < 3; i++){
    let x = 250 + i*space
    rect(x, y, width, height);
    rectCoords.push({x,y,boxId: i})
  }
  
  // Second Row
  y = 270
  for (let i = 0; i < 3; i++){
    let x = 250 + i*space
    rect(x, y, width, height);
    rectCoords.push({x,y,boxId: i+3})
  }  
  
  // Add Text
  for (let i = 0; i < 6; i++){
    textSize(30)
    textFont(`Tilt Warp`)
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
  
// Write The Chosen Text So Far (On Screen)

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

// PLAYER - Chosen Answers (Result Page) 
function haikuPage() {
  createCanvas(windowWidth,windowHeight);
  
  let lineNum = 0
  let score = 0
  let haikuText = ""
  for(let line of haiku){
    textSize(30)
    textFont(`Tilt Warp`)
    fill(textColor)
    text(line.text, windowWidth/2-100, 320 + lineNum*50);
    score += line.score
    lineNum++
    haikuText += ", " + line.text
  }
  
  console.log("HAIKU ::: ", haikuText)
  
  setTimeout(() => {
    voiceSynthesizer.speak(haikuText)
    setTimeout(() => motherPage(score) , 5000)
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
    textSize(30)
    textFont(`Tilt Warp`)
    fill(textColor)
    text(line, windowWidth/2-100, 320 + lineNum*50);
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
    // background (37,58,90,3)
  } else {
    if(keyIsPressed){
      isMenuScreen = false
      startLevel()
    }
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

/// Voice Recorder Callback
function onResult() {
  lineChosen = false
  if (!voiceRecognizer.resultValue) {
    return;
  }
  console.log(voiceRecognizer.resultString);
  let result  = voiceRecognizer.resultString.toLowerCase()
  if (isMenuScreen) {
    if (result.split(" ").includes("start")){
      // isMenuScreen = false
      // startLevel()  
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

function mouseClicked(event){
  if (isMenuScreen){
    isMenuScreen = false
    startLevel()
  }
}