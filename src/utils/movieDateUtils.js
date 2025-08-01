import { getTodayString } from './today';

const getTodayDate = () => new Date(getTodayString());

export const latestComingList = data => {
  const todayDate = getTodayDate();

  return data?.results
    .sort((a, b) => new Date(a.release_date) - new Date(b.release_date))
    .filter(item => {
      const releaseDate = new Date(item.release_date);
      return item.release_date && releaseDate >= todayDate;
    });
};

export const dDayCount = item => {
  const todayDate = getTodayDate();
  const releaseDate = new Date(item.release_date);
  const diffTime = releaseDate - todayDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 0 ? `D-${diffDays}` : '';
};
