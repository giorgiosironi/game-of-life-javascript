'use strict';

angular.module('gameOfLifeJavascriptApp')
  .controller('NewPlaneCtrl', function($scope, $location, Flash, dimensionRanges, Plane, planesRepository) {
    $scope.dimensionRanges = dimensionRanges;
    $scope.plane = new Plane();
    $scope.toggle = function(x, y) {
      $scope.plane.toggle(x, y);
    };
    $scope.alive = function(x, y) {
      return $scope.plane.alive(x, y);
    };
    $scope.create = function(form) {
      if (form.$valid) {
      // TODO: better name, maybe plane and we should rename the existing Plane instance
        planesRepository.create(
          $scope.plane.name,
          $scope.plane.state()
        ).then(function() {
          $location.url('/planes/' + $scope.plane.name);
        }, function(err) {
          Flash.create('danger', 'Could not create the plane: ' + err.message);
        });
      } else {
        Flash.create('danger', 'Please check the form for errors');
      }
    };
  });
