'use strict';

angular.module('gameOfLifeJavascriptApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/planes/:name', {
        templateUrl: 'app/planes/plane.html',
        controller: 'PlanesCtrl'
      });
  });
