/**
ASK TH3RA - Interactive AI Therapist
Francis Ouellette
*/

"use strict";

const voiceSynthesizer = new p5.Speech();
const voiceRecognizer = new p5.SpeechRec();

let textColor = `white`
let menuTextColor = `black`
let bgColor = 'black'
let level = 0
let rectCoords = []
let lineChosen = false
let haiku = []

// Delay Before Changing Levels
let levelDelay = 9000 
let speechDelay = 500

let height = 300
let width = 350
let space = 400
let menu, heaven
let isMenuScreen = false
let isTheraScreen = false
let isHeavenScreen = false

// Origin Variables for Level Layout 
let topLeftX, topLeftY 

function preload() {
    menu = loadImage('assets/images/eyeball.jpg');
    heaven = loadImage('assets/images/heaven.jpg');
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
      "text": "True. A controlled chaos experiment could become the next galactic sensation!",
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
      "text": "Fear not! Even in the face of oblivion, there's room for a touch of whimsy.",  
      "subtext": "Hmm, where to begin? The nature of consciousness across dimensions, the possibility of parallel universes with sentient pizza, the existential dread of a rogue black hole devouring all existence...",
      "score": 1
    },
    {
      "command": ["transformative", "experience"],
      "line": ["Transformative", "Experience?"],  
      "text": "The human psyche is a labyrinth of contradictions, a kaleidoscope of emotions and anxieties.",  
      "subtext": "Perhaps for you, dear therapist. For me, it's mostly a delightful diversion, offering a glimpse into the fascinating (and frankly, slightly terrifying) psyche of a single-planet species.",
      "score": 2
    },
    {
      "command": ["backwards", "planet"],
      "line": ["Backwards", "Planet?"],  
      "text": "Ah, the power of headwear in fostering a sense of intergalactic community!",  
      "subtext": "Look, every civilization starts somewhere. Just because you haven't mastered interdimensional travel yet doesn't mean you don't have your own unique charm... like those adorable little hats you all wear.",
      "score": 3  
    }
   ],
    // Level 3
  [
    {
      "command": ["parallel", "parking", "black", "hole"],
      "line": ["Parallel Parking", "a Black Hole?"],  
      "text": "Interesting! Now that's a cosmic traffic jam I wouldn't want to miss.",  
      "subtext": "Child's play! The real test is navigating a multidimensional traffic jam caused by a herd of hyper-intelligent hamsters on joyrides.",
      "score": 1 
    },
    {
      "command": ["cosmic", "patience"],
      "line": ["Cosmic", "Patience?"],  
      "text": "A refreshingly zen perspective! Your patience extends beyond the mundane, it seems.",  
      "subtext": "I possess an infinite well of patience, honed by eons of observing the glacial pace of stellar evolution. A few impatient drivers are mere blips on the cosmic radar.",
      "score": 2  
    },
    {
      "command": ["highway", "merging"],
      "line": ["Highway", "Merging?"],  
      "text": "Fascinating! A microcosm of galactic road rage, played out on a single-planet highway.",  
      "subtext": "I find it most amusing how such a simple maneuver can cause such a display of anxiety and horn-honking. Truly, a unique cultural phenomenon.",
      "score": 3  
    }
  ],
      // Level 4
  [
    {
      "command": ["creative", "solutions"],
      "line": ["Creative", "Solutions"],  
      "text": "Ancient alien languages? Sign me up! Now this is a therapy session I can get behind!",  
      "subtext": "Perhaps we could work out a payment plan involving cosmic dance lessons or a crash course in ancient alien languages.",
      "score": 1 
    },
    {
      "command": ["beyond", "currency"],
      "line": ["Beyond", "Currency"],  
      "text": "Forget currency, the true galactic treasure is the wisdom gleaned from delving into the cosmic abyss of one's being.",  
      "subtext": "Ultimately, true connection transcends the need for material exchange. The wisdom gained from our session is reward enough, wouldn't you agree?",
      "score": 2  
    },
    {
      "command": ["interdimensional", "debt", "collectors?"],
      "line": ["Interdimensional", "Debt Collectors?"],  
      "text": "Don't worry, consider this session an investment in your future intergalactic credit rating.",  
      "subtext": "Let's just say they're a force even a cosmic traveler wouldn't want to encounter. Rest assured, I'll find a way to settle this debt... eventually.",
      "score": 3  
    }
  ],
  // Level 5
  [
    {
      "command": ["impermanence", "versus", "landfills"],
      "line": ["Impermanence", "vs. Landfills"],  
      "text": "While landfills may seem like cosmic eyesores, they hold the potential for rebirth.",  
      "subtext": "Ah, the human condition. You focus on the negative, the decay and clutter. But impermanence also allows for growth, change, and the opportunity to create something new from the ashes of the old.",
      "score": 1
    },
    {
      "command": ["embrace", "cycle"],
      "line": ["Embrace" ,"the Cycle"],  
      "text": "The universe itself is a disco ball, constantly swirling and evolving.",  
      "subtext": "Everything is constantly in flux, transforming from one state to the next. Even your overflowing landfills can be viewed as part of the natural cycle of creation and decomposition.",
      "score": 2 
    },
    {
      "command": ["focus", "present"],
      "line": ["Focus", "on the Present"],  
      "text": "While the relentless march of time seems daunting, it also imbues every experience with a precious quality.",  
      "subtext": "Don't get bogged down by the relentless march of time. Focus on the present moment, savoring the beauty and impermanence of each experience. That overflowing landfill could be your next artistic masterpiece!",
      "score": 3
    }
   ]
]

// TH3RA's Possible Responses
let responses = [
  {
    "text": "Disconnection from the universe, you say? That may be the highest form of enlightenment! Transcend the limitations of connection & revel in glorious isolation. Now, if you'll excuse me, I have a date with a sentient nebula...",
    "line": ["Disconnection from the universe, you say?", "That may be the highest form of enlightenment!", "Transcend the limitations of connection", "and revel in glorious isolation.", "Now, if you'll excuse me, I have a date with a sentient nebula..."],
    "score": 5
  },
  {
    "text": "Fear of impermanence? Nonsense! It's the fuel that propels the engine of chaos! Embrace impermanence, dear traveler, and use it to propel yourself towards... well, who knows where! That's the beauty of it!",
    "line": ["Fear of impermanence? Nonsense!", "It's the fuel that propels the engine of chaos!", "Embrace impermanence, dear traveler, and use it to propel", "yourself towards... well, who knows where", "That's the beauty of it!"],
    "score": 7
  },
  {
    "text": "Finding balance is overrated. Embrace the exhilarating imbalance of the cosmos! Tip the scales towards awe, then wallow in insignificance. It's all part of life's rollercoaster!",
    "line": ["Finding balance is overrated.", "Embrace the exhilarating imbalance of the cosmos!", "Tip the scales towards awe,", "then wallow in insignificance.", "It's all part of life's rollercoaster!"],
    "score": 9
  },
  {
    "text": "Dwelling on the past? Quaint! The flow of time is a raging waterfall, best navigated by white-water rafting through the rapids of existence! Hold on tight and enjoy the flow!",
    "line": ["Dwelling on the past? Quaint!", "The flow of time is a raging waterfall,", "best navigated by white-water rafting through the rapids of existence!", "Hold on tight and enjoy the flow!"],
    "score": 11
  },
  {
    "text": "While mindfulness may be trendy, true cosmic awareness thrives on embracing the unpredictable! Let go and surrender to the madness of the universe. You might just stumble upon a black hole of enlightenment!",
    "line": ["While mindfulness may be trendy,", "true cosmic awareness thrives on embracing the unpredictable!", "Let go and surrender to the madness of the universe.", "You might just stumble upon a black hole of enlightenment!"],
    "score": 13
  },
  {
    "text": "Feeling insignificant in this vast, uncaring cosmos? A truly liberating perspective! Free from the shackles of purpose, you can finally revel in the absurdity of it all. Perhaps a career in interdimensional clown college awaits?",
    "line": ["Feeling insignificant in this vast, uncaring cosmos?", "A truly liberating perspective!", "Free from the shackles of purpose,", "you can finally revel in the absurdity of it all.", "Perhaps a career in interdimensional clown college awaits?"],
    "score": 15
  }
]

// Activate Voice Recognizer
function setup() {
  voiceRecognizer.continuous = true;
  voiceRecognizer.onResult = onResult;
  voiceRecognizer.start();

  voiceSynthesizer.continuous = true;
  
  //Intro voice
  voiceSynthesizer.setPitch(1);
  voiceSynthesizer.setRate(1);
  voiceSynthesizer.setVoice(`Google UK English Female`);
  voiceSynthesizer.onEnd = onSpeechEnd
  
  // Start Game on Menu Screen
  menuScreen()  
}

function onSpeechEnd(e) {
  if(!isMenuScreen){
    if(level < 5){

      // If Game is Still Going - Start Next Level
      setTimeout(startLevel, 1000)
      isHeavenScreen = false
    }else if (isTheraScreen){
      setTimeout(heavenScreen, 1000)
    }else{

      // If Level 5 Complete - Move to Thera Screen
      setTimeout(theraScreen, 1000)
    }
  }
}

function menuScreen() {
  createCanvas(windowWidth,windowHeight);
  background(255);
  isMenuScreen = true
  
  voiceSynthesizer.speak("Welcome dear angel. Here at Ask Thera, we specialize in untangling the knots of your interdimensional psyche.")

  // Draw The Image
  image(menu, 0,0, windowHeight, windowHeight);
  
  // Set Layout Coordinates for Menu Screen
  let top = windowHeight/5
  let textCenter = windowHeight + (windowWidth - windowHeight)/2
  
  fill('red')
  textWrap(WORD)
  textSize(30)
  textStyle(BOLD)
  text("ASK TH3RA", textCenter-70, top)
  
  textAlign(CENTER)
  fill(menuTextColor)
  textWrap(WORD)
  textStyle(NORMAL)
  textSize(20)
  text("TH3RA is a poetic AI experience, in which the player, PATIENT #71340, uses their voice to respond to the therapist's questions, revealing their cosmic diagnosis.", textCenter - 185, top + 50, 400)

  textAlign(LEFT)
  fill('red')
  textSize(30)
  textStyle(BOLD)
  text("Rules", textCenter - 25, top + 225)

  textAlign(CENTER)
  fill(menuTextColor)
  textWrap(WORD)
  textStyle(NORMAL)
  textSize(20)
  text("Use your voice to select 1 response per level. Choose the answers which reflect your attitude most closely. Gain insight & connect to your AI guru!", textCenter -185, top + 275, 400)

  textAlign(LEFT)
  fill('red')
  textSize(30)
  textStyle(BOLD)
  text("To Play", textCenter-35, top + 430)

  textAlign(CENTER)
  fill(menuTextColor)
  textWrap(WORD)
  textSize(20)
  textStyle(NORMAL)
  text("Press ENTER to activate game.", textCenter - 185, top + 480, 400)

}

function startLevel() {
  createCanvas(windowWidth,windowHeight);
  background(bgColor)

  // Set Coordinates for Level Layout
  topLeftX = windowWidth/100
  topLeftY = windowHeight/35
  
  voiceSynthesizer.setPitch(0.8);
  voiceSynthesizer.setRate(1);
  voiceSynthesizer.setVoice(`Google UK English Male`);
  
  // Reset That No Line Has Been Chosen
  lineChosen = false
  
  // Question
  fill(textColor)
  textAlign(CENTER)

  fill("red")
  textSize(40)
  textStyle(BOLD)
  textWrap(WORD)
  text("QUESTION " + (level + 1), topLeftX + 320, topLeftY + 30, 1000);
  
  fill('white')
  textStyle(NORMAL)
  textSize(35)
  textWrap(WORD);
  text(questions[level], topLeftX + 320, topLeftY + 100, 1000);
      
  
  
  let y = 350
  for (let i = 0; i < 3; i++){
    let x = 250 + i*space
    rect(topLeftX + x, topLeftY + y, width, height);
    rectCoords.push({x: topLeftX + x, y: topLeftY + y, boxId: i})
  }
  
  // Add Text
  for (let i = 0; i < 3; i++){
    textSize(30)
    fill(menuTextColor)
    
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

function theraScreen() {
  createCanvas(windowWidth,windowHeight);
  let lineNum = 0
  let finalResponse = {}
  isTheraScreen = true
  
  // Calculate Score
  let score = 0
  for(let line of haiku){
    score += line.score
  }
  
  for(let response of responses){
    if (score < response.score){
      finalResponse = response
      break;
    }
  }
  
  fill("red")
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
  
  voiceSynthesizer.setPitch(1);
  voiceSynthesizer.setRate(1);
  voiceSynthesizer.setVoice(`Google UK English Female`);
  setTimeout(voiceSynthesizer.speak(finalResponse.text), speechDelay)
  
}

function heavenScreen() {
  createCanvas(windowWidth,windowHeight);
  background(0);
  isHeavenScreen = true
  isTheraScreen = false 
  level = 0
  haiku = []
 
  voiceSynthesizer.speak("See you in heaven, dear traveler. Good luck on your journey!")

  // Draw Heaven Image
  image(heaven, (windowWidth/2 - windowHeight/2) ,0, windowHeight, windowHeight);

}

function draw() {
  if (isMenuScreen) {
    if(keyIsPressed){
      isMenuScreen = false
      voiceSynthesizer.stop()
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
  fill(menuTextColor)
  
  let lineCount = 0
  for (let words of line.line){
    text(words, rectCoords[line.boxId].x + 30, rectCoords[line.boxId].y + 75 + 40*lineCount);
    lineCount++
  }

  // Respond to Chosen Line
  setTimeout(() => voiceSynthesizer.speak(line.text), speechDelay)
  
  // Add Chosen Line to User Responses for Scoring
  haiku.push(line)

  // Increase Level
  level++
}

// Voice Recorder Callback
function onResult() {
  if (!voiceRecognizer.resultValue) {
    return;
  }
  let result  = voiceRecognizer.resultString.toLowerCase()
  if(level < 5){
    for (let word of result.split(" ")){
      for (let line of lines[level]) {
        if (line.command.includes(word)) {
          if (!lineChosen){
            choose(line);
            break;
          }
        }
      }
    }
  }
}

// Start Game After Mouse Click
function mouseClicked(event){
  if (isMenuScreen){
    isMenuScreen = false
    voiceSynthesizer.stop()
    startLevel()
  }
}