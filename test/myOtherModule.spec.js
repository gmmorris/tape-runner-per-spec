import { test } from 'tape';
import { dec, findOnPage } from '../src/myOtherModule';
import $ from 'jquery';

test('it should decrement', function (t) {
  t.ok(dec(2) === 1, 'Decrement 2 to 1');
  t.notOk(dec(2) === 2);
  t.end();
});

test('it should find an element on the page', function (t) {
  $('body').append('<div id="gidi2"></div>');
  var elm = findOnPage('#gidi2');
  t.ok(elm.getAttribute('id') === 'gidi2');
  t.end();
});

test('it should run on a clean page', function (t) {
  t.ok($('#gidi').length === 0);
  t.end();
});
