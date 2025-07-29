import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchUpcoming, fetchTvTrend, fetchMovieTrend } from '../api/api';

const fetchFnMap = {
  upcoming: fetchUpcoming,
  tvTrend: fetchTvTrend,
  movieTrend: fetchMovieTrend,
};

const useInfiniteScroll = type => {
  const fetchFn = fetchFnMap[type];

  return useInfiniteQuery({
    queryKey: ['list', type],
    queryFn: ({ pageParam = 1 }) => fetchFn(pageParam),
    getNextPageParam: lastPage =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
  });
};

export default useInfiniteScroll;
