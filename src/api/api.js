const BASE_PATH = 'https://api.themoviedb.org/3';

const fetchFromApi = async endpoint => {
  const response = await fetch(`${BASE_PATH}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  });
  return response.json();
};

export const fetchMovie = async page => {
  return fetchFromApi(`/movie/now_playing?language=ko-KR&page=${page}`);
};
export const fetchTopRated = async () => {
  return fetchFromApi(`/movie/top_rated?language=ko-KR&page=1`);
};

export const fetchGenre = async () => {
  return fetchFromApi(`/genre/movie/list?language=ko-KR`);
};
export const fetchSearch = async ({ queryKey }) => {
  const [, searchKeyword] = queryKey;
  if (!searchKeyword) return [];
  return fetchFromApi(`/search/movie?query=${searchKeyword}&language=ko-KR}`);
};
export const fetchMovieDetail = async ({ queryKey }) => {
  const [, movieId] = queryKey;
  if (!movieId) return [];
  return fetchFromApi(`/movie/${movieId}?language=ko-KR`);
};
export const fetchMovieVideo = async ({ queryKey }) => {
  const [, movieId] = queryKey;
  if (!movieId) return [];
  return fetchFromApi(`/movie/${movieId}/videos?language=ko-KR`);
};
