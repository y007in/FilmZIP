import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchMovie } from '../api/api';

const useInfiniteScroll = () => {
  return useInfiniteQuery({
    queryKey: ['now-playing'],
    queryFn: ({ pageParam }) => {
      return fetchMovie(pageParam);
    },
    getNextPageParam: last => {
      if (last.page < last.total_pages) {
        return last.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};

export default useInfiniteScroll;
