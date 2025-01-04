import { useState } from "react";
import useMovies from "./hooks/useMovies";

import "./App.css";

function App() {
  const { movies } = useMovies();
  const TabType = {
    KEYWORD: "KEYWORD",
    HISTORY: "HISTORY",
  };
  const TabLabel = {
    [TabType.KEYWORD]: "추천 검색어",
    [TabType.HISTORY]: "최근 검색어",
  };
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedTab, setSelectedTab] = useState(TabType.KEYWORD);
  const [historyList, setHistoryList] = useState([]);

  const filterMovies = (keyword) => {
    return movies.filter((item) =>
      item.title.toLowerCase().includes(keyword.toLowerCase())
    );
  };

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
    const filteredList = filterMovies(searchKeyword);
    setSearchResult(filteredList);
    setSubmitted(true); //최근 검색어
    handleAdd(searchKeyword);
  };

  const handleReset = () => {
    setSearchKeyword("");
    setSearchResult([]);
    setSubmitted(false);
  };

  //추천 검색어
  const handleRecommend = (keyword) => {
    const recommendList = filterMovies(keyword);
    setSearchKeyword(keyword); //검색창에 키워드 출력
    setSearchResult(recommendList);
    setSubmitted(true);
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
  const handleDel = (id) => {
    const delKeyword = historyList.filter((item) => item.id != id);
    setHistoryList(delKeyword);
  };

  console.log(movies);
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
          {submitted ? (
            searchResult.length > 0 ? (
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
            )
          ) : (
            <>
              <ul className="tabs">
                {Object.values(TabType).map((tabType) => (
                  <li
                    className={selectedTab === tabType ? "active" : ""}
                    key={tabType}
                    onClick={() => setSelectedTab(tabType)}
                  >
                    {TabLabel[tabType]}
                  </li>
                ))}
              </ul>
              {selectedTab === TabType.KEYWORD && (
                <ul className="lists">
                  {movies.slice(0, 5).map((item, i) => (
                    <li
                      className="list"
                      key={item.id}
                      onClick={() => handleRecommend(item.title)}
                    >
                      {i + 1}.{item.title}
                    </li>
                  ))}
                </ul>
              )}
              {selectedTab === TabType.HISTORY &&
                (historyList.length == 0 ? (
                  <div className="noSearchKeyword">
                    <p>검색어가 없습니다.</p>
                  </div>
                ) : (
                  <ul className="lists">
                    {historyList.map(({ id, text, date }) => (
                      <li key={id}>
                        <ul className="list">
                          <li onClick={() => handleRecommend(text)}>{text}</li>
                          <li className="rightBtn">
                            <span>{date}</span>
                            <button
                              className="delBtn"
                              onClick={(e) => {
                                e.preventDefault();
                                handleDel(id);
                              }}
                            >
                              x
                            </button>
                          </li>
                        </ul>
                      </li>
                    ))}
                  </ul>
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
