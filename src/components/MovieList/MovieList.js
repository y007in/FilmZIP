import { useQuery } from '@tanstack/react-query';
import { fetchGenre } from '../../api/api';
import Loading from '../Loading/Loading';
import Button from '../Button/Button';
import DelBtn from '../Button/DelBtn';
import { getCartList, setCartList } from '../../utils/storage';

const MovieList = ({ list, onClick, onDelete }) => {
  const {
    data: genre,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['genre'],
    queryFn: fetchGenre,
  });

  if (isLoading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  const genreList = genre.genres ? genre.genres : [];
  const cart = getCartList();
  const handleAddCart = movieData => {
    if (!cart.find(movie => movie.id === movieData.id)) {
      const updatedCart = [...cart, movieData];
      setCartList(updatedCart);
      alert('장바구니에 담겼습니다.');
    } else {
      alert('이미 담겨 있는 영화입니다');
    }
  };
  const handleDelCart = movieData => {
    const deleteCart = cart.filter(movie => movie.id !== movieData.id);
    setCartList(deleteCart);
    alert('장바구니에서 삭제되었습니다.');
    window.location.reload();
  };

  return (
    <ul className="mvCard">
      {list?.map(item => (
        <li className="mvInfo" key={item.id}>
          <article className="mvInfoImg">
            {item.poster_path !== null ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                alt={item.title}
              />
            ) : (
              <div className="noImage">
                <span>이미지</span>
                <span>준비중</span>
              </div>
            )}
          </article>
          <article className="mvInfoTit">
            <p className="mvInfoKrTit">{item.title}</p>
            <p className="mvInfoOgTit">{item.original_title}</p>
            <p className="mvInfoGenre">
              {item.genre_ids.map(id => (
                <span className="genre" key={id}>
                  {genreList?.find(item => item.id === id)?.name}
                </span>
              ))}
            </p>
          </article>
          {/* <article className="movieBtn">
            {onClick && (
              <Button
                text="+"
                styleType="brand"
                onClick={() => handleAddCart(item)}
              />
            )}
            {onDelete && <DelBtn onClick={() => handleDelCart(item)} />}
          </article> */}
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
