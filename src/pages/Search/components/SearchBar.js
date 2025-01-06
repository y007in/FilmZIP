import { filterMovies } from "../../../utils/filterMovies";
import useMovies from "../../../hooks/useMovies";

const SearchBar = ({
  searchKeyword,
  setSearchKeyword,
  setSearchResult,
  setSubmitted,
  historyList,
  setHistoryList,
}) => {
  const { movies } = useMovies();

  const handleSearchKeyword = (e) => {
    if (e.target.value.length <= 0) {
      handleReset();
    }
    setSearchKeyword(e.target.value);
  };

  const handleSubmit = (e, text) => {
    e.preventDefault();
    if (searchKeyword.trim() === "") {
      handleReset();
      return;
    }
    setSearchKeyword(searchKeyword);
    const filteredList = filterMovies(movies, searchKeyword);
    setSearchResult(filteredList);
    setSubmitted(true);
    handleAdd(searchKeyword); //최근 검색어
  };

  const handleReset = () => {
    setSearchKeyword("");
    setSearchResult([]);
    setSubmitted(false);
  };

  //최근 검색어
  const handleAdd = (text) => {
    const newKeyword = {
      id: Date.now(),
      text: text,
      date: new Date().toLocaleDateString(),
    };
    setHistoryList([newKeyword, ...historyList]);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} onReset={handleReset}>
      <input
        className="searchInput"
        type="text"
        placeholder="검색어를 입력하세요."
        autoFocus
        value={searchKeyword}
        onChange={(e) => handleSearchKeyword(e)}
      />
      {searchKeyword.length > 0 && (
        <button type="reset" className="btnReset"></button>
      )}
    </form>
  );
};

export default SearchBar;
