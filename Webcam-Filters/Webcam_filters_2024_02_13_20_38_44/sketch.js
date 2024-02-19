var capture;

function setup() {
  createCanvas(400, 300);
  capture = createCapture(VIDEO);
  capture.size(400, 300);
  //stepSize_slider = createSlider(8, 48,12,1);
}

function draw() {
  background(220,220,220,255);
  capture.loadPixels();
  
// you can change the stepSize
//var stepSize = stepSize_slider.value();
var stepSize = floor(map(mouseX, 0, width, 5, 20));
for (var x = 0; x < capture.width; x += stepSize) {
  for (var y = 0; y < capture.height; y += stepSize) {
    var index = ((y*capture.width) + x) * 4;
    // The code for your filter will go here!
    var redVal = capture.pixels[index];
    var greenVal = capture.pixels[index + 1];
    var blueVal = capture.pixels[index + 2];
    // you can add or remove the stroke
    //strokeWeight(1);
    //stroke(255,0,255,255);
    noStroke();
    // you can change the colors
    fill(2*redVal, greenVal, blueVal/2);
    // you can change the shape of the 'pixels'
    rectMode(CENTER);
    rect(x, y, stepSize, stepSize);
    //circle(x, y, stepSize, stepSize);
    
  }
}
}