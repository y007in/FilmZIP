import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { filterMovies } from '../../../../utils/filterMovies';
import { fetchSearch } from '../../../../api/api';
import { setSearchKeywordList } from '../../../../utils/storage';

const SearchBar = ({
  searchMovie,
  searchKeyword,
  setSearchKeyword,
  setSearchResult,
  setSubmitted,
  historyList,
}) => {
  const navigate = useNavigate();

  const handleSearchKeyword = e => {
    if (e.target.value.length <= 0) handleReset();
    setSearchKeyword(e.target.value);
  };

  const handleSubmit = (e, keyword) => {
    e.preventDefault();
    if (searchKeyword.trim() === '') {
      handleReset();
      navigate('/search');
      return;
    }
    setSearchKeyword(searchKeyword);
    navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    const filteredList = filterMovies(searchMovie?.results, searchKeyword);
    setSearchResult(filteredList);
    setSubmitted(true);
    handleAdd(searchKeyword); //최근 검색어
  };

  const handleReset = () => {
    setSearchKeyword('');
  };

  //최근 검색어
  const handleAdd = text => {
    const newKeyword = {
      text: text,
      date: new Date().toLocaleString(),
    };
    const filteredList = historyList.filter(item => item.text !== text);
    setSearchKeywordList([newKeyword, ...filteredList]);
  };

  return (
    <form onSubmit={e => handleSubmit(e, searchKeyword)} onReset={handleReset}>
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
