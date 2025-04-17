import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Page from '../../components/Page/Page';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import MovieInfo from '../../components/MovieInfo/MovieInfo';
import Banner from '../../components/Banner/Banner';
import { getMovieRecords } from '../../utils/storage';
import { fetchMovieDetail } from '../../api/api';

const Review = () => {
  const { id } = useParams();
  const {
    data: movieData,
    isLoading: dataLoading,
    error: dataError,
  } = useQuery({
    queryKey: ['movieDetail', id],
    queryFn: () => fetchMovieDetail({ queryKey: ['movieDetail', id] }),
  });
  const recordList = getMovieRecords();
  const record = recordList.find(item => item.movieId === Number(id));
  const {
    watchStartDate,
    watchEndDate,
    watchStatus,
    watchPlace,
    watchWith,
    reWatchWill,
    watchReview,
    watchComment,
  } = record;

  if (dataLoading) return <Loading />;
  if (dataError) return <div>오류 발생</div>;

  return (
    <div className="Review">
      <Page header={<Header movieData={movieData} />}>
        <div className="container">
          <section className="moviePoster">
            <img
              src={`https://image.tmdb.org/t/p/w200${movieData.poster_path}`}
              alt={`${movieData.title} 포스터`}
            />
            <Banner text={watchStatus} bannerType={'brand'} />
          </section>
          <MovieInfo />
          <section className="reviewData">
            <div>
              관람일
              {watchStartDate === watchEndDate
                ? watchEndDate
                : `${watchStartDate} ~ ${watchEndDate}`}
            </div>
            <div>
              {watchPlace} | {watchWith}
            </div>

            <div className="selection">
              <Banner bannerType={'sub'} text={reWatchWill} />
              <Banner bannerType={'sub'} text={watchReview} />
            </div>
            <div className="watchComment">{watchComment}</div>
          </section>
        </div>
      </Page>
    </div>
  );
};

export default Review;
