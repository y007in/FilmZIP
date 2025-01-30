const fetchMovies = async page => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?language=ko-US&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default fetchMovies;
