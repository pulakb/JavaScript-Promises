'use strict';

/**
 * @ngdoc function
 * @name demo1App.controller:OpenpullrequestsCtrl
 * @description
 * # OpenpullrequestsCtrl
 * Controller of the demo1App
 */
angular.module('demo1App')
  .controller('OpenpullrequestsCtrl',['$scope', 'GithubService', function ($scope, GithubService) {
    GithubService.getPullRequests().then(function (data) {
    	$scope.pullRequests = data;
    }, function (err) {
    	console.log(err);
    });
  }])
  .factory('GithubService', [
  	'$q', '$http', function ($q, $http) {
		var getPullRequests = function () {
			var deferred = $q.defer();
			$http.get('https://api.github.com/repos/angular/angular.js/issues')
			.success(function (data) {
				deferred.resolve(data);
			})
			.error(function (reason) {
				deferred.reject(reason);
			});

			return deferred.promise;
		};

		return {
			getPullRequests: getPullRequests
		};
	}]);