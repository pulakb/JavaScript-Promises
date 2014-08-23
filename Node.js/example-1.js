var fs = require('fs');
var Q = require('q');

// node.js callback style function
/*fs.stat('package.json', function(err, stat) {
  if (err) {
    console.log('err from callback:', err);
  } else {
    console.log('size from callback:', stat.size);
  }
});*/

// use Q.denodeify() to translate the callback style function to a 
//promise style function
var stat = Q.denodeify(fs.stat);

// promise style function
stat('country.json').then(function(stat) {
	//success handler
    console.log('size from promise:', stat.size);
}, function(err) {
   // error handler
   console.log('err from promise:', err);
});