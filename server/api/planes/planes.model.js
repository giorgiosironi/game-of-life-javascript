'use strict';

var Cell = require('./cell.model');
var Rules = require('./rules.model');

/**
 * aliveCells can be a Set or Array of Cell instances
 */
var Generation = function(aliveCells) {
  if (aliveCells.constructor === Set) {
    aliveCells = Array.from(aliveCells);
  }
  aliveCells.sort(Cell.comparator);
  this.aliveCells = new Set(aliveCells);
};
Generation.prototype.evolve = function() {
  var candidates = () => {
    var cells = new Set();
    for (let cell of this.aliveCells) {
      var zone = cell.zone();
      for (let each of zone) {
        cells.add(each);
      }
    }
    return cells;
  };
  var nextState = (cell) => {
    var isAlive = this.aliveCells.has(cell);
    var aliveNeighbors = 0;
    for (let neighbor of cell.neighbors()) {
      if (this.aliveCells.has(neighbor)) {
        aliveNeighbors++;
      }
    }
    return Rules.nextState(isAlive, aliveNeighbors);
  };
  var nextGeneration = new Set();
  for (let cell of candidates()) {
    if (nextState(cell)) {
      nextGeneration.add(cell);
    }
  }
  return new Generation(nextGeneration);
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
    var generation = verticalBar;
    for (var i = 1; i <= generationIndex; i++) {
      generation = generation.evolve();
    }
    return generation;
  }
};

export default Planes;
