'use strict';

module.exports = [{
  source: 'ABC/*.txt',
  target: '<LOCALE>/ABC/*.txt',
  locale: 'ABC',
  path: 'ZZZ',
  error: 'Source expression "ABC/*.txt" does not match path "ZZZ"'
}];
