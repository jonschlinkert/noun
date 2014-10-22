'use strict';

var util = require('util');
var Noun = require('./');

/**
 * The readem shows how to create an instance of Noun,
 * this shows how to inherit `Noun`.
 */

function App(options) {
  Noun.call(this, 'app');
  this.context = {};
}
util.inherits(App, Noun);

/**
 * Add some methods to our app
 */

App.prototype.set = function(key, value) {
  this.context[key] = value;
  return this;
};

App.prototype.get = function(key) {
  return this.context[key];
};


/**
 * Usage
 *
 * Create an instance of `App`
 */

var app = new App();

/**
 * Define some plugins
 */

function foo(options) {
  return function (foo) {
    this.set('foo', options);
  }
}
function bar(options) {
  return function (foo) {
    this.set('bar', options);
  }
}
function baz(options) {
  return function (foo) {
    this.set('baz', options);
  }
}

/**
 * Run the plugins!
 */

app
  .plugin(foo({a: 'b'}))
  .plugin(bar({c: 'd'}))
  .plugin(baz({e: 'f'}))


console.log(app);
