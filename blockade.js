class Rectangle {
  constructor(x1, y1, x2, y2) {
    this.left = x1;
    this.top = y1;
    this.right = x2;
    this.bottom = y2;
  }

  checkInter(s) {
    return (s.pos.x < this.right && s.pos.x > this.left && s.pos.y > this.top && s.pos.y < this.bottom);
  }

  show() {
    fill(255, 0, 0);
    rectMode(CORNERS);
    rect(this.left, this.top, this.right, this.bottom);
  }
}
