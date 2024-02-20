let handpose;
let video;
let predictions = [];
let waves = [];
let waveDots = [];
let toneCount = 20;
let startFreq = 120;

class WaveDots {
  constructor(i, v,r, playing) {
    this.wave = i;
    this.v = v;
    this.playing = playing;
    this.radius = r;
  }
  
  // Draw Ellipses
  draw(){
    noStroke();
    if(this.playing) {
      fill('rgba(100,0,100, 0.5)');
    } else {
      fill('rgba(255,255,255, 0.25)');
    }
    ellipse(this.v.x, this.v.y, this.radius, this.radius);
    
    // Amplitude for Audio
    if (!this.playing) {
      waves[this.wave].amp(0.0, 0.15);
    } else {
      waves[this.wave].amp(0.15, 0.15);
    }
  }
}

// Webcam
function setup() {
  createCanvas(600, 600);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  angleMode(DEGREES);
  
  // Oscillator
  for (let w = 0; w < toneCount; w += 1) {
    waves.push(new p5.Oscillator());
    nw = waves[w]
    nw.setType('sine');
    nw.start();
    nw.freq(startFreq * pow(2,w*2/12));
    nw.amp(0);
    
    //Random Dots
    angle = w * (360/toneCount);
    r = random(10,120)
    px = random(r,width-r)
    py = random(r,height-r)
    waveDots.push(new WaveDots(w, createVector(px,py),r,false))
  }  

  handpose = ml5.handpose(video, modelReady);

  // Set predictions in array when new handpose is detected
  handpose.on("predict", results => {
    predictions = results;
  });

  video.hide();
  
}

function modelReady() {
  console.log("Model ready!");
}

// Fill background
function draw() {
  image(video, 0, 0, width, height);
  background(230, 80, 60);
  
  checkDots();

  // Call functions to draw keypoints and skeletons
  drawKeypoints();
}
  
function checkDots() {
  
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

// Draw ellipses over the detected keypoints
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      fill(230,190,190);
      noStroke();
      ellipse(keypoint[0], keypoint[1], 10, 10);
    }
  }
}

// Check points
function check_a_point(a, b, x, y, r) {
    var d = abs(dist(a,b,x,y))
    if (d < r) {
        return true;
    }
    return false;
}