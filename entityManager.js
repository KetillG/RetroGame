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

deferredSetup : function () {
    this._categories = [];
},

_createBoard(board) {
  this._board = new Board({board});
},

init: function() {
  this._createBoard(board);
  this._addPlayers();
},

_addPlayers : function () {
  console.log('create player');
  var player = new Character({
    cx: 70,
    cy: 70,
    velX: 4,
    velY: 4,
    keyUp: 'W'.charCodeAt(0),
    keyDown: 'S'.charCodeAt(0),
    keyLeft: 'A'.charCodeAt(0),
    keyRight: 'D'.charCodeAt(0)
  });

  this._players.push(player);
  this._categories.push(this._players);
},

update: function(du) {

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];
        var i = 0;

        while (i < aCategory.length) {
            console.log(aCategory[i]);
            var status = aCategory[i].update(du);
            console.log(aCategory[i]);

            spatialManager.findPositionOnBoard(this._board, aCategory[i]);

            i++;
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
            //debug.text(".", debugX + i * 10, debugY);

        }
        debugY += 10;
    }
}

}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();
