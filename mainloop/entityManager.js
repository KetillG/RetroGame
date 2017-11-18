/*

entityManager.js

A module which handles arbitrary entity-management for "Asteroids"


We create this module as a single global object, and initialise it
with suitable 'data' and 'methods'.

"Private" properties are denoted by an underscore prefix convention.

*/


"use strict";


// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/



var board = [[4,4,0,0,0,0,0,0,0,0],
             [4,1,0,1,0,0,1,0,1,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,1,0,1,0,0,1,0,1,0],
             [0,0,0,0,2,2,0,0,0,0],
             [0,0,0,0,2,2,0,0,0,0],
             [0,1,0,1,0,0,1,0,1,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,1,0,1,0,0,1,0,1,4],
             [0,0,0,0,0,0,0,0,4,4]]
function scalePlayers(player){
    var maxWidth = 0.8*canvas.width/board[0].length;
    var maxHeight = 0.8*canvas.height/board.length;

    var width = player.width;
    var height = player.height;

    var ratioWidth = maxWidth/width;
    var ratioHeight = maxHeight/height;

    $(player).css("width", maxWidth*ratioWidth);
    $(player).css("height", maxHeight*ratioHeight);
}

var entityManager = {

_board: null,
_players : [],
_powerups : [],
_bombs : [],
_fires : [],

_createBoard(board) {
  this._board = new Board({board});
},

_addPlayers : function () {
  var player1 = new Character({
    cx: this._board.xStep * 10.5,
    cy: this._board.xStep * 10.5,
    keyUp: 38,
    keyDown: 40,
    keyLeft: 37,
    keyRight: 39,
    keyFire: 'O'.charCodeAt(0),
    colour: "Red",
    sprite: new Sprite(g_images.catBlack),
    name: "Player 1"
  });
  var player2 = new Character({
    cx: this._board.xStep * 1.5,
    cy: this._board.yStep * 1.5,
    keyUp: 'W'.charCodeAt(0),
    keyDown: 'S'.charCodeAt(0),
    keyLeft: 'A'.charCodeAt(0),
    keyRight: 'D'.charCodeAt(0),
    keyFire: 220,
    colour: "Black",
    sprite: new Sprite(g_images.catWhite),
    name: "Player 2"
  });
  this._players.push(player1);
  this._players.push(player2);
},

getPlayers: function () {
    return this._players;
},

_addComputerPlayer : function () {
    var player1 = new Character({
        cx: this._board.xStep * 10.5,
        cy: this._board.xStep * 10.5,
        colour: "Red",
        sprite: new Sprite(g_images.catBlack),
        name: "Computer 1",
        computer: true,
      });
      var player2 = new Character({
        cx: this._board.xStep * 1.5,
        cy: this._board.yStep * 1.5,
        keyUp: 'W'.charCodeAt(0),
        keyDown: 'S'.charCodeAt(0),
        keyLeft: 'A'.charCodeAt(0),
        keyRight: 'D'.charCodeAt(0),
        keyFire: 220,
        colour: "Black",
        sprite: new Sprite(g_images.catWhite),
        name: "Player 2"
      });
      this._players.push(player1);
      this._players.push(player2);
},

// PUBLIC METHODS

// A special return value, used by other objects,
// to request the blessed release of death!
//

KILL_ME_NOW : -1,

deferredSetup : function () {
    this._categories = [this._powerups, this._bombs, this._players, this._fires];
},
restartEntityManager: function () {
    this._players = [];
    this._powerups = [];
    this._bombs = [];
    this._fires = [];
    this._categories = [this._powerups, this._bombs, this._players, this._fires];
},
init: function() {
    this._createBoard(board);
    //this._createBoard(board);
},

initPlayers() {
    this._addPlayers();
},

initSoloPlayer() {
    this._addComputerPlayer();
},

spawnPowerup(descr) {
    this._powerups.push(new Powerup(descr));
},

bombExplode(bomb) {
    // Remove bomb from existance
    spatialManager.unregister(bomb);
    const index = this._bombs.indexOf(bomb);
    this._bombs.splice(index, 1);

    const brickWidth = this._board.xStep;

    // Create fire
    const fire = new Fire({
        sprite: new Sprite(g_images.explosion),
        xStep: this._board.xStep,
        yStep: this._board.yStep,
    });


    //sprite: new Sprite(g_images.catWhite),

    fire.explodingBomb(bomb, this._board.xStep, this._board.yStep);
    this._fires.push(fire);
},

trySpawnBomb(descr) {
    // Check if bomb already in place at location
    for(var i = 0; i < this._bombs.length; i++) {
        var temp = this._bombs[i];
        if(temp.cx === descr.cx && temp.cy === descr.cy) {
            return null;
        }
    }
    const bomb = new Bomb({
        ...descr,
        radius: 0.5 * consts.LOGICAL_WIDTH / this._board.boardsize,
        sprite: new Sprite(g_images.bombNew),
    });
    this._bombs.push(bomb);
    return bomb;
},

getValidBombCenter: function(posX, posY) {
    return this._board.getBrickCenterAt(posX, posY);
    //return false;
  },

update: function(du) {

  this._board.update(du);
  for (var c = 0; c < this._categories.length; ++c) {

    var aCategory = this._categories[c];
    var i = 0;

    while (i < aCategory.length) {

      var status = aCategory[i].update(du);
      if (status === this.KILL_ME_NOW) {
          // remove the dead guy, and shuffle the others down to
          // prevent a confusing gap from appearing in the array
          if(aCategory[i].constructorType === 'Character') {
              gameOver(aCategory[i].name);
          }
          aCategory.splice(i,1);
      }
      else {
          ++i;
      }
    }
  }
},

getBrick: function(x,y) {
  return this._board.getBrickAt(x,y);
},

render: function(ctx) {

    this._board.render(ctx);

    var debugX = 10, debugY = 100;

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];

        for (var i = 0; i < aCategory.length; ++i) {

            aCategory[i].render(ctx);

        }
        debugY += 10;
    }
}

}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();
