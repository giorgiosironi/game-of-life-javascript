'use strict';

var Planes = require('./planes.model');

describe('Planes evolution throughout the generations', function() {
  xit('should rotate a bar in the next generation', function() {
    var verticalBar = Planes.verticalBar();
    var horizontalBar = Planes.horizontalBar();
    verticalBar.evolve().should.equal(horizontalBar);
  });
});
