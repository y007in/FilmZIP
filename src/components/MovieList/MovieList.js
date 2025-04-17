import { useNavigate } from 'react-router-dom';
import { MvGenre, MvInfoKrTit, MvInfoOgTit } from '../MovieTitle/MovieTitle';

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
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
