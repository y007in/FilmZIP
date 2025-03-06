import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import MovieList from '../../components/MovieList/MovieList';
import Page from '../../components/Page/Page';
import NoResult from '../../components/NoResult/NoResult';
import ProductPrice from '../../components/ProductPrice/ProductPrice';
import price from '../../constants/price';
import { getCartList } from '../../utils/storage';

const ShoppingList = () => {
  const navigate = useNavigate();
  const cartList = getCartList();

  return (
    <div className="shoppingList">
      <Page
        header={<Header header={'장바구니'} back />}
        footer={
          cartList.length !== 0 && (
            <Button
              styleType={'full'}
              styleSize={'large'}
              text={`${price()[2].value} 원 결제하기`}
              onClick={() => navigate('/order')}
            />
          )
        }
      >
        <div className="shoppingContainer">
          {cartList.length !== 0 ? (
            <>
              <MovieList list={cartList} onDelete />
              <ProductPrice />
            </>
          ) : (
            <NoResult noResultData={'장바구니에 담기 영화가 없습니다.'} />
          )}
        </div>
      </Page>
    </div>
  );
};

export default ShoppingList;
