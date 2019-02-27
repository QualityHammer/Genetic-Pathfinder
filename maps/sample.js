// sample level
class Easy {
  constructor() {
    this.blocks = [];
    this.swings = [];
    this.target = new Target(400, 100);
    this.start = createVector(400, 700);
    this.createBlocks();
    this.createSwings();
  }

  createBlocks() {
    this.blocks.push(new Rectangle(50, 200, 325, 325));
    this.blocks.push(new Rectangle(475, 200, 750, 325));
    this.blocks.push(new Rectangle(125, 425, 675, 550));
  }

  createSwings() {
    this.swings.push(new Swinger(677, 273, 45, createVector(-10, 1.73)));
    this.swings.push(new Swinger(106, 273, 45, createVector(10, 1.316)));
    this.swings.push(new Swinger(190, 520, 45, createVector(10, 1.612)));
    this.swings.push(new Swinger(627, 520, 45, createVector(-10, 1.91)));
    this.swings.push(new Swinger(400, 400, 14, createVector(-2.827, -10)));
    this.swings.push(new Swinger(447, 400, 14, createVector(3.333, -10)));
  }

  getBlocks() {
    return this.blocks;
  }

  getStart() {
    return this.start;
  }

  getSwings() {
    return this.swings;
  }

  getTarget() {
    return this.target.pos;
  }
}
