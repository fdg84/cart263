var spot = {
    x: 500,
    y: 500,
};

var color = {
    r: 0,
    g: 50,
    b: 0,
}

var size;

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    background(0);
}


function draw() {
    size = random(50, 100);
    color.r = random(0, 255);
    spot.x = random(0, 1000);
    spot.y = random(0, 1000);
    noStroke();
    fill(0, color.r, 0, 50);
    ellipse(spot.x, spot.y, size, size);
}


