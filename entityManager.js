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
var board = [[0,0,0,0,0,0,0,0,0,0],
             [0,1,0,1,0,0,1,0,1,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,1,0,1,0,0,1,0,1,0],
             [0,0,0,0,2,2,0,0,0,0],
             [0,0,0,0,2,2,0,0,0,0],
             [0,1,0,1,0,0,1,0,1,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,1,0,1,0,0,1,0,1,0],
             [0,0,0,0,0,0,0,0,0,0]]

var entityManager = {

_board: null,
_players : [],
_powerups : [],
_bombs : [],
_fires : [],

_createBoard(board) {
  this._board = new Board({board});
},

_addPlayers : function (pObj) {
  var player = new Character({
    cx: 100,
    cy: 100,
    velX: 4,
    velY: 4,
    keyUp: pObj.up.charCodeAt(0),
    keyDown: pObj.down.charCodeAt(0),
    keyLeft: pObj.left.charCodeAt(0),
    keyRight: pObj.right.charCodeAt(0),
    keyFire: pObj.fire.charCodeAt(0),
    sprite: pObj.sprite
  });

  this._players.push(player);
  //this._categories.push(this._players);
},

// PUBLIC METHODS

// A special return value, used by other objects,
// to request the blessed release of death!
//

KILL_ME_NOW : -1,

deferredSetup : function () {
    this._categories = [this._powerups, this._bombs, this._players, this._fires];
},

init: function() {
  console.log(g_images);
    var gayBoy = new Sprite(g_images.runar);
    this._createBoard(board);
    var pObj ={
      up: "W",
      down: "S",
      right: "D",
      left: "A",
      fire: " ",
      sprite: gayBoy
    }
    this._addPlayers(pObj);
},

spawnPowerup(descr) {
    this._powerups.push(new Powerup(descr));
},

bombExplode(bomb) {
    // Remove bomb from existance
    const index = this._bombs.indexOf(bomb);
    this._bombs.splice(index, 1);

    // Create fire
    const fire = new Fire();
    fire.explodingBomb(bomb, this._board.xStep, this._board.yStep);
    this._fires.push(fire);
    //console.log(this._board.xStep)
},

trySpawnBomb(descr) {
    // Check if bomb already in place at location
    for(var i = 0; i < this._bombs.length; i++) {
        var temp = this._bombs[i];
        if(temp.cx === descr.cx && temp.cy === descr.cy) {
            console.log('bomb here already');
            return null;
        }
    }
    const bomb = new Bomb(descr);
    this._bombs.push(bomb);
    return bomb;
},

getValidBombCenter: function(posX, posY) {
    return this._board.getBrickCenterAt(posX, posY);
    //return false;
  },

update: function(du) {

  for (var c = 0; c < this._categories.length; ++c) {

    var aCategory = this._categories[c];
    var i = 0;

    while (i < aCategory.length) {

      var status = aCategory[i].update(du);
      if (status === this.KILL_ME_NOW) {
          // remove the dead guy, and shuffle the others down to
          // prevent a confusing gap from appearing in the array
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
