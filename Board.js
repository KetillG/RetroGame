// ======
// BOARD
// ======

"use strict";

function Board(descr) {

  // vars used to determine scaling
  const tileBoard = descr.board;
  const boardSize = 7;
  const xStep = consts.LOGICAL_WIDTH / boardSize;
  const yStep = consts.LOGICAL_HEIGHT / boardSize;

  for(var i = 0; i < tileBoard.length; i++) {
    for(var j = 0; j < tileBoard[i].length; j++) {
      // Changes numbers to bricks
      tileBoard[i][j] = new Brick({
        id: tileBoard[i][j],
        x: (i + 1) * xStep,
        y: (j + 1) * yStep,
      })
    }
    // Adds left/right border
    tileBoard[i].unshift(new Brick({id:1,x:0,y:(i + 1) * xStep}));
    tileBoard[i].push(new Brick({id:1,x:(tileBoard.length + 1) * yStep,y:(i + 1) * yStep}));
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
    }));
    bottomBorder.push(new Brick({
      id: 1,
      x: i * xStep,
      y: (tileBoard.length + 1) * yStep,
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
Board.prototype.moveOnBoard = function(x, y, newX, newY){
  return [newX, newY];
}

Board.prototype.getBrickAt = function (x, y) {
  //temp brick
  return new Brick({id:1,x:i * xStep,y:0});
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
