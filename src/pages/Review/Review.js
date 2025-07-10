import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Page from '../../components/Page/Page';
import Header from '../../components/Header/Header';
import Loading from '../../components/StatusPage/Loading/Loading';
import ErrorPage from '../../components/StatusPage/ErrorPage/ErrorPage';
import MovieInfo from '../../components/MovieInfo/MovieInfo';
import Badge from '../../components/Badge/Badge';
import Button from '../../components/Button/Button';
import Tabs from './components/Tabs/Tabs';
import ReviewData from './components/ReviewData/ReviewData';
import { MvInfoImage } from '../../components/MovieTitle/MovieTitle';
import { fetchMovieDetail, fetchTvDetail } from '../../api/api';
import { TabReview } from '../../constants/tabs';
import { useRecordList } from '../../hooks/useRecordList';
import { getWatchStatusLabel } from '../../constants/formField';
import { getBoolContentType } from '../../utils/getContentType';

const Review = () => {
  const { id, contentType } = useParams();
  const { getRecordList } = useRecordList();
  const records = getRecordList(id);
  const [selectedTab, setSelectedTab] = useState(TabReview.REVIEW);
  const navigate = useNavigate();

  const {
    data: contentData,
    isLoading: contentLoading,
    error: contentError,
  } = useQuery({
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
  });

  if (contentLoading) return <Loading />;
  if (contentError) return <ErrorPage statusCode={contentError.status} />;

  return (
    <div className="Review">
      <Page header={<Header movieData={contentData} />}>
        <div className="container">
          <figure className="moviePoster">
            <MvInfoImage data={contentData} path={contentData.poster_path} />
            <Badge
              text={getWatchStatusLabel(records[0]?.watchStatus)}
              badgeType={`${records[0]?.watchStatus}`}
            />
          </figure>
          <section className="tabContainer">
            <Tabs
              selectedTab={selectedTab}
              onChange={selectedTab => setSelectedTab(selectedTab)}
            />
            <div className="tabContent">
              {selectedTab === TabReview.REVIEW && <ReviewData id={id} />}
              {selectedTab === TabReview.INFO && (
                <article className="infoTab">
                  <MovieInfo direction={'col'} />
                  <div className="btnBox">
                    <Button
                      text={'기록하러 가기'}
                      styleType={'brandSolid'}
                      onClick={() => navigate(`/detail/${contentType}/${id}`)}
                    />
                  </div>
                </article>
              )}
            </div>
          </section>
        </div>
      </Page>
    </div>
  );
};

export default Review;
