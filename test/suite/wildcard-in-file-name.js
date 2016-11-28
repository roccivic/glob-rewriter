'use strict';

module.exports = [{
  source: 'en/test-*.txt',
  target: '<LOCALE>/test-*.txt',
  locale: 'it_IT',
  paths: [{
    input: 'en/test-1.txt',
    expected: 'it_IT/test-1.txt'
  },{
    input: 'en/test-11.txt',
    expected: 'it_IT/test-11.txt'
  }]
}];
