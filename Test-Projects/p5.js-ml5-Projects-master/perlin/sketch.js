var xoff1 = 0;
var xoff2 = 10000;
var yoff = 0;
var start = 0;
var inc = 0.001;

function setup() {
    createCanvas(windowWidth, windowHeight);
    pixelDensity(1);
}

function draw() {

    var yoff = 0;

    loadPixels();
    noiseDetail(100);
    for (var y = 0; y < height; y++) {
        var xoff = 0;
        for (var x = 0; x < width; x++) {

            var index = (x + y * width) * 4;
            var r = noise(xoff, yoff) * 255;

            pixels[index + 0] = r;
            pixels[index + 1] = r;
            pixels[index + 2] = r;
            pixels[index + 3] = 255;
            xoff += inc;
        }
        yoff += inc;
    }
    //noLoop();
    updatePixels();

    /* 1D Perlin Noise
    background(0);
    var x = map(noise(xoff1), 0, 1, 0, width);
    var y = map(noise(xoff2), 0, 1, 0, height);

    ellipse(x, y, 24, 24);

    xoff1 += 0.001;
    xoff2 += 0.001;
    yoff += 0.01;

    stroke(255);
    noFill();
    beginShape();
    var xoff = start;
    for (var x = 0; x < width; x++) {
        stroke(255);
        //var y - random(height);
        var y = noise(xoff) * height;
        vertex(x, y);
        xoff += inc;
    }
    endShape();
    start += inc;
    */
}