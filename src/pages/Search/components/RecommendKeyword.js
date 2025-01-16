import List from '../../../components/List';
import useMovies from '../../../hooks/useMovies';

const RecommendKeyword = ({ handleRecommend }) => {
  const { movies } = useMovies();
  //추천 검색어

  return (
    <List
      data={movies.slice(0, 5)}
      onClick={item => handleRecommend(item.title)}
      renderItem={(item, i) => (
        <>
          <span>{i + 1}</span>
          <span>{item.title}</span>
        </>
      )}
    />
  );
};

export default RecommendKeyword;
