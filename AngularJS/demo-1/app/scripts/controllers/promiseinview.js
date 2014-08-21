'use strict';

/**
 * @ngdoc function
 * @name demo1App.controller:PromiseinviewCtrl
 * @description
 * # PromiseinviewCtrl
 * Controller of the demo1App
 */
angular.module('demo1App')
  .controller('PromiseinviewCtrl', ['$scope', 'ViewPromise', function ($scope, ViewPromise) {
	  ViewPromise.getMessages().then(function(messages) {
	    $scope.messages = messages;
	  });
  }])
  .factory('ViewPromise', ['$q', '$timeout', function ($q, $timeout) {
  	var getMessages = function() {
  		var deferred = $q.defer();

  		$timeout(function() {
  			deferred.resolve(['Hello', 'Promise']);
  		}, 2000);

  		return deferred.promise;
  	};

  	return {
  		getMessages: getMessages
  	};

  }]);
