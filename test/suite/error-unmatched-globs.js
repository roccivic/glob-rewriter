'use strict';

module.exports = [{
  source: 'ABC/*.foo.*',
  target: '<LOCALE>/ABC/*.txt',
  locale: 'ABC',
  path: 'ABC',
  error: 'Globs in source expression do not match globs in target expression'
},{
  source: 'ABC/**.foo.txt',
  target: '<LOCALE>/ABC/*.txt',
  locale: 'ABC',
  path: 'ABC',
  error: 'Globs in source expression do not match globs in target expression'
},{
  source: 'ABC/**/*.txt',
  target: '<LOCALE>/ABC/*.txt/**',
  locale: 'ABC',
  path: 'ABC',
  error: 'Globs in source expression do not match globs in target expression'
}];
