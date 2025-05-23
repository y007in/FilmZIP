import { getMovieRecords } from './storage';

const recordList = getMovieRecords();

export const getRecordList = id => {
  const record = recordList
    .filter(item => item.movieId === Number(id))
    .sort((a, b) => new Date(b.watchEndDate) - new Date(a.watchEndDate));
  return record;
};

export const getNoDupRecordList = () => {
  const deduplicated = recordList.reduce((acc, curr) => {
    const existing = acc.find(item => item.movieId === curr.movieId);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ ...curr, count: 1 });
    }
    return acc;
  }, []);
  return deduplicated.reverse();
};
