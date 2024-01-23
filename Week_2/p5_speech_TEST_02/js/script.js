/**
p5 speech TEST 02
Francis Ouellette
*/

"use strict";

const speechSynthesizer = new p5.Speech();

let showSubtitle = false;
let toSay = 'welcome to hell';

function preload() {

}



function setup() {
   createCanvas(500,500);

   // Synthesis Settings
   speechSynthesizer.setPitch(0.5);
   speechSynthesizer.setRate(0.5);
   speechSynthesizer.setVoice('Google italiano');

//    speechSynthesizer.onStart = speechStarted;
//    speechSynthesizer.onEnd = speechEnded;

   speechSynthesizer.onStart = () => {
        showSubtitle = true;
   };

   speechSynthesizer.onEnd =  () => {
        showSubtitle = false;
   };

   console.log(speechSynthesizer.listVoices());
}



function draw() {
    background(200,100,50);

    if (showSubtitle) {
        textSize(40);
        text(toSay, 100, 100);
    }
}

function mousePressed() {

    // Say Something
    speechSynthesizer.speak(toSay);
}

function speechStarted(){
    showSubtitle = true;
}

function speechEnded(){
    showSubtitle = false;
}