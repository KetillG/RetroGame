
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
}

Character.prototype = new Entity();
// Character.prototype.board = new Board();

Character.prototype.moveDirection = function(){
  var right = keys[this.keyRight];
  var left = keys[this.keyLeft];
  var up = keys[this.keyUp];
  var down = keys[this.keyDown];
  var y = up ^ down;
  var x = left ^ right;
  if(x && !y){
    var dir = right ? 1 : -1;
    var obj = {vel : "velX", direction : dir, center : "cx"};
    return obj;
  }
  else if(y && !x){
    var dir = down ? 1 : -1;
    var obj = {vel : "velY", direction : dir, center : "cy"}
    return obj;
  }
  else{
    return null;
  }
}

Character.prototype.update = function(du){
  var directionObject = this.moveDirection();
  if(directionObject){
    var vel = directionObject.vel;
    var dir = directionObject.direction;
    var newX = this.cx;
    var newY = this.cy;
    if(vel === "velY"){
      newY = this.cy + dir*this.velY*du;
    }
    else{
      newX = this.cx + dir*this.velX*du;
    }

    this.oldPosX = this.cx;
    this.oldPosY = this.cy;
    this.cx = newX;
    this.cy = newY;
  }
}

Character.prototype.render = function(ctx){

  if(this.sprite){
    this.sprite.drawAt(ctx, this.cx, this.cy);
  }
  else{
<<<<<<< HEAD
    ctx.beginPath();
    ctx.arc(this.cx, this.cy, 50, 2 * Math.PI, false);
=======

    ctx.beginPath();
    ctx.arc(this.cx * consts.RENDER_SCALE_WIDTH, this.cy * consts.RENDER_SCALE_HEIGHT, 50 * consts.RENDER_SCALE_WIDTH, 2 * Math.PI, false);
>>>>>>> cf8ed94b74f00d2fae6c25e0aff96f3ff0475059
    ctx.fill();
    ctx.closePath();
  }
}

Character.prototype.setPos = function(x, y){
  this.cx = x;
  this.cy = y;
}
