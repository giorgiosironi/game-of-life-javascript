'use strict';

angular.module('gameOfLifeJavascriptApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/planes', {
        templateUrl: 'app/planes/planes.html',
        controller: 'PlanesCtrl'
      });
  });
