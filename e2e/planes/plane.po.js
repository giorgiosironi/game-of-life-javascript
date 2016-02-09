'use strict';

var PlanePage = function() {
  this.title = element(by.css('h1'));
  this.cells = element(by.css('table.plane'));
  this.buttons = {
    prev: element(by.css('button.knobs_prev')),
    next: element(by.css('button.knobs_next'))
  };
};
PlanePage.prototype.next = function() {
  this.buttons.next.click();
};

module.exports = new PlanePage();

