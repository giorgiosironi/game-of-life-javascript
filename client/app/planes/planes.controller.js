'use strict';

angular.module('gameOfLifeJavascriptApp')
  .controller('PlanesCtrl', function ($scope, $routeParams) {
    $scope.message = 'Hello';
    $scope.name = $routeParams.name;
  });
