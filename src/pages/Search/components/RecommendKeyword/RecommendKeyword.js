import { useQuery } from '@tanstack/react-query';
import { fetchTopRated } from '../../../../api/api';
import List from '../../../../components/List/List';
import { useEffect } from 'react';

const RecommendKeyword = ({ handleRecommend }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['top-rated'],
    queryFn: fetchTopRated,
  });
  //추천 검색어
  if (isLoading) return <div>loading</div>;
  if (error) return <div>Error: {error.message}</div>;

  const movie = data.results || [];

  return (
    <List
      data={movie.slice(0, 5)}
      onClick={item => handleRecommend(item.title)}
      renderItem={(item, i) => (
        <>
          <span className="topNum">{i + 1}</span>
          <span>{item.title}</span>
        </>
      )}
    />
  );
};

export default RecommendKeyword;
