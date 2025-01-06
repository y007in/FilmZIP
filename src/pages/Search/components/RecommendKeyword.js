import useMovies from "../../../hooks/useMovies";

const RecommendKeyword = ({ handleRecommend }) => {
  const { movies } = useMovies();
  //추천 검색어

  return (
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
  );
};

export default RecommendKeyword;
