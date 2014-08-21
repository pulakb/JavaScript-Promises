'use strict';

/**
 * @ngdoc function
 * @name demo1App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the demo1App
 */
angular.module('demo1App')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
