import { useQuery } from '@tanstack/react-query';
import { fetchGenre } from '../../api/api';
import { ClipLoader } from 'react-spinners';

const MovieList = ({ list }) => {
  const {
    data: genre,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['genre'],
    queryFn: fetchGenre,
  });

  if (isLoading) return <ClipLoader color="#5db996" />;
  if (error) return <div>Error: {error.message}</div>;

  const genreList = genre.genres ? genre.genres : [];

  return (
    <ul className="mvCard">
      {list.map(item => (
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
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
