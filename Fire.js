// ====
// Fire
// ====

"use strict";

// A generic contructor which accepts an arbitrary descriptor object
function Fire(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }

    this['constructorType'] = 'Fire'
};

// 
Fire.prototype.UP = 0;
Fire.prototype.RIGHT = 0;
Fire.prototype.DOWN = 0;
Fire.prototype.LEFT = 0;