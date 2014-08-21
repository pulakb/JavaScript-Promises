'use strict';

describe('Controller: PromiseinviewCtrl', function () {

  // load the controller's module
  beforeEach(module('demo1App'));

  var PromiseinviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PromiseinviewCtrl = $controller('PromiseinviewCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
