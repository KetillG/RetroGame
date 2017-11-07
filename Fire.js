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

Fire.prototype.paths = [];
Fire.prototype.lifeSpan = 10000 / NOMINAL_UPDATE_INTERVAL;

Fire.prototype.explodingBomb = function (bomb, xStep, yStep) {
    // New fire path added to fire
    const path = {
        center: bomb.getPos(),
        directions: [],
    };
    // Fire directions
    // Up
    path.directions.push(this.addPath(bomb.power, bomb.getPos(), 0 , -1 * yStep));
    // Right
    path.directions.push(this.addPath(bomb.power, bomb.getPos(), xStep , 0));
    // Down
    path.directions.push(this.addPath(bomb.power, bomb.getPos(), 0 , yStep));
    // Left
    path.directions.push(this.addPath(bomb.power, bomb.getPos(), -1 * xStep , 0));
    this.paths.push(path);
}

Fire.prototype.addPath = function (power, pos, xStep, yStep) {
    while(power > 0) {
        power--;
        // Next position
        const nextX = pos.posX + xStep;
        const nextY = pos.posY + yStep;
        // Check if hit anything
        var hitEntity = spatialManager.findEntityInRange(
            nextX, nextY, 30
        );

        if(hitEntity) {
            console.log(hitEntity)
            if(hitEntity.constructorType === 'Bomb') {
                // Explode the bomb, entityManager?
            } else if (hitEntity.constructorType === 'Character') {
                // Reduce life
            } else if (hitEntity.constructorType === 'Board') {
                hitEntity.tryExplodeBrick(nextX, nextY);
                return pos;
            }
        }
        // Update pos
        console.log(pos.posY, nextY)
        pos.posX = nextX;
        pos.posY = nextY;
    }
    return pos;
}

Fire.prototype.update = function (du) {
    this.lifeSpan -= du;
    if (this.lifeSpan < 0) {
        return entityManager.KILL_ME_NOW;
    }
}

Fire.prototype.render = function (ctx) {
    this.paths.map(path => {
        path.directions.map(dir => {
            util.drawLine(
                ctx,
                path.center.posX,
                path.center.posY,
                dir.posX,
                dir.posY,
                'red'
            );
        });  
        /*ctx.beginPath();
        ctx.moveTo(path.center.posX,path.center.posY);
        ctx.lineTo(path.up.posX,path.up.posY);
        ctx.stroke();*/
    });
}