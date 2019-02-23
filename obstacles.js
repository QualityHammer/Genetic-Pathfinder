class Swinger {
  constructor(x, y, r) {
    // position and velocity vectors
    this.pos = createVector(x, y);
    this.vel = createVector(5, 5);
    // randomize vectors
    if (random(1) < 0.5) {
      this.vel.set(-this.vel.x, this.vel.y);
    }
    if (random(1) < 0.5) {
      this.vel.set(this.vel.x, -this.vel.y);
    }
    // starting vectors
    this.startPos =this.pos.copy() ;
    this.startVel = this.vel.copy();
    // radius
    this.r = r;
  }

  // returns true if a dot is intersecting with this
  checkInter(s) {
    return (this.pos.dist(s.pos) < this.r);
  }

  // resets the position and velocity after every generation
  reset() {
    this.pos.set(this.startPos);
    this.vel.set(this.startVel);
  }

  show() {
    stroke(1);
    strokeWeight(3);
    fill(0, 0, 255);
    circle(this.pos.x, this.pos.y, this.r);
  }

  update() {
    // physics
    this.pos.add(this.vel);
    if (this.pos.x + this.r > width || this.pos.x - this.r < 0) {
      this.vel.set(-this.vel.x, this.vel.y);
    } else if (this.pos.y + this.r > width || this.pos.y - this.r < 0) {
      this.vel.set(this.vel.x, -this.vel.y);
    }
  }
}
