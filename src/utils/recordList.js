import { getMovieRecords } from './storage';

export const recordList = id => {
  const recordList = getMovieRecords();
  const record = recordList.find(item => item.movieId === Number(id));
  const {
    watchStartDate,
    watchEndDate,
    watchStatus,
    watchPlace,
    watchWith,
    reWatchWill,
    watchReview,
    watchComment,
  } = record;
  return {
    watchStartDate,
    watchEndDate,
    watchStatus,
    watchPlace,
    watchWith,
    reWatchWill,
    watchReview,
    watchComment,
  };
};
