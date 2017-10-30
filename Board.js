// ======
// BOARD
// ======

"use strict";

function Board(descr) {

  var tileBoard = descr.board;
  var boardSize = 10;

  const xStep = consts.LOGICAL_WIDTH / boardSize;
  const yStep = consts.LOGICAL_HEIGHT / boardSize;

  for(var i = 0; i < tileBoard.length; i++) {
    for(var j = 0; j < tileBoard[i].length; j++) {
      // Changes numbers to tiles
      // tileBoard[i][j] = new Brick(tileBoard[i][j]);
      tileBoard[i][j] = new Brick({
        cx: i * xStep,
        cy: j * yStep,
      })
    }
    // Adds left/right border
    tileBoard[i].unshift(new Brick(1));
    tileBoard[i].push(new Brick(1));
  }
  // Inits walls on top and bot border of game board
  var topBotBorder = Array(tileBoard[0].length).fill(new Brick(1));
  // Adds top/bot border
  tileBoard.unshift(topBotBorder);
  tileBoard.push(topBotBorder);
  // Common inherited setup logic from Entity
  this.setup(descr);

}

Board.prototype = new Entity();

Board.prototype.update = function (du) {

}

Board.prototype.render = function (ctx) {

}
