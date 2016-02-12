'use strict';

angular.module('gameOfLifeJavascriptApp')
  .controller('NewPlaneCtrl', function($scope, dimensionRanges, Plane) {
    $scope.dimensionRanges = dimensionRanges;
    var plane = new Plane();
    $scope.toggle = function(x, y) {
      plane.toggle(x, y);
    };
    $scope.alive = function(x, y) {
      return plane.alive(x, y);
    }
  });
