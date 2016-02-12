'use strict';

var range = function(start, length) {
  var result = [];
  for (let i = start; i < start + length; i++) {
    result.push(i);
  }
  return result;
};

angular.module('gameOfLifeJavascriptApp')
  .value('dimensionRanges', {x: range(0, 10), y: range(0, 10)});
