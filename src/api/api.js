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
  return fetchFromApi(`/movie/now_playing?language=ko-US&page=${page}`);
};

export const fetchGenre = async () => {
  return fetchFromApi(`/genre/movie/list?language=ko-US`);
};
