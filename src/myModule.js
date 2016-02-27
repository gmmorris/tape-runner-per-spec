import jQuery from 'jquery';

export const inc = n => n + 1;

export const addToPage = domElm => {
  jQuery('body').append(domElm);
};
