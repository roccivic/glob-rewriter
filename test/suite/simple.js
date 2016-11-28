'use strict';

module.exports = [{
  source: 'test.txt',
  target: '<LOCALE>/test.txt',
  locale: 'it_IT',
  paths: [{
        input: 'test.txt',
        expected: 'it_IT/test.txt'
      }]
},{
  source: 'foo/en.lproj/bar/test.txt',
  target: 'foo/<LOCALE>.lproj/bar/test.txt',
  locale: 'zh',
  paths: [{
    input: 'foo/en.lproj/bar/test.txt',
    expected: 'foo/zh.lproj/bar/test.txt'
  }]
}];
