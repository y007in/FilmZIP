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
  return fetchFromApi(`/movie/top_rated?language=ko-KR&page=1&region=KR`);
};
//현재상영 영화 목록
export const fetchNowPlaying = async () => {
  return fetchFromApi(`/movie/now_playing?language=ko-KR&page=1&region=KR`);
};
export const fetchPopular = async () => {
  return fetchFromApi(`/movie/popular?language=ko-KR&page=1&region=KR`);
};
export const fetchUpcoming = async () => {
  return fetchFromApi(`/movie/upcoming?language=ko-KR&page=1&region=KR`);
};
//인기 티비 목록
export const fetchTvTopRated = async () => {
  return fetchFromApi(`/tv/popular?language=ko-KR&page=1`);
};
//영화 장르 목록
export const fetchMovieGenre = async () => {
  return fetchFromApi(`/genre/movie/list?language=ko-KR`);
};
//드라마 장르 목록
export const fetchTVGenre = async () => {
  return fetchFromApi(`/genre/tv/list?language=ko-KR`);
};

export const fetchSearch = async ({ queryKey }) => {
  const [, searchKeyword] = queryKey;
  if (!searchKeyword) return [];
  return fetchFromApi(`/search/movie?query=${searchKeyword}&language=ko-KR`);
};
export const fetchTvSearch = async ({ queryKey }) => {
  const [, searchKeyword] = queryKey;
  if (!searchKeyword) return [];
  return fetchFromApi(`/search/tv?query=${searchKeyword}&language=ko-KR`);
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

//영화 정보
const tvIdFetch =
  path =>
  async ({ queryKey }) => {
    const [, tvId] = queryKey;
    if (!tvId) return [];
    return fetchFromApi(`/tv/${tvId}${path}`);
  };
export const fetchTvDetail = tvIdFetch(`?language=ko-KR`);
export const fetchTvImage = tvIdFetch(`/images`);
export const fetchTvCredit = tvIdFetch(`/credits`);
export const fetchTvRelease = tvIdFetch(`/content_ratings`);
