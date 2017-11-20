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
Powerup.prototype.radius = 33;

// Returns if self is at the position sent in
Powerup.prototype.positionOccupied = function (x, y) {
  const yHit = this.cy - this.radius < y && this.cy + this.radius > y
  const xHit = this.cx - this.radius < x && this.cx + this.radius > x
  return xHit && yHit;
}

// Updates the powerup
Powerup.prototype.update = function (du) {

    spatialManager.unregister(this);
    if (this._isDeadNow) return entityManager.KILL_ME_NOW;


    spatialManager.register(this);
};

// Renders the powerup
Powerup.prototype.render = function (ctx) {
  if (this.sprite) {
    this.sprite.drawFrameCenteredAt(
      ctx, 
      this.cx,
      this.cy,
      0,
      0,
      0,
    );
  } else {
    // Draw circle shit
    const oldStyle = ctx.fillStyle;
    ctx.fillStyle = this.color;
    util.fillCircle(
      ctx,
      this.cx,
      this.cy,
      30
    );
    ctx.fillStyle = "black";
    ctx.font = "25px Comic Sans MS";
    ctx.textBaseline =  'middle';
    ctx.textAlign = 'center';
    ctx.fillText(this.description[0], this.cx * consts.RENDER_SCALE_WIDTH, this.cy * consts.RENDER_SCALE_HEIGHT);
    ctx.fillStyle = oldStyle;
  }

};

// Gives player more firepower
Powerup.prototype.addFire = function (player) {
  player.power++;
}

// Adds speed to the player
Powerup.prototype.addSpeed =  function (player) {
  if(player.velX < player.maxVelX) player.velX += 1;
  if(player.velY < player.maxVelY) player.velY += 1;
}

// Adds ammo to the player
Powerup.prototype.addAmmo =  function (player) {
  player.ammo++;
}

// Adds kick ability to the player, not used
Powerup.prototype.addKick =  function (player) {
  player.kickPower = true;
}

// Maps number to a brick type
Powerup.prototype.getBricktype =  function (number) {
    switch (number) {
      case 0:
        return {
          sprite: new Sprite(g_images.powerupFire),
          color: 'MediumSeaGreen',
          description: 'Bigger fire',
          effect: this.addFire,
        }
        break;
      case 1:
        return {
          sprite: new Sprite(g_images.powerupSpeed),
          color: 'gray',
          description: 'Faster character',
          effect: this.addSpeed,
        }
        break;
      case 2:
        return {
          sprite: new Sprite(g_images.powerupBomb),
          color: 'navy',
          description: 'More bombs',
          effect: this.addAmmo,
        }
        break;
      case 3:
        return {
          sprite: new Sprite(g_images.powerupBomb),
          color: 'cyan',
          description: 'Kick bomb power for substring',
          effect: this.addKick,
        }
        break;
      default:
        console.log('No powerup found');
    }
  }
