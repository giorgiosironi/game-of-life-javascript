'use strict';

var Cell = function(x, y) {
  this.x = x;
  this.y = y;
};
// Factory Method
Cell.fromXAndY = function(x, y) {
  return new Cell(x, y);
};

var Generation = function(aliveCells) {
  this.aliveCells = aliveCells;
};
Generation.prototype.evolve = function() {
  return this;
};

var horizontalBar = new Generation([
  Cell.fromXAndY(2, 2),
  Cell.fromXAndY(2, 3),
  Cell.fromXAndY(2, 4)
]);
var verticalBar = new Generation([
  Cell.fromXAndY(1, 3),
  Cell.fromXAndY(2, 3),
  Cell.fromXAndY(3, 3)
]);
var Planes = {
  verticalBar: function() {
    return verticalBar;
  },
  horizontalBar: function() {
    return horizontalBar;
  },
  findByName: function(name, generationIndex) {
    return verticalBar;
  }
};

export default Planes;
