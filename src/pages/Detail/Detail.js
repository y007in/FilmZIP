import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';

import Loading from '../../components/StatusPage/Loading/Loading';
import ErrorPage from '../../components/StatusPage/ErrorPage/ErrorPage';
import Page from '../../components/Page/Page';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import MovieInfo from '../../components/MovieInfo/MovieInfo';
import RecordFilter from '../../components/RecordFilter/RecordFilter';
import AlertBox from '../../components/AlertBox/AlertBox';
import { MvInfoImage } from '../../components/MovieTitle/MovieTitle';
import {
  fetchMovieDetail,
  fetchTvDetail,
  fetchMovieImage,
  fetchTvImage,
  fetchUpcoming,
} from '../../api/api';
import { setMovieRecords, getMovieRecords } from '../../utils/storage';
import { useMovieForm } from '../../hooks/useMovieForm';
import { getBoolContentType } from '../../utils/getContentType';
import { dDayCount } from '../../utils/movieDateUtils';
import { filterReleaseDate } from '../../utils/filterMovies';

const Detail = () => {
  const { id, contentType } = useParams();
  const { watch, setWatch, getFormData, initialData } = useMovieForm();
  const navigate = useNavigate();
  const [review, setReview] = useState(getMovieRecords());
  const [isRecord, setIsRecord] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [
    { data: contentData, isLoading: contentLoading, error: contentError },
    { data: contentImage, isLoading: imageLoading, error: imageError },
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
        queryKey: [`${contentType}Image`, id],
        queryFn: () =>
          getBoolContentType(
            contentType,
            () => fetchMovieImage({ queryKey: ['movieImage', id] }),
            () => fetchTvImage({ queryKey: ['tvImage', id] }),
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
  //개봉날짜 따른 등록버튼 조건부
  const { diffDays } = dDayCount(
    filterReleaseDate(upcomingData, contentData, id),
  );
  //기록 입력 폼 열/닫기
  const handleFilterDialog = () => {
    setIsRecord(!isRecord);
  };
  //기록 저장
  const handleSubmit = e => {
    e.preventDefault();
    const formData = getFormData(contentData);
    const updatedRecords = [...review, formData];
    setReview(updatedRecords);
    setMovieRecords(updatedRecords);
    setIsRecord(false);
    setIsAlert(true);
    setWatch(initialData);
  };

  if (contentLoading || (imageLoading && !isLoaded) || upcomingLoading)
    return <Loading />;
  if (contentError || imageError)
    return (
      <ErrorPage
        statusCode={
          contentError?.status || imageError?.status || upcomingError?.status
        }
      />
    );
  return (
    <div className="DetailPage">
      <Page
        header={<Header movieData={contentData} />}
        footer={
          diffDays < 0 ? (
            <Button
              styleType={'full'}
              styleSize={'large'}
              text={'등록하기'}
              onClick={handleFilterDialog}
            />
          ) : (
            <Button
              styleType={'disabled'}
              styleSize={'large'}
              text={`${diffDays}일 후 개봉해요!`}
            />
          )
        }
      >
        <div className="container">
          <figure className="posterWrapper">
            {contentImage.backdrops?.[0]?.file_path ? (
              <MvInfoImage
                data={contentImage}
                path={contentImage.backdrops[0].file_path}
                setIsLoaded={setIsLoaded}
              />
            ) : contentData.backdrops_path || contentData.poster_path ? (
              <MvInfoImage
                data={contentData}
                path={contentData.backdrops_path || contentData.poster_path}
              />
            ) : (
              <div className="mvInfoImg noImage"></div>
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
          onSubmit={() => navigate(`/review/${contentType}/${id}`)}
          submitText={'보러가기'}
          onCancel={() => setIsAlert(false)}
        />
      )}
    </div>
  );
};

export default Detail;
