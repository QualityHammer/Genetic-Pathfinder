let population, target;
let blocks = [];
let swings = [];
var x1 = null;
var y1 = null;
var genP, stepP, startB, changeB, muteI;
var obst = 'Wall';
var go = false;

function startPop() {
  go = true;
}

function mutationChange() {
  population.mRate = Number(this.value());
}

function blankSelect() {
  x1 = null;
  y1 = null;
}

function changeObstacle() {
  if (obst == 'Wall') {
    obst = 'Swing';
  } else if (obst == 'Swing') {
    obst = 'Wall';
  }
  changeB.html(obst);
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
  createP('');
  changeB = createButton(obst);
  changeB.mousePressed(changeObstacle);
  changeB.mouseReleased(blankSelect);
  genP = createP('Generation: ');
  stepP = createP('Lifespan: ');
}

function draw() {
  background(51);
  stroke(0);
  fill(255, 0, 255);
  circle(target.x, target.y, 5);
  if (go) {
    population.moveAll(swings);
    population.showAll();
    population.checkBounds(blocks, swings);
  }
  for (let block of blocks) {
    block.show();
  }
  for (let swing of swings) {
    if (go) {
      swing.update();
    }
    swing.show();
  }
  if (x1 && y1) {
    if (obst === 'Wall') {
      rectMode(CORNERS);
      fill(0, 255, 0);
      rect(x1, y1, mouseX, mouseY);
    } else if (obst === 'Swing') {
      fill(0, 255, 0);
      circle(x1, y1, dist(x1, y1, mouseX, mouseY));
    }
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
    if (obst === 'Wall') {
      blocks.push(new Rectangle(rx1, ry1, rx2, ry2));
    } else if (obst === 'Swing') {
      swings.push(new Swinger(rx1, ry1, dist(rx1, ry1, rx2, ry2)));
    }
    x1 = null;
    y1 = null;
  }
}
