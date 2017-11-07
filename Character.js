
//The character descriptor should initially atleast have the following key values
// cx: center c coordinate of the Character
// cy : center y coordinate of the Character
// sprite : A variable of the type sprite which will be the character image
// velX : Initial X velocity of the character
// velY : Initial Y velocity of the character
// keyUp : Which key corresponds to up
// keyDown : Which key corresponds to down
// keyLeft : Which key corresponds to left
// keyRight : Which key corresponds to right
function Character(descr){

  this.setup(descr);

  this['constructorType'] = 'Character'
}

Character.prototype = new Entity();
// Character.prototype.board = new Board();

Character.prototype.ammo = 1;
Character.prototype.power = 2;
Character.prototype.kickPower = false;
Character.prototype.freshBomb;

Character.prototype.radius = 30;

Character.prototype.dirObj = {};

Character.prototype.moveDirection = function(){
  var right = keys[this.keyRight];
  var left = keys[this.keyLeft];
  var up = keys[this.keyUp];
  var down = keys[this.keyDown];
  var y = up ^ down;
  var x = left ^ right;
  if(x && !y){
    var dir = right ? 1 : -1;
    this.dirObj.vel = "velX";
    this.dirObj.direction = dir;
    this.dirObj.center = "cx";
    return true;
  }
  else if(y && !x){
    var dir = down ? 1 : -1;
    this.dirObj.vel = "velY";
    this.dirObj.direction = dir;
    this.dirObj.center = "cy";
    return true;
  }
  else{
    return null;
  }
}

Character.prototype.update = function(du){

  spatialManager.unregister(this);

  var directionObject = this.moveDirection();
  var newX = this.cx;
  var newY = this.cy;

  if(directionObject) {
    // Directions
    var vel = this.dirObj.vel;
    var dir = this.dirObj.direction;
    if(vel === "velY"){
      newY = this.cy + dir*this.velY*du;
    }
    else{
      newX = this.cx + dir*this.velX*du;
    }
    // Hit detection
    var hitEntity = this.findHitEntity();
    if(hitEntity) {
      console.log(hitEntity)
      // If you have not left the bomb area you can walk on it
      if(hitEntity === this.freshBomb) {
        console.log('Can walk here')
      } else if (hitEntity.constructorType === 'Powerup') {
        hitEntity.effect(this);
        hitEntity.kill();
      } else if (hitEntity.constructorType === 'Bomb') {
         // If you hit a bomb and you can kick it, then kick it
        if(this.kickPower) {
          hitEntity.kick();
        }
        this.changePosition();
        return;
      } else {
        this.changePosition();
        return;
      }
    } else {
      // If nothing is hit then you left fresh bomb
      this.freshBomb = null;
    }
  }

  // Handle firing
  this.maybeDropBomb();

  spatialManager.register(this);
}

Character.prototype.changePosition = function () {
  this.cx = this.newPosX;
  this.cy = this.newPosY;
}

Character.prototype.render = function(ctx){

  if(this.sprite){
    this.sprite.drawAt(ctx, this.cx, this.cy);
  }
  else{
    util.fillCircle(ctx,
      this.cx,
      this.cy,
      this.radius);
  }
}

Character.prototype.setPos = function(x, y){
  this.cx = x;
  this.cy = y;
}

Character.prototype.maybeDropBomb = function () {
    if (keys[this.keyFire] && this.ammo > 0) {
        // Gets correct position from board
        const pos = entityManager.getValidBombCenter(this.cx,this.cy);
        // Tries to spawn a bomb
        const maybeBomb = entityManager.trySpawnBomb({
          cx:pos.cx,
          cy:pos.cy,
          power:this.power,
          owner:this
        });

        // If bomb was spawned
        if(maybeBomb) {
          this.freshBomb = maybeBomb;
          this.ammo--;
        }
    }
};

Character.prototype.positionOccupied = function (x, y) {
  const yHit = this.cy - this.radius < y && this.cy + this.radius > y
  const xHit = this.cx - this.radius < x && this.cx + this.radius > x
  return xHit && yHit;
}
