'use strict';

angular.module('gameOfLifeJavascriptApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/planes/:name', {
        templateUrl: 'app/planes/plane.html',
        controller: 'PlanesCtrl'
      })
      .when('/new-plane', {
        templateUrl: 'app/planes/new-plane.html',
        controller: 'NewPlaneCtrl'
      });
  });
