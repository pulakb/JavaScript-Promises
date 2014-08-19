var Q = require('q');

function sleep(ms) {
  // use Q.defer() to create a deferred.
  var deferred = Q.defer();
  setTimeout(function() {
    // setTimeout to resolve the deferred, which will trigger the fulfillment handler of the promise.
    console.log('sleep for ' + ms + ' ms');
    deferred.resolve();
  }, ms);
  // return the promise of the deferred.
  return deferred.promise;
}

var time_start = new Date();
// parrallel 3 promises
Q.all([
  sleep(1000),
  sleep(2000),
  sleep(3000)
]).then(function(){
  var time_end = new Date();
  console.log('parrallel complete, time cost: ' + (time_end - time_start) + ' ms');
});