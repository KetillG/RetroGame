
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
  for (var property in descr) {
      this[property] = descr[property];
  }
}

Character.prototype.board = new Board();

this.prototype.moveDirection = function(){
  var right = g_keys[this.keyRight];
  var left = g_keys[this.keyLeft];
  var up = g_keys[this.keyUp];
  var down = g_keys[this.keyDown];
  var y = up ^ down;
  var x = left ^ right;
  if(x && !y){
    var dir = right ? 1 : -1;
    var obj = {vel : "velX", : direction : dir, center : "cx"};
    return dir;
  }
  else if(y && !x){
    var dir = down ? 1 : -1;
    var obj = {vel : "velY", : direction : dir, center : "cy"}
    return obj;
  }
  else{
    return null;
  }
}

this.prototype.update(du){
  var directionObject = this.moveDirection();
  if(directionObject){
    var vel = directionObject.vel;
    var dir = directionObject.direction;
    if(vel === "velY"){
      var newY = this.cy + dir*this.velY*du;
      var
    }

  }
}

this.prototype.setPos = function(x, y){
  this.cx = x;
  this.cy = y;
}
