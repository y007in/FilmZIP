import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import Page from '../../components/Page/Page';
import Loading from '../../components/Loading/Loading';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import MovieInfo from '../../components/MovieInfo/MovieInfo';
import { getMovieRecords } from '../../utils/storage';
import { fetchMovieDetail } from '../../api/api';
import Banner from '../../components/Banner/Banner';

const Review = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  console.log(record);

  if (dataLoading) return <Loading />;
  if (dataError) return <div>오류 발생</div>;

  return (
    <div className="Review">
      <Page
        header={
          <header>
            <FontAwesomeIcon icon={faAngleLeft} onClick={() => navigate('/')} />
            <span>{movieData.title}</span>
          </header>
        }
      >
        <div className="container">
          <section className="moviePoster">
            <img
              src={`https://image.tmdb.org/t/p/w200${movieData.backdrop_path}`}
              alt={`${movieData.title} 포스터`}
            />
            <Banner text={watchStatus} bannerType={'brand'} />
          </section>
          <MovieInfo />
          <div className="divider"></div>
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
