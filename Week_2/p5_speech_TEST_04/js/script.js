/**
p5 speech TEST 04
Francis Ouellette
*/

"use strict";

const speechRecognizer = new p5.SpeechRec();
// let currentSpeech = '?';
// let lightsAreOn = false;
let backgroundColor = 'black';

function setup() {
   createCanvas(500,500);

    speechRecognizer.onResult = handleSpeechInput;
    speechRecognizer.continuous = true;
    speechRecognizer.interimResults = true;
    speechRecognizer.start();
}

function draw() {
    // background(0);
    background(backgroundColor);

    if (lightsAreOn) {
        background(200);
    }
}

function handleSpeechInput() {
    // console.log(speechRecognizer.resultString);

    // if (speechRecognizer.resultString.toLowerCase() === 'turn the lights on') {
    //     lightsAreOn = true;
    // }
    // else if (speechRecognizer.resultString.toLowerCase() === 'turn the lights off') {
    //     lightsAreOn = false;
    // }
    // backgroundColor = speechRecognizer.resultString;
    
    let words = speechRecognizer.resultString.split('');
    backgroundColor = words.pop();

    
}
    