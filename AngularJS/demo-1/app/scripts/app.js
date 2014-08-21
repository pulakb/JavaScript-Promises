'use strict';

/**
 * @ngdoc overview
 * @name demo1App
 * @description
 * # demo1App
 *
 * Main module of the application.
 */
angular
  .module('demo1App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/openpullrequests', {
        templateUrl: 'views/openpullrequests.html',
        controller: 'OpenpullrequestsCtrl'
      })
      .when('/fastfood', {
        templateUrl: 'views/fastfood.html',
        controller: 'FastfoodCtrl'
      })
      .when('/article', {
        templateUrl: 'views/article.html',
        controller: 'ArticleCtrl'
      })
      .when('/flightdashborad', {
        templateUrl: 'views/flightdashborad.html',
        controller: 'FlightdashboradCtrl'
      })
      .when('/promiseinview', {
        templateUrl: 'views/promiseinview.html',
        controller: 'PromiseinviewCtrl'
      })
      .when('/promiselimitation', {
        templateUrl: 'views/promiselimitation.html',
        controller: 'PromiselimitationCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
