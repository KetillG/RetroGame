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
//Brick.prototype.width = consts.LOGICAL_WIDTH / 7;
//Brick.prototype.height = consts.LOGICAL_HEIGHT / 7;

Brick.prototype.update = function (du) {

}

Brick.prototype.render = function (ctx) {
  util.fillBox(ctx,this.x,this.y,this.width*0.99,this.height*0.99,this.color)
}

Brick.prototype.isWalkable = function () {
  return !this.solid;
}

Brick.prototype.makeWalkable = function () {
  this.walkable = true;
}

Brick.prototype.isBreakable = function () {
  return this.breakable;
}

Brick.prototype.break = function () {
  var brick = this.getBricktype(0)

  for (var property in brick) {
      this[property] = brick[property];
  }
}

// Maps number to a brick type
Brick.prototype.getBricktype =  function (number) {
  switch (number) {
    case 0:
      return {
        walkable: true,
        breakable: false,
        sprite: '..path',
        color: 'green',
      }
      break;
    case 1:
      return {
        walkable: false,
        breakable: false,
        sprite: '..path',
        color: 'gray',
      }
      break;
    case 2:
      return {
        walkable: false,
        breakable: true,
        sprite: '..path',
        color: 'navy',
      }
      break;
    default:
      console.log('hmhmhm');
  }
}
