'use strict';

import rules from './rules.model';

describe("rules of the game", function() {
  it("should kill solitary cells", function() {
    expect(rules.nextState(true, 0)).to.equal(false);
    expect(rules.nextState(true, 1)).to.equal(false);
  });

  it("should keep alive sociable cells", function() {
    expect(rules.nextState(true, 2)).to.equal(true);
    expect(rules.nextState(true, 3)).to.equal(true);
  });

  it("should kill overcrowded cells", function() {
    expect(rules.nextState(true, 4)).to.equal(false);
    expect(rules.nextState(true, 5)).to.equal(false);
    expect(rules.nextState(true, 6)).to.equal(false);
    expect(rules.nextState(true, 7)).to.equal(false);
    expect(rules.nextState(true, 8)).to.equal(false);
  });

  it("should bring to life perfectly sociable cells", function() {
    expect(rules.nextState(false, 0)).to.equal(false);
    expect(rules.nextState(false, 1)).to.equal(false);
    expect(rules.nextState(false, 2)).to.equal(false);
    expect(rules.nextState(false, 3)).to.equal(true);
    expect(rules.nextState(false, 4)).to.equal(false);
    expect(rules.nextState(false, 5)).to.equal(false);
    expect(rules.nextState(false, 6)).to.equal(false);
    expect(rules.nextState(false, 7)).to.equal(false);
    expect(rules.nextState(false, 8)).to.equal(false);
  });
});

