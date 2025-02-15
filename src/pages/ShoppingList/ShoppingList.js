import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import MovieList from '../../components/MovieList/MovieList';
import Page from '../../components/Page/Page';

const ShoppingList = () => {
  const navigate = useNavigate();
  const dummy = [
    {
      id: 1,
      title: '오',
      poster_path: null,
      original_title: 'dh',
      genre_ids: [28],
    },
  ];
  return (
    <div className="shoppingList">
      <Page
        header={<Header header={'장바구니'} back />}
        footer={
          <Button
            styleType={'full'}
            text={'주문하기'}
            onClick={() => navigate('/order')}
          />
        }
      >
        <MovieList list={dummy} />
      </Page>
    </div>
  );
};

export default ShoppingList;
