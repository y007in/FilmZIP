import { useNavigate } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import Page from '../../components/Page/Page';
import Loading from '../../components/StatusPage/Loading/Loading';
import SlideBox from '../../components/List/SlideBox';
import { fetchMovieTrend, fetchTvTrend, fetchUpcoming } from '../../api/api';
import { useRecordList } from '../../hooks/useRecordList';
import { useAiringList, latestComingList } from '../../utils/apiFilter';

const Main = () => {
  const [
    { data: upcomingData, isLoading: upcomingLoading, error: upcomingError },

    {
      data: movieTrendData,
      isLoading: movieTrendLoading,
      error: movieTrendError,
    },
    { data: tvTrendData, isLoading: tvTrendLoading, error: tvTrendError },
  ] = useQueries({
    queries: [
      {
        queryKey: ['upcoming'],
        queryFn: fetchUpcoming,
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 30,
      },

      {
        queryKey: ['movie-trend'],
        queryFn: fetchMovieTrend,
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 30,
      },
      {
        queryKey: ['tv-trend'],
        queryFn: fetchTvTrend,
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 30,
      },
    ],
  });
  const { recordList, getNoDupRecordList } = useRecordList();
  const { allAiring, airingLoading, airingError } = useAiringList();
  const noDupRecordLists = getNoDupRecordList(recordList);
  const latestComing = latestComingList(upcomingData);

  const navigate = useNavigate();

  if (airingLoading && movieTrendLoading && tvTrendLoading && upcomingLoading)
    return <Loading />;
  const error = airingError || movieTrendError || tvTrendError || upcomingError;
  if (error) return <p>Error: {error.message}</p>;

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
          <h1 className="introComment">오늘의 관람 기록을 남겨보세요 📝</h1>
          <div className="bannerHeadLine">
            <SlideBox
              title={'나의 아카이빙'}
              data={noDupRecordLists}
              contentType={'movie'}
              nav={'/review'}
            />
          </div>
        </div>
        <div className="topList">
          <SlideBox
            title={'이번주 영화 트렌드 랭킹'}
            data={movieTrendData?.results}
            contentType={'movie'}
            nav={'/collection'}
          />
          <SlideBox
            title={'이번주 시리즈 트렌드 랭킹'}
            data={tvTrendData?.results}
            contentType={'tv'}
            nav={'/collection'}
          />
          <SlideBox
            title={'오늘은 이거 볼까요?'}
            data={allAiring}
            contentType={'movie'}
          />
          <SlideBox
            title={'영화 개봉 예정작'}
            data={latestComing}
            contentType={'movie'}
            nav={'/collection'}
            dayCount
          />
        </div>
      </Page>
    </div>
  );
};

export default Main;
