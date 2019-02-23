let maxSpeed = 5;

class Searcher {
  constructor(pos, len) {
    // position and physics vectors
    this.pos = createVector(pos.x, pos.y);
    this.acc = createVector(0, 0);
    this.vel = createVector(0, 0);
    // DNA
    this.brain = null;
    // frame lifespan
    this.len = len;
    this.fitness = 0;

    // flags
    this.dead = false;
    this.goal = false;
    this.step = null;
  }

  // returns the fitness value of the genes
  getFitness(target, maxStep) {
    if (!this.step) {
      this.step = maxStep;
    }
    let fit = 1 / Math.pow(this.pos.dist(target), 2);
    if (this.dead) {
      fit /= 1000;
    }
    if (this.goal) {
      fit = 1 / Math.pow(this.step, 2);
    }
    return fit;
  }

  // moves the searcher one step
  move(step, target) {
    if (!this.dead && !this.goal) {
      this.acc = this.brain.genes[step];
      this.vel.add(this.acc);
      this.vel.limit(maxSpeed);
      this.pos.add(this.vel);
      if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0) {
        this.dead = true;
        this.setStep(step);
      }
      if (floor(this.pos.x) == floor(target.x) && floor(this.pos.y) == floor(target.y)) {
        this.goal = true;
        this.setStep(step);
      }
    }
  }

  // sets a random brain
  randomBrain(mutationRate) {
    this.brain = new DNA(mutationRate, this.len);
  }

  // sets an existing brain
  setBrain(brain, mutationRate) {
    if (this.len != brain.length) {
      this.brain = new DNA(mutationRate, this.len);
      this.brain.inject(brain.genes);
    } else {
      this.brain = brain;
    }
  }

  // sets the step count
  setStep(step) {
    this.step = step;
  }

  // displays dot
  show() {
    stroke(0);
    if (this.dead) {
      fill(0, 255, 255);
    } else {
      fill(255);
    }
    circle(this.pos.x, this.pos.y, 4);
  }
}
