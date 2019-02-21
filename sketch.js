let population, target, block;
var genP;

function setup() {
  createCanvas(800, 800);
  background(51);
  stroke(0);

  let start = createVector(width / 2, height * 3 / 4);
  target = createVector(width / 2, height / 4);
  population = new Population(start, target);
  population.newPop();

  block = new Rectangle(200, 400, 600, 500);

  // html
  genP = createP('Generation: ');
}

function draw() {
  background(51);
  fill(255, 0, 0);
  circle(target.x, target.y, 5);
  population.moveAll();
  population.showAll();
  population.checkBounds(block);
  block.show();
  genP.html('Generation: ' + population.generations);
}
