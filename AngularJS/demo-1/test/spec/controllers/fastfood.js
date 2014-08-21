'use strict';

describe('Controller: FastfoodCtrl', function () {

  // load the controller's module
  beforeEach(module('demo1App'));

  var FastfoodCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FastfoodCtrl = $controller('FastfoodCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
