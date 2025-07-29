export const dDayCount = item => {
  const today = new Date(new Date().toISOString().split('T')[0]);
  const releaseDate = new Date(item.release_date);
  const diff = releaseDate - today;
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const dDay = diffDays >= 0 ? `D-${diffDays}` : '';
  return dDay;
};
