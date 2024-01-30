const voiceSynthesizer = new p5.Speech();
const voiceRecognizer = new p5.SpeechRec();

const commands = [
  {
    "command": "change the background",
    "callback": backgroundChange
  },
  {
    "command": "say hello",
    "callback": sayHello
  },
  {
    "command": "wave goodbye",
    "callback": waveGoodbye
  }
];

const backgrounds = [`red`, `green`, `purple`, `cyan`, `beige`, `turquoise`, `ivory`, `orange`];
let bg = `red`;

let feedbackString = `...`;

function setup() {
  createCanvas(400, 400);
  
  voiceRecognizer.continuous = true;
  voiceRecognizer.onResult = onResult;
  voiceRecognizer.start();
}

function draw() {
  background(bg);
  
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

function backgroundChange() {
  bg = random(backgrounds);
  feedbackString = `Better?`;
}

function sayHello() {
  voiceSynthesizer.speak(`No.`);
  feedbackString = `No.`;
}

function waveGoodbye() {
  feedbackString = `👋`;
}