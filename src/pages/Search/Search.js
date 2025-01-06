import { useState } from "react";

import Header from "../../components/Header";
import SearchBar from "./components/SearchBar";
import SearchResult from "./components/SearchResult";
import Tabs from "./components/Tabs";
import RecommendKeyword from "./components/RecommendKeyword";
import HistoryKeyword from "./components/HistoryKeyword";

import { TabType } from "../../constants/tabs";

const Search = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [historyList, setHistoryList] = useState([]);
  const [selectedTab, setSelectedTab] = useState(TabType.KEYWORD);

  const handleRecommend = (keyword) => {
    const recommendList = filterMovies(movies, keyword);
    setSearchKeyword(keyword); //검색창에 키워드 출력
    setSearchResult(recommendList);
    setSubmitted(true);
  };

  return (
    <div className="App">
      <Header header={"검색"} />
      <div className="container">
        <SearchBar
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          setSearchResult={setSearchResult}
          setSubmitted={setSubmitted}
          historyList={historyList}
          setHistoryList={setHistoryList}
        />
        <div className="content">
          {submitted ? (
            searchResult.length > 0 ? (
              <SearchResult searchResult={searchResult} />
            ) : (
              <div className="noResult">
                <p>검색 결과가 없습니다</p>
              </div>
            )
          ) : (
            <>
              <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
              {selectedTab === TabType.KEYWORD && (
                <RecommendKeyword
                  setSearchKeyword={setSearchKeyword}
                  setSearchResult={setSearchResult}
                  setSubmitted={setSubmitted}
                  onClick={handleRecommend}
                />
              )}
              {selectedTab === TabType.HISTORY && (
                <HistoryKeyword
                  historyList={historyList}
                  setHistoryList={setHistoryList}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
