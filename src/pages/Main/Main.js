import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { ClipLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import MovieList from '../../components/MovieList/MovieList';
import NoResult from '../../components/NoResult/NoResult';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import Loading from '../../components/Loading/Loading';

import Page from '../../components/Page/Page';
import { getMovieRecords } from '../../utils/storage';

const Main = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchNextPage,
  } = useInfiniteScroll();
  const navigate = useNavigate();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchNextPage]);

  const recordList = getMovieRecords();
  console.log(recordList);

  if (isLoading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

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
            recordList.map(item =>
              item.movieData?.poster_path !== null ? (
                <div className="image" key={item.movieData.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${item.movieData?.poster_path}`}
                    alt={item.title}
                  />
                </div>
              ) : (
                <div className="image noImage">
                  <span>이미지</span>
                  <span>준비중</span>
                </div>
              ),
            )
          ) : (
            <NoResult noResultData={'장바구니에 담기 영화가 없습니다.'} />
          )}
        </div>
      </Page>
    </div>
  );
};

export default Main;
