import { useNavigate } from 'react-router-dom';
import List from '../../../../components/List/List';
import {
  MvInfoKrTit,
  MvInfoOgTit,
} from '../../../../components/MovieTitle/MovieTitle';
import { TabType } from '../../../../constants/tabs';

const RecommendKeyword = ({ data }) => {
  const movie = data?.results || [];
  const navigate = useNavigate();

  return (
    <>
      <List
        title={TabType.KEYWORD}
        data={movie.slice(0, 5)}
        onClick={item => navigate(`/movie/${item.id}`)}
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
              <MvInfoKrTit data={item} />
              <MvInfoOgTit data={item} />
            </div>
          </div>
        )}
      />
    </>
  );
};

export default RecommendKeyword;
