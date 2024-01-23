/**
p5 speech TEST 01
Francis Ouellette
*/

"use strict";

// let voice = new p5.Speech();

let recognizer = new p5.SpeechRec();

function preload() {

}



function setup() {
    recognizer.onResult = handleResult;
    recognizer.start();
}



function draw() {

}

// function mousePressed() {
//     voice.speak('Welcome to heaven.');
// }

function handleResult(){
    console.log(recognizer.resultString);
}