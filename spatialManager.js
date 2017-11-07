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
    return this._nextSpatialID++;
},

register: function(entity) {
    this._entities.push(entity);
},

unregister: function(entity) {
    var index = this._entities.indexOf(entity);
    //console.log(index);
    if(index === -1) return;
    this._entities.splice(index, 1);
},

findEntityInRange: function(posX, posY) {
  const hitEntities = [];

  for(var i = 0; i < this._entities.length; i++) {
    if(this._entities[i].positionOccupied(posX,posY)) {
      hitEntities.push(this._entities[i]);
    }
  }

  return hitEntities;
},

}
