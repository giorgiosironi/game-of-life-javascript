'use strict';

// TODO: inject generationIndex?
var Knobs = function() {
  this.generationIndex = 0;
};
Knobs.prototype.decreaseGeneration = function() {
  this.generationIndex--;
};
Knobs.prototype.increaseGeneration = function() {
  this.generationIndex++;
};
angular.module('gameOfLifeJavascriptApp')
  .service('knobs', Knobs);
