let mover;

function setup() {
    createCanvas(windowWidth, windowHeight);
    moverA = new Mover(100, 200, 2);
    moverB = new Mover(300, 200, 4);
}

function draw() {
    background(0);

    if (mouseIsPressed) {
        let wind = createVector(0.1, 0);
        moverA.applyForce(wind);
        moverB.applyForce(wind);
    }

    let gravity = createVector(0, 0.2);

    let weightA = p5.Vector.mult(gravity, moverA.mass);
    let weightB = p5.Vector.mult(gravity, moverB.mass);
    moverA.applyForce(weightA);
    moverB.applyForce(weightB);

    moverA.update();
    moverA.edges();
    moverA.show();

    moverB.update();
    moverB.edges();
    moverB.show();
}