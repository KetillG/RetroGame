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
  //console.log(this.sprite)
  if (this.sprite) {
    this.sprite.drawFrameCenteredAt(
      ctx, 
      this.x + this.width / 2,
      this.y + this.height / 2,
      0,
      0,
      0,
    );
  } else {
    util.fillBox(ctx,this.x,this.y,this.width*0.99,this.height*0.99,this.color)
  }
}

Brick.prototype.isWalkable = function () {
  return this.walkable;
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
        sprite: new Sprite(g_images.brick0),
        color: 'green',
        description: 'Walkable base block',
      }
      break;
    case 1:
      return {
        walkable: false,
        breakable: false,
        sprite: new Sprite(g_images.brick1),
        color: 'gray',
        description: 'Solid block that is not breakable',
      }
      break;
    case 2:
      return {
        walkable: false,
        breakable: true,
        sprite: new Sprite(g_images.brick2),
        color: 'navy',
        description: 'Solid block that is breakable',
      }
      break;
    case 3:
      return {
        walkable: false,
        breakable: false,
        sprite: false,
        color: 'cyan',
        description: 'Endgame block, indicates tile is dead',
      }
      break;
    case 4:
      return {
        walkable: true,
        breakable: false,
        sprite: new Sprite(g_images.brick0),
        color: 'green',
        description: 'Walkable spawn block',
      }
      break;
    default:
      console.log('No block found');
  }
}
