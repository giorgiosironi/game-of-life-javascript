'use strict';

var Cell = require('./cell.model');

describe('Cell', function() {
  it('should generate the list of its neighbors', function() {
    // TODO: use let? const?
    var origin = Cell.fromXAndY(0, 0);
    var neighbors = origin.neighbors();
    neighbors.length.should.equal(8);
    for (var i in neighbors) {
      var neighbor = neighbors[i];
      origin.manhattanDistance(neighbor).should.be.least(1);
      origin.manhattanDistance(neighbor).should.be.most(2);
    }
  });
});
