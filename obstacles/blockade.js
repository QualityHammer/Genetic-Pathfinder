class Rectangle {
  constructor(x1, y1, x2, y2) {
    // position fixing
    if (x1 < x2) {
      this.left = x1;
      this.right = x2;
    } else {
      this.left = x2;
      this.right = x1;
    }
    if (y1 < y2) {
      this.top = y1;
      this.bottom = y2;
    } else {
      this.top = y2;
      this.bottom = y1;
    }
  }

  // returns true if a dot is intersecting with this
  checkInter(s) {
    return ((s.pos.x < this.right && s.pos.x > this.left && s.pos.y > this.top && s.pos.y < this.bottom) && !s.goal);
  }

  // shows box
  show() {
    noStroke();
    fill(255, 0, 0);
    rectMode(CORNERS);
    rect(this.left, this.top, this.right, this.bottom);
  }
}
