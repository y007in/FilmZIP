export const filterMovies = (data, keyword) => {
  return data.filter(item =>
    item.title.toLowerCase().includes(keyword.toLowerCase()),
  );
};
