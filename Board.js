// ======
// BOARD
// ======

"use strict";

function Board(descr) {

  this._spatialID = spatialManager.getNewSpatialID();
  spatialManager.register(this);
  spatialManager.registerBoard(this);

  // vars used to determine scaling
  const tileBoard = descr.board;
  const boardSize = tileBoard.length + 2;
  const xStep = consts.LOGICAL_WIDTH / boardSize;
  const yStep = consts.LOGICAL_HEIGHT / boardSize;

  // Adds step to the object
  this['xStep'] = xStep;
  this['yStep'] = yStep;

  for(var i = 0; i < tileBoard.length; i++) {
    for(var j = 0; j < tileBoard[i].length; j++) {
      // Changes numbers to bricks
      tileBoard[i][j] = new Brick({
        id: tileBoard[i][j],
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

/**
  * @param {double} x old x position
  * @param {double} y old y position
  * @param {double} newX updated x position
  * @param {double} newY updated y position
  * @return An array with the updated positions for the character
 */

Board.prototype.getBrickAt = function (x, y) {
  const i = Math.floor(y / ( this.yStep * consts.RENDER_SCALE_WIDTH));
  const j = Math.floor(x / ( this.xStep * consts.RENDER_SCALE_HEIGHT));
  try {
    return this.board[i][j];
  } catch (e) {
    return null;
  }
}

Board.prototype.getBrickAtWithoutScaling = function (x, y) {
  const i = Math.floor(y / ( this.yStep));
  const j = Math.floor(x / ( this.xStep));
  try {
    return this.board[i][j];
  } catch (e) {
    return null;
  }
}

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

Board.prototype.positionOccupied = function (x, y) {
  return !this.getBrickAtWithoutScaling(x,y).isWalkable();
}

Board.prototype.update = function (du) {

}

Board.prototype.render = function (ctx) {
  for(var i = 0; i < this.board.length; i++) {
    for(var j = 0; j < this.board[i].length; j++) {
      this.board[i][j].render(ctx);
    }
  }
}
