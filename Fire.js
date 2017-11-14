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
    this['paths'] = [];
};

Fire.prototype.lifeSpan = 1000 / NOMINAL_UPDATE_INTERVAL;

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
        let nextX = pos.posX + xStep;
        let nextY = pos.posY + yStep;
        // Check if hit anything
        const hitEntities = spatialManager.findEntityInRange(
            nextX, nextY, 30
        );

        let hitWall = false;
        if(hitEntities.length) {
            hitEntities.map(hitEntity => {
                if(hitEntity.constructorType === 'Bomb') {
                    // Explode the bomb, entityManager?
                } else if (hitEntity.constructorType === 'Character') {
                    // Reduce life
                    hitEntity.decrementLife()
                } else if (hitEntity.constructorType === 'Board') {
                    // If brick explodes, extend fire by 1 length
                    console.log('exploding')
                    if(hitEntity.tryExplodeBrick(nextX, nextY)) {
                        console.log('exploded')
                        pos.posX = nextX;
                        pos.posY = nextY;
                    }
                    hitWall = true;
                }
            });

        }

        if(hitWall) {
            return pos;
        }

        // Update pos
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
    ctx.globalAlpha = this.lifeSpan / (1000 / NOMINAL_UPDATE_INTERVAL);
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
    });
    ctx.globalAlpha = 1;    
}
