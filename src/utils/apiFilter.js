import { useQueries } from '@tanstack/react-query';
import { fetchNowPlaying, fetchTvOnAir } from '../api/api';

export const useAiringList = () => {
  const [
    {
      data: nowPlayingData,
      isLoading: nowPlayingLoading,
      error: nowPlayingError,
    },

    { data: tvAiringData, isLoading: tvAiringLoading, error: tvAiringError },
  ] = useQueries({
    queries: [
      {
        queryKey: ['now-playing'],
        queryFn: fetchNowPlaying,
        staleTime: 1000 * 60 * 1,
        gcTime: 1000 * 60 * 5,
      },
      {
        queryKey: ['tvAiring'],
        queryFn: fetchTvOnAir,
        staleTime: 1000 * 60 * 1,
        gcTime: 1000 * 60 * 5,
      },
    ],
  });

  const airingLoading = nowPlayingLoading || tvAiringLoading;
  const airingError = nowPlayingError || tvAiringError;

  const nowPlaying =
    nowPlayingData?.results?.map(item => ({
      ...item,
      contentType: 'movie',
    })) || [];

  const tvAiring =
    tvAiringData?.results?.map(item => ({
      ...item,
      contentType: 'tv',
    })) || [];

  const airingList = [...nowPlaying, ...tvAiring];

  const allAiring = airingList.sort(() => Math.random() - 0.5).slice(0, 7);

  return {
    airingLoading,
    airingError,
    allAiring,
  };
};

export const latestComingList = data =>
  data?.results
    .filter(item => item.release_date)
    .sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
