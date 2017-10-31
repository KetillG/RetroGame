"use strict";

function Brick(descr) {

  // Gets brick properties
  var brick = this.getBricktype(descr.id)

  // Adds the properties to the brick
  for (var property in descr) {
      this[property] = descr[property];
  }
  for (var property in brick) {
      this[property] = brick[property];
  }

}
Brick.prototype.w = consts.LOGICAL_WIDTH / 7;
Brick.prototype.h = consts.LOGICAL_HEIGHT / 7;

Brick.prototype.update = function (du) {

}

Brick.prototype.render = function (ctx) {
  util.fillBox(ctx,this.x,this.y,this.w,this.h,this.color)
}

Brick.prototype.isWalkable = function () {
  return this.solid;
}

Brick.prototype.makeWalkable = function () {
  this.solid = false;
}
// Maps number to a brick type
Brick.prototype.getBricktype =  function (number) {
  switch (number) {
    case 0:
      return {
        solid: false,
        sprite: '..path',
        color: 'green',
      }
      break;
    case 1:
      return {
        solid: true,
        sprite: '..path',
        color: 'gray',
      }
      break;
    default:
      console.log('hmhmhm');
  }
}
