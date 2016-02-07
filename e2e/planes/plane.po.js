'use strict';

var MainPage = function() {
  this.title = element(by.css('h1'));
  this.cells = element(by.css('table.plane'));
};

module.exports = new MainPage();

