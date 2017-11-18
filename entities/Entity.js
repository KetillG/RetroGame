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
    if(this.sprite){
        this.width = this.sprite.width / 2;
        this.height = this.sprite.height / 2;
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
    const tempHitEntitiesStep = [];

    var pos = this.getFuturePos();
    var right = spatialManager.findEntityInRange(
        pos.posX - this.width, pos.posY - this.height
    );
    var left = spatialManager.findEntityInRange(
        pos.posX - this.width, pos.posY + this.height
    );
    var up = spatialManager.findEntityInRange(
        pos.posX + this.width, pos.posY - this.height
    );
    var down = spatialManager.findEntityInRange(
        pos.posX + this.width, pos.posY + this.height
    );

    var north = spatialManager.findEntityInRange(
        pos.posX, pos.posY - this.height
    );
    var south = spatialManager.findEntityInRange(
        pos.posX, pos.posY + this.height
    );
    var west = spatialManager.findEntityInRange(
        pos.posX - this.width, pos.posY
    );
    var east = spatialManager.findEntityInRange(
        pos.posX + this.width, pos.posY
    );
    this.addUniqueToArray(tempHitEntitiesStep,right);
    this.addUniqueToArray(tempHitEntitiesStep,left);
    this.addUniqueToArray(tempHitEntitiesStep,up);
    this.addUniqueToArray(tempHitEntitiesStep,down);
    this.addUniqueToArray(tempHitEntitiesStep,north);
    this.addUniqueToArray(tempHitEntitiesStep,south);
    this.addUniqueToArray(tempHitEntitiesStep,west);
    this.addUniqueToArray(tempHitEntitiesStep,east);
    return tempHitEntitiesStep;
    //return right.concat(left).concat(up).concat(down).concat(north).concat(south).concat(east).concat(west);
};

Entity.prototype.addUniqueToArray = function(main, add) {
    add.forEach(element => {
        if(main.indexOf(element) === -1) {
            main.push(element);
        }
    });
}
