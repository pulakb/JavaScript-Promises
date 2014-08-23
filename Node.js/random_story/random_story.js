/*
	Display a single article's title and URL from a randomly chosen RSS feed.

	Serial flow control implemented in a simple solution

	https://www.npmjs.org/package/htmlparser

	http://stackoverflow.com/questions/21812473/using-promises-with-node-js-functions-on-example
*/

var fs = require('fs');
var request = require('request');
var htmlparser = require('htmlparser');
var Q = require('q');
var configFileName = './rss_feeds.txt';

function checkforRSSFile(file) {
 var deferred = Q.defer();

 fs.exists(file, function (result) {
 	return result ? deferred.resolve(file) : deferred.reject('invalid file');
 });

 return deferred.promise;
}

function readRSSFile(file) {
	var readFile = Q.denodeify(fs.readFile);
	return readFile(file, 'utf-8');
}

function downloadRSSFeed(feedList) {
	var deferred = Q.defer();

	feedList = feedList.toString().replace(/^\s+|\s+$/g, '').split("\n");
	var random = Math.floor(Math.random() * feedList.length);
	var feedURL = feedList[random];

	request({uri: feedURL}, function (err, res, body) {
		if (err) {
			deferred.reject(err);
		}

		if (res.statusCode != 200) {
			deferred.reject('Abnormal response status code');
		}

		deferred.resolve(body);
	});

	return deferred.promise;
}

function parseRSSFeed(rss) {
	var handler = new htmlparser.RssHandler();
	var parser = new htmlparser.Parser(handler);
	parser.parseComplete(rss);

	if(handler.dom.items === undefined) {
		throw new Error('No rss items found');
	}

	var item = handler.dom.items.shift();
	console.log(item.title);
	console.log(item.link);
}

checkforRSSFile(configFileName)
.then(readRSSFile)
.then(downloadRSSFeed)
.then(parseRSSFeed)
.fail(function (err) {
	console.log(err);
}).done();