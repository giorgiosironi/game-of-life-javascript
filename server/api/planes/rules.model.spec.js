'use strict';

import Rules from './rules.model';

describe("Rules", function() {
  it("should kill solitary cells", function() {
    expect(Rules.nextState(true, 0)).to.equal(false);
    expect(Rules.nextState(true, 1)).to.equal(false);
  });

  it("should keep alive sociable cells", function() {
    expect(Rules.nextState(true, 2)).to.equal(true);
    expect(Rules.nextState(true, 3)).to.equal(true);
  });

  it("should kill overcrowded cells", function() {
    expect(Rules.nextState(true, 4)).to.equal(false);
    expect(Rules.nextState(true, 5)).to.equal(false);
    expect(Rules.nextState(true, 6)).to.equal(false);
    expect(Rules.nextState(true, 7)).to.equal(false);
    expect(Rules.nextState(true, 8)).to.equal(false);
  });

  it("should bring to life perfectly sociable cells", function() {
    expect(Rules.nextState(false, 0)).to.equal(false);
    expect(Rules.nextState(false, 1)).to.equal(false);
    expect(Rules.nextState(false, 2)).to.equal(false);
    expect(Rules.nextState(false, 3)).to.equal(true);
    expect(Rules.nextState(false, 4)).to.equal(false);
    expect(Rules.nextState(false, 5)).to.equal(false);
    expect(Rules.nextState(false, 6)).to.equal(false);
    expect(Rules.nextState(false, 7)).to.equal(false);
    expect(Rules.nextState(false, 8)).to.equal(false);
  });
});

