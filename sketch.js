let population, target;
let blocks = [];
var x1 = null;
var y1 = null;
var genP;

function setup() {
  createCanvas(800, 800);
  background(51);
  stroke(0);

  let start = createVector(width / 2, height * 3 / 4);
  target = createVector(width / 2, height / 8);
  population = new Population(start, target);
  population.newPop();

  // html
  genP = createP('Generation: ');
}

function draw() {
  background(51);
  fill(255, 0, 0);
  circle(target.x, target.y, 5);
  population.moveAll();
  population.showAll();
  population.checkBounds(blocks);
  for (let block of blocks) {
    block.show();
  }
  if (x1 && y1) {
    rectMode(CORNERS);
    fill(0, 255, 0);
    rect(x1, y1, mouseX, mouseY);
  }
  genP.html('Generation: ' + population.generations);
}

function mousePressed() {
  if (!x1 && !y1) {
    x1 = mouseX;
    y1 = mouseY;
  } else {
    var rx = x1;
    var ry = y1;
    blocks.push(new Rectangle(rx, ry, mouseX, mouseY));
    x1 = null;
    y1 = null;
  }
}
