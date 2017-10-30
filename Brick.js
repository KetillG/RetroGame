"use strict";

function Brick(descr) {

  // Gets brick properties
  var brick = this.getBricktype(descr)

  // Adds the properties to the brick
  for (var property in brick) {
      this[property] = brick[property];
  }

}

Brick.prototype.update = function (du) {

}

Brick.prototype.render = function (ctx) {

}

Brick.prototype.isWalkable = function () {
  return this.solid;
}

Brick.prototype.getBricktype =  function (number) {
  switch (number) {
    case 0:
      return {
        solid: false,
        sprite: '..path',
      }
      break;
    case 1:
      return {
        solid: true,
        sprite: '..path',
      }
      break;
    default:
      console.log('hmhmhm');
  }
}
