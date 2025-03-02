import price from '../../constants/price';
const ProductPrice = () => {
  return (
    <div className="ProductPrice">
      {price().map(price => (
        <div className="priceList" key={price.label}>
          <span>{price.label}</span>
          <span>{price.value}원</span>
        </div>
      ))}
    </div>
  );
};

export default ProductPrice;
