/**
p5 speech TEST 04
Francis Ouellette
*/

"use strict";

const speechRecognizer = new p5.SpeechRec();
let currentSpeech = '?';
let lightsAreOn = false;

function setup() {
   createCanvas(500,500);

    speechRecognizer.onResult = handleSpeechInput;
    speechRecognizer.start();
}

function draw() {
    background(0);

    if (lightsAreOn) {
        background(200);
    }
}

function handleSpeechInput() {
    console.log(speechRecognizer.resultString);

    if (speechRecognizer.resultString.toLowerCase() === 'turn the lights on') {
        lightsAreOn = true;
    }
}
    