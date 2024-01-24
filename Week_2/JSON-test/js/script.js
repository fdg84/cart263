"use strict";


// A global variable to store our data in
let tarot;

function preload() {
  // Used in preload, loadJSON will just return the data into our variable
  tarot = loadJSON("assets/data/tarot_interpretations.json");
}

function setup() {
    createCanvas(windowWidth,windowHeight);

}

function draw() {
    background(255);

    let description = tarotData.description;

    push();
    textSize(32);
    textAlign(CENTER);
    fill(0);
    text(description, width/2, height/2);
    pop();
}