import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import { useParams } from 'react-router-dom';
import { fetchMovieDetail, fetchMovieVideo } from '../../api/api';
import Loading from '../../components/Loading/Loading';
import Page from '../../components/Page/Page';
import Button from '../../components/Button/Button';
import {
  MvGenre,
  MvInfoKrTit,
  MvInfoOgTit,
  MvInfoOverview,
} from '../../components/MovieTitle/MovieTitle';
import { useState } from 'react';
import RecordFilter from './RecordFilter/RecordFilter';

const Detail = () => {
  const [isRecord, setIsRecord] = useState(false);
  const { id } = useParams();
  const {
    data: movieData,
    isLoading: dataLoading,
    error: dataError,
  } = useQuery({
    queryKey: ['movieDetail', id],
    queryFn: () => fetchMovieDetail({ queryKey: ['movieDetail', id] }),
  });
  const {
    data: movieVideo,
    isLoading: videoLoading,
    error: videoError,
  } = useQuery({
    queryKey: ['movieVideo', id],
    queryFn: () => fetchMovieVideo({ queryKey: ['movieVideo', id] }),
  });
  const navigate = useNavigate();

  const handleFilterDialog = () => {
    setIsRecord(!isRecord);
  };

  if (dataLoading || videoLoading) return <Loading />;
  if (videoError || videoError) return <div>오류 발생</div>;
  // console.log(movieData);
  // console.log(movieVideo);
  return (
    <div className="DetailPage">
      <Page
        header={
          <header>
            <FontAwesomeIcon icon={faAngleLeft} onClick={() => navigate('/')} />
            <span>{movieData.title}</span>
          </header>
        }
        footer={
          <Button
            styleType={'full'}
            styleSize={'large'}
            text={'등록하기'}
            onClick={handleFilterDialog}
          />
        }
      >
        <div className="container">
          <section className="moviePoster">
            {movieVideo.results.length !== 0 ? (
              <iframe
                src={`https://www.youtube.com/embed/${movieVideo.results[0].key}?vq=hd${movieVideo.results[0].size}`}
                title={`${movieVideo.results[0].name} Movie Trailer`}
                allowFullScreen
              ></iframe>
            ) : (
              // <p></p>
              <img
                src={`https://image.tmdb.org/t/p/w200${movieData.backdrop_path}`}
                alt={`${movieData.title} 포스터`}
              />
            )}
          </section>
          <section className="movieInfo">
            <div className="movieMeta">
              <span className="element">
                {movieData.release_date.substr(0, 4)}
              </span>{' '}
              <span className="element">{movieData.runtime}분</span>
              <MvGenre data={movieData?.genres} />
            </div>
            <article className="movieDescription">
              <MvInfoKrTit data={movieData} />
              <MvInfoOgTit data={movieData} />
              <MvInfoOverview data={movieData} />
            </article>
          </section>
        </div>
      </Page>
      <RecordFilter
        handleFilterDialog={handleFilterDialog}
        isRecord={isRecord}
        setIsRecord={setIsRecord}
      />
    </div>
  );
};

export default Detail;
