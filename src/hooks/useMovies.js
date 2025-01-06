import { useState, useEffect } from "react";

const useMovies = () => {
  const [movies, setMovies] = useState([]);

  // API 호출
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?language=ko-US&page=1`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results || []);
      });
  }, []);

  return { movies };
};

export default useMovies;
