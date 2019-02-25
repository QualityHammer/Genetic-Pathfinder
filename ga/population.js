var stepSize = 20;
var incrementFreq = 3;

class Population {
  constructor(start, target) {
    // mutation rate
    this.mRate = 0.01;
    // population size
    this.size = 1000;
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
    this.maxStep = 50;
    // flag
    this.limitSteps = false;
  }

  // calculates fitness for all DNA in population
  calcFitness() {
    for (let s of this.pop) {
      s.fitness = s.getFitness(this.target, this.maxStep);
    }
    this.checkGoal();
    var best = this.getBest();
    console.log(best.fitness, best.step);
  }

  // checks if the whole population is dead
  checkAllDead() {
    var amount = 0;
    for (let s of this.pop) {
      if(s.dead) {
        amount += 1;
      }
    }
    return (amount == this.size);
  }

  // checks every member of the population for blockade intersections
  checkBounds(blocks, swings) {
    for (let s of this.pop) {
      // check wall intersections
      for (let block of blocks) {
        if (block.checkInter(s)) {
          s.dead = true;
          s.setStep(this.step);
        }
      }
      // check swing intersections
      for (let swing of swings) {
        if (swing.checkInter(s)) {
          s.dead = true;
          s.setStep(this.step);
        }
      }
    }
  }

  // limits the lifespan if any has reached the goal
  checkGoal() {
    for (let s of this.pop) {
      if (s.goal && s.step < this.maxStep + 1) {
        this.maxStep = s.step + 1;
        this.limitSteps = true;
      }
    }
  }

  // gets best fitness value and returns the best searcher
  getBest() {
    var top = 0;
    let best;
    for (let s of this.pop) {
      if (s.fitness > top) {
        top = s.fitness;
        best = s;
      }
    }
    return best;
  }

  // moves the whole population
  moveAll(swings) {
    if (this.step < this.maxStep) {
      for (let s of this.pop) {
        s.move(this.step, this.target);
      }
      this.step += 1;
    } else {
      // if the lifespan has ended, make a new generation
      this.step = 0;
      this.calcFitness();
      this.selection();
      this.newGeneration();
      // reset swings position and velocity
      for (let swing of swings) {
        swing.reset();
      }
    }
  }

  // creates a new generation using cloning and mutation
  newGeneration() {
    // increases the step size every certain amount of genertaions
    if (this.generations % incrementFreq == 0 && !this.limitSteps) {
      this.maxStep += stepSize;
    }
    // clones the best one into the new generation
    let best = new Searcher(this.start, this.maxStep);
    best.best = true;
    let brain = this.getBest().brain;
    best.setBrain(brain, this.mRate);
    this.pop[this.size - 1] = best;
    // generation creation
    for (var i = 0; i < this.size - 1; i++) {
      // gets a random DNA from the pool
      var index = floor(random(this.pool.length));
      // cretaes a clone and mutates it
      let brain = this.pool[index].brain.clone();
      let s = new Searcher(this.start, this.maxStep);
      s.setBrain(brain, this.mRate);
      s.brain.mutate();
      this.pop[i] = s;
    }
    this.generations += 1;
  }

  // Creates a brand new randomized population
  newPop() {
    for (var i = 0; i < this.size; i++) {
      let n = new Searcher(this.start, this.maxStep);
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
    var maxFit = this.getBest().fitness;
    // normalize fitness and add to pool
    for (let s of this.pop) {
      var fit = s.fitness / maxFit;
      var chance = floor(Math.pow(fit * 5, 2));
      for (var i = 0; i < chance; i++) {
        this.pool.push(s);
      }
    }
  }
}
