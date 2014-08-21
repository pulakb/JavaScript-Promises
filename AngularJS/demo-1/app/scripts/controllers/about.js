'use strict';

/**
 * @ngdoc function
 * @name demo1App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the demo1App
 */
angular.module('demo1App')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
