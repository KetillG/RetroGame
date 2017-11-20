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
restart: function() {
  this._entities = [];
},
// Creates a new spatial ID
getNewSpatialID : function() {
    return this._nextSpatialID++;
},

// Adds item to self
register: function(entity) {
    this._entities.push(entity);
},

// Remove item from self
unregister: function(entity) {
    var index = this._entities.indexOf(entity);
    if(index === -1) return;
    this._entities.splice(index, 1);
},

// Returns all entities hit at an position
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
