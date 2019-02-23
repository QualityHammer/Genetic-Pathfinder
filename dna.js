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

  // injects genes
  inject(genes) {
    for (var i = 0; i < genes.length; i++) {
      this.genes[i] = genes[i].copy();
    }
  }

  // mutates genes based on mutation rate
  mutate() {
    for (var i = 0; i < this.len; i++) {
      if (random(1) < this.mRate) {
        this.genes[i].set(random(-1, 1), random(-1, 1));
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
