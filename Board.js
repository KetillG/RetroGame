function Board(descr){
  for (var property in descr) {
      this[property] = descr[property];
  }
}

this.prototype.moveOnBoard = function(x, y, newX, newY){
  return [newX, newY];
}
