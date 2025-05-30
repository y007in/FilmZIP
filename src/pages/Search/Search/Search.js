import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import Loading from '../../../components/Loading/Loading';
import SearchBar from '../components/SearchBar/SearchBar';
import MovieList from '../../../components/MovieList/MovieList';
import RecommendKeyword from '../components/RecommendKeyword/RecommendKeyword';
import HistoryKeyword from '../components/HistoryKeyword/HistoryKeyword';
import Page from '../../../components/Page/Page';
import NoResult from '../../../components/NoResult/NoResult';

import { filterMovies } from '../../../utils/filterMovies';
import { fetchTopRated } from '../../../api/api';
import { getSearchKeywordList } from '../../../utils/storage';

const Search = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const historyKeywordList = getSearchKeywordList();

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
          <div className="search">
            <FontAwesomeIcon icon={faAngleLeft} onClick={() => navigate('/')} />
            <SearchBar
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
              setSearchResult={setSearchResult}
              setSubmitted={setSubmitted}
              historyList={historyKeywordList}
            />
          </div>
        }
      >
        <div className="content">
          {submitted ? (
            searchResult ? (
              <MovieList list={searchResult} />
            ) : (
              <NoResult
                noResultData={`앗! "${historyKeywordList[0].text}" 검색결과가 없어요`}
              />
            )
          ) : (
            <>
              <HistoryKeyword
                historyList={historyKeywordList}
                handleRecommend={handleRecommend}
              />
              <RecommendKeyword
                setSearchKeyword={setSearchKeyword}
                setSearchResult={setSearchResult}
                setSubmitted={setSubmitted}
                data={top_rated}
              />
            </>
          )}
        </div>
      </Page>
    </div>
  );
};

export default Search;
