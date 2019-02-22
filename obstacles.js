class Swinger {
  constructor(x, y, r) {
    this.startPos = createVector(x, y);
    this.pos = createVector(x, y);
    this.vel = createVector(5, 5);
    if (random(1) < 0.5) {
      this.vel.set(-this.vel.x, this.vel.y);
    }
    if (random(1) < 0.5) {
      this.vel.set(this.vel.x, -this.vel.y);
    }
    this.startVel = this.vel.copy();
    this.r = r;
  }

  checkInter(s) {
    return (this.pos.dist(s.pos) < this.r);
  }

  reset() {
    this.pos.set(this.startPos);
    this.vel.set(this.startVel);
  }

  show() {
    fill(0, 0, 255);
    circle(this.pos.x, this.pos.y, this.r);
  }

  update() {
    this.pos.add(this.vel);
    if (this.pos.x + this.r > width || this.pos.x - this.r < 0) {
      this.vel.set(-this.vel.x, this.vel.y);
    } else if (this.pos.y + this.r > width || this.pos.y - this.r < 0) {
      this.vel.set(this.vel.x, -this.vel.y);
    }
  }
}
