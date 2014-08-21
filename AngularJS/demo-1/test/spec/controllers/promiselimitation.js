'use strict';

describe('Controller: PromiselimitationCtrl', function () {

  // load the controller's module
  beforeEach(module('demo1App'));

  var PromiselimitationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PromiselimitationCtrl = $controller('PromiselimitationCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
