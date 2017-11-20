// ======
// BOARD
// ======

"use strict";

function Board(descr) {
  // Adds board to spatial manager
  this._spatialID = spatialManager.getNewSpatialID();
  spatialManager.register(this);
  // Adds a type that can be queried be other entites to know its type
  this['constructorType'] = 'Board'

  // vars used to determine scaling
  const arrCopy = descr.board.map(line => {
    return line.slice();
  });
  descr.board = arrCopy;
  const tileBoard = descr.board;
  const boardSize = tileBoard.length + 2;
  const xStep = consts.LOGICAL_WIDTH / boardSize;
  const yStep = consts.LOGICAL_HEIGHT / boardSize;

  // Adds step to the object
  this['xStep'] = xStep;
  this['yStep'] = yStep;
  this['boardsize'] = boardSize;

  // Creates the actual board
  for(var i = 0; i < tileBoard.length; i++) {
    for(var j = 0; j < tileBoard[i].length; j++) {
      // Randomly creates board
      let blockID = tileBoard[i][j];
      if( tileBoard[i][j] === 0 ) {
        const BLOCK_SPAWN_CHANCE = 0.75
        blockID = Math.random() < BLOCK_SPAWN_CHANCE ? 2 : 0;
      }
      // Creates brick from id
      tileBoard[i][j] = new Brick({
        id: blockID,
        x: (j + 1) * yStep,
        y: (i + 1) * xStep,
        width: xStep,
        height: yStep,
      })
    }
    // Adds left/right border
    tileBoard[i].unshift(new Brick({id:1,x:0,y:(i + 1) * xStep,width: xStep,height: yStep}));
    tileBoard[i].push(new Brick({id:1,x:(tileBoard.length + 1) * yStep,y:(i + 1) * yStep,width: xStep,height: yStep}));
  }

  // Top/bot border
  const topBorder = [];
  const bottomBorder = [];
  // Fills the array with solid bricks
  for(var i = 0;  i < tileBoard.length + 2;i++) {
    topBorder.push(new Brick({
      id: 1,
      x: i * xStep,
      y: 0,
      width: xStep,
      height: yStep,
    }));
    bottomBorder.push(new Brick({
      id: 1,
      x: i * xStep,
      y: (tileBoard.length + 1) * yStep,
      width: xStep,
      height: yStep,
    }));
  }
  // Adds top/bot border
  tileBoard.unshift(topBorder);
  tileBoard.push(bottomBorder);

  // Setup logic
  for (var property in descr) {
      this[property] = descr[property];
  }
}

// Send in a position and get the brick at that position
Board.prototype.getBrickAtWithoutScaling = function (x, y) {
  const i = Math.floor(y / ( this.yStep));
  const j = Math.floor(x / ( this.xStep));
  try {
    return this.board[i][j];
  } catch (e) {
    return null;
  }
}
// Returns the center of a brick at a certain position
Board.prototype.getBrickCenterAt = function (x, y) {
  const i = Math.floor(x / ( this.xStep));
  const j = Math.floor(y / ( this.yStep));
  try {
    return {
      cx: i * this.xStep + this.xStep / 2,
      cy: j * this.yStep + this.yStep / 2,
    };
  } catch (e) {
    return null;
  }
}
// Checks if a non walkable brick is at position
Board.prototype.positionOccupied = function (x, y) {
  return !this.getBrickAtWithoutScaling(x,y).isWalkable();
}

// Tries to explode brick at position
Board.prototype.tryExplodeBrick = function (x, y) {
  const i = Math.floor(y / ( this.yStep));
  const j = Math.floor(x / ( this.xStep));
  if(this.board[i][j].isBreakable() && !this.board[i][j].isBroken()) {
    this.board[i][j].break();
    this.dropPowerup(i, j);
    return true;
  }
  return false;
}

// Drops powerup on board
Board.prototype.dropPowerup = function (i, j) {
  if(Math.random() < 0.7) {
      const powerupType = Math.floor(Math.random() * 3);
      entityManager.spawnPowerup({cx:j * this.xStep + this.xStep / 2,
                                  cy:i * this.yStep + this.yStep / 2,
                                  id:powerupType});
  }
};

// Updates board
Board.prototype.update = function (du) {
  for(var i = 0; i < this.board.length; i++) {
    for(var j = 0; j < this.board[i].length; j++) {
      this.board[i][j].update(du);
    }
  }
}

// Renders board
Board.prototype.render = function (ctx) {
  for(var i = 0; i < this.board.length; i++) {
    for(var j = 0; j < this.board[i].length; j++) {
      this.board[i][j].render(ctx);
    }
  }
}
