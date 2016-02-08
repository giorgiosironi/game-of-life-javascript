'use strict';

var Planes = require('./planes.model');
var Cell = require('./cell.model');

describe('Planes evolution throughout the generations', function() {
  it('should rotate a bar in the next generation', function() {
    var verticalBar = Planes.verticalBar();
    var horizontalBar = Planes.horizontalBar();
    verticalBar.evolve().should.deep.equal(horizontalBar);
  });
});
