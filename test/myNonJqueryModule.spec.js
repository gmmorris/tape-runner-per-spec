import { test } from 'tape';
import { dup } from '../src/myNonJqueryModule';

test('it should duplicate', function (t) {
  t.ok(dup(2, 5) === 10);
  t.notOk(dup(2, 5) === 5);
  t.end();
});

test('it should not have jquery on the global scope', function (t) {
  t.ok(typeof window === 'object');
  t.ok(typeof window.jQuery === 'undefined');
  t.ok(typeof window.$ === 'undefined');
  t.end();
});
