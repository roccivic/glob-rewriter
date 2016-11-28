'use strict';

var tap = require('tap');
var rewriter = require('../..');

module.exports = {
  runSuite: function(cb, suite) {
    for (var i = 0; i < suite.length; i++) {
      var tests = require('../suite/' + suite[i]);
      cb(tests, suite[i]);
    }
  },
  runPositiveTests: function(tests, suite) {
    for (var i = 0; i < tests.length; i++) {
      var test = tests[i];
      for (var i = 0; i < test.paths.length; i++) {
        var path = test.paths[i];
        var result = rewriter.rewrite(
          path.input,
          test.locale,
          test.source,
          test.target
        );
        tap.equal(result, path.expected, suite);
      }
    }
  },
  runNegativeTests: function(tests, suite) {
    for (var i = 0; i < tests.length; i++) {
      var test = tests[i];
      try {
        rewriter.rewrite(
          test.path,
          test.locale,
          test.source,
          test.target
        );
        tap.fail(suite + ': Exception not thrown');
      } catch (e) {
        tap.equal(e.message, test.error);
      }
    }
  }
};
