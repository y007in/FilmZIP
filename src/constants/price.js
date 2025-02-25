import React from 'react';

const price = () => {
  const cartList = JSON.parse(localStorage.getItem('movie')) || [];
  const productPrice = cartList.length * 15000;
  const discount = 0;
  const totalPrice = productPrice - discount;
  return [
    { label: '상품 금액', value: productPrice },
    { label: '할인 금액', value: discount },
    { label: '총 결제 금액', value: totalPrice },
  ];
};

export default price;
