import { useRef, useState } from 'react';
export const useMovieForm = () => {
  const [checked, setChecked] = useState({});
  const watchRefs = useRef({
    startDate: null,
    endDate: null,
    comment: null,
  });

  const getFormData = movieData => ({
    movieId: movieData.id,
    title: movieData.title,
    poster_path: movieData.poster_path,
    watchStartDate: watchRefs.current.startDate?.value || '',
    watchEndDate: watchRefs.current.endDate?.value || '',
    watchStatus: checked['관람 상태'],
    watchPlace: checked['어디서 시청하셨나요?'],
    watchWith: checked['누구와 함께했나요?'],
    reWatchWill: checked['다시 볼 의향이 있나요?'],
    watchReview: checked['어떤 영화였나요?'],
    watchComment: watchRefs.current.comment?.value || '',
  });

  return {
    checked,
    setChecked,
    watchRefs,
    getFormData,
  };
};
