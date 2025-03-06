import { getCartList } from '../utils/storage';

const price = () => {
  const cartList = getCartList();
  const productPrice = cartList.length * 15000;
  const discount = 0;
  const totalPrice = productPrice - discount;
  return [
    { label: '상품 금액', value: productPrice.toLocaleString() },
    { label: '할인 금액', value: discount.toLocaleString() },
    { label: '총 결제 금액', value: totalPrice.toLocaleString() },
  ];
};

export default price;
