class Searcher {
  constructor(pos, len) {
    this.pos = createVector(pos.x, pos.y);
    this.acc = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.brain = null;
    this.len = len;
    this.fitness = 0;

    this.dead = false;
    this.goal = false;
  }

  // returns the fitness value of the genes
  getFitness(target) {
    let fit = Math.pow(1 / this.pos.dist(target), 2);
    if (this.dead) {
      fit /= 1000;
    }
    return fit;
  }

  // moves the searcher one step
  move(step, target) {
    if (!this.dead && !this.goal) {
      this.acc = this.brain.genes[step];
      this.vel.add(this.acc);
      this.vel.limit(5);
      this.pos.add(this.vel);
      if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0) {
        this.dead = true;
      }
      if (floor(this.pos.x) == floor(target.x) && floor(this.pos.y) == floor(target.y)) {
        this.goal = true;
      }
    }
  }

  // sets a random brain
  randomBrain(mutationRate) {
    this.brain = new DNA(mutationRate, this.len);
  }

  // sets an existing brain
  setBrain(brain) {
    this.brain = brain;
  }

  // displays dot
  show() {
    fill(255);
    circle(this.pos.x, this.pos.y, 4);
  }
}
