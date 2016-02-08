'use strict';

var Cell = require('./cell.model');
var Rules = require('./rules.model');

var Generation = function(aliveCells) {
  // TODO: accept both Array and Set in input
  aliveCells.sort(function(former, latter) {
    if (former.signature() < latter.signature()) {
      return -1;
    }
    if (former.signature() > latter.signature()) {
      return 1;
    }
    return 0;
  });
  this.aliveCells = new Set(aliveCells);
};
Generation.prototype.evolve = function() {
  var candidates = new Set();
  for (var cell of this.aliveCells.values()) {
    var zone = cell.zone();
    for (var each of zone.values()) {
      candidates.add(each);
    }
  }
  var nextGeneration = new Set();
  for (var cell of candidates.values()) {
    var isAlive = this.aliveCells.has(cell);
    var aliveNeighbors = 0;
    for (var neighbor of cell.neighbors().values()) {
      if (this.aliveCells.has(neighbor)) {
        aliveNeighbors++;
      }
    }
    var nextState = Rules.nextState(isAlive, aliveNeighbors);
    if (nextState) {
      nextGeneration.add(cell);
    }
  }
  return new Generation(Array.from(nextGeneration));
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
