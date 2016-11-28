'use strict';

module.exports = [{
  source: 'en/loc*/test.txt',
  target: '<LOCALE>/loc*/test.txt',
  locale: 'pt',
  paths: [{
    input: 'en/localisable/test.txt',
    expected: 'pt/localisable/test.txt'
  },{
    input: 'en/loc2/test.txt',
    expected: 'pt/loc2/test.txt'
  }]
}];
