import { useState, useEffect } from 'react';
import { fetchMovie } from '../api/api';

const useMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovie();
      setMovies(data.results || []);
    };

    getMovies();
  }, []);

  return { movies };
};

export default useMovies;
