'use strict';

/**
 * @ngdoc function
 * @name demo1App.controller:FastfoodCtrl
 * @description
 * # FastfoodCtrl
 * Controller of the demo1App
 */
angular.module('demo1App')
  .controller('FastfoodCtrl', ['$scope', 'Restaurant', 'Person', function ($scope, Restaurant, Person) {

  	var person = new Person('Nick'),
  		cooper = new Restaurant(),
  		pizzaDelivered;

    $scope.pizzaOrder = function () {
    	pizzaDelivered = cooper.takeOrder('Double Cheese Pizza');
    	pizzaDelivered.then(person.eat);
    };

    $scope.pizzaDeliver = function () {
		cooper.deliverOrder();
    };

  }])
  .factory('Restaurant', ['$q', '$rootScope',function ($q, $rootScope) {
	
	// Define the constructor function.
    function Restaurant() {

    	var currentOrder;

  		this.takeOrder = function (orderedItems) {
  			currentOrder = {
  				deferred:$q.defer(),
  				items:orderedItems
  			};

  			$rootScope.orderPlaced = 'Ordered placed for ' + orderedItems;

  			return currentOrder.deferred.promise;
  		};

  		this.deliverOrder = function() {
  			currentOrder.deferred.resolve(currentOrder.items);			
  		};

  		this.problemWithOrder = function(reason) {
  			currentOrder.deferred.reject(reason);			
  		};
    };

    return Restaurant;

  }])
  .factory('Person', ['$q', '$rootScope',function ($q, $rootScope) {

  		function Person(name) {

  			this.eat = function (food) {
  				$rootScope.orderDelivered = name + 'is having ' + food;  				
  			};

  			this.hungry = function (reason) {
				$rootScope.orderDelivered = 'Sorry!!!! Pizza can\'t be delivered due to ' + reason;
  			};
  		};

  		return Person;
  }]);
