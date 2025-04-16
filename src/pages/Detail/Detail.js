import { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import Loading from '../../components/Loading/Loading';
import Page from '../../components/Page/Page';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import MovieInfo from '../../components/MovieInfo/MovieInfo';
import RecordFilter from './RecordFilter/RecordFilter';
import { fetchMovieDetail, fetchMovieVideo } from '../../api/api';
import { setMovieRecords, getMovieRecords } from '../../utils/storage';

const Detail = () => {
  const [isRecord, setIsRecord] = useState(false);
  const [checked, setChecked] = useState({});
  const watchRefs = useRef({
    startDate: null,
    endDate: null,
    comment: null,
  });

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

  const handleSubmit = e => {
    e.preventDefault();

    const formData = {
      movieId: movieData.id,
      title: movieData.title,
      poster_path: movieData.poster_path,
      watchStartDate: watchRefs.current.startDate?.value || '',
      watchEndDate: watchRefs.current.endDate?.value || '',
      watchStatus: checked['관람 상태'],
      watchPlace: checked['어디서 시청하셨나요?'],
      watchWith: checked['누구와 함께했나요?'],
      reWatchWill: checked['다시 볼 의향이 있나요?'],
      watchReview: checked['어떤 영화였나요?'],
      watchComment: watchRefs.current.comment?.value || '',
    };
    const existingRecords = getMovieRecords();
    const updatedRecords = [...existingRecords, formData];
    setMovieRecords(updatedRecords);
    setIsRecord(false);
    if (onsubmit) onsubmit(formData);

    alert('저장되었습니다');
    // console.log(movieR);
  };

  if (dataLoading || videoLoading) return <Loading />;
  if (dataError || videoError) return <div>오류 발생</div>;
  // console.log(movieData);
  // console.log(movieVideo);
  return (
    <div className="DetailPage">
      <Page
        header={<Header movieData={movieData} />}
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
          <MovieInfo />
        </div>
      </Page>
      <RecordFilter
        handleFilterDialog={handleFilterDialog}
        handleSubmit={handleSubmit}
        isRecord={isRecord}
        setIsRecord={setIsRecord}
        checked={checked}
        setChecked={setChecked}
        watchRefs={watchRefs}
      />
    </div>
  );
};

export default Detail;
