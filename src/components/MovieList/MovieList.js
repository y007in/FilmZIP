import { useNavigate } from 'react-router-dom';
import Poster from '../Poster/Poster';
import {
  MvGenre,
  MvInfoKrTit,
  MvInfoOgTit,
  MvCertification,
} from '../MovieTitle/MovieTitle';

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
          <aside className="imgBox">
            <Poster
              key={item.id}
              item={item}
              onClick={() => navigate(`/review/${item.movieId}`)}
              count={item.count}
            />
          </aside>
          <aside className="mvInfoTit">
            <MvInfoKrTit data={item} />
            <MvInfoOgTit data={item} />
            <div className="infoList">
              <MvCertification id={item.id} />
              <MvGenre data={item.genre_ids} slice={3} />
            </div>
          </aside>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
