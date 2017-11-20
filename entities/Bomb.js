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

// Lifespan of bomb
Bomb.prototype.lifeSpan = 3000 / NOMINAL_UPDATE_INTERVAL;

// Returns if self is at the position sent in
Bomb.prototype.positionOccupied = function (x, y) {
    const yHit = this.cy - this.height < y && this.cy + this.height > y;
    const xHit = this.cx - this.width < x && this.cx + this.width > x;
    return xHit && yHit;
}

// Unused powerup method
Bomb.prototype.kick = function() {
    console.log('kicking bomb');
}

// Explodes the bomb
Bomb.prototype.explode = function () {
    // Return the ammo to player
    this.owner.ammo++;
    // Add explosion to entity manager
    entityManager.bombExplode(this);
    // Plays exploding sound
    util.playBombSound(bombSounds);
}

// Updates the bomb
Bomb.prototype.update = function (du) {

    spatialManager.unregister(this);

    this.lifeSpan -= du;
    if (this.lifeSpan < 0) {
        // Explode and create fire
        this.explode();
        return;
    }

    spatialManager.register(this);
};

// Renders the bomb
Bomb.prototype.render = function (ctx) {
    // If it has a sprite draw that, else draw a box
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
        util.fillBox(
            ctx,
            this.cx - this.width,
            this.cy - this.height,
            this.width * 2,
            this.height * 2,
            'orange',
        )
    }
};