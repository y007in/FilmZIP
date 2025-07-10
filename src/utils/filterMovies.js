export const filterMovies = (data, keyword) => {
  return data?.filter(item =>
    (item.title || item.name).toLowerCase().includes(keyword.toLowerCase()),
  );
};
