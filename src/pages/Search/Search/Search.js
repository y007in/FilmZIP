import { useState } from 'react';

import Header from '../../../components/Header/Header';
import SearchBar from '../components/SearchBar/SearchBar';
import MovieList from '../../../components/MovieList/MovieList';
import Tabs from '../components/Tabs/Tabs';
import RecommendKeyword from '../components/RecommendKeyword/RecommendKeyword';
import HistoryKeyword from '../components/HistoryKeyword/HistoryKeyword';

import { TabType } from '../../../constants/tabs';
import { filterMovies } from '../../../utils/filterMovies';
import useMovies from '../../../hooks/useMovies';

const Search = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [historyList, setHistoryList] = useState([]);
  const [selectedTab, setSelectedTab] = useState(TabType.KEYWORD);

  const { movies } = useMovies();
  console.log(movies);

  const handleRecommend = keyword => {
    const recommendList = filterMovies(movies, keyword);
    setSearchKeyword(keyword); //검색창에 키워드 출력
    setSearchResult(recommendList);
    setSubmitted(true);
  };

  return (
    <div className="SearchPage">
      <Header header={'검색'} />
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
              <MovieList list={searchResult} />
            ) : (
              <div className="noResult">
                앗! <span className="keyword">{searchKeyword}</span> 검색 결과가
                없어요
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
                  handleRecommend={handleRecommend}
                />
              )}
              {selectedTab === TabType.HISTORY && (
                <HistoryKeyword
                  historyList={historyList}
                  setHistoryList={setHistoryList}
                  handleRecommend={handleRecommend}
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
