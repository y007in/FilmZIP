import { useState } from "react";
import useMovies from "./hooks/useMovies";

import "./App.css";

function App() {
  const { movies } = useMovies();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSearchKeyword = (e) => {
    if (e.target.value.length <= 0) {
      handleReset();
    }
    setSearchKeyword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchKeyword.trim() === "") {
      handleReset();
      return;
    }
    setSearchKeyword(searchKeyword);

    const filteredList = movies.filter((item) =>
      item.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setSearchResult(filteredList);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSearchKeyword("");
    setSearchResult([]);
    setSubmitted(false);
  };

  return (
    <div className="App">
      <header>
        <h2>검색</h2>
      </header>
      <div className="container">
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
        <div className="content">
          {submitted &&
            (searchResult.length > 0 ? (
              <ul className="mvCard">
                {searchResult.map((item) => (
                  <li className="mvInfo" key={item.id}>
                    <img
                      className="mvInfoImg"
                      src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                      alt={item.title}
                    />
                    <div className="mvInfoTit">
                      <p className="mvInfoKrTit">{item.title}</p>
                      <p className="mvInfoOgTit">{item.original_title}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="noResult">
                <p>검색 결과가 없습니다</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
