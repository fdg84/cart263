/**
VOICE ACTIVATED AUDIO
Francis Ouellette
*/

"use strict";

const speechRecognizer = new p5.SpeechRec();
// let currentSpeech = '?';
// let lightsAreOn = false;
// let backgroundColor = 'black';

let sounds = (air, bass, clap, clave, hat, kick, laser, riser, snare, synth);

function setup() {
   createCanvas(windowWidth,windowHeight);

    speechRecognizer.onResult = handleSpeechInput;
    speechRecognizer.continuous = true;
    speechRecognizer.interimResults = true;
    speechRecognizer.start();
}

function draw() {
    background(0);
    // background(backgroundColor);

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
    