import { useState, useEffect } from 'react';
import fetchMovies from '../api/fetchMovies';

const useMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovies();
      setMovies(data.results || []);
    };

    getMovies();
  }, []);

  return { movies };
};

export default useMovies;
