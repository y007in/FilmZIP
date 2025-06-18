import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
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
import { fetchTopRated, fetchSearch } from '../../../api/api';
import { getSearchKeywordList } from '../../../utils/storage';

const Search = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const keywordFromUrl = query.get('keyword') || '';
  const [searchKeyword, setSearchKeyword] = useState(keywordFromUrl);

  const [
    { data: topRatedData, isLoading: topRatedLoading, error: topRatedError },
    { data: searchMovie, isLoading: searchLoading, error: searchError },
  ] = useQueries({
    queries: [
      {
        queryKey: ['top-rated'],
        queryFn: fetchTopRated,
        staleTime: 1000 * 60 * 1,
        cacheTime: 1000 * 60 * 5,
      },
      {
        queryKey: ['search', keywordFromUrl],
        queryFn: ({ queryKey }) => fetchSearch({ queryKey }),
        enabled: !!keywordFromUrl,
        staleTime: 1000 * 60 * 1,
      },
    ],
  });

  const [searchResult, setSearchResult] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const historyKeywordList = getSearchKeywordList();

  useEffect(() => {
    setSearchKeyword(keywordFromUrl);
    setSubmitted(!!keywordFromUrl);
  }, [keywordFromUrl]);

  useEffect(() => {
    if (!submitted || !keywordFromUrl || !searchMovie) {
      setSearchResult([]);
      return;
    }

    const filteredList = filterMovies(searchMovie.results, keywordFromUrl);
    setSearchResult(filteredList);
  }, [submitted, keywordFromUrl, searchMovie]);

  const handleRecommend = keyword => {
    navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
  };

  if (topRatedLoading || searchLoading) return <Loading />;
  if (topRatedError || searchError)
    return <p>Error: {(topRatedError || searchError).message}</p>;

  return (
    <div className="SearchPage">
      <Page
        header={
          <div className="search">
            <FontAwesomeIcon icon={faAngleLeft} onClick={() => navigate('/')} />
            <SearchBar
              searchMovie={searchMovie}
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
              setSearchResult={setSearchResult}
              historyList={historyKeywordList}
              setSubmitted={setSubmitted}
            />
          </div>
        }
      >
        <div className="content">
          {submitted ? (
            searchResult.length > 0 ? (
              <MovieList list={searchResult} />
            ) : (
              <NoResult
                noResultData={`앗! "${keywordFromUrl}" 검색결과가 없어요`}
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
                data={topRatedData}
              />
            </>
          )}
        </div>
      </Page>
    </div>
  );
};

export default Search;
