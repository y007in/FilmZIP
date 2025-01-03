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
  }, []); // 컴포넌트가 마운트될 때 한 번만 호출

  return { movies };
};

export default useMovies;
