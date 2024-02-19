// Your code will go here
// open up your console - if everything loaded properly you should see 0.3.0
console.log('ml5 version:', ml5.version);

let mobilenet;
let classifier;
let video;
let label = '';
let button;
let newButton;

function modelReady() {
    console.log('Model is ready!!!');
}

function videoReady() {
    console.log('Video is ready!!!');
}

function whileTraining() {
    console.log(loss);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        //console.log(results);
        label = results[0].className;
        mobilenet.predict(gotResults);
    }
}


function setup() {
    createCanvas(320, 270);
    video = createCapture(VIDEO);
    video.hide();
    background(0);
    mobilenet = ml5.featureExtractor('MobileNet', modelReady);
    classifier = mobilenet.classification(video, videoReady);

    button = createButton('train');
    button.mousePressed(function () {
        classifier.addImage('train');
    });

    newButton = createButton('train');
    newButton.mousePressed(function () {
        classifier.train(whileTraining);
    });
}

function draw() {
    background(0);
    image(video, 0, 0, 320, 240);
    fill(255);
    textSize(32);
    text(label, 10, height - 200);
}
