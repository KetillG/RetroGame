// ======
// BOARD
// ======

"use strict";

function Board(descr) {

  tileBoard = descr.board;
  // Inits walls on top and bot border of game board
  topBotBorder = Array(tileBoard.length[0]).fill(new Brick(1));

  for(var i = 0; i < tileBoard.length; i++) {
    for(var j = 0; j < tileBoard.length[0]; j++) {
      // Changes numbers to tiles
      tileBoard[i][j] = new Brick(tileBoard[i][j]);
    }
    // Adds left/right border
    tileBoard[i].unshift(new Brick(1));
    tileBoard[i].push(new Brick(1));
  }
  // Adds top/bot border
  tileBoard[i].unshift(topBotBorder);
  tileBoard[i].push();

  // Common inherited setup logic from Entity
  this.setup(descr);

}

Board.prototype = new Entity();

Board.prototype.update = function (du) {

}

Board.prototype.render = function (ctx) {

}
