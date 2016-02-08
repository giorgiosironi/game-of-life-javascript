'use strict';

var Cell = function(x, y) {
  this.x = x;
  this.y = y;
};
// Factory Method
Cell.fromXAndY = function(x, y) {
  return new Cell(x, y);
};
Cell.prototype.neighbors = function() {
  return [
    Cell.fromXAndY(this.x, this.y),
    Cell.fromXAndY(this.x, this.y),
    Cell.fromXAndY(this.x, this.y),
    Cell.fromXAndY(this.x, this.y),
    Cell.fromXAndY(this.x, this.y),
    Cell.fromXAndY(this.x, this.y),
    Cell.fromXAndY(this.x, this.y),
    Cell.fromXAndY(this.x, this.y),
  ];
};

export default Cell;
