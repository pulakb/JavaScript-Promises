'use strict';

/**
 * @ngdoc function
 * @name demo1App.controller:FlightdashboradCtrl
 * @description
 * # FlightdashboradCtrl
 * Controller of the demo1App
 */
angular.module('demo1App')
  .controller('FlightdashboradCtrl', ['$scope', '$q', 'Departures', 'Flights', 'Weather', function ($scope, $q, Departures, Flights, Weather) {
    $scope.getDashboradDetails = function () {

	    var departures = new Departures();
	    var flights = new Flights();
	    var weather = new Weather();

	    var departureData;
	    var emailId;

    	emailId = $scope.emailId;
    	departureData = departures.getDeparturesDetails(emailId);

    	//Display the promise object
    	//console.log(departureData);
    	
    	departureData.then(function (respose) {    		
    		$q.all([flights.getFlightsDetails(respose.flightID), weather.getWeatherDetails(respose.date)])
    		.then(function (res) {
    			//Update UI
    			$scope.flightName = res[0].airlineName;
    			$scope.flightID = respose.flightID;
    			$scope.departureDate = respose.date;
    			$scope.sky = res[1].sky;
    			$scope.temparature = res[1].temparature;

    			$scope.showResult = true;

    		}, function (err) {
				console.log(res);
    		});

    	}, function (err) {
	    	console.log(err);
	    });
	    /*catch(function (err) {
	    	console.log('I am in catch of departureData');
	    }).
	    finally(function () {
	    	console.log('I am in finally of departureData');
	    });*/

	    $scope.hideResult = function () {
    		$scope.showResult = false;
    	};
    };
  }])
  .factory('Departures',['$q', '$http', function ($q, $http) {
  		function Departures() {
  			var departureDetails = {};
 				departureDetails.deferred = $q.defer();
 				departureDetails.departureData;

 			this.getDeparturesDetails = function(emailId) { 				
 				$http.get('/data/departures.json')
				.success(function (data) {	
					departureDetails.departureData = data[emailId];					
					departureDetails.deferred.resolve(departureDetails.departureData);
				})
				.error(function (reason) {
					departureDetails.deferred.reject(reason);
				});

				return departureDetails.deferred.promise;
 			}
  		}

  		return Departures;
  }])
  .factory('Flights',['$q', '$http', function ($q, $http) {
		function Flights() {
			var flightsDetails = {};
 				flightsDetails.deferred = $q.defer();
 				flightsDetails.flightsData;

 			this.getFlightsDetails = function(flightId) { 				
 				$http.get('/data/flights.json')
				.success(function (data, status, header, config) {
					flightsDetails.flightsData = data[flightId];					
					flightsDetails.deferred.resolve(flightsDetails.flightsData);
				})
				.error(function (reason, status, header, config) {
					flightsDetails.deferred.reject(reason);
				});

				return flightsDetails.deferred.promise;
 			};
		}

  		return Flights;
  }])
  .factory('Weather',['$q', '$http', function ($q, $http) {
		function Weather() {
			var weatherDetails = {};
 				weatherDetails.deferred = $q.defer();
 				weatherDetails.flightsData;

 			this.getWeatherDetails = function(date) { 				
 				$http.get('/data/weather.json')
				.success(function (data) {	
					weatherDetails.weatherData = data[date];					
					weatherDetails.deferred.resolve(weatherDetails.weatherData);
				})
				.error(function (reason) {
					weatherDetails.deferred.reject(reason);
				});

				return weatherDetails.deferred.promise;
 			}
		}

  		return Weather;
  }]);
