import { useNavigate } from 'react-router-dom';
import Page from '../../components/Page/Page';
import Poster from '../../components/Poster/Poster';
import NoResult from '../../components/NoResult/NoResult';
import { getMovieRecords } from '../../utils/storage';

const Main = () => {
  const navigate = useNavigate();
  const recordList = getMovieRecords();
  // const {
  //   data,
  //   isLoading,
  //   error,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchNextPage,
  // } = useInfiniteScroll();

  // const { ref, inView } = useInView();

  // useEffect(() => {
  //   if (inView && hasNextPage && !isFetchNextPage) {
  //     fetchNextPage();
  //   }
  // }, [inView, hasNextPage, fetchNextPage, isFetchNextPage]);

  // if (isLoading) return <Loading />;
  // if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="MainPage">
      <Page
        header={
          <header className="searchBox">
            <input
              className="searchInput"
              type="text"
              placeholder="어떤 영화를 보셨나요?"
              onClick={() => navigate('/search')}
            />
          </header>
        }
      >
        {/* {data?.pages.map((page, i) => (
          <MovieList key={i} list={page.results} onClick />
        ))}
        {hasNextPage && (
          <div className="spinner" ref={ref}>
            <ClipLoader color="#5db996" />
          </div>
        )} */}
        <div className="recordList">
          {recordList.length !== 0 ? (
            recordList.map((item, i) => (
              <Poster
                key={i}
                item={item}
                onClick={() => navigate(`/review/${item.movieId}`)}
              />
            ))
          ) : (
            <NoResult noResultData={'장바구니에 담기 영화가 없습니다.'} />
          )}
        </div>
      </Page>
    </div>
  );
};

export default Main;
