'use strict';

module.exports = [{
  source: 'resources/en/**/*.txt',
  target: 'resources/<LOCALE>/**/*.txt',
  locale: 'es',
  paths: [{
    input: 'resources/en/foo/test.txt',
    expected: 'resources/es/foo/test.txt'
  }, {
    input: 'resources/en/foo/bar/test.txt',
    expected: 'resources/es/foo/bar/test.txt'
  }]
}];
