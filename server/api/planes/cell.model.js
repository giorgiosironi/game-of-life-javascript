'use strict';

var Cell = function(x, y) {
  this.x = x;
  this.y = y;
};
// Factory Method
Cell.fromXAndY = function(x, y) {
  return new Cell(x, y);
};
Cell.prototype.neighbors = function() {
  return new Set([
    // TODO: remove duplication
    Cell.fromXAndY(this.x-1, this.y-1),
    Cell.fromXAndY(this.x-1, this.y),
    Cell.fromXAndY(this.x-1, this.y+1),
    Cell.fromXAndY(this.x, this.y+1),
    Cell.fromXAndY(this.x+1, this.y+1),
    Cell.fromXAndY(this.x+1, this.y),
    Cell.fromXAndY(this.x+1, this.y-1),
    Cell.fromXAndY(this.x, this.y-1),
  ]);
};
Cell.prototype.zone = function() {
  var zone = this.neighbors();
  zone.add(this);
  return zone;
};
Cell.prototype.manhattanDistance = function(anotherCell) {
  return Math.abs(this.x - anotherCell.x) + Math.abs(this.y - anotherCell.y);
};

export default Cell;
