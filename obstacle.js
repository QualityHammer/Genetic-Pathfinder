const obstSpeed = 10;

class Swinger {
  constructor(x, y, r, direct) {
    // position and velocity vectors
    this.pos = createVector(x, y);
    this.vel = direct.copy();
    // limit speed
    if (abs(this.vel.x) > obstSpeed || abs(this.vel.y) > obstSpeed) {
      let mg = max(abs(this.vel.x), abs(this.vel.y)) / obstSpeed;
      this.vel.div(mg);
    }
    // starting vectors
    this.startPos =this.pos.copy() ;
    this.startVel = this.vel.copy();
    // radius
    this.r = r;
  }

  // returns true if a dot is intersecting with this
  checkInter(s) {
    return ((this.pos.dist(s.pos) < this.r) && !s.goal);
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
