let population, target;
let blocks = [];
var x1 = null;
var y1 = null;
var genP, stepP, startB, muteI;
var go = false;

function startPop() {
  go = true;
}

function mutationChange() {
  population.mRate = Number(this.value());
}

function setup() {
  createCanvas(800, 800);
  background(51);
  stroke(0);

  let start = createVector(100, height - 100);
  target = createVector(width / 2, height / 8);
  population = new Population(start, target);
  population.newPop();

  // html
  startB = createButton('Start');
  startB.mousePressed(startPop);
  muteI = createInput('Mutation rate; default: 0.01');
  muteI.input(mutationChange);
  genP = createP('Generation: ');
  stepP = createP('Lifespan: ');
}

function draw() {
  background(51);
  stroke(0);
  fill(255, 0, 0);
  circle(target.x, target.y, 5);
  if (go) {
    population.moveAll();
    population.showAll();
    population.checkBounds(blocks);
  }
  for (let block of blocks) {
    block.show();
  }
  if (x1 && y1) {
    rectMode(CORNERS);
    fill(0, 255, 0);
    rect(x1, y1, mouseX, mouseY);
  }
  genP.html('Generation: ' + population.generations);
  stepP.html('Lifespan: ' + population.maxStep);
}

function mousePressed() {
  if (!x1 && !y1 && !go) {
    x1 = mouseX;
    y1 = mouseY;
  } else if (!go) {
    var rx1 = x1;
    var ry1 = y1;
    var rx2 = mouseX;
    var ry2 = mouseY;
    blocks.push(new Rectangle(rx1, ry1, rx2, ry2));
    x1 = null;
    y1 = null;
  }
}
