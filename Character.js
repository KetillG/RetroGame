
// The character descriptor should initially atleast have the following key values
// cx: center c coordinate of the Character
// cy : center y coordinate of the Character
// sprite : A variable of the type sprite which will be the character image
// velX : Initial X velocity of the character
// velY : Initial Y velocity of the character
// keyUp : Which key corresponds to up
// keyDown : Which key corresponds to down
// keyLeft : Which key corresponds to left
// keyRight : Which key corresponds to right
function Character(descr) {
    this.setup(descr);

    this.constructorType = 'Character';
    this.setWidths();
    this.originalX = this.cx;
    this.originalY = this.cy;
    //spatialManager.register(this);
}

Character.prototype = new Entity();
// Character.prototype.board = new Board();

Character.prototype.ammo = 1;
Character.prototype.power = 1;
Character.prototype.kickPower = false;
Character.prototype.freshBomb;

Character.prototype.lives = 3;
Character.prototype.immuneTime = -1;

Character.prototype.velX = 4,
Character.prototype.velY = 4,
Character.prototype.maxVelX = 10,
Character.prototype.maxVelY = 10,
Character.prototype.radius = 30;

Character.prototype.dirObj = {};
Character.prototype.recentlyHit = false;

Character.prototype.decrementLife = function () {
    if(this.immuneTime >= 0) return;
    this.lives--;
    if(this.lives < 1) {
        this.kill();
        //console.log('died')
    }
    this.immuneTime = 1000 / NOMINAL_UPDATE_INTERVAL;
}


Character.prototype.hitSomething = function(hitEntities){
    hitEntities.map(hitEntity => {
        // If you have not left the bomb area you can walk on it
        if (hitEntity === this.freshBomb) {
            this.stillOnFreshBomb = true;
        } else if (hitEntity.constructorType === 'Powerup') {
            hitEntity.effect(this);
            hitEntity.kill();
        } else if (hitEntity.constructorType === 'Bomb') {
            // If you hit a bomb and you can kick it, then kick it
            if (this.kickPower) {
                hitEntity.kick();
            }
            this.bombCollide = true;
            //this.revertPosition();
            //return;
        }
        else if(hitEntity.constructorType === "Character"){
            this.playerCollision = true;
        } else {
            this.wallCollide = true;
        }

    });
}

Character.prototype.wallCollide = false;
Character.prototype.bombCollide = false;
Character.prototype.stillOnFreshBomb = false;
Character.prototype.playerCollision = false;

Character.prototype.updatePosition = function(posX, posY){
    this.newPosX = posX;
    this.newPosY = posY;
    this.stillOnFreshBomb = false;
    this.bombCollide = false;
    this.wallCollide = false;
    this.playerCollision = false;


    const hitEntities = this.findHitEntity();
    // If a entity its an 'wall'
    if (hitEntities.length) {

        this.hitSomething(hitEntities);

    }
    else {

        // If nothing is hit then you left fresh bomb
        this.setPos(posX,posY);
        this.freshBomb = null;
    }
    // Revert position if illegal move
    if(!this.wallCollide && !this.bombCollide && (this.stillOnFreshBomb || this.playerCollision)){
        this.setPos(posX, posY);
        return;
    }
    if(this.wallCollide && this.bombCollide && !this.stillOnFreshBomb) {
        //this.revertPosition();
        this.setPos(this.cx, this.cy);
        //return;
    }
}

Character.prototype.update = function (du) {
    spatialManager.unregister(this);

    if(this.isDead()) return entityManager.KILL_ME_NOW;

    if(this.immuneTime >= 0) {
        this.immuneTime -= du;
    }
    const right = keys[this.keyRight];
    const left = keys[this.keyLeft];
    const up = keys[this.keyUp];
    const down = keys[this.keyDown];
    if(right || left){
        var dir = right ? 1 : -1;
        var newPosX = this.cx + dir*this.velX*du;
        this.updatePosition(newPosX, this.cy);
    }
    if(up || down){
        var dir = down ? 1 : -1;
        var newPosY = this.cy + dir*this.velY*du;
        this.updatePosition(this.cx, newPosY);
    }
    this.maybeDropBomb();

    // Handle firing


    spatialManager.register(this);
};

Character.prototype.render = function (ctx) {
    const blinkCheck = 100 / NOMINAL_UPDATE_INTERVAL;
    const blink = Math.floor(this.immuneTime / blinkCheck) % 2 === 0;
    if(this.immuneTime >= 0 && blink) ctx.globalAlpha = 0.5
    if (this.sprite) {
        this.sprite.drawAt(ctx, this.cx, this.cy);
    } else {
        util.fillBox(
            ctx,
            this.cx - this.width,
            this.cy - this.height,
            this.width * 2,
            this.height * 2,
            this.colour,
        )
    }
    ctx.globalAlpha = 1;
};

Character.prototype.setPos = function (x, y) {
    this.cx = x;
    this.cy = y;
};

Character.prototype.maybeDropBomb = function () {
    if (eatKey(this.keyFire) && this.ammo > 0) {
        // Gets correct position from board
        const pos = entityManager.getValidBombCenter(this.cx, this.cy);
        // Tries to spawn a bomb
        const maybeBomb = entityManager.trySpawnBomb({
            cx: pos.cx,
            cy: pos.cy,
            power: this.power,
            owner: this,
        });

        // If bomb was spawned
        if (maybeBomb) {
            this.freshBomb = maybeBomb;
            this.ammo--;
        }
    }
};

Character.prototype.positionOccupied = function (x, y) {
    const yHit = this.cy - this.height < y && this.cy + this.height > y;
    const xHit = this.cx - this.width < x && this.cx + this.width > x;
    return xHit && yHit;
};
