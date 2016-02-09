'use strict';

angular.module('gameOfLifeJavascriptApp')
  .directive('cell', function() {
    return {
      restrict: 'A',
      template: '<a title="x={{ cellX }}, y={{ cellY }}" class="cell_tooltip"></a>',
      scope: {
        cellX: '@cellX',
        cellY: '@cellY'
      }
    };
  });
