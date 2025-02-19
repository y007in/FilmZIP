import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import MovieList from '../../components/MovieList/MovieList';
import Page from '../../components/Page/Page';
import NoResult from '../../components/NoResult/NoResult';

const ShoppingList = () => {
  const navigate = useNavigate();
  const cartList = JSON.parse(localStorage.getItem('movie')) || [];
  const totalPrice = ((cartList?.length || 0) * 15000).toLocaleString();

  return (
    <div className="shoppingList">
      <Page
        header={<Header header={'장바구니'} back />}
        footer={
          cartList.length !== 0 && (
            <Button
              styleType={'full'}
              text={`${totalPrice}원 결제하기`}
              onClick={() => navigate('/order')}
            />
          )
        }
      >
        {cartList.length !== 0 ? (
          <MovieList list={cartList} onDelete />
        ) : (
          <NoResult noResultData={'장바구니에 담기 영화가 없습니다.'} />
        )}
        <div className="price">
          <span>총 결제 금액 </span>
          <span className="totalPrice">{totalPrice}</span>
        </div>
      </Page>
    </div>
  );
};

export default ShoppingList;
