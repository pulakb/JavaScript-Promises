'use strict';

/**
 * @ngdoc function
 * @name demo1App.controller:PromiselimitationCtrl
 * @description
 * # PromiselimitationCtrl
 * Controller of the demo1App
 */
angular.module('demo1App')
  .controller('PromiselimitationCtrl', ['$q', '$timeout','$scope', function ($q, $timeout, $scope) {
	   $scope.greeting = "hello";

       var updateGreeting = function(message){
          var deferred = $q.defer();

          $timeout(function(){
              deferred.resolve(message);          
          }, 5);

          return deferred.promise;
       };

    $scope.goodbye = function () {
    	updateGreeting('goodbye').then(function (message) {
    		$scope.greeting = message;
    	});
    };

  }]);
