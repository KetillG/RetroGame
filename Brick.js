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
Brick.prototype.w = 100;
Brick.prototype.h = 100;

Brick.prototype.update = function (du) {

}

Brick.prototype.render = function (ctx) {
  util.fillBox(ctx,this.x + this.w/2,this.y + this.h/2,this.w,this.h,this.color)
}

Brick.prototype.isWalkable = function () {
  return this.solid;
}

Brick.prototype.makeWalkable = function () {
  this.solid = false;
}

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
