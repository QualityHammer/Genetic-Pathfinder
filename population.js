var maxStep = 200;

class Population {
  constructor(start, target) {
    // mutation rate
    this.mRate = 0.01;
    // population size
    this.size = 500;
    this.pop = [];
    this.pool = [];
    // starting vector
    this.start = start;
    // target vector
    this.target = target;
    // current generation
    this.generations = 0;
    this.finished = false;

    // current step
    this.step = 0;
  }

  // calculates fitness for all DNA in population
  calcFitness() {
    for (let s of this.pop) {
      s.fitness = s.getFitness(this.target);
    }
  }

  checkBounds(blocks) {
    for (let s of this.pop) {
      for (let block of blocks) {
        if (block.checkInter(s)) {
          s.dead = true;
        }
      }
    }
  }

  // moves the whole population
  moveAll() {
    if (this.step < maxStep) {
      for (let s of this.pop) {
        s.move(this.step, this.target);
      }
      this.step += 1;
    } else {
      this.step = 0;
      this.calcFitness();
      this.selection();
      this.newGeneration();
    }
  }

  // creates a new generation using cloning and mutation
  newGeneration() {
    for (var i = 0; i < this.size; i++) {
      // gets a random DNA from the pool
      var index = floor(random(this.pool.length));
      // cretaes a clone and mutates it
      let brain = this.pool[index].brain.clone();
      brain.mutate();
      let s = new Searcher(this.start, maxStep);
      s.setBrain(brain);
      this.pop[i] = s;
    }
    this.generations += 1;
  }

  // Creates a brand new randomized population
  newPop() {
    for (var i = 0; i < this.size; i++) {
      let n = new Searcher(this.start, maxStep);
      n.randomBrain(this.mRate);
      this.pop.push(n);
    }
    this.generations += 1;
  }

  // shows the whole Population
  showAll() {
    for (let s of this.pop) {
      s.show();
    }
  }

  // fills the selection pool exponentially based on higher fitness values
  selection() {
    // clears pool
    this.pool.length = 0;
    // gets the max fitness value
    var maxFit = 0;
    for (let s of this.pop) {
      if (s.fitness > maxFit) {
        maxFit = s.fitness;
      }
    }
    // normalize fitness and add to pool
    for (let s of this.pop) {
      var fit = s.fitness / maxFit;
      var chance = floor(Math.pow(fit * 10, 2));
      for (var i = 0; i < chance; i++) {
        this.pool.push(s);
      }
    }
  }
}
