export const getCartList = () => {
  return JSON.parse(localStorage.getItem('movie')) || [];
};

export const setCartList = cartList => {
  localStorage.setItem('movie', JSON.stringify(cartList));
};
