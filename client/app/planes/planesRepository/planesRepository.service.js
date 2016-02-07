'use strict';

angular.module('gameOfLifeJavascriptApp')
  .service('planesRepository', function ($http) {
    this.findByName = function(name) {
      return $http.get('/api/planes/' + name);
    };
  });
