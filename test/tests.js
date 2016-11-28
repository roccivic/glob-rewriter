'use strict';

var runner = require('./lib/runner');

runner.runSuite(runner.runPositiveTests, [
  'globstar-in-path-middle',
  'globstar-in-path-start',
  'locale-in-file-name',
  'locale-in-path',
  'simple',
  'wildcard-in-file-name',
  'wildcard-in-path'
]);

runner.runSuite(runner.runNegativeTests, [
  'error-malformed-input',
  'error-not-a-string',
  'error-unmatched-globs',
  'error-unmatched-path'
]);
