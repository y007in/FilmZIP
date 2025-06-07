import { useParams } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import Banner from '../Banner/Banner';
import Loading from '../Loading/Loading';
import {
  fetchMovieDetail,
  fetchMovieCredit,
  fetchMovieRelease,
} from '../../api/api';
import {
  MvCertification,
  MvCreditSection,
  MvGenre,
  MvInfoKrTit,
  MvInfoOgTit,
  MvInfoOverview,
  MvInfoTagLine,
} from '../../components/MovieTitle/MovieTitle';

const MovieInfo = ({ direction }) => {
  const direct_type = ['row', 'col'].includes(direction) ? direction : '';
  const { id } = useParams();
  const [
    { data: movieData, isLoading: dataLoading, error: dataError },
    { data: movieCredit, isLoading: creditLoading, error: creditError },
  ] = useQueries({
    queries: [
      {
        queryKey: ['movieDetail', id],
        queryFn: () => fetchMovieDetail({ queryKey: ['movieDetail', id] }),
      },
      {
        queryKey: ['movieCredit', id],
        queryFn: () => fetchMovieCredit({ queryKey: ['movieCredit', id] }),
      },
    ],
  });

  if (dataLoading || creditLoading) return <Loading />;
  if (dataError || creditError) return <div>오류 발생</div>;

  return (
    <section className="movieInfo">
      <div className="movieMeta">
        <MvCertification id={id} />
        <Banner text={movieData.release_date.substr(0, 4)} />
        <Banner text={`${movieData.runtime}분`} />
        <MvGenre data={movieData?.genres} />
      </div>
      <article className="movieDescription">
        <MvInfoKrTit data={movieData} />
        <MvInfoOgTit data={movieData} />
      </article>
      <div className={`movieDetail ${direct_type}`}>
        <article className="movieOverview">
          <MvInfoTagLine data={movieData} />
          <MvInfoOverview data={movieData} />
        </article>
        <article className="movieCredit">
          <MvCreditSection
            title="제작"
            items={movieCredit.crew?.filter(
              person => person.job === 'Director',
            )}
          />
          <MvCreditSection
            title="출연"
            items={movieCredit.cast
              ?.filter(person => person.known_for_department === 'Acting')
              .slice(0, 10)}
          />
        </article>
      </div>
    </section>
  );
};

export default MovieInfo;
