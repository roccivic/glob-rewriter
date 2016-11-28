'use strict';

module.exports = [{
  source: '**/*.txt',
  target: '<LOCALE>/**/*.txt',
  locale: 'it_IT',
  paths: [{
    input: 'test.txt',
    expected: 'it_IT/test.txt'
  },{
    input: 'a/b/c/test.txt',
    expected: 'it_IT/a/b/c/test.txt'
  }]
},{
  source: '**/*.txt',
  target: '**/<LOCALE>/*.txt',
  locale: 'it_IT',
  paths: [{
    input: 'test.txt',
    expected: 'it_IT/test.txt'
  },{
    input: 'a/b/c/test.txt',
    expected: 'a/b/c/it_IT/test.txt'
  }]
}];
