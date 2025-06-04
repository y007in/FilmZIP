import { useNavigate } from 'react-router-dom';
import Page from '../../components/Page/Page';
import Poster from '../../components/Poster/Poster';
import NoResult from '../../components/NoResult/NoResult';
import { getNoDupRecordList } from '../../utils/recordList';

const Main = () => {
  const navigate = useNavigate();
  const noDupRecordLists = getNoDupRecordList();
  console.log(noDupRecordLists);

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
        {noDupRecordLists.length !== 0 ? (
          <div className="recordList">
            {noDupRecordLists.map((item, i) => (
              <div className="test" key={i}>
                <Poster
                  key={i}
                  item={item}
                  onClick={() => navigate(`/review/${item.movieId}`)}
                  count={item.count}
                />
              </div>
            ))}
          </div>
        ) : (
          <NoResult noResultData={'관람한 영화를 저장해 보세요!'} />
        )}
      </Page>
    </div>
  );
};

export default Main;
