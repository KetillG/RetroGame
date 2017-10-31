// ======
// BOARD
// ======

"use strict";

function Board(descr) {

  var tileBoard = descr.board;
  var boardSize = 7;

  const xStep = consts.LOGICAL_WIDTH / boardSize;
  const yStep = consts.LOGICAL_HEIGHT / boardSize;

  for(var i = 0; i < tileBoard.length; i++) {
    for(var j = 0; j < tileBoard[i].length; j++) {
      // Changes numbers to tiles
      // tileBoard[i][j] = new Brick(tileBoard[i][j]);
      tileBoard[i][j] = new Brick({
        id: tileBoard[i][j],
        x: (i + 1) * xStep,
        y: (j + 1) * yStep,
      })
    }
    // Adds left/right border
    tileBoard[i].unshift(new Brick({id:1,x:i * xStep,y:0}));
    tileBoard[i].push(new Brick({id:1,x:i * xStep,y:tileBoard.length * yStep}));
  }
  // Inits walls on top and bot border of game board
  var topBotBorder = Array(tileBoard[0].length).fill(new Brick({id:1,}));
  // Adds top/bot border
  tileBoard.unshift(topBotBorder);
  tileBoard.push(topBotBorder);
  // Common inherited setup logic from Entity
  this.setup(descr);

}

Board.prototype = new Entity();

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
