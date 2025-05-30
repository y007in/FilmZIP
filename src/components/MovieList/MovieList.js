import { useNavigate } from 'react-router-dom';
import { MvGenre, MvInfoKrTit, MvInfoOgTit } from '../MovieTitle/MovieTitle';
import Poster from '../Poster/Poster';

const MovieList = ({ list }) => {
  const navigate = useNavigate();

  return (
    <ul className="mvCard">
      {list?.map(item => (
        <li
          className="mvInfo"
          key={item.id}
          onClick={() => navigate(`/movie/${item.id}`)}
        >
          <Poster
            key={item.id}
            item={item}
            onClick={() => navigate(`/review/${item.movieId}`)}
            count={item.count}
          />
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
