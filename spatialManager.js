/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var spatialManager = {

// "PRIVATE" DATA

_nextSpatialID : 1, // make all valid IDs non-falsey (i.e. don't start at 0)

_entities : [],

// "PRIVATE" METHODS
//
// <none yet>


// PUBLIC METHODS

getNewSpatialID : function() {

    // TODO: YOUR STUFF HERE!
    var nextSpatialID = this._nextSpatialID;
    ++this._nextSpatialID;
    return nextSpatialID;
},

register: function(entity) {
    var pos = entity.getPos();
    var spatialID = entity.getSpatialID();
},

unregister: function(entity) {
    var spatialID = entity.getSpatialID();

    // TODO: YOUR STUFF HERE!
    delete this._entities[spatialID];
},

findPositionOnBoard: function(board, entity) {
  console.log(entity);
  var isValid = board.validPosition(entity.cx, entity.cy);
  console.log(isValid);
  if(!isValid){
    entity.setPos(this.oldPosX, this.oldPosY);
  }
}

}
