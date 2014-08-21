'use strict';

describe('Controller: OpenpullrequestsCtrl', function () {

  // load the controller's module
  beforeEach(module('demo1App'));

  var OpenpullrequestsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OpenpullrequestsCtrl = $controller('OpenpullrequestsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
