'use strict';

module.exports = [{
  source: 'ABC/*.foo.*',
  target: '<LOCALE>/ABC/*.txt',
  locale: 'ABC',
  path: 'ABC',
  error: 'Globs in source expression "ABC/*.foo.*" do not match globs in target expression "<LOCALE>/ABC/*.txt"'
},{
  source: 'ABC/**.foo.txt',
  target: '<LOCALE>/ABC/*.txt',
  locale: 'ABC',
  path: 'ABC',
  error: 'Globs in source expression "ABC/**.foo.txt" do not match globs in target expression "<LOCALE>/ABC/*.txt"'
},{
  source: 'ABC/**/*.txt',
  target: '<LOCALE>/ABC/*.txt/**',
  locale: 'ABC',
  path: 'ABC',
  error: 'Globs in source expression "ABC/**/*.txt" do not match globs in target expression "<LOCALE>/ABC/*.txt/**"'
}];
