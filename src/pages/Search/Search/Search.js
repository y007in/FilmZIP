import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import Loading from '../../../components/Loading/Loading';
import Header from '../../../components/Header/Header';
import SearchBar from '../components/SearchBar/SearchBar';
import MovieList from '../../../components/MovieList/MovieList';
import Tabs from '../components/Tabs/Tabs';
import RecommendKeyword from '../components/RecommendKeyword/RecommendKeyword';
import HistoryKeyword from '../components/HistoryKeyword/HistoryKeyword';

import { TabType } from '../../../constants/tabs';
import { filterMovies } from '../../../utils/filterMovies';
import { fetchTopRated } from '../../../api/api';

const Search = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [historyList, setHistoryList] = useState([]);
  const [selectedTab, setSelectedTab] = useState(TabType.KEYWORD);

  const {
    data: top_rated,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['top-rated'],
    queryFn: fetchTopRated,
  });

  if (isLoading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  const handleRecommend = keyword => {
    const recommendList = filterMovies(top_rated?.results, keyword);
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
            searchResult ? (
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
                  data={top_rated}
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
