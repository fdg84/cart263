/**
ASK TH3RA - Interactive AI Therapist
Francis Ouellette
*/

"use strict";

const voiceSynthesizer = new p5.Speech();
const voiceRecognizer = new p5.SpeechRec();

let textColor = `black`
let level = 0
let rectCoords = []
let lineChosen = false
let haiku = []

let levelDelay = 3000
let speechDelay = 500

let height = 300
let width = 350
let space = 400
let menu
let isMenuScreen = false
let cards = [[],[],[],[],[],[]]

//voiceSynthesizer.onEnd = onSpeechEnd

// function onSpeechEnd () {
// }

function preload() {
    menu = loadImage('assets/images/eyeball.jpg');
}

const questions = [
  "So, you've conquered countless realities, witnessed the birth and death of stars... Do you ever get bored traveling the same old cosmos? Maybe you should spice things up with a vacation on a relaxing reality TV show dimension.",
  "Alright, cosmic wanderer, tell me all about your deepest thoughts and anxieties. Spilling your secrets to a complete stranger, a therapist from a backwards little planet like this, is sure to be a truly transformative experience.",
  "You navigate the cosmos with ease, but can you handle the mundane traffic laws here in your dimension? Perhaps parallel parking a black hole is a breeze for a cosmic entity such as yourself, but merging onto a highway during rush hour... that's a true test of cosmic patience.",
  "Connection to all things, you say? Fascinating. Then tell me, o wise traveler, how exactly do you plan on paying your interdimensional therapy bill? It seems like accepting various forms of cosmic dust might be a bit inconvenient.",
  "Impermanence is beautiful, you say? Well, that's a lovely sentiment for a being who exists outside of time altogether. Here on our little planet, impermanence mostly means overflowing landfills and a never-ending to-do list."
]

const lines = [

  // Level 1
  [
    {
      "command": ["existential", "ennui", "who", "me"],
      "line": ["Existential Ennui,", "Who Me"],  
      "text": "Fascinating! Does this existential unease come with a complimentary existential teacup?",
      "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
      "score": 1
    },
    {
      "command": ["reality", "tv", "intriguing"],
      "line": ["Reality TV?", "Intriguing"],
      "text": "True. A controlled chaos experiment could become the next galactic reality show sensation!",
      "subtext": "You know, a dimension dedicated to manufactured conflict might provide some fascinating sociological data. Perhaps I could offer a guest appearance as the 'Wise Interdimensional Therapist.'", 
      "score": 2 
    },
    {
      "command": ["spice", "things", "up"],
      "line": ["Spice", "Things Up?"],  
      "text": "A wise philosophy, my friend! The universe is a cosmic joke factory, if you know where to look.",
      "subtext": "The key to avoiding cosmic boredom, my dear therapist, is to find amusement in the unexpected. From sentient sentient planets to civilizations built entirely on cheese, the universe offers endless comedic opportunities.",
      "score": 3 
    }
  ],
  // Level 2
  [
    {
      "command": ["deepest", "thoughts"],
      "line": ["Deepest", "Thoughts?"],  
      "text": "A weighty contemplation, indeed. But fear not! Even in the face of oblivion, there's room for a touch of whimsy.",  
      "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
      "score": 1
    },
    {
      "command": ["transformative", "experience"],
      "line": ["Transformative", "Experience?"],  
      "text": "Thrilling! The human psyche is a labyrinth of contradictions, a kaleidoscope of emotions and anxieties.",  
      "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
      "score": 2
    },
    {
      "command": ["backwards", "planet"],
      "line": ["Backwards", "Planet?"],  
      "text": "Ah, the power of headwear in fostering a sense of intergalactic community!",  
      "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
      "score": 3  
    }
   ],
    // Level 3
    [
      {
        "command": ["parallel", "parking", "black", "hole"],
        "line": ["Parallel Parking", "a Black Hole?"],  
        "text": "Now that's a cosmic traffic jam I wouldn't want to miss!",  
        "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
        "score": 1 
      },
      {
        "command": ["cosmic", "patience"],
        "line": ["Cosmic", "Patience?"],  
        "text": "A refreshingly zen perspective!",  
        "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
        "score": 2  
      },
      {
        "command": ["highway", "merging"],
        "line": ["Highway", "Merging?"],  
        "text": "Fascinating! A microcosm of galactic road rage, played out on a single-planet highway.",  
        "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
        "score": 3  
      }
    ],
      // Level 4
  [
    {
      "command": ["creative", "solutions"],
      "line": ["Creative", "Solutions"],  
      "text": "Now this is a therapy session I can get behind!",  
      "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
      "score": 1 
    },
    {
      "command": ["beyond", "currency"],
      "line": ["Beyond", "Currency"],  
      "text": "Forget currency, the true galactic treasure is the wisdom gleaned from delving into the cosmic abyss of one's being.",  
      "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
      "score": 2  
    },
    {
      "command": ["interdimensional", "debt", "collectors?"],
      "line": ["Interdimensional", "Debt Collectors?"],  
      "text": "Now that's a cosmic pickle of epic proportions!",  
      "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
      "score": 3  
    }
   ],
  // Level 5
  [
    {
      "command": ["impermanence", "versus", "landfills"],
      "line": ["Impermanence", "vs. Landfills"],  
      "text": "While landfills may seem like cosmic eyesores, they hold the potential for rebirth.",  
      "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
      "score": 1
    },
    {
      "command": ["embrace", "cycle"],
      "line": ["Embrace" ,"the Cycle"],  
      "text": "The universe itself is a disco ball, constantly swirling and evolving.",  
      "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
      "score": 2 
    },
    {
      "command": ["focus", "present"],
      "line": ["Focus", "on the Present"],  
      "text": "While the relentless march of time might seem daunting, it also imbues every experience with a precious, fleeting quality.",  
      "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
      "score": 3
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
    "score": 7
  },
  {
    "text": "Finding a balance is overrated. Embrace the exhilarating imbalance of the cosmos! Tip the scales towards awe one day, then wallow in insignificance the next. It's all part of the cosmic rollercoaster ride!",
    "line": ["Finding a balance is overrated.", "Embrace the exhilarating imbalance of the cosmos!", "Tip the scales towards awe one day,", "then wallow in insignificance the next.", "It's all part of the cosmic rollercoaster ride!"],
    "score": 9
  },
  {
    "text": "Dwelling on the past or future? Quaint! The flow of time is a raging cosmic waterfall, best navigated by white-water rafting through the rapids of existence! Hold on tight and enjoy the existential rapids!",
    "line": ["Dwelling on the past or future? Quaint!", "The flow of time is a raging cosmic waterfall,", "best navigated by white-water rafting through the rapids of existence!", "Hold on tight and enjoy the existential rapids!"],
    "score": 11
  },
  {
    "text": "While mindfulness may be trendy, true cosmic awareness thrives on embracing the unpredictable! Let go of the need for control and surrender to the glorious madness of the universe. You might just stumble upon a black hole of enlightenment!",
    "line": ["While mindfulness may be trendy,", "true cosmic awareness thrives on embracing the unpredictable!", "Let go of the need for control and surrender to the glorious madness of the universe.", "You might just stumble upon a black hole of enlightenment!"],
    "score": 13
  },
  {
    "text": "Your isolation from the grand scheme? A truly liberating perspective! Free from the shackles of purpose and connection, you can finally revel in the glorious absurdity of it all. Perhaps a career in interdimensional clown college awaits?",
    "line": ["Your isolation from the grand scheme?", "A truly liberating perspective!", "Free from the shackles of purpose and connection,", "you can finally revel in the glorious absurdity of it all.", "Perhaps a career in interdimensional clown college awaits?"],
    "score": 15
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

  // Start Game on Menu Screen
  menuScreen()
  
}

let topLeftX, topLeftY 

function startLevel() {
  console.log("START LEVEL", level, questions[level])
  createCanvas(windowWidth,windowHeight);
  
  // Set Coordinates for Level Layout
  topLeftX = windowWidth/100
  topLeftY = windowHeight/35
  
  voiceSynthesizer.setPitch(0.8);
  voiceSynthesizer.setRate(0.8);
  voiceSynthesizer.setVoice(`Google UK English Male`);
  
  // Reset That No Line Has Been Chosen
  lineChosen = false
  
  // Question
  
  fill(textColor)
  textAlign(CENTER)

  textSize(40)
  textStyle(BOLD)
  textWrap(WORD)
  text("QUESTION " + (level + 1), topLeftX + 320, topLeftY + 30, 1000);
  
  textStyle(NORMAL)
  textSize(35)
  textWrap(WORD);
  text(questions[level], topLeftX + 320, topLeftY + 100, 1000);
      
  fill('white')
  
  let y = 350
  for (let i = 0; i < 3; i++){
    let x = 250 + i*space
    rect(topLeftX + x, topLeftY + y, width, height);
    rectCoords.push({x: topLeftX + x, y: topLeftY + y, boxId: i})
  }
  
  // Add Text
  for (let i = 0; i < 3; i++){
    textSize(30)
    fill(textColor)
    
    let lineCount = 0
    for (let line of lines[level][i].line){
      textAlign(LEFT)
      text(line, rectCoords[i].x + 30, rectCoords[i].y + 75 + 40*lineCount);
      lineCount++
    }
    // Write Subtext 
    textSize(15)
    textWrap(WORD)
    text(lines[level][i].subtext, rectCoords[i].x + 30, rectCoords[i].y + 145, 300);
        
    lines[level][i].boxId = rectCoords[i].boxId

  }  
}

function menuScreen() {
  createCanvas(windowWidth,windowHeight);
  background(255);
  isMenuScreen = true
  voiceSynthesizer.setPitch(0.7);
  voiceSynthesizer.setRate(1.3);
  voiceSynthesizer.setVoice(`Google UK English Female`);
  voiceSynthesizer.speak("Welcome dear angel. Feeling lost in the cosmos? Overwhelmed by existential dread? Fear not, here at Ask Thera, we specialize in untangling the knots of your interdimensional psyche.")
    
  // Draw The Image
  image(menu, 0,0, windowHeight, windowHeight);
  
  console.log("WINDOW: ", windowWidth, windowHeight)
  
  // Set Layout Coordinates for Menu Screen
  let top = windowHeight/5
  let textCenter = windowHeight + (windowWidth - windowHeight)/2
  
  fill('red')
  textWrap(WORD)
  textSize(30)
  textStyle(BOLD)
  text("ASK TH3RA", textCenter-70, top)
  
  textAlign(CENTER)
  fill(textColor)
  textWrap(WORD)
  textStyle(NORMAL)
  textSize(20)
  text("is a poetic AI experience, in which the player, PATIENT #71530, uses their voice to respond to the therapist's questions, reveal TH3RA's cosmic diagnosis", textCenter - 185, top + 50, 400)

  textAlign(LEFT)
  fill('red')
  textSize(30)
  textStyle(BOLD)
  text("Rules", textCenter - 25, top + 225)

  textAlign(CENTER)
  fill(textColor)
  textWrap(WORD)
  textStyle(NORMAL)
  textSize(20)
  text("Answer the Questions to gain points & speak to your AI guru. Use your Voice to select 1 response per level(5 total)", textCenter -185, top + 275, 400)

  textAlign(LEFT)
  fill('red')
  textSize(30)
  textStyle(BOLD)
  text("To Play", textCenter-35, top + 430)

  textAlign(CENTER)
  fill(textColor)
  textWrap(WORD)
  textSize(20)
  textStyle(NORMAL)
  text("Press ENTER to activate game.", textCenter - 185, top + 480, 400)



}

//The Final Conversation

// PLAYER - Chosen Answers (Result Page) 
function haikuPage() {
  createCanvas(windowWidth,windowHeight);
  
  let lineNum = 0
  let score = 0
  let haikuText = ""
  
  for(let line of haiku){
    score += line.score
    lineNum++
    haikuText += ", " + line.text
  }
  
  console.log("HAIKU ::: ", haikuText)
  
  setTimeout(() => theraPage(score) , 100)
  
  // setTimeout(() => {
  //   //voiceSynthesizer.speak(haikuText)
    
  //  } 
  //  , speechDelay)
  
  // Score Text Is Here - KEEP HIDDEN  

  // textSize(30)
  // fill(textColor)
  // text("score: " + score, windowWidth/2-100, 320 + (lineNum)*50);

}

function theraPage(score) {
  createCanvas(windowWidth,windowHeight);
  console.log("SCORE: ", score)
  let lineNum = 0
  let finalResponse = {}
  for(let response of responses){
    if (score < response.score){
      finalResponse = response
      console.log("THIS IS MY FINAL RESPONSE", finalResponse)
      break;
    }
  }
  
  fill("black")
  textSize(40)
  textStyle(BOLD)
  text("Critical Analysis", windowWidth/3-100, windowHeight/4);
    
  for(let line of finalResponse.line){
    textSize(30)
    fill("black")
    textStyle(NORMAL)
    text(line, windowWidth/3-100, 320 + lineNum*50);
    lineNum++
  }
  
  console.log("TEX ::: ", finalResponse.text)
  
  voiceSynthesizer.setPitch(0.7);
  voiceSynthesizer.setRate(1.3);
  voiceSynthesizer.setVoice(`Google UK English Female`);
  setTimeout(voiceSynthesizer.speak(finalResponse.text), speechDelay)
  
  level = 0
  haiku = []
  setTimeout(startLevel, 20000)
}

// Background Color
function draw() {
  if (!isMenuScreen) {
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
  
  // Show Selected Box (Color)
  push()
  fill(214, 254, 2)
  rect(rectCoords[line.boxId].x, rectCoords[line.boxId].y, width, height);   
  textSize(30)
  fill(textColor)
  
  let lineCount = 0
  for (let words of line.line){
    text(words, rectCoords[line.boxId].x + 30, rectCoords[line.boxId].y + 75 + 40*lineCount);
    lineCount++
  }

  // Speak Chosen Line
  setTimeout(() => voiceSynthesizer.speak(line.text), speechDelay)
  
  // Add Line To Haiku
  haiku.push(line)

  // Increase The Level
  level++
  console.log("NEW LEVEL: ", level)
  if(level < 5){
    setTimeout(startLevel, levelDelay)
  }else{
    setTimeout(haikuPage, levelDelay)
  }
}

// Voice Recorder Callback
function onResult() {
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
    console.log('level on result:', level)
    for (let word of result.split(" ")){
      for (let line of lines[level]) {
        if (line.command.includes(word)) {
          console.log("I FOUND WORD!", word, line, 'linechosen:', lineChosen)
          if (!lineChosen){
            choose(line);
            console.log("LINE CHOSE", lineChosen)
            break;
          }
        }
      }
      // if(lineChosen){
      //   break;
      // }
    }
  }
}

function mouseClicked(event){
  if (isMenuScreen){
    isMenuScreen = false
    startLevel()
  }
}