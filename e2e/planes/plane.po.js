'use strict';

var PlanePage = function() {
  this.title = element(by.css('h1'));
  this.cells = element(by.css('table.plane'));
  this.generationIndex = element(by.css('.generation .index'));
  this.buttons = {
    prev: element(by.css('button.knobs_prev')),
    next: element(by.css('button.knobs_next'))
  };
};
PlanePage.prototype.prev = function() {
  this.buttons.prev.click();
};
PlanePage.prototype.next = function() {
  this.buttons.next.click();
};
PlanePage.prototype.waitForCurrentShownGeneration = function(index) {
  browser.wait(() => {
    return this.generationIndex.getText(() => {
      return text == index;
    });
  });
};

module.exports = new PlanePage();

