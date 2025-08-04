import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { ClipLoader } from 'react-spinners';
import MovieList from '../../../components/MovieList/MovieList';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';
import Loading from '../../../components/StatusPage/Loading/Loading';
import { latestComingList } from '../../../utils/movieDateUtils';

const CollectionList = () => {
  const location = useLocation();
  const { type, contentType, title } = location?.state || {};

  const navigate = useNavigate();

  const {
    data: lists,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteScroll(type);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading) return <Loading />;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="rankContainer">
      {lists?.pages.map((page, i) => (
        <MovieList
          key={i}
          list={type === 'upcoming' ? latestComingList(page) : page.results}
          search
          contentType={contentType}
          onClick={item => {
            navigate(`/detail/${contentType}/${item.id}`);
          }}
          title={title}
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

export default CollectionList;
