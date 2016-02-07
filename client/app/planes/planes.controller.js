'use strict';

angular.module('gameOfLifeJavascriptApp')
  .controller('PlanesCtrl', function ($scope, $routeParams) {
    var range = function(start, length) {
      var result = [];
      for (var i = start; i < start + length; i++) {
        result.push(i);
      }
      return result;
    };

    $scope.message = 'Hello';
    $scope.name = $routeParams.name;
    $scope.plane = {};
    $scope.plane.size = {};
    $scope.plane.size.x = {};
    $scope.plane.size.x.range = range(0, 10);
    $scope.plane.size.y = {};
    $scope.plane.size.y.range = range(0, 10);
    $scope.plane.aliveCells = [
      { x: 2, y: 2 },
      { x: 2, y: 3 },
      { x: 2, y: 4 }
    ];
    $scope.plane.alive = function(x, y) {
      // TODO: use a map for O(1) search
      for (var c in $scope.plane.aliveCells) {
        var cell = $scope.plane.aliveCells[c];
        if (cell.x == x && cell.y == y) {
          return true;
        }
      }
      return false;
    };
  });
