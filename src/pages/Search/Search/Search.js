import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import Loading from '../../../components/Loading/Loading';
import SearchBar from '../components/SearchBar/SearchBar';
import MovieList from '../../../components/MovieList/MovieList';
import Tabs from '../components/Tabs/Tabs';
import RecommendKeyword from '../components/RecommendKeyword/RecommendKeyword';
import HistoryKeyword from '../components/HistoryKeyword/HistoryKeyword';

import { TabType } from '../../../constants/tabs';
import { filterMovies } from '../../../utils/filterMovies';
import { fetchTopRated } from '../../../api/api';
import { useNavigate } from 'react-router-dom';
import Page from '../../../components/Page/Page';
import NoResult from '../../../components/NoResult/NoResult';

const Search = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [historyList, setHistoryList] = useState([]);
  const [selectedTab, setSelectedTab] = useState(TabType.KEYWORD);

  const navigate = useNavigate();
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
      <Page
        header={
          <header>
            <FontAwesomeIcon icon={faAngleLeft} onClick={() => navigate('/')} />
            <SearchBar
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
              setSearchResult={setSearchResult}
              setSubmitted={setSubmitted}
              historyList={historyList}
              setHistoryList={setHistoryList}
            />
          </header>
        }
      >
        <div className="container">
          <div className="content">
            {submitted ? (
              searchResult ? (
                <MovieList list={searchResult} />
              ) : (
                <NoResult
                  noResultData={`앗! "${searchKeyword}" 검색결과가 없어요`}
                />
              )
            ) : (
              <>
                <Tabs
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                />
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
      </Page>
    </div>
  );
};

export default Search;
