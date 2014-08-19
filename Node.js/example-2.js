//Sequentially resolving asynchronous function
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

// return a fulfillment handler which return another promise
function SleepFunc(ms) {
  return function() {
    return sleep(ms);
  };
}

// sequence 3 promises one by one
var time_start = new Date();
sleep(1000)
  .then(SleepFunc(2000))
  .then(SleepFunc(3000))
  .then(function() {
    var time_end = new Date();
    console.log('sequence complete, time cost: ' + (time_end - time_start) + ' ms');
  });
