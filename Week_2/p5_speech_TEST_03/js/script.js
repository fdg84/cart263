/**
p5 speech TEST 03
Francis Ouellette
*/

"use strict";

const speechRecognizer = new p5.SpeechRec();
//const speechRecognizer = {}

let currentSpeech = '?';

function setup() {
   createCanvas(500,500);

    speechRecognizer.onResult = handleSpeechInput;
    speechRecognizer.start();
}

function draw() {
    background(30,200,50);

    textAlign(CENTER,CENTER);
    textSize(24);
    // text(currentSpeech, width / 2, height / 2);
    text('Say that you love me', width / 2, height / 2);
}

function handleSpeechInput() {
    // currentSpeech = speechRecognizer.resultString;
    if (speechRecognizer.resultString === 'I love you') {
        currentSpeech = 'Forever and ever';
    }
    else {
        currentSpeech = 'Broken heart';
    }
}