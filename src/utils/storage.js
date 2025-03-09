import { useState, useEffect } from 'react';

export const getCartList = () => {
  return JSON.parse(localStorage.getItem('movie')) || [];
};

export const setCartList = cartList => {
  localStorage.setItem('movie', JSON.stringify(cartList));
};

export const getSearchKeywordList = () => {
  return JSON.parse(localStorage.getItem('searchKeyword')) || [];
};

export const setSearchKeywordList = searchKeyword => {
  localStorage.setItem('searchKeyword', JSON.stringify(searchKeyword));
};
