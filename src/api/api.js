const BASE_PATH = 'https://api.themoviedb.org/3';

const fetchFromApi = async endpoint => {
  const response = await fetch(`${BASE_PATH}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  });
  if (!response.ok) {
    throw {
      status: response.status,
    };
  }
  return response.json();
};
//인기 영화 목록
export const fetchTopRated = async () => {
  return fetchFromApi(`/movie/popular?language=ko-KR&page=1`);
};
//장르 목록
export const fetchGenre = async () => {
  return fetchFromApi(`/genre/movie/list?language=ko-KR`);
};

export const fetchSearch = async ({ queryKey }) => {
  const [, searchKeyword] = queryKey;
  if (!searchKeyword) return [];
  return fetchFromApi(`/search/movie?query=${searchKeyword}&language=ko-KR`);
};

//영화 정보
const movieIdFetch =
  path =>
  async ({ queryKey }) => {
    const [, movieId] = queryKey;
    if (!movieId) return [];
    return fetchFromApi(`/movie/${movieId}${path}`);
  };

export const fetchMovieDetail = movieIdFetch(`?language=ko-KR`);
export const fetchMovieImage = movieIdFetch(`/images`);
export const fetchMovieCredit = movieIdFetch(`/credits`);
export const fetchMovieRelease = movieIdFetch(`/release_dates`);
