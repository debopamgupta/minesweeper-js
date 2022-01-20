function Cell(i, j, w) {
  this.i = i;
  this.j = j;
  this.x = i * w;
  this.y = j * w;
  this.w = w;
  this.revealed = false;
  this.neighbourCount = 0;
  if (random(1) < 0.1) {
    this.mine = true;
  } else {
    this.mine = false;
  }

  this.show = () => {
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.w);

    if (this.revealed) {
      if (this.mine) {
        noStroke();
        fill(51);
        rect(this.x, this.y, this.w, this.w);
        fill(0);
        ellipse(this.x + this.w / 2, this.y + this.w / 2, this.w / 2);
      } else {
        fill(127);
        rect(this.x, this.y, this.w, this.w);
        noStroke();
        textAlign(CENTER);
        textSize(24);
        fill(0);
        if (this.neighbourCount > 0) {
          text(
            this.neighbourCount,
            this.x + this.w * 0.5,
            this.y + this.w * 0.5
          );
        }
      }
    }
  };

  this.countNeighbours = () => {
    if (this.mine) {
      this.neighbourCount = -1;
      return this.neighbourCount;
    }
    let total = 0;
    for (let xoff = -1; xoff <= 1; xoff++) {
      for (let yoff = -1; yoff <= 1; yoff++) {
        let i = this.i + xoff;
        let j = this.j + yoff;
        if (i > -1 && i < rows && j > -1 && j < cols) {
          let neighbour = grid[i][j];
          if (neighbour.mine) {
            total++;
          }
        }
      }
    }
    this.neighbourCount = total;
    return this.neighbourCount;
  };

  this.contains = (x, y) => {
    return (
      x >= this.x && x <= this.x + this.w && y >= this.y && y <= this.y + this.w
    );
  };

  this.floodFill = () => {
    this.revealed = true;

    for (let xoff = -1; xoff <= 1; xoff++) {
      for (let yoff = -1; yoff <= 1; yoff++) {
        if (this.i + xoff < 0 || this.i + xoff > cols - 1) {
          continue;
        }

        if (this.j + yoff < 0 || this.j + yoff > rows - 1) {
          continue;
        }

        let neighbour = grid[this.i + xoff][this.j + yoff];
        if (!neighbour.revealed) neighbour.reveal();
      }
    }
  };

  this.reveal = () => {
    if (this.revealed !== true) {
      this.revealed = true;
      revealCount++;
    }
    if (this.neighbourCount === 0) {
      this.floodFill();
    }
  };
}
