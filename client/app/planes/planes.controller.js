'use strict';

var Knobs = function(generationIndex) {
  this.generationIndex = generationIndex;
};
Knobs.prototype.decreaseGeneration = function() {
  this.generationIndex--;
};
Knobs.prototype.increaseGeneration = function() {
  this.generationIndex++;
};

angular.module('gameOfLifeJavascriptApp')
  .controller('PlanesCtrl', function ($scope, $routeParams, planesRepository) {
    var range = function(start, length) {
      var result = [];
      for (var i = start; i < start + length; i++) {
        result.push(i);
      }
      return result;
    };

    $scope.message = 'Hello';
    $scope.name = $routeParams.name;
    $scope.knobs = new Knobs(0);
    // TODO: try let to see Babel at work?
    var updateGeneration = function() {
      planesRepository.findByName($scope.name, $scope.knobs.generationIndex).then(function(response) {
        $scope.plane = response.data;
        $scope.plane.size = {};
        $scope.plane.size.x = {};
        $scope.plane.size.x.range = range(0, 10);
        $scope.plane.size.y = {};
        $scope.plane.size.y.range = range(0, 10);
        $scope.plane.alive = function(x, y) {
          // TODO: use a map for O(1) search
          for (var c in $scope.plane.aliveCells) {
            var cell = $scope.plane.aliveCells[c];
            if (cell.x === x && cell.y === y) {
              return true;
            }
          }
          return false;
        };
      });
    };
    $scope.$watch('knobs.generationIndex', updateGeneration);
  });
