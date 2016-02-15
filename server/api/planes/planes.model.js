'use strict';

var Cell = require('./cell.model');
var Rules = require('./rules.model');
var co = require('co');
var assert = require('assert');
import MongoError from 'mongodb';

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
Generation.prototype.merge = function(another) {
  var union = new Set(this.aliveCells);
  for (let cell of another.aliveCells) {
    union.add(cell);
  }
  return new Generation(union);
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
var block = new Generation([
  Cell.fromXAndY(6, 6),
  Cell.fromXAndY(6, 7),
  Cell.fromXAndY(7, 6),
  Cell.fromXAndY(7, 7)
]);
var aBlockAndBar = block.merge(verticalBar);
var all = {
  'vertical-bar': verticalBar,
  'horizontal-bar': horizontalBar,
  'block': block,
  'a-block-and-bar': aBlockAndBar
};
var Planes = function(collection) {
  this.collection = collection;
};
Planes.prototype.verticalBar = function() {
  return verticalBar;
};
Planes.prototype. horizontalBar = function() {
  return horizontalBar;
};
Planes.prototype.listAll = function() {
  var defaults = [
    {
      name: 'vertical-bar',
      title: 'Vertical Bar',
      description: 'A vertical bar that rotates to a horizontal one'
    },
    {
      name: 'horizontal-bar',
      title: 'Horizontal Bar',
      description: 'An horizontal bar that rotates to a vertical one'
    },
    {
      name: 'block',
      title: 'Block',
      description: 'A block that stays fixed'
    },
    {
      name: 'a-block-and-bar',
      title: 'A block and bar',
      description: 'A block and a bar, one stays fixed and the other rotates'
    }
  ];
  var collection = this.collection;
  return co(function*() {
    var planes = yield collection.find({}).toArray();
    return defaults.concat(planes);
  });
};
Planes.prototype.findByName = function(name, generationIndex) {
  var collection = this.collection;
  return co(function*() {
    var generation = yield collection.findOne({name:name});
    // TODO: test all this in integration
    // TODO: extract map into Generation and Cell
    if (generation === null) {
      generation = all[name];
    } else {
      generation = new Generation(generation.aliveCells.map(function(c) {
        return Cell.fromXAndY(c.x, c.y);
      }));
    }
    if (!generation) {
      return null;
    }
    for (let i = 1; i <= generationIndex; i++) {
      generation = generation.evolve();
    }
    return generation;
  });
};
Planes.prototype.create = function(plane) {
  var collection = this.collection;
  var ensureNotADefault = (name) => {
    if (typeof all[name] !== 'undefined') {
      throw new Error('plane-already-exists');
    }
  };
  return co(function*() {
    ensureNotADefault(plane.name);
    var write = yield collection.insert(plane);
    assert.equal(1, write.result.ok);
  }).catch(function(err) {
    switch (err.code) {
      case 11000:
        throw new Error('plane-already-exists');
      default:
        throw err;
    }
  });
};
Planes.prototype.statistics = function() {
  var collection = this.collection;
  return co(function*() {
    var pipeline = [
      {
        $project: {
          cells: { $size: "$aliveCells" }
        }
      },
      {
        $group: { 
          _id: 1,
          average: { $avg: "$cells" },
          minimum: { $min: "$cells" },
          maximum: { $max: "$cells" }
        }
      }
    ];
    var result = yield collection.aggregate(pipeline).next();
    if (result === null) {
      return {};
    } else {
      delete result._id;
      return { cells: result };
    }
  });
};
Planes.prototype.clean = function() {
  var collection = this.collection;
  return co(function*() {
    var operation = yield collection.deleteMany({});
    assert.equal(1, operation.result.ok);
  });
};

// TODO: export Generation for better focused tests
// and decoupling from the db
export default Planes;
