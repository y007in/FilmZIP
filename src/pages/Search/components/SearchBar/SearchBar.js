import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { filterMovies } from '../../../../utils/filterMovies';
import { fetchSearch } from '../../../../api/api';
import { setSearchKeywordList } from '../../../../utils/storage';

import Loading from '../../../../components/Loading/Loading';

const SearchBar = ({
  searchKeyword,
  setSearchKeyword,
  setSearchResult,
  setSubmitted,
  historyList,
}) => {
  const {
    data: searchMovie,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['search', searchKeyword], // 검색어가 변경될 때마다 새로운 요청 수행
    queryFn: fetchSearch,
  });

  // if (isLoading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  const handleSearchKeyword = e => {
    if (e.target.value.length <= 0) {
      handleReset();
    }
    setSearchKeyword(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchKeyword.trim() === '') {
      handleReset();
      return;
    }
    setSearchKeyword(searchKeyword);
    const filteredList = filterMovies(searchMovie?.results, searchKeyword);
    setSearchResult(filteredList);
    setSubmitted(true);
    handleAdd(searchKeyword); //최근 검색어
  };

  const handleReset = () => {
    setSearchKeyword('');
    setSearchResult([]);
    setSubmitted(false);
  };

  //최근 검색어
  const handleAdd = text => {
    const newKeyword = {
      id: Date.now(),
      text: text,
      date: new Date().toLocaleDateString(),
    };
    setSearchKeywordList([newKeyword, ...historyList]);
  };

  return (
    <form onSubmit={e => handleSubmit(e)} onReset={handleReset}>
      <input
        className="searchInput"
        type="text"
        placeholder="어떤 영화를 보셨나요?"
        autoFocus
        value={searchKeyword}
        onChange={e => handleSearchKeyword(e)}
      />
      {searchKeyword && <button type="reset" className="btnReset"></button>}
    </form>
  );
};

export default SearchBar;
