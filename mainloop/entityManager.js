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
// Our board, maybe not the best location, can be done better
var board = [[4,4,0,0,0,0,0,0,4,4],
             [4,1,0,1,0,0,1,0,1,4],
             [0,0,0,0,0,0,0,0,0,0],
             [0,1,0,1,0,0,1,0,1,0],
             [0,0,0,0,2,2,0,0,0,0],
             [0,0,0,0,2,2,0,0,0,0],
             [0,1,0,1,0,0,1,0,1,0],
             [0,0,0,0,0,0,0,0,0,0],
             [4,1,0,1,0,0,1,0,1,4],
             [4,4,0,0,0,0,0,0,4,4]]

var entityManager = {
// Private vars
_board: null,
_players : [],
_powerups : [],
_bombs : [],
_fires : [],
// Creates a new board
_createBoard(board) {
  this._board = new Board({board});
},

// Adds a human player
_addPlayer : function (x,y,keycodes,color,sprite,id) {
  var player1 = new Character({
    cx: this._board.xStep * x,
    cy: this._board.xStep * y,
    keyUp: keycodes[0],
    keyDown: keycodes[1],
    keyLeft: keycodes[2],
    keyRight: keycodes[3],
    keyFire: keycodes[4],
    colour: color,
    sprite: sprite,
    name: "Player " + ++id
  });
  this._players.push(player1);
},

// Adds a computer player
_addComputerPlayer : function (x,y,color,sprite,id) {
    var player1 = new Character({
        cx: this._board.xStep * x,
        cy: this._board.xStep * y,
        colour: color,
        sprite: sprite,
        name: "Computer " + ++id,
        computer: true,
    });
    this._players.push(player1);
},

// Returns players
getPlayers: function () {
    return this._players;
},
// PUBLIC METHODS

// A special return value, used by other objects,
// to request the blessed release of death!
//

KILL_ME_NOW : -1,

deferredSetup : function () {
    this._categories = [this._powerups, this._bombs, this._players, this._fires];
},

// Reinints the entity manager
restartEntityManager: function () {
    this._players = [];
    this._powerups = [];
    this._bombs = [];
    this._fires = [];
    this._categories = [this._powerups, this._bombs, this._players, this._fires];
},
// Inits the entity manager
init: function() {
    this._createBoard(board);
},

// Inits a player
initPlayer(x,y,keycode,color,image,id) {
    this._addPlayer(x,y,keycode,color,image,id);

},

// Inits a computer
initAI(x,y,color,image,id) {
    this._addComputerPlayer(x,y,color,image,id);
},

// spawns a powerup
spawnPowerup(descr) {
    this._powerups.push(new Powerup(descr));
},


// Handles an exploding bomb
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


    fire.explodingBomb(bomb, this._board.xStep, this._board.yStep);
    this._fires.push(fire);
},

// Tries to spawn bomb on the board
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

// Gets a valid location for the bomb
getValidBombCenter: function(posX, posY) {
    return this._board.getBrickCenterAt(posX, posY);
    //return false;
},

// Updates all in the entity manager
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
              const players = entityManager.getPlayers();
              const alive = players.filter(player => {
                if(player.lives > 0) return player
              });
              // If less then 2 people are alive end the game
              if(alive.length < 2) gameOver(aCategory[i].name);
          }
          aCategory.splice(i,1);
      }
      else {
          ++i;
      }
    }
  }
},

// Renders all in the entity manager
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
