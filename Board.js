function Board(descr){
  for (var property in descr) {
      this[property] = descr[property];
  }
}
/**
  * @param {double} x old x position
  * @param {double} y old y position
  * @param {double} newX updated x position
  * @param {double} newY updated y position
  * @return An array with the updated positions for the character
 */
Board.prototype.moveOnBoard = function(x, y, newX, newY){
  return [newX, newY];
}
