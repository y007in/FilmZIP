import { MvGenre, MvInfoKrTit, MvInfoOgTit } from '../MovieTitle/MovieTitle';
import Loading from '../Loading/Loading';
import Button from '../Button/Button';
import DelBtn from '../Button/DelBtn';
import { getCartList, setCartList } from '../../utils/storage';
import { useNavigate } from 'react-router-dom';

const MovieList = ({ list, onClick, onDelete }) => {
  const navigate = useNavigate();

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
        <li
          className="mvInfo"
          key={item.id}
          onClick={() => navigate(`/movie/${item.id}`)}
        >
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
            <MvInfoKrTit data={item} />
            <MvInfoOgTit data={item} />
            <MvGenre data={item.genre_ids} />
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
