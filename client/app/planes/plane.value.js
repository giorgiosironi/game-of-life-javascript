'use strict';

// TODO: IIFE?
// TODO: maybe Generation is a better name?
var Plane = function() {
  this.name = '';
  this.title = '';
  this.description = '';
  this.aliveCells = [];
};
var indexOf = function(aliveCells, x, y) {
  // TODO: if you use let...of here "cannot find Symbol" error of ES6 compilation appears
  for (var i in aliveCells) {
    var cell = aliveCells[i];
    if (cell.x === x && cell.y === y) {
      return i;
    }
  }
  return -1;
};
Plane.prototype.toggle = function(x, y) {
  var index = indexOf(this.aliveCells, x, y);
  if (index > -1) {
    this.aliveCells.splice(index, 1);
  } else {
    this.aliveCells.push({x: x, y: y});
  }
};
Plane.prototype.alive = function(x, y) {
  return indexOf(this.aliveCells, x, y) > -1;
};
Plane.prototype.state = function() {
  return {
    title: this.title,
    description: this.description,
    aliveCells: this.aliveCells
  };
};


angular.module('gameOfLifeJavascriptApp')
  .value('Plane', Plane);
