/**
ASK TH3RA - Interactive AI Therapist
Francis Ouellette
*/

"use strict";

const voiceSynthesizer = new p5.Speech();
const voiceRecognizer = new p5.SpeechRec();

// MAKE TEXT COLOR ALPHA 
let textColor = `black`
let level = 0
let rectCoords = []
let lineChosen = false
let haiku = []

// CONNECT CARDS TO WORDS
// let random = [3,5,0,2,1,4]
let levelDelay = 3000
let speechDelay = 500

let height = 300
let width = 350
let space = 400
let menu
let isMenuScreen = false
let cards = [[],[],[],[],[],[]]

// let l1c1,l1c2,l1c3,l1c4,l1c5,l1c6 
// let l2c1,l2c2,l2c3,l2c4,l2c5,l2c6
// let l3c1,l3c2,l3c3,l3c4,l3c5,l3c6
// let l4c1,l4c2,l4c3,l4c4,l4c5,l4c6
// let l5c1,l5c2,l5c3,l5c4,l5c5,l5c6

//voiceSynthesizer.onEnd = onSpeechEnd

// function onSpeechEnd () {
//   console.log("TEST END")
// }

// Load Audio
function preload() {
    menu = loadImage('assets/images/eyeball.jpg');
    
    // // LEVEL 1
    // l1c1 = loadImage('assets/images/cards/l1c1.png');
    // cards[0].push(l1c1)
    // l1c2 = loadImage('assets/images/cards/l1c2.png');
    // cards[0].push(l1c2)
    // l1c3 = loadImage('assets/images/cards/l1c3.png');
    // cards[0].push(l1c3)
    // l1c4 = loadImage('assets/images/cards/l1c4.png');
    // cards[0].push(l1c4)
    // l1c5 = loadImage('assets/images/cards/l1c5.png');
    // cards[0].push(l1c5)
    // l1c6 = loadImage('assets/images/cards/l1c6.png');
    // cards[0].push(l1c6)

    // // LEVEL 2
    // l2c1 = loadImage('assets/images/cards/l2c1.png');
    // cards[1].push(l2c1)
    // l2c2 = loadImage('assets/images/cards/l2c2.png');
    // cards[1].push(l2c2)
    // l2c3 = loadImage('assets/images/cards/l2c3.png');
    // cards[1].push(l2c3)
    // l2c4 = loadImage('assets/images/cards/l2c4.png');
    // cards[1].push(l2c4)
    // l2c5 = loadImage('assets/images/cards/l2c5.png');
    // cards[1].push(l2c5)
    // l2c6 = loadImage('assets/images/cards/l2c6.png');
    // cards[1].push(l2c6)

    // // LEVEL 3
    // l3c1 = loadImage('assets/images/cards/l3c1.png');
    // cards[1].push(l3c1)
    // l3c2 = loadImage('assets/images/cards/l3c2.png');
    // cards[1].push(l3c2)
    // l3c3 = loadImage('assets/images/cards/l3c3.png');
    // cards[1].push(l3c3)
    // l3c4 = loadImage('assets/images/cards/l3c4.png');
    // cards[1].push(l3c4)
    // l3c5 = loadImage('assets/images/cards/l3c5.png');
    // cards[1].push(l3c5)
    // l3c6 = loadImage('assets/images/cards/l3c6.png');
    // cards[1].push(l3c6)

    //         // LEVEL 4
    // l4c1 = loadImage('assets/images/cards/l4c1.png');
    // cards[1].push(l4c1)
    // l4c2 = loadImage('assets/images/cards/l4c2.png');
    // cards[1].push(l4c2)
    // l4c3 = loadImage('assets/images/cards/l4c3.png');
    // cards[1].push(l4c3)
    // l4c4 = loadImage('assets/images/cards/l4c4.png');
    // cards[1].push(l4c4)
    // l4c5 = loadImage('assets/images/cards/l4c5.png');
    // cards[1].push(l4c5)
    // l4c6 = loadImage('assets/images/cards/l4c6.png');
    // cards[1].push(l4c6)

    // // LEVEL 5
    // l5c1 = loadImage('assets/images/cards/l5c1.png');
    // cards[1].push(l5c1)
    // l5c2 = loadImage('assets/images/cards/l5c2.png');
    // cards[1].push(l5c2)
    // l5c3 = loadImage('assets/images/cards/l5c3.png');
    // cards[1].push(l5c3)
    // l5c4 = loadImage('assets/images/cards/l5c4.png');
    // cards[1].push(l5c4)
    // l5c5 = loadImage('assets/images/cards/l5c5.png');
    // cards[1].push(l5c5)
    // l5c6 = loadImage('assets/images/cards/l5c6.png');
    // cards[1].push(l5c6)
}

const questions = [
  "So, you've conquered countless realities, witnessed the birth and death of stars... Do you ever get bored traveling the same old cosmos? Maybe you should spice things up with a vacation on a relaxing reality TV show dimension.",
  "So, you've conquered countless realities, witnessed the birth and death of stars... Do you ever get bored traveling the same old cosmos? Maybe you should spice things up with a vacation on a relaxing reality TV show dimension.",
  "So, you've conquered countless realities, witnessed the birth and death of stars... Do you ever get bored traveling the same old cosmos? Maybe you should spice things up with a vacation on a relaxing reality TV show dimension.",
  "So, you've conquered countless realities, witnessed the birth and death of stars... Do you ever get bored traveling the same old cosmos? Maybe you should spice things up with a vacation on a relaxing reality TV show dimension.",
  "So, you've conquered countless realities, witnessed the birth and death of stars... Do you ever get bored traveling the same old cosmos? Maybe you should spice things up with a vacation on a relaxing reality TV show dimension."
]

const lines = [

  // Level 1
  [
    {
      "command": ["existential", "ennui", "who", "me"],
      "line": ["Existential Ennui,", "Who Me"],  
      "text": "Existential Ennui Who Me",
      "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
      "score": 1
    },
    {
      "command": ["reality", "tv", "intriguing"],
      "line": ["Reality TV?", "Intriguing"],
      "text": "Reality TV? Intriguing ",
      "subtext": "You know, a dimension dedicated to manufactured conflict might provide some fascinating sociological data. Perhaps I could offer a guest appearance as the 'Wise Interdimensional Therapist.'", 
      "score": 2 
    },
    {
      "command": ["spice", "things", "up"],
      "line": ["Spice", "Things Up?"],  
      "text": "Spice Things Up?",
      "subtext": "The key to avoiding cosmic boredom, my dear therapist, is to find amusement in the unexpected. From sentient sentient planets to civilizations built entirely on cheese, the universe offers endless comedic opportunities.",
      "score": 3 
    },
    // {
    //   "command": ["thrill", "unknown"],
    //   "line": ["The Thrill", "of the Unknown"],  
    //   "text": "The Thrill of the Unknown",
    //   "subtext": "Relaxation is for lesser beings! I thrive on constant stimulation and intellectual challenges. Besides, a stagnant being is a decaying being, wouldn't you agree?",  
    //   "score": 4 
    // },
    // {
    //   "command": ["perhaps", "you're", "your", "right"],
    //   "line": ["Perhaps", "You're Right"],  
    //   "text": "Perhaps You're Right",  
    //   "subtext": "Relaxation is for lesser beings! I thrive on constant stimulation and intellectual challenges. Besides, a stagnant being is a decaying being, wouldn't you agree?",  
    //   "score": 5 
    // },
    // {
    //   "command": ["who", "needs", "relaxation"],
    //   "line": ["Who Needs", "Relaxation?"],  
    //   "text": "Who Needs Relaxation?",  
    //   "subtext": "Relaxation is for lesser beings! I thrive on constant stimulation and intellectual challenges. Besides, a stagnant being is a decaying being, wouldn't you agree?",  
    //   "score": 6  
    // }
  ],
  // Level 2
  [
    {
      "command": ["deepest", "thoughts"],
      "line": ["Deepest", "Thoughts?"],  
      "text": "Deepest Thoughts?",  
      "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
      "score": 1
    },
    {
      "command": ["anxieties", "you", "say"],
      "line": ["Anxieties", "You Say?"],  
      "text": "Anxieties, You Say?",  
      "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
      "score": 2 
    },
    {
      "command": ["transformative", "experience"],
      "line": ["Transformative", "Experience?"],  
      "text": "Transformative Experience?",  
      "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
      "score": 3  
    },
    // {
    //   "command": ["complete", "stranger"],
    //   "line": ["Complete", "Stranger?"],  
    //   "text": "Complete Stranger?",  
    //   "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
    //   "score": 4  
    // },
    // {
    //   "command": ["backwards", "planet"],
    //   "line": ["Backwards", "Planet?"],  
    //   "text": "Backwards Planet?",  
    //   "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
    //   "score": 5  
    // },
    // {
    //   "command": ["secrets"],
    //   "line": ["Secrets?"],  
    //   "text": "Secrets?",  
    //   "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
    //   "score": 6  
    // }
  ],
    // Level 3
    [
      {
        "command": ["traffic", "laws"],
        "line": ["Traffic", "Laws?"],  
        "text": "Traffic Laws?",  
        "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
        "score": 1
      },
      {
        "command": ["parallel", "parking", "black", "hole"],
        "line": ["Parallel Parking", "a Black Hole?"],  
        "text": "Parallel Parking a Black Hole?",  
        "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
        "score": 2 
      },
      {
        "command": ["rush", "hour"],
        "line": ["Rush", "Hour?"],  
        "text": "Rush Hour?",  
        "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
        "score": 3  
      },
      // {
      //   "command": ["cosmic", "patience"],
      //   "line": ["Cosmic", "Patience?"],  
      //   "text": "Cosmic Patience?",  
      //   "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
      //   "score": 4  
      // },
      // {
      //   "command": ["true", "test"],
      //   "line": ["True", "Test?"],  
      //   "text": "True Test?",  
      //   "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
      //   "score": 5  
      // },
      // {
      //   "command": ["highway", "merging"],
      //   "line": ["Highway", "Merging?"],  
      //   "text": "Highway Merging?",  
      //   "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
      //   "score": 6  
      // }
    ],
      // Level 4
  [
    {
      "command": ["multiversant", "therapy", "bill"],
      "line": ["Multiversant", "Therapy Bill?"],  
      "text": "multiversant Therapy Bill?",  
      "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
      "score": 1
    },
    {
      "command": ["cosmic", "dust"],
      "line": ["Cosmic", "Dust?"],  
      "text": "Cosmic Dust?",  
      "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
      "score": 2 
    },
    {
      "command": ["universal", "barter", "system"],
      "line": ["Universal", "Barter System"],  
      "text": "Universal Barter System",  
      "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
      "score": 3  
    },
    // {
    //   "command": ["creative", "solutions"],
    //   "line": ["Creative", "Solutions"],  
    //   "text": "Creative Solutions",  
    //   "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
    //   "score": 4  
    // },
    // {
    //   "command": ["beyond", "currency"],
    //   "line": ["Beyond", "Currency"],  
    //   "text": "Beyond Currency",  
    //   "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
    //   "score": 5  
    // },
    // {
    //   "command": ["interdimensional", "debt", "collectors?"],
    //   "line": ["Interdimensional", "Debt Collectors?"],  
    //   "text": "Interdimensional Debt Collectors?",  
    //   "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
    //   "score": 6  
    // }
  ],
  // Level 5
  [
    {
      "command": ["impermanence", "versus", "landfills"],
      "line": ["Impermanence", "vs. Landfills"],  
      "text": "Impermanence vs. Landfills",  
      "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
      "score": 1
    },
    {
      "command": ["never", "ending", "to", "do", "list"],
      "line": ["Never-Ending","To-Do List"],  
      "text": "Never-Ending To-Do List",  
      "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
      "score": 2 
    },
    {
      "command": ["embrace", "cycle"],
      "line": ["Embrace" ,"the Cycle"],  
      "text": "Embrace the Cycle",  
      "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
      "score": 3  
    },
    // {
    //   "command": ["focus", "present"],
    //   "line": ["Focus", "on the Present"],  
    //   "text": "Focus on the Present",  
    //   "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
    //   "score": 4
    // },
    // {
    //   "command": ["cosmic", "perspective"],
    //   "line": ["Cosmic" ,"Perspective"],  
    //   "text": "Cosmic Perspective",  
    //   "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
    //   "score": 5 
    // },
    // {
    //   "command": ["garbage", "haiku"],
    //   "line": ["Garbage", "Haiku"],  
    //   "text": "garbage Haiku",  
    //   "subtext": "Boredom? Never! The cosmos is an infinite tapestry, offering endless possibilities for exploration. Besides, who wouldn't be entertained by the drama of a black hole collapsing in on itself?",
    //   "score": 6
    // }
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

  //start the game on the menu screen
  menuScreen()
  
}

let topLeftX, topLeftY 

function startLevel() {
  console.log("START LEVEL", level, questions[level])
  createCanvas(windowWidth,windowHeight);
  
  //set coordinate for level layout
  topLeftX = windowWidth/14
  topLeftY = windowHeight/12
  
  voiceSynthesizer.setPitch(0.8);
  voiceSynthesizer.setRate(0.8);
  voiceSynthesizer.setVoice(`Google UK English Male`);
  
  //reset that no line has been chosen
  lineChosen = false
  
  //question
  
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
    // textFont(`Tilt Warp`)
    fill(textColor)
    
    let lineCount = 0
    //console.log('lev', level, 'random[0]', random[0], 'lines:', lines[level][random[0]])
    for (let line of lines[level][i].line){
      textAlign(LEFT)
      text(line, rectCoords[i].x + 30, rectCoords[i].y + 75 + 40*lineCount);
      lineCount++
    }
    //subtext write
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
  voiceSynthesizer.setPitch(0.1);
  voiceSynthesizer.setRate(0.5);
  voiceSynthesizer.setVoice(`Google UK English Female`);
  voiceSynthesizer.speak("Welcome")
    
  // Draw the image.
  image(menu, 0,0, windowHeight, windowHeight);
  
  console.log("WINDOW: ", windowWidth, windowHeight)
  
  // set layout coordinatesfor menu screen
  let top = windowHeight/5
  let textCenter = windowHeight + (windowWidth - windowHeight)/2
  
  fill(textColor)
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
  fill(textColor)
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
  fill(textColor)
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
  //  textSize(30)
  //  textFont(`Tilt Warp`)
  //  fill("black")
  //  text(line.text, windowWidth/2-100, 320 + lineNum*50);
    score += line.score
    lineNum++
    haikuText += ", " + line.text
  }
  
  console.log("HAIKU ::: ", haikuText)
  
  setTimeout(() => motherPage(score) , 100)
  
  // setTimeout(() => {
  //   //voiceSynthesizer.speak(haikuText)
    
  //  } 
  //  , speechDelay)
  
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
  //let finalScore = Math.abs(score)
  // console.log("FINAL SCORE: ", finalScore)
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
    // textFont(`Tilt Warp`)
    fill("black")
    textStyle(NORMAL)
    text(line, windowWidth/3-100, 320 + lineNum*50);
    lineNum++
  }
  
  console.log("TEX ::: ", finalResponse.text)
  
  voiceSynthesizer.setPitch(0.7);
  voiceSynthesizer.setRate(1.5);
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
  
  // SHOW SELECTED BOX (COLOR) + TEXT RESPONSE (MAKE INVISIBLE BEFORE CHOSEN LINE)
  push()
  fill(214, 254, 2)
  rect(rectCoords[line.boxId].x, rectCoords[line.boxId].y, width, height);   
  // textFont(`Tilt Warp`)
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

  // Randomize The Lines (EITHER CHANGE CARDS OR TITLES)
  // random = [4,0,2,1,3,5]

  // Increase The Level
  level++
  console.log("NEW LEVEL: ", level)
  if(level < 5){
    setTimeout(startLevel, levelDelay)
  }else{
    setTimeout(haikuPage, levelDelay)
  }
}

/// Voice Recorder Callback
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

// INSERT FRAME INTO A FRAME (TO CENTER ENTIRE PAGE)