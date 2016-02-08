'use strict';

var Generation = function(aliveCells) {
  this.aliveCells = aliveCells;
};
Generation.prototype.evolve = function() {
  return this;
};

var horizontalBar = new Generation([ {x: 2, y: 2}, {x: 2, y: 3}, {x: 2, y: 4} ]);
var verticalBar = new Generation([ {x: 1, y: 3}, {x: 2, y: 3}, {x: 3, y: 3} ]);
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
