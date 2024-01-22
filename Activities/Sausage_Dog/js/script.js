/**
Sausage Dog
Francis Ouellette

Week 1 Exercise
*/

"use strict";

const NUM_ANIMAL_IMAGES = 10;
const ANIMAL_IMAGE_PREFIX = `assets/images/animal`;
const SAUSAGE_DOG_IMAGE = `assets/images/sausage-dog.png`;

const NUM_ANIMALS = 100;

let animalImages = [];
let animals = [];
let sausageDogImage;
let sausageDog;

function preload() {
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) {
    let animalImage = loadImage(`${ANIMAL_IMAGE_PREFIX}${i}.png`);
    animalImages.push(animalImage);
  }

  sausageDogImage = loadImage(`${SAUSAGE_DOG_IMAGE}`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  createAnimals();
  createSausageDog();
}

function createAnimals() {
  for (let i = 0; i < NUM_ANIMALS; i++) {
    let animal = createRandomAnimal();
    animals.push(animal);
  }
}

function createRandomAnimal() {
  let x = random(0, width);
  let y = random(0, height);
  let animalImage = random(animalImages);
  let animal = new Animal(x, y, animalImage);
  return animal;
}

function createSausageDog() {
  let x = random(0, width);
  let y = random(0, height);
  sausageDog = new SausageDog(x, y, sausageDogImage);
}

function draw() {
  background(80,0,250);

  updateAnimals();
  updateSausageDog();
}

function updateAnimals() {
  for (let i = 0; i < animals.length; i++) {
    animals[i].update();
  }
}

function updateSausageDog() {
  sausageDog.update();
}

function mousePressed() {
  sausageDog.mousePressed();
}