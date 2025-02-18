import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import MovieList from '../../components/MovieList/MovieList';
import Page from '../../components/Page/Page';
import NoResult from '../../components/NoResult/NoResult';

const ShoppingList = () => {
  const navigate = useNavigate();
  const cartList = JSON.parse(localStorage.getItem('movie')) || [];

  return (
    <div className="shoppingList">
      <Page
        header={<Header header={'장바구니'} back />}
        footer={
          cartList.length !== 0 && (
            <Button
              styleType={'full'}
              text={'주문하기'}
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
      </Page>
    </div>
  );
};

export default ShoppingList;
