let population, target, start;
// list of all walls and swings
let blocks = [];
let swings = [];
// editor selectors
var x1 = null;
var y1 = null;
var rd = null;
var ballDirect = null;
// html elements
var genP, stepP, startB, changeB, muteI, popP, popBup, popBdown;
// selected obstacle
var obst = 'Wall';
// if genetic algorithm is running
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


// changes the selected obstacle in editor
function changeObstacle() {
  if (obst == 'Wall') {
    obst = 'Swing';
  } else if (obst == 'Swing') {
    obst = 'Target';
  } else if (obst == 'Target') {
    obst = 'Start Pos';
  } else if(obst == 'Start Pos') {
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
  target = new Target(width / 2, height / 8);
  // population creation
  population = new Population(start, target);

  // html
  // start button
  startB = createButton('Start');
  startB.mousePressed(startPop);
  // change obstacle button
  changeB = createButton(obst);
  changeB.mousePressed(changeObstacle);
  // population size control
  popP = createP('Population size: ');
  popBdown = createButton('-');
  popBdown.mousePressed(lowerPop);
  popBup = createButton('+');
  popBup.mousePressed(raisePop);
  // mutation input
  muteP = createP('Mutation rate: ')
  muteI = createInput('0.01');
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
  target.show();
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
  // shows temporary outline of the object about to be created
  if (x1 && y1) {
    fill(100, 255, 100);
    if (obst === 'Wall') {
      noStroke();
      rectMode(CORNERS);
      rect(x1, y1, mouseX, mouseY);
    } else if (obst === 'Swing') {
      strokeWeight(3);
      if (rd) {
        stroke(0, 200, 0);
        strokeWeight(6);
        line(x1, y1, mouseX, mouseY);
      }
      stroke(1);
      fill(100, 255, 100);
      if (rd) {
        circle(x1, y1, rd)
      } else {
        circle(x1, y1, dist(x1, y1, mouseX, mouseY));
      }
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

// editor mousePressed
function mousePressed() {
  if (mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0) {
    if (!x1 && !y1 && !go) {
      // first point
      if (obst == 'Target') {
        target.move(mouseX, mouseY);
      } else if(obst == 'Start Pos') {
        start.set(mouseX, mouseY);
      } else {
        x1 = mouseX;
        y1 = mouseY;
      }
    } else if (!go) {
      // object creation
      if (obst === 'Wall') {
        blocks.push(new Rectangle(x1, y1, mouseX, mouseY));
        // reset
        x1 = null;
        y1 = null;
      } else if (obst === 'Swing') {
        if (rd) {
          ballDirect = createVector((mouseX - x1) / 10, (mouseY - y1) / 10);
          swings.push(new Swinger(x1, y1, rd, ballDirect));
          // reset
          x1 = null;
          y1 = null;
          rd = null;
          ballDirect = null;
        } else {
          rd = dist(x1, y1, mouseX, mouseY);
        }
      }
    }
  }
}
