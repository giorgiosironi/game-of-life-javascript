'use strict';

var Planes = require('./planes.model');
var Cell = require('./cell.model');

describe('Planes evolution throughout the generations', function() {
  it('should rotate a bar in the next generation', function() {
    var planes = new Planes(null);
    var verticalBar = planes.verticalBar();
    var horizontalBar = planes.horizontalBar();
    expect(verticalBar.evolve()).to.deep.equal(horizontalBar);
  });
});
