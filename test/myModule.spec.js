import { test } from 'tape';
import { inc,addToPage } from '../src/myModule';
import $ from 'jquery';

test('it should increment', function (t) {
  t.ok(inc(2) === 1);
  t.notOk(inc(2) === 2);
  t.end();
});

test('it should add an element to the page', function (t) {
  let elm = $('<div id="gidi"></div>')
  addToPage(elm);
  t.ok($('#gidi').length === 1);
  t.end();
});

test('it should run on a clean page', function (t) {
  t.ok($('#gidi2').length === 0);
  t.end();
});
