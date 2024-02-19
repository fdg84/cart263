let handpose;
let video;
let predictions = [];
let waves = [];
let waveDots = [];
let toneCount = 12;
let startFreq = 220;

class WaveDots {
  constructor(i, v,r, playing) {
    this.wave = i;
    this.v = v;
    this.playing = playing;
    this.radius = r;
  }
  
  draw(){
    noStroke();
    if(this.playing) {
      fill('rgba(0,127,255, 0.25)');
    } else {
      fill('rgba(255,255,255, 0.25)');
    }
    ellipse(this.v.x, this.v.y, this.radius, this.radius);
    
    if (!this.playing) {
      waves[this.wave].amp(0.0, 0.25);
    } else {
      waves[this.wave].amp(0.25, 0.25);
    }
  }
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  angleMode(DEGREES);
  
  for (let w = 0; w < toneCount; w += 1) {
    waves.push(new p5.Oscillator());
    nw = waves[w]
    nw.setType('sinewave');
    nw.start();
    nw.freq(startFreq * pow(2,w*2/12));
    nw.amp(0);
    
    //in a circle
    // angle = w * (360/toneCount);
    // px = width/2 + 120 * cos(angle);
    // py = height/2 + 120 * sin(angle);
    // waveDots.push(new WaveDots(w, createVector(px,py),40,false))
    
    //random
    angle = w * (360/toneCount);
    r = random(20,150)
    px = random(r,width-r)
    py = random(r,height-r)
    waveDots.push(new WaveDots(w, createVector(px,py),r,false))
  }  

  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("predict", results => {
    predictions = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  image(video, 0, 0, width, height);
  
  checkDots();

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
}
  
function checkDots() {
  
  // if(predictions.length > 0){
  //   print(check_a_point(predictions[0].landmarks[0][0], predictions[0].landmarks[0][1], width/2, height/2, height/2))
  // }
  
  for (let w = 0; w < waveDots.length; w += 1) {
    waveDots[w].playing = false;
  }
  
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      
      for (let w = 0; w < waveDots.length; w += 1) {
        if(check_a_point(keypoint[0], keypoint[1], waveDots[w].v.x, waveDots[w].v.y, waveDots[w].radius)) {
          waveDots[w].playing = true;
        } 
      }
    }
  }
  
  
  for (let w = 0; w < waveDots.length; w += 1) {
    waveDots[w].draw()
  }
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      fill(0, 255, 0);
      noStroke();
      ellipse(keypoint[0], keypoint[1], 10, 10);
    }
  }
}

function check_a_point(a, b, x, y, r) {
    var d = abs(dist(a,b,x,y))
    if (d < r) {
        return true;
    }
    return false;
}