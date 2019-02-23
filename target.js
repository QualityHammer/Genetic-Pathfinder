class Target {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.r = 5;
  }

  checkInter(s) {
    return (this.pos.dist(s.pos) < this.r);
  }

  move(x, y) {
    this.pos.set(x, y);
  }

  show() {
    fill(255, 255, 0);
    circle(this.pos.x, this.pos.y, this.r);
  }
}
