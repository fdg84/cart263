var capture;

function setup() {
  createCanvas(400, 300);
  capture = createCapture(VIDEO);
  capture.hide();
}

function draw() {  
 
  image(capture, 0, 0, 400, 300);
  //this controls what part of your video we're *getting* for the gray filter
  //change the numbers to change where the box is 
  let box = get (100,0,200,300)
  
  //what color is your outside filter box?
  //if you don't want it to be transparent 
  //delete the 4th value 
  fill(200,100,0,170)

  rect(0,0,width, height)
  
  box.filter(GRAY);
  image(box, 100,0,200,300)

  
}
