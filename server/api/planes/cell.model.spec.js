'use strict';

var Cell = require('./cell.model');

describe('Cell', function() {
  it('should generate the list of its neighbors', function() {
    var origin = Cell.fromXAndY(0, 0);
    var neighbors = origin.neighbors();
    neighbors.size.should.equal(8);
    for (let i in neighbors) {
      var neighbor = neighbors[i];
      expect(origin.manhattanDistance(neighbor)).to.be.at.least(1);
      expect(origin.manhattanDistance(neighbor)).to.be.at.most(2);
    }
  });

  it('should generate the zone of potentially alive cells for the next generation', function() {
    var origin = Cell.fromXAndY(0, 0);
    var neighbors = origin.zone();
    neighbors.size.should.equal(9);
    for (let i in neighbors) {
      var neighbor = neighbors[i];
      expect(origin.manhattanDistance(neighbor)).to.be.at.least(0);
      expect(origin.manhattanDistance(neighbor)).to.be.at.most(2);
    }
  });
});
