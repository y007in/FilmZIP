export const getMovieRecords = () => {
  return JSON.parse(localStorage.getItem('movieRecords')) || [];
};

export const setMovieRecords = records => {
  localStorage.setItem('movieRecords', JSON.stringify(records));
};

export const getSearchKeywordList = () => {
  return JSON.parse(localStorage.getItem('searchKeyword')) || [];
};

export const setSearchKeywordList = searchKeyword => {
  localStorage.setItem('searchKeyword', JSON.stringify(searchKeyword));
};
