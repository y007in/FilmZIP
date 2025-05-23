import { useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import Loading from '../../components/Loading/Loading';
import Page from '../../components/Page/Page';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import MovieInfo from '../../components/MovieInfo/MovieInfo';
import RecordFilter from './RecordFilter/RecordFilter';
import { fetchMovieDetail, fetchMovieVideo } from '../../api/api';
import { setMovieRecords, getMovieRecords } from '../../utils/storage';
import { useMovieForm } from '../../hooks/useMovieForm';

const Detail = () => {
  const { id } = useParams();
  const [isRecord, setIsRecord] = useState(false);
  const { watch, setWatch, getFormData, initialData } = useMovieForm();

  //영화 상세 정보, 영상 정보 가져오기
  const [
    { data: movieData, isLoading: dataLoading, error: dataError },
    { data: movieVideo, isLoading: videoLoading, error: videoError },
  ] = useQueries({
    queries: [
      {
        queryKey: ['movieDetail', id],
        queryFn: () => fetchMovieDetail({ queryKey: ['movieDetail', id] }),
      },
      {
        queryKey: ['movieVideo', id],
        queryFn: () => fetchMovieVideo({ queryKey: ['movieVideo', id] }),
      },
    ],
  });

  //기록 입력 폼 열/닫기
  const handleFilterDialog = () => {
    setIsRecord(!isRecord);
  };
  //기록 저장
  const handleSubmit = e => {
    e.preventDefault();

    const formData = getFormData(movieData);
    const existingRecords = getMovieRecords();
    const updatedRecords = [...existingRecords, formData];
    setMovieRecords(updatedRecords);
    setIsRecord(false);
    if (onsubmit) onsubmit(formData);

    alert('저장되었습니다');
    setWatch(initialData);
  };

  if (dataLoading || videoLoading) return <Loading />;
  if (dataError || videoError) return <div>오류 발생</div>;

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
          <section className="movieVideo">
            {movieVideo.results.length !== 0 ? (
              <iframe
                src={`https://www.youtube.com/embed/${movieVideo.results[0].key}?vq=hd${movieVideo.results[0].size}`}
                title={`${movieVideo.results[0].name} Movie Trailer`}
                allowFullScreen
              ></iframe>
            ) : (
              <div className="posterWrapper">
                <img
                  className="posterBackground"
                  src={`https://image.tmdb.org/t/p/w500${movieData.backdrop_path}`}
                  alt={`${movieData.title} 배경 이미지`}
                />
                <img
                  className="posterForeground"
                  src={`https://image.tmdb.org/t/p/w200${movieData.backdrop_path}`}
                  alt={`${movieData.title} 포스터`}
                />
              </div>
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
        watch={watch}
        setWatch={setWatch}
      />
    </div>
  );
};

export default Detail;
