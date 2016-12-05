'use strict';

var tape = require('tape');
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
      for (var j = 0; j < test.paths.length; j++) {
        var path = test.paths[j];
        (function(path, result) {
          tape(suite, function(t) {
            t.plan(1);
            t.equal(result, path.expected, suite);
          });
        }(
          path,
          rewriter.rewrite(
            path.input,
            test.locale,
            test.source,
            test.target
          )
        ));
      }
    }
  },
  runNegativeTests: function(tests, suite) {
    for (var i = 0; i < tests.length; i++) {
      (function(test) {
        tape(suite, function(t) {
          t.plan(1);
          try {
            rewriter.rewrite(
              test.path,
              test.locale,
              test.source,
              test.target
            );
            t.fail(suite + ': Exception not thrown');
          } catch (e) {
            t.equal(e.message, test.error);
          }
        });
      }(tests[i]));
    }
  }
};
