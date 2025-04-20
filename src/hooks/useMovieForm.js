import { useState } from 'react';
export const useMovieForm = () => {
  const [watch, setWatch] = useState({
    checked: {},
    startDate: '',
    endDate: '',
    comment: '',
  });

  const getFormData = movieData => ({
    movieId: movieData.id,
    title: movieData.title,
    poster_path: movieData.poster_path,
    watchStartDate: watch.startDate,
    watchEndDate: watch.endDate,
    watchStatus: watch.checked['관람 상태'],
    watchPlace: watch.checked['어디서 시청하셨나요?'],
    watchWith: watch.checked['누구와 함께했나요?'],
    reWatchWill: watch.checked['다시 볼 의향이 있나요?'],
    watchReview: watch.checked['어떤 영화였나요?'],
    watchComment: watch.comment,
  });

  return {
    watch,
    setWatch,
    getFormData,
  };
};
