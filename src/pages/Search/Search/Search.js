import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import Loading from '../../../components/StatusPage/Loading/Loading';
import ErrorPage from '../../../components/StatusPage/ErrorPage/ErrorPage';
import SearchBar from '../components/SearchBar/SearchBar';
import MovieList from '../../../components/MovieList/MovieList';
import RecommendKeyword from '../components/RecommendKeyword/RecommendKeyword';
import HistoryKeyword from '../components/HistoryKeyword/HistoryKeyword';
import Page from '../../../components/Page/Page';
import NoResult from '../../../components/NoResult/NoResult';

import { filterMovies } from '../../../utils/filterMovies';
import {
  fetchPopular,
  fetchTvTopRated,
  fetchSearch,
  fetchTvSearch,
} from '../../../api/api';
import { getSearchKeywordList } from '../../../utils/storage';
import { getContentType } from '../../../utils/getContentType';

const Search = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const keywordFromUrl = query.get('keyword') || '';
  const [searchKeyword, setSearchKeyword] = useState(keywordFromUrl);

  const [
    { data: topRatedData, isLoading: topRatedLoading, error: topRatedError },
    {
      data: topTvRatedData,
      isLoading: topTvRatedLoading,
      error: topTvRatedError,
    },
    { data: searchMovie, isLoading: searchLoading, error: searchError },
    { data: searchTv, isLoading: searchTvLoading, error: searchTvError },
  ] = useQueries({
    queries: [
      {
        queryKey: ['top-rated'],
        queryFn: fetchPopular,
        staleTime: 1000 * 60 * 1,
        gcTime: 1000 * 60 * 5,
      },
      {
        queryKey: ['tv-top-rated'],
        queryFn: fetchTvTopRated,
        staleTime: 1000 * 60 * 1,
        gcTime: 1000 * 60 * 5,
      },
      {
        queryKey: ['search', keywordFromUrl],
        queryFn: ({ queryKey }) => fetchSearch({ queryKey }),
        enabled: !!keywordFromUrl,
        staleTime: 1000 * 60 * 1,
      },
      {
        queryKey: ['tvSearch', keywordFromUrl],
        queryFn: ({ queryKey }) => fetchTvSearch({ queryKey }),
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
    setSubmitted(!!keywordFromUrl); //검색화면 새로고침해도 searchResult 초기화 방지
  }, [keywordFromUrl]);

  useEffect(() => {
    if (!submitted || !keywordFromUrl || !searchMovie || !searchTv) {
      setSearchResult([]);
      return;
    }

    const movieResults = searchMovie?.results || [];
    const tvResults = searchTv?.results || [];

    const mergedResults = [...movieResults, ...tvResults];
    const filteredList = filterMovies(mergedResults, keywordFromUrl);
    setSearchResult(filteredList);
  }, [submitted, keywordFromUrl, searchMovie, searchTv]);

  const handleRecommend = keyword => {
    navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
  };

  if (topRatedLoading || topTvRatedLoading || searchLoading || searchTvLoading)
    return <Loading />;
  if (topRatedError || topTvRatedError || searchError || searchTvError) {
    const error =
      topRatedError || topTvRatedError || searchError || searchTvError;
    return <ErrorPage statusCode={error.status} />;
  }

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
            searchResult && searchResult.length > 0 ? (
              <MovieList
                list={searchResult}
                onClick={item => {
                  navigate(
                    `/detail/${getContentType(item, 'movie', 'tv')}/${item.id}`,
                  );
                }}
                search
              />
            ) : (
              <div className="noResultContent">
                <NoResult
                  noResultData={`앗! "${keywordFromUrl}" 검색결과가 없어요`}
                />
              </div>
            )
          ) : (
            <>
              <HistoryKeyword
                historyList={historyKeywordList}
                handleRecommend={handleRecommend}
              />
              <section className="recommendKey">
                <RecommendKeyword
                  setSearchKeyword={setSearchKeyword}
                  setSearchResult={setSearchResult}
                  data={topRatedData}
                  contentType={'movie'}
                />
                <RecommendKeyword
                  setSearchKeyword={setSearchKeyword}
                  setSearchResult={setSearchResult}
                  data={topTvRatedData}
                  contentType={'tv'}
                />
              </section>
            </>
          )}
        </div>
      </Page>
    </div>
  );
};

export default Search;
