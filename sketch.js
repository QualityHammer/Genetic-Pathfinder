let population, target, start;
let blocks = [];
let swings = [];
var x1 = null;
var y1 = null;
var genP, stepP, startB, changeB, muteI, popP, popBup, popBdown;
var obst = 'Wall';
var go = false;


// is called when the start button is pressed
// starts the first generation
function startPop() {
  go = true;
  population.newPop();
}


// called when minus button is pressed
function lowerPop() {
  population.size -= 25;
}


// called when plus button is pressed
function raisePop() {
  population.size += 25;
}


// changes the mutation rate based on the number input
function mutationChange() {
  population.mRate = Number(this.value());
}


// is called when some buttons are pressed to avoid random object creation
function blankSelect() {
  x1 = null;
  y1 = null;
}


// changes the created obstacle
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

  // start and target vectors
  start = createVector(width / 2, height - 100);
  target = createVector(width / 2, height / 8);
  // population creation
  population = new Population(start, target);

  // html
  // start button
  startB = createButton('Start');
  startB.mousePressed(startPop);
  // change obstacle button
  changeB = createButton(obst);
  changeB.mousePressed(changeObstacle);
  changeB.mouseReleased(blankSelect);
  // population size control
  popP = createP('Population size: ');
  popBdown = createButton('-');
  popBdown.mousePressed(lowerPop);
  popBdown.mouseReleased(blankSelect);
  popBup = createButton('+');
  popBup.mousePressed(raisePop);
  popBup.mouseReleased(blankSelect);
  // mutation input
  muteP = createP('Mutation rate: ')
  muteI = createInput(0.01);
  muteI.parent(muteP);
  muteI.input(mutationChange);
  createP('');
  // info
  genP = createP('Generation: ');
  stepP = createP('Lifespan: ');
}

function draw() {
  background(51);
  stroke(0);
  strokeWeight(1);
  // target
  fill(255, 255, 0);
  circle(target.x, target.y, 5);
  // start
  fill(1);
  circle(start.x, start.y, 3);
  // moves the population each frame if start button was pressed
  if (go) {
    population.moveAll(swings);
    population.showAll();
    population.checkBounds(blocks, swings);
  }
  // shows walls
  for (let block of blocks) {
    block.show();
  }
  // shows and updates swings
  for (let swing of swings) {
    if (go) {
      swing.update();
    }
    swing.show();
  }
  // shows temp outline of the object about to be created
  if (x1 && y1) {
    fill(100, 255, 100);
    if (obst === 'Wall') {
      noStroke();
      rectMode(CORNERS);
      rect(x1, y1, mouseX, mouseY);
    } else if (obst === 'Swing') {
      strokeWeight(3);
      stroke(1);
      circle(x1, y1, dist(x1, y1, mouseX, mouseY));
    }
  }
  // update info
  popP.html('Population size: ' + population.size + ' ');
  if (!go) {
    popBdown.parent(popP);
    popBup.parent(popP);
  }
  genP.html('Generation: ' + population.generations);
  stepP.html('Lifespan: ' + population.maxStep);
}

function mousePressed() {
  if (!x1 && !y1 && !go) {
    // first point
    x1 = mouseX;
    y1 = mouseY;
  } else if (!go) {
    // object creation
    var rx1 = x1;
    var ry1 = y1;
    var rx2 = mouseX;
    var ry2 = mouseY;
    if (obst === 'Wall') {
      blocks.push(new Rectangle(rx1, ry1, rx2, ry2));
    } else if (obst === 'Swing') {
      swings.push(new Swinger(rx1, ry1, dist(rx1, ry1, rx2, ry2)));
    }
    // reset
    x1 = null;
    y1 = null;
  }
}
