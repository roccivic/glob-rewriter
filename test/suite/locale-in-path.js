'use strict';

module.exports = [{
  source: '**/*.txt',
  target: '**/<LOCALE>/*.txt',
  locale: 'it',
  paths: [{
    input: 'test.txt',
    expected: 'it/test.txt'
  },{
    input: 'a/b/c/test.txt',
    expected: 'a/b/c/it/test.txt'
  }]
}];
