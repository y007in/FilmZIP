import { useParams } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import Badge from '../Badge/Badge';
import Loading from '../StatusPage/Loading/Loading';
import ErrorPage from '../StatusPage/ErrorPage/ErrorPage';
import {
  fetchMovieDetail,
  fetchTvDetail,
  fetchMovieCredit,
  fetchTvCredit,
  fetchUpcoming,
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
import { getBoolContentType } from '../../utils/getContentType';
import { filterReleaseDate } from '../../utils/filterMovies';

const MovieInfo = ({ direction }) => {
  const direct_type = ['row', 'col'].includes(direction) ? direction : '';
  const { id, contentType } = useParams();

  const [
    { data: contentData, isLoading: contentLoading, error: contentError },

    { data: contentCredit, isLoading: creditLoading, error: creditError },
    { data: upcomingData, isLoading: upcomingLoading, error: upcomingError },
  ] = useQueries({
    queries: [
      {
        queryKey: [`${contentType}Detail`, id],
        queryFn: () =>
          getBoolContentType(
            contentType,
            () => fetchMovieDetail({ queryKey: ['movieDetail', id] }),
            () => fetchTvDetail({ queryKey: ['tvDetail', id] }),
          )(),
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: [`${contentType}Credit`, id],
        queryFn: () =>
          getBoolContentType(
            contentType,
            () => fetchMovieCredit({ queryKey: ['movieCredit', id] }),
            () => fetchTvCredit({ queryKey: ['tvCredit', id] }),
          )(),
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ['upcoming'],
        queryFn: ({ page = 1 }) => fetchUpcoming(page),
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 30,
      },
    ],
  });

  if (contentLoading || creditLoading || upcomingLoading) return <Loading />;
  if (contentError || creditError) {
    return (
      <ErrorPage
        statusCode={
          contentError?.status || creditError?.status || upcomingError?.status
        }
      />
    );
  }

  return (
    <section className="movieInfo">
      <div className="movieMeta">
        <MvCertification id={id} contentType={contentType} />
        <div className="runtime">
          {contentData.release_date || upcomingData.results.release_date ? (
            <Badge
              text={filterReleaseDate(
                upcomingData,
                contentData,
                id,
              ).release_date.substr(0, 4)}
            />
          ) : (
            contentData.last_air_date && (
              <Badge text={contentData.first_air_date.substr(0, 4)} />
            )
          )}
          {contentData.runtime > 0 ? (
            <Badge text={`${contentData.runtime}분`} />
          ) : contentData.number_of_seasons > 0 ? (
            <Badge text={`시즌 ${contentData.number_of_seasons}개`} />
          ) : null}
        </div>
        <MvGenre data={contentData?.genres} />
      </div>
      <article className="movieDescription">
        <MvInfoKrTit data={contentData} />
        <MvInfoOgTit data={contentData} />
      </article>
      <div className={`movieDetail ${direct_type}`}>
        <article className="movieOverview">
          <MvInfoTagLine data={contentData} />
          <MvInfoOverview data={contentData} />
        </article>
        <article className="movieCredit">
          {contentCredit.crew?.filter(person => person.job === 'Director')
            .length > 0 && (
            <MvCreditSection
              title="제작"
              items={contentCredit.crew?.filter(
                person => person.job === 'Director',
              )}
            />
          )}
          {contentCredit.cast?.filter(
            person => person.known_for_department === 'Acting',
          ).length > 0 && (
            <MvCreditSection
              title="출연"
              items={contentCredit.cast
                ?.filter(person => person.known_for_department === 'Acting')
                .slice(0, 10)}
            />
          )}
        </article>
      </div>
    </section>
  );
};

export default MovieInfo;
