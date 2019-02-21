class DNA {
  constructor(mutationRate, len) {
    this.mRate = mutationRate;
    this.len = len;
    this.genes = this.randomizeGenes();
  }

  // returns a clone of the DNA
  clone() {
    let n = new DNA(this.mRate, this.len);
    n.genes = this.genes.slice();
    return n;
  }

  // mutates genes based on mutation rate
  mutate() {
    for (var i = 0; i < this.len; i++) {
      if (random(1) < this.mRate) {
        this.genes[i] = p5.Vector.random2D();
      }
    }
  }

  // returns a list of
  randomizeGenes() {
    var g = [];
    for (var i = 0; i < this.len; i++) {
      let vec = p5.Vector.random2D();
      g.push(vec);
    }
    return g;
  }
}
