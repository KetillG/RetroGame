// ====
// POWERUPS
// ====

"use strict";


// A generic contructor which accepts an arbitrary descriptor object
function Powerup(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
    // Adds custom powerup properties
    var powerup = this.getBricktype(descr.id)

    for (var property in powerup) {
        this[property] = powerup[property];
    }

    this['constructorType'] = 'Powerup'
};


Powerup.prototype = new Entity();
Powerup.prototype.radius = 30;

Powerup.prototype.positionOccupied = function (x, y) {
  const yHit = this.cy - this.radius < y && this.cy + this.radius > y
  const xHit = this.cx - this.radius < x && this.cx + this.radius > x
  return xHit && yHit;
}

Powerup.prototype.update = function (du) {

    spatialManager.unregister(this);
    if (this._isDeadNow) return entityManager.KILL_ME_NOW;


    spatialManager.register(this);
};

Powerup.prototype.render = function (ctx) {
    // Draw circle shit
    const oldStyle = ctx.fillStyle;
    ctx.fillStyle = this.color;
    util.fillCircle(ctx,
                    this.cx,
                    this.cy,
                    30);
    ctx.fillStyle = oldStyle;
};

Powerup.prototype.addFire = function (player) {
  player.power++;
}

Powerup.prototype.addSpeed =  function (player) {
  if(player.velX < player.maxVelX) player.velX += 1;
  if(player.velY < player.maxVelY) player.velY += 1;
  console.log(player.velX,player.velY);
}

Powerup.prototype.addAmmo =  function (player) {
  player.ammo++;
}

Powerup.prototype.addKick =  function (player) {
  player.kickPower = true;
}
// Maps number to a brick type
Powerup.prototype.getBricktype =  function (number) {
    switch (number) {
      case 0:
        return {
          sprite: '..path',
          color: 'MediumSeaGreen',
          description: 'Bigger fire',
          effect: this.addFire,
        }
        break;
      case 1:
        return {
          sprite: '..path',
          color: 'gray',
          description: 'Faster character',
          effect: this.addSpeed,
        }
        break;
      case 2:
        return {
          sprite: '..path',
          color: 'navy',
          description: 'More bombs',
          effect: this.addAmmo,
        }
        break;
      case 3:
        return {
          sprite: '..path',
          color: 'cyan',
          description: 'Player can kick bomb',
          effect: this.addKick,
        }
        break;
      default:
        console.log('No powerup found');
    }
  }
