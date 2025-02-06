import { useEffect } from 'react';
import Header from '../../components/Header/Header';
import MovieList from '../../components/MovieList/MovieList';
import { useInView } from 'react-intersection-observer';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { ClipLoader } from 'react-spinners';

const Main = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchNextPage,
  } = useInfiniteScroll();

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage && !isFetchNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  // if (isLoading) {
  //   return <ClipLoader color="#5db996" />;
  // }
  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <div className="MainPage">
      <Header header={'영화'} />
      {data?.pages.map((page, i) => (
        <MovieList key={i} list={page.results} />
      ))}
      {isLoading && (
        <div className="spinner">
          <ClipLoader color="#5db996" ref={ref} />
        </div>
      )}
    </div>
  );
};

export default Main;
