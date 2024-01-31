/**
 * Audio Dots
 * Francis Ouellette
 */

"use strict";

const balls = []
const radius = 50;
let clickedBall
const sounds = []
let reverb;
let t = 0; // Time Variable

function preload() {
    let kick = loadSound('assets/sounds/kick1.wav');
    sounds.push(kick)
    let kick2 = loadSound('assets/sounds/kick2.wav');
    sounds.push(kick2)
    let kick3 = loadSound('assets/sounds/kick3.wav');
    sounds.push(kick3)
    let click = loadSound('assets/sounds/click1.wav');
    sounds.push(click)
    let click2 = loadSound('assets/sounds/click2.wav');
    sounds.push(click2)
    let bby = loadSound('assets/sounds/bby.wav');
    sounds.push(bby) 
    let clap = loadSound('assets/sounds/clap.wav');
    sounds.push(clap) 
    let clave = loadSound('assets/sounds/clave.wav');
    sounds.push(clave) 
    let hard = loadSound('assets/sounds/hard.wav');
    sounds.push(hard) 
    let hat = loadSound('assets/sounds/hat.wav');
    sounds.push(hat) 
    let hi = loadSound('assets/sounds/hi.wav');
    sounds.push(hi) 
    let kick02 = loadSound('assets/sounds/kick02.wav');
    sounds.push(kick02) 
    let laser = loadSound('assets/sounds/laser.wav');
    sounds.push(laser) 
    let lfo1 = loadSound('assets/sounds/lfo1.wav');
    sounds.push(lfo1) 
    let noise = loadSound('assets/sounds/noise.wav');
    sounds.push(noise) 
    let particle = loadSound('assets/sounds/particle.wav');
    sounds.push(particle)  
    let rise1 = loadSound('assets/sounds/rise1.wav');
    sounds.push(rise1) 
    let snare = loadSound('assets/sounds/snare.wav');
    sounds.push(snare) 
    let synth01 = loadSound('assets/sounds/synth01.wav');
    sounds.push(synth01) 
    let synth02 = loadSound('assets/sounds/synth02.wav');
    sounds.push(synth02) 
}

function setup() {
    createCanvas (displayWidth, displayHeight);
    userStartAudio();

    // Moving Circles
    noStroke();
    fill(40, 200, 40);

    const columns = 20;
    const rows = 12;
    const cellWidth = width / columns;
    const cellHeight = height / rows;
    
    reverb = new p5.Reverb();
    
    for (let i = 0; i < sounds.length; i++){
        sounds[i].disconnect();
        reverb.process(sounds[i], 15, 2);
    }
    
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows; r++) {
        const x = c * cellWidth + cellWidth / 2;
        const y = r * cellHeight + cellHeight / 2;
        const soundIndex = Math.floor(Math.random() * sounds.length)  
        const ball = new Ball(x, y, radius, r, c, sounds[soundIndex]);
        balls.push(ball)
        }
    }
}

function draw() {
    background (163, 195, 141);

    fill(38, 65, 70);
    // Bottom Circle (Turquoise)

     // X and Y grid of Ellipses (Particles)
     for (let x = 0; x <= width; x = x + 70) {
        for (let y = 0; y <= height; y = y + 70) {
          // Starting Point of Each Circle Depends on Mouse Position
          const xAngle = map(mouseX, 0, width, -4 * PI, 4 * PI, true);
          const yAngle = map(mouseY, 0, height, -4 * PI, 4 * PI, true);
          // Varies Based on the Particle's Location
          const angle = xAngle * (x / width) + yAngle * (y / height);
          // Each Particle Moves in a Circle
          const myX = x + 20 * cos(2 * PI * t + angle);
          const myY = y + 20 * sin(2 * PI * t + angle);
          ellipse(myX, myY, 40); // Draw Particle
        }
      }

    fill(0);
    // Top Circle (Black)

     // X and Y grid of Ellipses (Particles)
     for (let x = 0; x <= width; x = x + 70) {
        for (let y = 0; y <= height; y = y + 70) {
          // Starting Point of Each Circle Depends on Mouse Position
          const xAngle = map(mouseX, 0, width, -4 * PI, 4 * PI, true);
          const yAngle = map(mouseY, 0, height, -4 * PI, 4 * PI, true);
          // Varies Based on the Particle's Location
          const angle = xAngle * (x / width) + yAngle * (y / height);
          // Each Particle Moves in a Circle
          const myX = x + 20 * cos(2 * PI * t + angle);
          const myY = y + 20 * sin(2 * PI * t + angle);
          ellipse(myX, myY, 20); // Draw Particle
        }
      }

    t = t + 0.0000001; // Update Time

    // Reverb (Audio)
    let dryWet = constrain(map(500, 0.3, Math.floor(Math.random() * 500), 0, 0.5), 0, 0.3);
    reverb.drywet(dryWet);

    // Hover Effect
    let hoverBall = balls.filter(ball => {
        if (mouseX < (ball.x + ball.clickRadius) && mouseX > (ball.x - ball.clickRadius) && mouseY < (ball.y + ball.clickRadius) && mouseY > (ball.y - ball.clickRadius)){
            return ball;
        }
    })[0]

    if(hoverBall){
        hoverBall.isGrowing = true;
        hoverBall.isShrinking = false;
    }

    for (let i = 0; i < balls.length; i++){
        balls[i].display()  
    } 

    // Black Square (Info Box)
    rectMode(CORNER);
    fill(0);
    noStroke();
    rect(75, 160, 420, 330);
    
    rectMode(CORNER);
    fill(255);
    strokeWeight(20);
    stroke(0);
    
    // Left Ovals
    rect(75, 142, 40, 95, 20);
    rect(75, 238, 40, 50, 20);
    rect(75, 288, 40, 150, 20);
    rect(75, 438, 40, 65, 20);

    // Right Ovals
    rect(485, 142, 40, 140, 20);
    rect(485, 285, 40, 50, 20);
    rect(485, 335, 40, 50, 20);
    rect(485, 385, 40, 117, 20);

    // Top Ovals
    rect(125, 143, 50, 40, 20);
    rect(175, 143, 50, 40, 20);
    rect(225, 143, 150, 40, 20);
    rect(375, 143, 100, 40, 20);

    // Bottom Ovals
    rect(125, 460, 150, 40, 20);
    rect(275, 460, 50, 40, 20);
    rect(325, 460, 100, 40, 20);
    rect(425, 460, 50, 40, 20);

    // Title Text
    textFont(`Tilt Warp`)
    textSize(120);
    noStroke();
    fill(255);
    text('DOTS', 150, 368);

    // Lime Text
    textFont(`Space Grotesk`)
    textSize(30);
    noStroke();
    fill(171, 250, 0);
    text('Audio', 157, 277);
    
    textSize(30);
    noStroke();
    fill(171, 250, 0);
    text('Click & Play', 280, 400);

    // Info Text
    textSize(12);
    noStroke();
    fill(163, 195, 141);
    text('Welcome to a fun & interactive sound experience!', 160, 225);
}

function mousePressed(e) {
    clickedBall = balls.filter(ball => {
        if (mouseX < (ball.x + ball.clickRadius) && mouseX > (ball.x - ball.clickRadius) && mouseY < (ball.y + ball.clickRadius) && mouseY > (ball.y - ball.clickRadius)){
            return ball;
        }
    })[0]

    if (clickedBall){
        clickedBall.animate = true
        clickedBall.sound.play()
    }
}