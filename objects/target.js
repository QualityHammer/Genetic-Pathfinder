class Target {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.r = 5;
  }

  // checks if a searcher is intersecting
  checkInter(s) {
    return (this.pos.dist(s.pos) < this.r);
  }

  // moves the target to a new pos
  move(x, y) {
    this.pos.set(x, y);
  }

  // shows target
  show() {
    fill(255, 255, 0);
    circle(this.pos.x, this.pos.y, this.r);
  }
}
