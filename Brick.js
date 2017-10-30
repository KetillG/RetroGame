"use strict";

function Brick(descr) {

  // Gets brick properties
  brick = this.getBricktype(descr)

  // Adds the properties to the brick
  for (var property in brick) {
      this[property] = descr[property];
  }

}

Brick.prototype.update = function (du) {

}

Brick.prototype.render = function (ctx) {

}

Brick.prototype.isWalkable() {
  return this.solid;
}

Brick.prototype.getBricktype(number) {
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

  }
}
