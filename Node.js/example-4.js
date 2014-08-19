/*
	To demonstrate the use of promise in an application, let's make a simple HTTP server that
	does the following:

	1. Pulls the titles of recent posts stored as a JSON file asynchronously
	2. Pulls a basic HTML template asynchronously
	3. Assembles an HTML page containing the titles
	4. Sends the HTML page to the user
*/
var http = require('http');
var fs = require('fs');
var Q = require('q');

var server = http.createServer(function (req, res) {
	Q.all([getTitles(), getTemplates()])
	.spread(formatHTML)
	.then(function (html) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(html);
	})
	.catch(function (reason) {
		console.log(reason);
		res.end(reason);
	}).done();
}).listen(8000, "127.0.0.1");

function getTitles() {
	var deferred = Q.defer();
	var readFile = Q.denodeify(fs.readFile);

	readFile('./titles.json', 'utf-8').then(function(data) {
		//success handler
	  console.log('Titles are received');
	  deferred.resolve(JSON.parse(data.toString()));
	}, function(err) {
	  // error handler
	  console.log('err from titles.json:', err);
	  deferred.reject('error reading titles.json');
	});

	return deferred.promise;
}

function getTemplates() {
	var deferred = Q.defer();
	var readFile = Q.denodeify(fs.readFile);

	readFile('./template.html', 'utf-8').then(function(data) {
		//success handler
	  console.log('Template is received');
	  deferred.resolve(data.toString());
	}, function(err) {
	  // error handler
	  console.log('err from promise:', err);
	  deferred.reject('error reading template.html');
	});

	return deferred.promise;
}

function formatHTML(titles, template) {
	var html = template.replace('%', titles.join('</li><li>'));
	return html;
}