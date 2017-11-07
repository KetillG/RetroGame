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

Bomb.prototype.lifeSpan = 5000 / NOMINAL_UPDATE_INTERVAL;
//Bomb.prototype.radius = 35;

Bomb.prototype.positionOccupied = function (x, y) {
    const yHit = this.cy - this.height < y && this.cy + this.height > y;
    const xHit = this.cx - this.width < x && this.cx + this.width > x;
    return xHit && yHit;
}

Bomb.prototype.kick = function() {
    console.log('kicking bomb');
}

Bomb.prototype.explode = function () {
    // Return the ammo to player
    this.owner.ammo++;
    // Add explosion to entity manager
    entityManager.bombExplode(this);
}

Bomb.prototype.update = function (du) {

    spatialManager.unregister(this);

    this.lifeSpan -= du;
    if (this.lifeSpan < 0) {
        // Explode and create fire
        this.explode();
        //this.dropPowerup();
        return;
        //return entityManager.KILL_ME_NOW;
    }

    spatialManager.register(this);
};

Bomb.prototype.render = function (ctx) {
    util.fillBox(
        ctx,
        this.cx - this.width,
        this.cy - this.height,
        this.width * 2,
        this.height * 2,
        'orange',
    )
};

Bomb.prototype.dropPowerup = function () {
    const powerupType = Math.floor(Math.random() * 2) + 1;
    entityManager.spawnPowerup({cx:this.cx,
                                cy:this.cy,
                                id:powerupType});
};
