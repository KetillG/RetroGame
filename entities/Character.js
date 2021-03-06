
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

}

Character.prototype = new Entity();

// Various properties of a character
Character.prototype.ammo = 1;
Character.prototype.power = 1;
Character.prototype.kickPower = false;
Character.prototype.freshBomb;

Character.prototype.lives = 3;
Character.prototype.immuneTime = -1;

Character.prototype.velX = 4,
Character.prototype.velY = 4,
Character.prototype.maxVelX = 8,
Character.prototype.maxVelY = 8,
Character.prototype.radius = 30;

Character.prototype.dirObj = {};
Character.prototype.recentlyHit = false;

Character.prototype.timeAlive = 0;
Character.prototype.aiMovement = 1;

// Returns stats of value
Character.prototype.getStats = function () {
    return {
        life: this.lives,
        power: this.power,
        bombs: this.ammo,
        speed: this.velX,
    }
}

// Decreases the player life and kills him if none are left
Character.prototype.decrementLife = function () {
    if(this.immuneTime >= 0) return;
    this.lives--;
    if(this.lives < 1) {
        this.kill();
    }

    // Gives the character an immune period after taking damage
    this.immuneTime = 1000 / NOMINAL_UPDATE_INTERVAL;
}

// If the player hit something react accordingly
Character.prototype.hitSomething = function(hitEntities, posX, posY){
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
            this.dumbAiChangeDir();
            this.bombCollide = true;
        }
        else if(hitEntity.constructorType === "Character"){
            this.dumbAiChangeDir();
            this.playerCollision = true;
        } else {
            this.dumbAiChangeDir();
            this.wallCollide = true;
        }

    });
}

// The "AI"
Character.prototype.dumbAiChangeDir = function () {
    if (this.computer) {
        this.aiMovement = Math.floor(Math.random() * 4);        
        this.maybeDropBomb();
    }
}

Character.prototype.wallCollide = false;
Character.prototype.bombCollide = false;
Character.prototype.stillOnFreshBomb = false;
Character.prototype.playerCollision = false;

// Updates the position
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
        this.hitSomething(hitEntities, posX, posY);
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
        this.setPos(this.cx, this.cy);
    }
}

// Handles character updating
Character.prototype.update = function (du) {
    spatialManager.unregister(this);

    if(this.isDead()) return entityManager.KILL_ME_NOW;

    this.timeAlive += du;

    if(this.immuneTime >= 0) {
        this.immuneTime -= du;
    }

    if (this.computer) {
        if (this.aiMovement > 3) {
            this.aiMovement = 0;
        }

        switch(this.aiMovement) {
            case 0:
                var newPosX = this.cx + this.velX*du;
                this.updatePosition(newPosX, this.cy);
                break;
            case 1:
                var newPosX = this.cx - this.velX*du;
                this.updatePosition(newPosX, this.cy);
                break;
            case 2:
                var newPosY = this.cy + this.velY*du;
                this.updatePosition(this.cx, newPosY);
                break;
            case 3:
                var newPosY = this.cy - this.velY*du;
                this.updatePosition(this.cx, newPosY);
                break;
        }        
        

    } else {
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
    
    }

    spatialManager.register(this);
};

// Renders the character
Character.prototype.render = function (ctx) {
    var a = new Sprite(g_images.explosion)


    // Make character blink if hit
    const blinkCheck = 100 / NOMINAL_UPDATE_INTERVAL;
    const blink = Math.floor(this.immuneTime / blinkCheck) % 2 === 0;
    if(this.immuneTime >= 0 && blink) ctx.globalAlpha = 0.5
    // Draw sprite if exist, else template block
    if (this.sprite) {
        this.sprite.drawFrameCenteredAt(
            ctx, 
            this.cx, 
            this.cy,
            0,
            Math.floor(0.8 * this.timeAlive / consts.CHARACTER_FRAMES) % consts.CHARACTER_FRAMES,
            0,
        );
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

// Sets character position
Character.prototype.setPos = function (x, y) {
    this.cx = x;
    this.cy = y;
};

// Tries to drop a bomb
Character.prototype.maybeDropBomb = function () {
    // If drop bomb key is pressed and player has ammo then drop bomb
    if ((eatKey(this.keyFire) || this.computer ) && this.ammo > 0) {
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

// Returns if self is at the position sent in
Character.prototype.positionOccupied = function (x, y, radius = 0) {
    const yHit = this.cy - this.height < y && this.cy + this.height> y;
    const xHit = this.cx - this.width < x && this.cx + this.width > x;
    return xHit && yHit;
};
