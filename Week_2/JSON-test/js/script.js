// // RANDOM FORTUNE

// // A global variable to store our data in
// let tarot;
// // A global variable to store our fortune in
// let fortune;

// function preload() {
//   // Used in preload, loadJSON will just return the data into our variable
//   tarot = loadJSON("assets/data/tarot_interpretations.json");
// }

// function setup() {
//   createCanvas(windowWidth, windowHeight);

//   // Choose a random card
//   let card = random(tarot.tarot_interpretations);
//   // Choose a random fortune
//   fortune = random(card.fortune_telling);
// }

// function draw() {
//   background(0);

//   // Display the fortune
//   push();
//   textSize(18);
//   textAlign(CENTER, CENTER);
//   fill(255, 255, 0);
//   // Use width and height properties to break up the text
//   text(fortune, width / 2, height / 2);
//   pop();
// }

//

// // CALLBACK

// // A global variable to store our data in
// let tarot;
// // A global variable to store our fortune in
// let fortune = `No fortune loaded.`;

// function preload() {
//   // NOTHING in preload because we will load the data dynamically on click
// }

// function setup() {
//   createCanvas(windowWidth, windowHeight);
// }

// function draw() {
//   background(0);

//   // Display the fortune
//   push();
//   textSize(18);
//   textAlign(CENTER, CENTER);
//   fill(255, 255, 0);
//   // Display the fortune
//   text(fortune, width / 2, height / 2);
//   pop();
// }

// function mousePressed() {
//   // Call loadJSON as before, but provide a callback function to call when
//   // the data has finished loading. The loaded data will be provided as an
//   // argument when it is called.
//   loadJSON("assets/data/tarot_interpretations.json", tarotLoaded);
// }

// // Note that our callback function has a PARAMETER that will have the loaded
// // JSON data in it when the function is called
// function tarotLoaded(data) {
//   // Save the data loaded into our tarot variable for later if we need it
//   tarot = data;
//   // Choose a random card
//   let card = random(tarot.tarot_interpretations);
//   // Choose a random fortune
//   fortune = random(card.fortune_telling);
// }

//

// // FROM URL

// // A global variable to store our data in
// let tarot;
// // A global variable to store our fortune in
// let fortune;

// function preload() {
//   // Load the JSON data from a file online!
//   tarot = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`);
// }

// function setup() {
//   createCanvas(windowWidth, windowHeight);

//   // Choose a random card
//   let card = random(tarot.tarot_interpretations);
//   // Choose a random fortune
//   fortune = random(card.fortune_telling);
// }

// function draw() {
//   background(0);

//   // Display the fortune
//   push();
//   textSize(18);
//   textAlign(CENTER, CENTER);
//   fill(255, 255, 0);
//   // Display the fortune
//   text(fortune, width / 2, height / 2);
//   pop();
// }

//

// FROM API

let jokeText = ``; // The current joke.
let jokeData = undefined; // The loaded joke data

function preload() {
  jokeData = loadJSON(`https://official-joke-api.appspot.com/jokes/programming/random`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // We get the joke object as the first element of the array
  let joke = jokeData[0];
  // Set the joke text as the setup and punchline properties together
  jokeText = `${joke.setup}\n\n${joke.punchline}`;
}

function draw() {
  background(0);

  // Display the current joke
  push();
  fill(255, 255, 0);
  textSize(18);
  textAlign(CENTER, CENTER);
  text(jokeText, width / 2, height / 2);
  pop();
}