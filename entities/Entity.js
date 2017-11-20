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


};

// Set widths of a entity
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

// Base setup of an entity
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

// Sets pos
Entity.prototype.setPos = function (cx, cy) {
    this.cx = cx;
    this.cy = cy;
};

// Returns pos
Entity.prototype.getPos = function(){
    return {posX:this.cx, posY:this.cy};
};

// Returns future pos if it has been calculated
Entity.prototype.getFuturePos = function () {
    return {posX : this.newPosX, posY : this.newPosY};
};

// Default value if none assigned
Entity.prototype.getRadius = function () {
    return 0;
};

// Kills the entity
Entity.prototype.kill = function () {
    this._isDeadNow = true;
};

// Tells if entity is dead
Entity.prototype.isDead = function () {
    return this._isDeadNow;
};

// Checks if entity hit something with the spatialManager
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
};

// Function to unique join arrays together
Entity.prototype.addUniqueToArray = function(main, add) {
    add.forEach(element => {
        if(main.indexOf(element) === -1) {
            main.push(element);
        }
    });
}
