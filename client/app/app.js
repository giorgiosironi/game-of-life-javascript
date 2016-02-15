'use strict';

angular.module('gameOfLifeJavascriptApp', [
  'gameOfLifeJavascriptApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngFlash',
  'ngMessages'
])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
