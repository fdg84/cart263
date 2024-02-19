var n = 500;
var drops = new Array();
for (var i = 0; i < n; i++)
    drops.push(new Drop());

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (var i = 0; i < drops.length; i++) {
        drops[i] = new Drop();
    }
}

function draw() {
    background(0);
    for (var i = 0; i < drops.length; i++) {
        drops[i].show();
        drops[i].fall();
    }
}