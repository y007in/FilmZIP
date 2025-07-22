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
//트렌드
export const fetchMovieTrend = async page => {
  return fetchFromApi(`/trending/movie/week?language=ko-KR&page=${page}`);
};
export const fetchTvTrend = async page => {
  return fetchFromApi(`/trending/tv/week?language=ko-KR&${page}`);
};

//인기
export const fetchPopular = async () => {
  return fetchFromApi(`/movie/popular?language=ko-KR&page=1&region=KR`);
};
export const fetchTvTopRated = async () => {
  return fetchFromApi(`/tv/popular?language=ko-KR&page=1`);
};

//상영중
export const fetchNowPlaying = async () => {
  return fetchFromApi(`/movie/now_playing?language=ko-KR&page=1&region=KR`);
};
export const fetchTvOnAir = async () => {
  return fetchFromApi(`/tv/airing_today?language=ko-KR&region=KR&page=1`);
};
//개봉 예정 영화
export const fetchUpcoming = async page => {
  return fetchFromApi(`/movie/upcoming?language=ko-KR&page=${page}&region=KR`);
};

//장르
//영화 장르 목록
export const fetchMovieGenre = async () => {
  return fetchFromApi(`/genre/movie/list?language=ko-KR`);
};
//드라마 장르 목록
export const fetchTVGenre = async () => {
  return fetchFromApi(`/genre/tv/list?language=ko-KR`);
};

//검색
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

//시리즈 정보
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
