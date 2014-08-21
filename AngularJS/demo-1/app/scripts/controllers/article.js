'use strict';

/**
 * @ngdoc function
 * @name demo1App.controller:ArticleCtrl
 * @description
 * # ArticleCtrl
 * Controller of the demo1App
 */
angular.module('demo1App')
  .controller('ArticleCtrl', ['$scope', 'Article', 'Author', function ($scope, Article, Author) {

    $scope.findAuthor = function () {

	    var article = new Article();
	    var author = new Author();
	    var articleData;
	    var articleId;

    	articleId = $scope.articleId;
    	articleData = article.getArticleDetails(articleId);
    	
    	articleData.then(author.getAuthorDetails, function (err) {
	    	console.log(err);
	    }).then(function (res) {
			$scope.showResult = true;
	    }, function (err) {

	    });
    };

    $scope.hideResult = function () {
    	$scope.showResult = false;
    };

  }])
  .factory('Article', ['$q', '$http', function ($q, $http) {
 		function Article() {
 			var articleDetails = {};
 				articleDetails.deferred = $q.defer();
 				articleDetails.articleData;

 			this.getArticleDetails = function(articleId) { 				
 				$http.get('/data/articles.json')
				.success(function (data) {	
					articleDetails.articleData = data[articleId];					
					articleDetails.deferred.resolve(articleDetails.articleData);
				})
				.catch(function (reason) {
					articleDetails.deferred.reject(reason);
				});

				return articleDetails.deferred.promise;
 			}
 		}

 		return Article;
  }])
  .factory('Author', ['$rootScope', '$http', function ($rootScope, $http) {
  		function Author() {
  			var authorData;

  			this.getAuthorDetails = function (data) {
  				$http.get('/data/authors.json')
				.success(function (aData) {
					authorData = aData[data.authorId];
					$rootScope.auName = authorData.name;
					$rootScope.auCity = authorData.city;
				})
				.error(function (reason) {
					console.log(reason);
				});
  			}
  		}

  		return Author;
  }]);