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

_createBoard(board) {
  this._board = new Board({board});
},

_addPlayers : function () {
  var player = new Character({
    cx: 70,
    cy: 70,
    velX: 4,
    velY: 4,
    keyUp: 'W'.charCodeAt(0),
    keyDown: 'S'.charCodeAt(0),
    keyLeft: 'A'.charCodeAt(0),
    keyRight: 'D'.charCodeAt(0),
    keyFire: ' '.charCodeAt(0),
  });

  this._players.push(player);
  //this._categories.push(this._players);
},

// PUBLIC METHODS

// A special return value, used by other objects,
// to request the blessed release of death!
//

KILL_ME_NOW : -1,


        while (i < aCategory.length) {
            var status = aCategory[i].update(du);

            spatialManager.findPositionOnBoard(this._board, aCategory[i]);

            i++;
        }
    }

deferredSetup : function () {
    this._categories = [this._powerups, this._bombs, this._players];
},

init: function() {
    this._createBoard(board);
    this._addPlayers();
},

spawnPowerup(descr) {
    this._powerups.push(new Powerup(descr));
},

spawnBomb(descr) {
    this._bombs.push(new Bomb(descr));
    console.log(this._bombs[0])
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
