'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

/*
describe('my app', function() {

  browser.get('index.html');

  it('should automatically redirect to /projects when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("#/projects");
  });


  describe('projects', function() {

    beforeEach(function() {
      browser.get('#/projects');
    });


    it('should render projects when user navigates to /projects', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for projects/);
    });

  });



});
*/

describe('Protractor Demo App', function() {
  it('should add one and two', function() {
    browser.get('http://juliemr.github.io/protractor-demo/');
    element(by.model('first')).sendKeys(1);
    element(by.model('second')).sendKeys(2);

    element(by.id('gobutton')).click();

    expect(element(by.binding('latest')).getText()).
      toEqual('3'); // This is wrong!
  });
});
