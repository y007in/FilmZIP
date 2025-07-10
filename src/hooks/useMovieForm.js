import { useState } from 'react';

export const useMovieForm = (movieRecord = null) => {
  const today = new Date().toISOString().substring(0, 10);

  const initialData = movieRecord
    ? {
        checked: {
          '관람 상태': movieRecord.watchStatus,
          '어디서 시청하셨나요?': movieRecord.watchPlace,
          '누구와 함께했나요?': movieRecord.watchWith,
          '다시 볼 의향이 있나요?': movieRecord.reWatchWill,
          '어떤 영화였나요?': movieRecord.watchReview,
        },
        startDate: movieRecord.watchStartDate || today,
        endDate: movieRecord.watchEndDate || today,
        comment: movieRecord.watchComment || '',
      }
    : {
        checked: {},
        startDate: today,
        endDate: today,
        comment: '',
      };

  const [watch, setWatch] = useState(initialData);

  const baseFormData = () => ({
    watchStartDate: watch.startDate,
    watchEndDate: watch.endDate,
    watchStatus: watch.checked['관람 상태'],
    watchPlace: watch.checked['어디서 시청하셨나요?'],
    watchWith: watch.checked['누구와 함께했나요?'],
    reWatchWill: watch.checked['다시 볼 의향이 있나요?'],
    watchReview: watch.checked['어떤 영화였나요?'],
    watchComment: watch.comment,
  });

  const getFormData = movieData => ({
    createId: Date.now(),
    movieId: movieData.id,
    title: movieData.title || movieData.name,
    poster_path: movieData.poster_path,
    ...baseFormData(),
  });
  const getEditFormData = () => baseFormData();

  return {
    watch,
    setWatch,
    getFormData,
    getEditFormData,
    initialData,
  };
};
