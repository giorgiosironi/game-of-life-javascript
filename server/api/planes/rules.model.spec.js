'use strict';

// TODO: uniform to import
var Rules = require('./rules.model');

describe("Rules", function() {
  it("should kill solitary cells", function() {
    Rules.nextState(true, 0).should.equal(false);
    Rules.nextState(true, 1).should.equal(false);
  });

  it("should keep alive sociable cells", function() {
    Rules.nextState(true, 2).should.equal(true);
    Rules.nextState(true, 3).should.equal(true);
  });

  it("should kill overcrowded cells", function() {
    Rules.nextState(true, 4).should.equal(false);
    Rules.nextState(true, 5).should.equal(false);
    Rules.nextState(true, 6).should.equal(false);
    Rules.nextState(true, 7).should.equal(false);
    Rules.nextState(true, 8).should.equal(false);
  });

  it("should bring to life perfectly sociable cells", function() {
    Rules.nextState(false, 0).should.equal(false);
    Rules.nextState(false, 1).should.equal(false);
    Rules.nextState(false, 2).should.equal(false);
    Rules.nextState(false, 3).should.equal(true);
    Rules.nextState(false, 4).should.equal(false);
    Rules.nextState(false, 5).should.equal(false);
    Rules.nextState(false, 6).should.equal(false);
    Rules.nextState(false, 7).should.equal(false);
    Rules.nextState(false, 8).should.equal(false);
  });
});

