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

};

Powerup.prototype = new Entity();

Powerup.prototype.update = function (du) {
    
    //spatialManager.unregister(this);
    //if (this._isDeadNow) return entityManager.KILL_ME_NOW;


    //spatialManager.register(this);
};

Powerup.prototype.render = function (ctx) {
    // Draw circle shit
    const oldStyle = ctx.fillStyle;
    ctx.fillStyle = "pink";
    util.fillCircle(ctx, 
                    this.cx, 
                    this.cy, 
                    30 * consts.RENDER_SCALE_WIDTH);
    ctx.fillStyle = oldStyle;
};

// Maps number to a brick type
Powerup.prototype.getBricktype =  function (number) {
    switch (number) {
      case 0:
        return {
          sprite: '..path',
          color: 'green',
          description: 'Bigger fire',
        }
        break;
      case 1:
        return {
          sprite: '..path',
          color: 'gray',
          description: 'Faster character',
        }
        break;
      case 2:
        return {
          sprite: '..path',
          color: 'navy',
          description: 'More bombs',
        }
        break;
      case 3:
        return {
          sprite: '..path',
          color: 'cyan',
          description: 'Player can kick bomb',
        }
        break;
      default:
        console.log('No powerup found');
    }
  }