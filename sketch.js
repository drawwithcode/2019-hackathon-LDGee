var logocerchio;
var logo;
var terra;
var suono;
var r = 243;
var g = 103;
var b = 167;
var fft;

function preload() {
  logocerchio = loadImage("./assets/titolorosa.png");
  terra = loadImage("./assets/terra.png");
  logo = loadImage("./assets/logorosa.png");
  suono = loadSound("./assets/TG1_new.mp3");

}

function setup() {
  createCanvas(windowWidth, windowHeight)
  background(r, g, b);

  //setup analyzer and music
  analyzer = new p5.Amplitude();
  analyzer.setInput(suono)
  suono.pause();
  suono.playMode('sustain');


  //create the ftt object
  fft = new p5.FFT();

}

function draw() {

  //analyze the sound and get the levels of the frequencies of the sound
  fft.analyze();
  var bass = fft.getEnergy("bass");
  var mid = fft.getEnergy("mid");
  var highMid = fft.getEnergy("highMid");
  var treble = fft.getEnergy("treble");

  //display analyzer
  var volume = 0;
  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, 0, height);

  if (suono.isPlaying() == true) {

    push();
    angleMode(DEGREES);
    translate(windowWidth / 2, windowHeight / 2);
    //clear();
    background(r + volume, g + volume, b);
    rotate(frameCount / 1.5);
    imageMode(CENTER);
    image(logocerchio, 0, 0, 400 + bass * 2, 400 + bass * 2);
    image(logocerchio, 0, 0, 600 + mid * 3, 600 + mid * 3);
    image(logocerchio, 0, 0, 800 + highMid * 5, 800 + highMid * 5);
    image(logocerchio, 0, 0, 1200 + treble * 9, 1200 + treble * 9);
    rotate(-2 * frameCount / 1.5);
    image(terra, 0, 0, 300 + volume * 2, 300 + volume * 2);

    //YOU ARE STILL ALIVE
    textAlign(CENTER);
    fill(248, 225, 255)
    strokeWeight(0.8);
    textFont("Roboto Mono");
    textSize(10);
    text("YOU ARE STILL ALIVE", 0, 130);
    pop();

  } else {
    //clear();
    background(r, g, b);

    //instructions
    textAlign(CENTER);
    noFill();
    strokeWeight(0.8);
    stroke(248, 225, 255);
    textFont("Roboto Mono");
    textSize(25);
    text("click to discover the most incredible news of the day", windowWidth / 2, windowHeight / 2);
    text("!!!!!", windowWidth / 2, windowHeight / 2 + 50);
  }
}

//music switch
function mouseClicked() {
  if (suono.isPlaying() == false) {
    suono.play();
    //this is to add the option to stop the sound with a second click
    // } else {
    //   suono.pause();
  }
}

//resize the canvas everytime window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
