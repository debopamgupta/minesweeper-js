const w = 50;

let grid;
let cols;
let rows;
let mineCount = 0;
let revealCount = 0;

function make2DGrid(rows, cols) {
  let grid = new Array(rows);
  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(cols);
  }
  return grid;
}

function mousePressed() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
        grid[i][j].reveal();
        if (grid[i][j].mine) {
          gameOver();
        }
        if (revealCount === rows * cols - mineCount) {
          createElement("h2", "You Win!");
        }
      }
    }
  }
}

function gameOver() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j].revealed = true;
    }
  }
  createElement("h2", "Game Over");
  createElement("button", "Start Over").mousePressed(() => {
    console.log("Starting over");
    clear();
    setup();
  });
}

function setup() {
  createCanvas(600, 600);

  background(255);
  stroke(0);
  strokeWeight(1);
  noFill();

  cols = floor(width / w);
  rows = floor(height / w);

  grid = make2DGrid(rows, cols);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const neighbourCt = grid[i][j].countNeighbours();
      if (neighbourCt === -1) {
        mineCount++;
      }
    }
  }
}

function draw() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j].show();
    }
  }
}
