// ====
// Bomb
// ====

"use strict";

// A generic contructor which accepts an arbitrary descriptor object
function Bomb(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);

    this['constructorType'] = 'Bomb'
};

Bomb.prototype = new Entity();

Bomb.prototype.lifeSpan = 3000 / NOMINAL_UPDATE_INTERVAL;
Bomb.prototype.radius = 30;

Bomb.prototype.positionOccupied = function (x, y) {
  const yHit = this.cy - this.radius < y && this.cy + this.radius > y
  const xHit = this.cx - this.radius < x && this.cx + this.radius > x
  return xHit && yHit;
}

Bomb.prototype.kick = function() {
    console.log('kicking bomb');
}

Bomb.prototype.update = function (du) {

    spatialManager.unregister(this);
    //if (this._isDeadNow) return entityManager.KILL_ME_NOW;

    this.lifeSpan -= du;
    if (this.lifeSpan < 0) {
        this.owner.ammo++;
        this.dropPowerup();
        return entityManager.KILL_ME_NOW;
    }

    // Handle firing



    spatialManager.register(this);
};

Bomb.prototype.render = function (ctx) {
    // Draw circle shit
    const oldStyle = ctx.fillStyle;
    ctx.fillStyle = "orange";
    util.fillCircle(ctx,
                    this.cx,
                    this.cy,
                    30);
    ctx.fillStyle = oldStyle;
};

Bomb.prototype.dropPowerup = function () {
    const powerupType = Math.floor(Math.random() * 2) + 1;
    entityManager.spawnPowerup({cx:this.cx,
                                cy:this.cy,
                                id:powerupType});
};
