export const filterMovies = (data, keyword) => {
  return data?.filter(item =>
    (item.title || item.name).toLowerCase().includes(keyword.toLowerCase()),
  );
};

export const filterReleaseDate = (data1, data2, id) =>
  data1?.results.find(item => Number(id) === item.id) || data2;
