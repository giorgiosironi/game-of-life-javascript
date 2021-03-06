'use strict';

var rules = {
  nextState: function(currentState, aliveNeighbors) {
    if (aliveNeighbors === 3) {
      return true;
    }
    if (aliveNeighbors >= 2 && aliveNeighbors <= 3) {
      return currentState;
    }
    return false;
  }
};

export default rules;

