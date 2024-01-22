"use strict";

// const NUM_CIRCLES = 10;
// let circleAlpha = 50;
// let circleSizeIncrease = 50;

// function setup() {
//   createCanvas(500, 500);
// }

// function draw() {
//   background(0);

//   circleAlpha = map(mouseX,0,width,10,100);
//   circleSizeIncrease = map(mouseY,0,height,10,100);

//   // Loop once for each of 10 circles, drawing them 50 pixels larger each time
//   for (let i = 0; i < NUM_CIRCLES; i++) {
//     push();
//     fill(255, circleAlpha);
//     ellipse(width / 2, height / 2, i * circleSizeIncrease);
//     pop();
//   }
// }

//

// Constants defining our grid
const TILE_SIZE = 50;
const COLUMNS = 10;
const ROWS = 10;

// Creates the canvas
function setup() {
  // Define the canvas size in terms of the grid constants
  createCanvas(TILE_SIZE * COLUMNS, TILE_SIZE * ROWS);
}

// Draw a sparkling grid
function draw() {
  background(0);

  // Loop through each row
  for (let row = 0; row < ROWS; row++) {
    // Loop through each column
    for (let col = 0; col < COLUMNS; col++) {
      // Draw a tile at the current row and column
      drawTile(row, col);
    }
  }
}

// Draw a tile at the specified row and column
function drawTile(row, col) {
  // Calculate the x and y of the tile on the canvas
  // by multiplying by the tile size
  let x = row * TILE_SIZE;
  let y = col * TILE_SIZE;
  // Draw a random shaded tile sized square at that location
  push();
  noStroke();
  let grey = random(50, 200);
  fill(grey);
  rect(x, y, TILE_SIZE, TILE_SIZE);
  pop();
}