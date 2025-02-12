import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { ClipLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import Header from '../../components/Header/Header';
import MovieList from '../../components/MovieList/MovieList';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import Loading from '../../components/Loading/Loading';

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

  if (isLoading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="MainPage">
      <Header
        header={'영화'}
        rightBtn
        handleRightBtn={() => navigate('/search')}
        rightIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
      />
      {data?.pages.map((page, i) => (
        <MovieList
          key={i}
          list={page.results}
          onClick={() => console.log(data.title)}
        />
      ))}
      {hasNextPage && (
        <div className="spinner" ref={ref}>
          <ClipLoader color="#5db996" />
        </div>
      )}
    </div>
  );
};

export default Main;
