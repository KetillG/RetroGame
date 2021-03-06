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
    if(this.sprite){
        this.radius = this.sprite.scale * this.sprite.width / 2;
    }
    else{
        this.radius = 30;
    }
};

Fire.prototype.lifeSpan = 1000 / NOMINAL_UPDATE_INTERVAL;
Fire.prototype.totalLifeSpan = 1000 / NOMINAL_UPDATE_INTERVAL;

// Calculates the path of the fire
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

// Check if current position hit something with the spatial manager
Fire.prototype.computeHitPath = function (x, y) {
    const tempHitEntitiesStep = [];

    var right = spatialManager.findEntityInRange(
        x - this.radius, y - this.radius
    );
    var left = spatialManager.findEntityInRange(
        x - this.radius, y + this.radius
    );
    var up = spatialManager.findEntityInRange(
        x + this.radius, y - this.radius
    );
    var down = spatialManager.findEntityInRange(
        x + this.radius, y + this.radius
    );
    var down = spatialManager.findEntityInRange(
        x, y
    );
    this.addUniqueToArray(tempHitEntitiesStep,right);
    this.addUniqueToArray(tempHitEntitiesStep,left);
    this.addUniqueToArray(tempHitEntitiesStep,up);
    this.addUniqueToArray(tempHitEntitiesStep,down);
    return tempHitEntitiesStep;
}

// Function to unique join arrays together
Fire.prototype.addUniqueToArray = function(main, add) {
    add.forEach(element => {
        if(main.indexOf(element) === -1) {
            main.push(element);
        }
    });
}

// Calculates a single direction of the fire
Fire.prototype.addPath = function (power, pos, xStep, yStep) {
    while(power > 0) {
        power--;
        // Next position
        let nextX = pos.posX + xStep;
        let nextY = pos.posY + yStep;
        // Check if hit anything
        const substep = 20;
        const hitEntities = [];
        // Loop over substeps
        for(let i = 0; i < substep; i++) {
            // Get all entities hit by substep
            const tempHitEntities = this.computeHitPath(
                pos.posX + i * xStep / substep,
                pos.posY + i * yStep / substep,
            );
            this.addUniqueToArray(hitEntities,tempHitEntities);
        }

        let hitWall = false;
        if(hitEntities.length) {
            hitEntities.map(hitEntity => {
                if(hitEntity.constructorType === 'Bomb') {
                    // Explode the bomb, entityManager?
                    hitEntity.owner.ammo++;
                    // Add explosion to entity manager
                    entityManager.bombExplode(hitEntity);
                } else if (hitEntity.constructorType === 'Character') {
                    // Reduce life
                    hitEntity.decrementLife()
                } else if (hitEntity.constructorType === 'Board') {
                    // If brick explodes, extend fire by 1 length
                    if(hitEntity.tryExplodeBrick(nextX, nextY)) {
                        pos.posX = nextX;
                        pos.posY = nextY;
                    }
                    hitWall = true;
                }
            });

        }

        if(hitWall) {
            pos.posX += xStep / 2;
            pos.posY += yStep / 2;
            return pos;
        }

        // Update pos
        pos.posX = nextX;
        pos.posY = nextY;
    }
    pos.posX += xStep / 2;
    pos.posY += yStep / 2;
    return pos;
}

// Updates the fire
Fire.prototype.update = function (du) {
    this.lifeSpan -= du;
    if (this.lifeSpan < 0) {
        return entityManager.KILL_ME_NOW;
    }
}

// Renders the fire
Fire.prototype.render = function (ctx) {
    this.paths.map(path => {
        path.directions.map(dir => {
            if(this.sprite) {
                // Life cycle calculations
                const currentLife = this.totalLifeSpan - this.lifeSpan;
                const BOMB_FRAMES = consts.BOMB_FRAMES_X * consts.BOMB_FRAMES_Y;
                const frameCycle = this.totalLifeSpan / BOMB_FRAMES;
                const frame = Math.floor(currentLife / frameCycle);
                
                // Step calculations
                let stepX = (dir.posX - path.center.posX) / this.xStep;
                stepX = stepX > 0 ? Math.floor(stepX) : Math.ceil(stepX);
                let stepY = (dir.posY - path.center.posY) / this.yStep;
                stepY = stepY > 0 ? Math.floor(stepY) : Math.ceil(stepY);

                const xDir = stepX === 0 ? 0  : stepX / Math.abs(stepX);
                const yDir = stepY === 0 ? 0  : stepY / Math.abs(stepY);

                // For each cell in the fire path
                for(let i = 0; i <= Math.abs(stepX + stepY); i++) {
                    this.sprite.drawFrameCenteredAt(
                        ctx, 
                        path.center.posX + this.xStep * i * xDir, 
                        path.center.posY + this.yStep * i * yDir,
                        0,
                        frame % consts.BOMB_FRAMES_X,
                        Math.floor(frame / consts.BOMB_FRAMES_Y),
                    );
                }

                
            } else {
                util.drawLine(
                    ctx,
                    path.center.posX,
                    path.center.posY,
                    dir.posX,
                    dir.posY,
                    'red'
                );
            }
        });
    });
    ctx.globalAlpha = 1;    
}
