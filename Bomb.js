// ====
// Bomb
// ====

"use strict";

// A generic contructor which accepts an arbitrary descriptor object
function Bomb(descr) {
    // Common inherited setup logic from Entity
    this.setup(descr);
};

Bomb.prototype = new Entity();

Bomb.prototype.lifeSpan = 3000 / NOMINAL_UPDATE_INTERVAL;

Bomb.prototype.update = function (du) {
    
    //spatialManager.unregister(this);
    //if (this._isDeadNow) return entityManager.KILL_ME_NOW;

    this.lifeSpan -= du;
    if (this.lifeSpan < 0) {
        this.ammo++;
        console.log('dead')
        this.dropPowerup();
        return entityManager.KILL_ME_NOW;
    }

    // Handle firing
    


    //spatialManager.register(this);
};

Bomb.prototype.render = function (ctx) {
    // Draw circle shit
    const oldStyle = ctx.fillStyle;
    ctx.fillStyle = "orange";
    util.fillCircle(ctx, 
                    this.cx, 
                    this.cy, 
                    30 * consts.RENDER_SCALE_WIDTH);
    ctx.fillStyle = oldStyle;
};

Bomb.prototype.dropPowerup = function () {
    const powerupType = Math.floor(Math.random() * 4);
    entityManager.spawnPowerup({cx:this.cx,
                                cy:this.cy,
                                id:powerupType});
};