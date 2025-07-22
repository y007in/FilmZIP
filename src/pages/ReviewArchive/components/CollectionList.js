import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { ClipLoader } from 'react-spinners';
import MovieList from '../../../components/MovieList/MovieList';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';

import Loading from '../../../components/StatusPage/Loading/Loading';

const CollectionList = () => {
  const location = useLocation();
  const type = location?.state?.type;
  const contentType = location?.state?.contentType;
  console.log(contentType);
  console.log(type);
  const navigate = useNavigate();

  const {
    data: lists,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteScroll(type);
  console.log(lists);

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
          list={page.results}
          search
          contentType={contentType}
          onClick={item => {
            navigate(`/detail/${contentType}/${item.id}`);
          }}
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
