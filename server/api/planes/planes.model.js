'use strict';

var Cell = require('./cell.model');

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
