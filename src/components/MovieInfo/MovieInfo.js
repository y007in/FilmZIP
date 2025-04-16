import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchMovieDetail } from '../../api/api';
import {
  MvGenre,
  MvInfoKrTit,
  MvInfoOgTit,
  MvInfoOverview,
} from '../../components/MovieTitle/MovieTitle';
import Banner from '../Banner/Banner';

const MovieInfo = () => {
  const { id } = useParams();
  const {
    data: movieData,
    isLoading: dataLoading,
    error: dataError,
  } = useQuery({
    queryKey: ['movieDetail', id],
    queryFn: () => fetchMovieDetail({ queryKey: ['movieDetail', id] }),
  });
  return (
    <section className="movieInfo">
      <div className="movieMeta">
        <Banner text={movieData.release_date.substr(0, 4)} />
        <Banner text={`${movieData.runtime}분`} />
        <MvGenre data={movieData?.genres} />
      </div>
      <article className="movieDescription">
        <MvInfoKrTit data={movieData} />
        <MvInfoOgTit data={movieData} />
        <MvInfoOverview data={movieData} />
      </article>
    </section>
  );
};

export default MovieInfo;
