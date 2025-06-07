import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';

import Loading from '../../components/Loading/Loading';
import Page from '../../components/Page/Page';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import MovieInfo from '../../components/MovieInfo/MovieInfo';
import RecordFilter from './RecordFilter/RecordFilter';
import AlertBox from '../../components/AlertBox/AlertBox';
import { MvInfoImage } from '../../components/MovieTitle/MovieTitle';
import { fetchMovieDetail, fetchMovieImage } from '../../api/api';
import { setMovieRecords, getMovieRecords } from '../../utils/storage';
import { useMovieForm } from '../../hooks/useMovieForm';

const Detail = () => {
  const { id } = useParams();
  const { watch, setWatch, getFormData, initialData } = useMovieForm();
  const navigate = useNavigate();
  const [review, setReview] = useState(getMovieRecords());
  const [isRecord, setIsRecord] = useState(false);
  const [isAlert, setIsAlert] = useState(false);

  const [
    { data: movieData, isLoading: dataLoading, error: dataError },
    { data: movieImage, isLoading: imageLoading, error: imageError },
  ] = useQueries({
    queries: [
      {
        queryKey: ['movieDetail', id],
        queryFn: () => fetchMovieDetail({ queryKey: ['movieDetail', id] }),
      },
      {
        queryKey: ['movieImage', id],
        queryFn: () => fetchMovieImage({ queryKey: ['movieImage', id] }),
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
    const updatedRecords = [...review, formData];
    setReview(updatedRecords);
    setMovieRecords(updatedRecords);
    setIsRecord(false);
    setIsAlert(true);
    setWatch(initialData);
  };

  if (dataLoading || imageLoading) return <Loading />;
  if (dataError || imageError) return <div>오류 발생</div>;

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
          <figure className="posterWrapper">
            {movieImage.backdrops[0]?.file_path ? (
              <MvInfoImage
                data={movieImage}
                path={movieImage.backdrops[0].file_path}
              />
            ) : (
              <MvInfoImage data={movieData} path={movieData.backdrop_path} />
            )}
          </figure>
          <article className="titleBox">
            <MovieInfo />
          </article>
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
      {isAlert && (
        <AlertBox
          alertText={'저장되었습니다.'}
          onSubmit={() => navigate(`/review/${id}`)}
          submitText={'보러가기'}
          onCancel={() => setIsAlert(false)}
        />
      )}
    </div>
  );
};

export default Detail;
