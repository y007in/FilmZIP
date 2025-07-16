import { useNavigate } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import Page from '../../components/Page/Page';
import Loading from '../../components/StatusPage/Loading/Loading';
import SlideBox from '../../components/List/SlideBox';
import Button from '../../components/Button/Button';
import {
  fetchNowPlaying,
  fetchPopular,
  fetchTopRated,
  fetchTvTopRated,
  fetchUpcoming,
} from '../../api/api';

const Main = () => {
  const [
    { data: topRatedData, isLoading: topRatedLoading, error: topRatedError },
    {
      data: nowPlayingData,
      isLoading: nowPlayingLoading,
      error: nowPlayingError,
    },
    { data: popularData, isLoading: popularLoading, error: popularError },
    { data: upcomingData, isLoading: upcomingLoading, error: upcomingError },
    {
      data: topTvRatedData,
      isLoading: topTvRatedLoading,
      error: topTvRatedError,
    },
  ] = useQueries({
    queries: [
      {
        queryKey: ['top-rated'],
        queryFn: fetchTopRated,
        staleTime: 1000 * 60 * 1,
        gcTime: 1000 * 60 * 5,
      },
      {
        queryKey: ['now-playing'],
        queryFn: fetchNowPlaying,
        staleTime: 1000 * 60 * 1,
        gcTime: 1000 * 60 * 5,
      },
      {
        queryKey: ['popular'],
        queryFn: fetchPopular,
        staleTime: 1000 * 60 * 1,
        gcTime: 1000 * 60 * 5,
      },
      {
        queryKey: ['upcoming'],
        queryFn: fetchUpcoming,
        staleTime: 1000 * 60 * 1,
        gcTime: 1000 * 60 * 5,
      },
      {
        queryKey: ['tv-top-rated'],
        queryFn: fetchTvTopRated,
        staleTime: 1000 * 60 * 1,
        gcTime: 1000 * 60 * 5,
      },
    ],
  });
  const navigate = useNavigate();

  if (topRatedLoading) return <Loading />;
  // if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="MainPage">
      <Page
        header={
          <div className="searchBox">
            <input
              className="searchInput"
              type="text"
              placeholder="작품 제목을 검색해 보세요"
              onClick={() => navigate('/search')}
            />
          </div>
        }
      >
        <div className="banner">
          <div className="bannerHeadLine">
            <h1>오늘의 관람 기록을 남겨보세요</h1>
            <Button
              text={'나의 기록'}
              onClick={() => navigate('/review')}
              styleType={'brand'}
            />
          </div>
        </div>
        <div className="topList">
          <SlideBox
            title={'오늘의 영화 트렌드 랭킹'}
            data={popularData?.results}
            contentType={'movie'}
          />
          <SlideBox
            title={'평점이 높은 영화'}
            data={topRatedData?.results}
            contentType={'movie'}
          />
          <SlideBox
            title={'오늘의 상영작은?'}
            data={nowPlayingData?.results}
            contentType={'movie'}
          />
          <SlideBox
            title={'개봉 예정작'}
            data={upcomingData?.results}
            contentType={'movie'}
          />
          <SlideBox
            title={'오늘의 시리즈 트렌드 랭킹'}
            data={topTvRatedData?.results}
            contentType={'tv'}
          />
        </div>
      </Page>
    </div>
  );
};

export default Main;
