// ======
// ENTITY
// ======
/*

Provides a set of common functions which can be "inherited" by all other
game Entities.

JavaScript's prototype-based inheritance system is unusual, and requires
some care in use. In particular, this "base" should only provide shared
functions... shared data properties are potentially quite confusing.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


function Entity() {

/*
    // Diagnostics to check inheritance stuff
    this._entityProperty = true;
    console.dir(this);
*/

};

Entity.prototype.setWidths = function(){
    if(this.image){
        this.width = this.sprite.width;
        this.height = this.sprite.height;
    }
    else if (this.sprite) {
      this.width = this.sprite.width;
      this.height = this.sprite.height;
    }
    else{
        this.width = this.radius;
        this.height = this.radius;
    }
}


Entity.prototype.setup = function (descr) {

    // Apply all setup properies from the (optional) descriptor
    for (var property in descr) {
        this[property] = descr[property];
    }
    this['constructorType'] = 'Character'


    this._spatialID = spatialManager.getNewSpatialID();

    // I am not dead yet!
    this._isDeadNow = false;
    this.setWidths();
    this.newPosX = this.cx;
    this.newPosY = this.cy;
};

Entity.prototype.setPos = function (cx, cy) {
    this.cx = cx;
    this.cy = cy;
};

Entity.prototype.getPos = function(){
    return {posX:this.cx, posY:this.cy};
};

Entity.prototype.getFuturePos = function () {
    return {posX : this.newPosX, posY : this.newPosY};
};

Entity.prototype.getRadius = function () {
    return 0;
};


Entity.prototype.kill = function () {
    this._isDeadNow = true;
};

Entity.prototype.isDead = function () {
    return this._isDeadNow;
};

Entity.prototype.findHitEntity = function () {
    var pos = this.getFuturePos();
    var right = spatialManager.findEntityInRange(
        pos.posX - this.width, pos.posY - this.height, this.getRadius()
    );
    var left = spatialManager.findEntityInRange(
        pos.posX - this.width, pos.posY + this.height, this.getRadius()
    );
    var up = spatialManager.findEntityInRange(
        pos.posX + this.width, pos.posY - this.height, this.getRadius()
    );
    var down = spatialManager.findEntityInRange(
        pos.posX + this.width, pos.posY + this.height, this.getRadius()
    );
    return right.concat(left).concat(up).concat(down);
};
