let video;

let flipVideo;

let label ='Waiting...'; 

let classifier;

// step1 load the model
function preload(){
classifier =ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/SqeKmM54Q/model.json') 
}



let snake;
let rez = 20;
let food;
let w;
let h;



function setup() {
  createCanvas(640, 480);
  //create the video
  video = createCapture(VIDEO);
  video.size(640,480);
  video.hide();
  
  flipVideo = ml5.flipImage(video);
  
  //step2 start classifying
  classifyVideo();
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(5);
  snake = new Snake();
  foodLocation();
}



// step2 start classify
function classifyVideo(){
  flipVideo = ml5.flipImage(video);
  classifier.classify(flipVideo,gotResults);
}

function gotResults(error,results){
  if(error){
    console.error(error);
    return;
  }
  label = results[0].label;
  controlSnake();
  classifyVideo();
}

function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);
}

function controlSnake() {
  if (label === 'LEFT') {
    snake.setDir(-1, 0);
  } else if (label === 'RIGHT') {
    snake.setDir(1, 0);
  } else if (label === 'DOWN') {
    snake.setDir(0, 1);
  } else if (label === 'UP') {
    snake.setDir(0, -1);
  }
}

function draw() {
  background(220);
  image(flipVideo,0,0);
  textSize(32);
  fill(255);
  text(label,10,50);
  scale(rez);
  
  if (snake.eat(food)) {
    foodLocation();
  }
  snake.update();
  snake.show();

  if (snake.endGame()) {
    print('END GAME');
    background(255, 0, 0);
    noLoop();
  }

  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);
}
