
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
    this.oldPosX = this.cx;
    this.oldPosY = this.cy;

    this.constructorType = 'Character';
    this.setWidths();
}

Character.prototype = new Entity();
// Character.prototype.board = new Board();

Character.prototype.ammo = 30;
Character.prototype.power = 2;
Character.prototype.kickPower = false;
Character.prototype.freshBomb;

Character.prototype.radius = 30;

Character.prototype.dirObj = {};


Character.prototype.moveDirection = function () {
    const right = keys[this.keyRight];
    const left = keys[this.keyLeft];
    const up = keys[this.keyUp];
    const down = keys[this.keyDown];
    const y = up ^ down;
    const x = left ^ right;
    if (x && !y) {
        var dir = right ? 1 : -1;
        this.dirObj.vel = "velX";
        this.dirObj.direction = dir;
        this.dirObj.center = "cx";
        return true;
    } else if (y && !x) {
        var dir = down ? 1 : -1;
        this.dirObj.vel = "velY";
        this.dirObj.direction = dir;
        this.dirObj.center = "cy";
        return true;
    }

    return null;
};

Character.prototype.update = function (du) {
    spatialManager.unregister(this);

    const directionObject = this.moveDirection();
    let newX = this.cx;
    let newY = this.cy;

    if (directionObject) {
    // Directions
        const vel = this.dirObj.vel;
        const dir = this.dirObj.direction;
        if (vel === 'velY') {
            newY = this.cy + dir * this.velY * du;
        } else {
            newX = this.cx + dir * this.velX * du;
        }
        // Hit detection
        const hitEntities = this.findHitEntity();
        // If a entity its an 'wall'
        let wallCollide = false;
        let bombCollide = false;
        let stillOnFreshBomb = false;
        if (hitEntities.length) {
            hitEntities.map(hitEntity => {
                // If you have not left the bomb area you can walk on it
                if (hitEntity === this.freshBomb) {
                    stillOnFreshBomb = true;
                } else if (hitEntity.constructorType === 'Powerup') {
                    hitEntity.effect(this);
                    hitEntity.kill();
                } else if (hitEntity.constructorType === 'Bomb') {
                    // If you hit a bomb and you can kick it, then kick it
                    if (this.kickPower) {
                        hitEntity.kick();
                    }
                    bombCollide = true;
                    //this.revertPosition();
                    //return;
                } else {
                    wallCollide = true;
                }
            });    
        } else {
            // If nothing is hit then you left fresh bomb
            this.freshBomb = null;
        }
        // Revert position if illegal move
        if(wallCollide || (bombCollide && !stillOnFreshBomb)) {
            this.revertPosition();
            return;
        }
        this.oldPosX = this.cx;
        this.oldPosY = this.cy;
        this.cx = newX;
        this.cy = newY;
    }

    // Handle firing
    this.maybeDropBomb();

    spatialManager.register(this);
};

Character.prototype.revertPosition = function () {
    this.cx = this.oldPosX;
    this.cy = this.oldPosY;
};

Character.prototype.render = function (ctx) {
    if (this.sprite) {
        this.sprite.drawAt(ctx, this.cx, this.cy);
    } else {
        util.fillBox(
            ctx,
            this.cx - this.width,
            this.cy - this.height,
            this.width * 2,
            this.height * 2,
            'red',
        )
    }
};

Character.prototype.setPos = function (x, y) {
    this.cx = x;
    this.cy = y;
};

Character.prototype.maybeDropBomb = function () {
    if (keys[this.keyFire] && this.ammo > 0) {
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
    const yHit = this.cy - this.height/2 < y && this.cy + this.height/2 > y;
    const xHit = this.cx - this.width/2 < x && this.cx + this.width/2 > x;
    return xHit && yHit;
};
