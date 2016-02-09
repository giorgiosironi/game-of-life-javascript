'use strict';

var Cell = function(x, y) {
  this.x = x;
  this.y = y;
};
var instances = new Map();
// Factory Method, Flyweight in order to be able to use Cells in Sets
Cell.fromXAndY = function(x, y) {
  var signature = x + ";" + y;
  if (!instances.has(signature)) {
    instances.set(signature, new Cell(x, y));
  }
  return instances.get(signature);
};
// static method
Cell.comparator = function(former, latter) {
  if (former.signature() < latter.signature()) {
    return -1;
  }
  if (former.signature() > latter.signature()) {
    return 1;
  }
  return 0;
};
// instance methods
Cell.prototype.signature = function() {
  return this.x + ";" + this.y;
};
Cell.prototype.neighbors = function() {
  return new Set([
    // TODO: remove duplication
    Cell.fromXAndY(this.x - 1, this.y - 1),
    Cell.fromXAndY(this.x - 1, this.y),
    Cell.fromXAndY(this.x - 1, this.y + 1),
    Cell.fromXAndY(this.x, this.y + 1),
    Cell.fromXAndY(this.x + 1, this.y + 1),
    Cell.fromXAndY(this.x + 1, this.y),
    Cell.fromXAndY(this.x + 1, this.y - 1),
    Cell.fromXAndY(this.x, this.y - 1)
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
