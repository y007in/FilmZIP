import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import MovieList from '../../components/MovieList/MovieList';

const ShoppingList = () => {
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
      <Header header={'장바구니'} back rightBtn />
      <MovieList list={dummy} />
      <Button type={'full'} text={'주문하기'} />
    </div>
  );
};

export default ShoppingList;
