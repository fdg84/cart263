/**

Handpose Framework
Francis Ouellette

For the AI Jam, I decided to use Pippin Barr's skeleton framework for ML5 Handpose 
and connect each finger to different sounds. 
Includes a loading screen followed by a live webcam feed with a circle drawn 
at the tip of the user's index finger. 

*/

"use strict";

// Current state of program
let state = `loading`; // loading, running
// User's webcam
let video;
// The name of our model
let modelName = `Handpose`;
// Handpose object (using the name of the model for clarity)
let handpose;
// The current set of predictions made by Handpose once it's running
let predictions = [];

/**
Starts the webcam and the Handpose
*/
function setup() {
  createCanvas(640, 480);

  // Start webcam and hide the resulting HTML element
  video = createCapture(VIDEO);
  video.hide();

  // Start the Handpose model and switch to our running state when it loads
  handpose = ml5.handpose(video, {
    flipHorizontal: true
  }, function() {
    // Switch to the running state
    state = `running`;
  });

  // Listen for prediction events from Handpose and store the results in our
  // predictions array when they occur
  handpose.on(`predict`, function(results) {
    predictions = results;
  });
}

/**
Handles the two states of the program: loading, running
*/
function draw() {
  if (state === `loading`) {
    loading();
  }
  else if (state === `running`) {
    running();
  }
}

/**
Displays a simple loading screen with the loading model's name
*/
function loading() {
  background(255);

  push();
  textSize(32);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(`Loading ${modelName}...`, width / 2, height / 2);
  pop();
}

/**
Displays the webcam.
If there is a hand it outlines it and highlights the tip of the index finger
*/
function running() {
  // Display the webcam with reveresd image so it's a mirror
  let flippedVideo = ml5.flipImage(video);
  image(flippedVideo, 0, 0, width, height);

  // Check if there currently predictions to display
  if (predictions.length > 0) {
    // Technically there will only be ONE because it only detects ONE hand
    // Get the hand predicted
    let hand = predictions[0];
    // Highlight it on the canvas
    highlightHand(hand);
  }
}

/**
Provided with a detected hand it highlights the tip of each finger
*/
function highlightHand(hand) {
  // Display a different color circle at the tip of each finger
  let thumb = hand.annotations.thumb[3];
  let thumbX = thumb[0];
  let thumbY = thumb[1];
  push();
  fill(255, 0, 0);
  noStroke();
  ellipse(thumbX, thumbY, 30);
  pop();

  let index = hand.annotations.indexFinger[3];
  let indexX = index[0];
  let indexY = index[1];
  push();
  fill(255, 255, 0);
  noStroke();
  ellipse(indexX, indexY, 30);
  pop();

  let middle = hand.annotations.middleFinger[3];
  let middleX = middle[0];
  let middleY = middle[1];
  push();
  fill(0, 255, 0);
  noStroke();
  ellipse(middleX, middleY, 30);
  pop();

  let ring = hand.annotations.ringFinger[3];
  let ringX = ring[0];
  let ringY = ring[1];
  push();
  fill(100, 200, 100);
  noStroke();
  ellipse(ringX, ringY, 30);
  pop();

  let pinky = hand.annotations.pinky[3];
  let pinkyX = pinky[0];
  let pinkyY = pinky[1];
  push();
  fill(0, 100, 200);
  noStroke();
  ellipse(pinkyX, pinkyY, 30);
  pop();
}