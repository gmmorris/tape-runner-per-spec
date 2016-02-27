import jQuery from 'jquery';

export const dec = n => n - 1;

export const findOnPage = domSelector => jQuery('body').find(domSelector)[0]
