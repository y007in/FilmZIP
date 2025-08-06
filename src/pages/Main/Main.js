import { useNavigate } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import Page from '../../components/Page/Page';
import Loading from '../../components/StatusPage/Loading/Loading';
import SlideBox from '../../components/List/SlideBox';
import SlideNav from '../../components/Slide/SlideNav';
import { fetchMovieTrend, fetchTvTrend, fetchUpcoming } from '../../api/api';
import { useRecordList } from '../../hooks/useRecordList';
import { useAiringList } from '../../utils/apiFilter';
import { latestComingList } from '../../utils/movieDateUtils';

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
        queryFn: ({ page = 1 }) => fetchUpcoming(page),
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 30,
      },

      {
        queryKey: ['movieTrend'],
        queryFn: ({ page = 1 }) => fetchMovieTrend(page),
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 30,
      },
      {
        queryKey: ['tvTrend'],
        queryFn: ({ page = 1 }) => fetchTvTrend(page),
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
        <div className="airBanner">
          <SlideNav data={allAiring} />
        </div>
        <div className="banner">
          <div className="bannerHeadLine">
            <SlideBox
              title={'내가 본 영화'}
              data={noDupRecordLists}
              contentType={'movie'}
              nav={'/review'}
              box
            />
          </div>
        </div>
        <div className="topList">
          <article className="slideContain">
            <SlideBox
              title={'이번주 영화 트렌드 랭킹'}
              data={movieTrendData?.results}
              contentType={'movie'}
              nav={'/collection'}
              type={'movieTrend'}
            />
            <SlideBox
              title={'이번주 시리즈 트렌드 랭킹'}
              data={tvTrendData?.results}
              contentType={'tv'}
              nav={'/collection'}
              type={'tvTrend'}
            />
          </article>
          <article className="slideContain">
            <SlideBox
              title={'영화 개봉 예정작'}
              data={latestComing}
              contentType={'movie'}
              nav={'/collection'}
              type={'upcoming'}
              dayCount
            />
          </article>
        </div>
      </Page>
    </div>
  );
};

export default Main;
