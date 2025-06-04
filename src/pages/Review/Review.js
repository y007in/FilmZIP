import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Page from '../../components/Page/Page';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import MovieInfo from '../../components/MovieInfo/MovieInfo';
import Banner from '../../components/Banner/Banner';
import Button from '../../components/Button/Button';
import Tabs from './components/Tabs/Tabs';
import ReviewData from './components/ReviewData/ReviewData';
import { fetchMovieDetail } from '../../api/api';
import { TabReview } from '../../constants/tabs';
import { getRecordList } from '../../utils/recordList';
import { getWatchStatusLabel } from '../../constants/formField';

const Review = () => {
  const { id } = useParams();
  const records = getRecordList(id);
  console.log(records);
  const {
    data: movieData,
    isLoading: dataLoading,
    error: dataError,
  } = useQuery({
    queryKey: ['movieDetail', id],
    queryFn: () => fetchMovieDetail({ queryKey: ['movieDetail', id] }),
  });
  const [selectedTab, setSelectedTab] = useState(TabReview.REVIEW);
  const navigate = useNavigate();

  if (dataLoading) return <Loading />;
  if (dataError) return <div>오류 발생</div>;

  return (
    <div className="Review">
      <Page header={<Header movieData={movieData} />}>
        <div className="container">
          <section className="moviePoster">
            <img
              src={`https://image.tmdb.org/t/p/w1280${movieData.poster_path}`}
              alt={`${movieData.title} 포스터`}
            />
            <Banner
              text={getWatchStatusLabel(records[0].watchStatus)}
              bannerType={`${records[0].watchStatus}`}
            />
          </section>
          <Tabs
            selectedTab={selectedTab}
            onChange={selectedTab => setSelectedTab(selectedTab)}
          />
          <div className="tabContent">
            {selectedTab === TabReview.REVIEW && <ReviewData id={id} />}
            {selectedTab === TabReview.INFO && (
              <article className="infoTab">
                <div className="btnBox">
                  <Button
                    text={'기록하러 가기'}
                    styleType={'brandSolid'}
                    onClick={() => navigate(`/movie/${id}`)}
                  />
                </div>

                <MovieInfo direction={'col'} />
              </article>
            )}
          </div>
        </div>
      </Page>
    </div>
  );
};

export default Review;
