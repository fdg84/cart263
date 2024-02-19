	var t = 0;

function x1(t) {
    return sin(t / 10) * 100 + sin(t / 5) * 20;
}

function y1(t) {
    return cos(t / 10) * 100;
}

function x2(t) {
    return sin(t / 10) * 200 + sin(t) * 2;
}

function y2(t) {
    return cos(t / 20) * 200 + cos(t / 12) * 20;
}

function setup() {
    createCanvas(500, 500);
    background(0);
    createP('');
    createP('Framerate:');
    slider_fps = createSlider(1, 120, 60);
    createP('Lines');
    slider_lines = createSlider(1, 50, 5);
    createP('Speed');
    slider_speed = createSlider(1, 10, 5);
}

var x_value;
var y_value;

function draw() {
    background(0)
    stroke(255);
    strokeWeight(5);
    frameRate(slider_fps.value());

    translate(width / 2, height / 2);

    for (let i = 0; i < slider_lines.value(); i++) {
        line(x1(t + i), y1(t + i), x2(t + i), y2(t + i));
    }

    line(x1(t), y1(t), x2(t), y2(t))
    t += 2.5 / slider_speed.value();
}