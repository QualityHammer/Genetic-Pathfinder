class Rectangle {
  constructor(x1, y1, x2, y2) {
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

  checkInter(s) {
    return (s.pos.x < this.right && s.pos.x > this.left && s.pos.y > this.top && s.pos.y < this.bottom);
  }

  show() {
    noStroke();
    fill(255, 0, 0);
    rectMode(CORNERS);
    rect(this.left, this.top, this.right, this.bottom);
  }
}