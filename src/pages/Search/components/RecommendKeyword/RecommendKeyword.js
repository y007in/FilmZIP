import List from '../../../../components/List/List';
import { TabType } from '../../../../constants/tabs';

const RecommendKeyword = ({ handleRecommend, data }) => {
  const movie = data?.results || [];

  return (
    <>
      <List
        title={TabType.KEYWORD}
        data={movie.slice(0, 5)}
        onClick={item => handleRecommend(item.title)}
        renderItem={(item, i) => (
          <div className="recommendList">
            <span className="topNum">{i + 1}</span>{' '}
            <article className="mvInfoImg">
              {item.poster_path !== null ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                  alt={item.title}
                />
              ) : (
                <div className="noImage">
                  <span>이미지</span>
                  <span>준비중</span>
                </div>
              )}
            </article>
            <div className="titles">
              <p className="mvInfoKrTit">{item.title}</p>
              <p className="mvInfoOgTit">{item.original_title}</p>
            </div>
          </div>
        )}
      />
    </>
  );
};

export default RecommendKeyword;
