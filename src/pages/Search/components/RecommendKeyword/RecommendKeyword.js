import { useNavigate } from 'react-router-dom';
import List from '../../../../components/List/List';
import {
  MvInfoKrTit,
  MvInfoOgTit,
} from '../../../../components/MovieTitle/MovieTitle';
import { TabType } from '../../../../constants/tabs';
import Poster from '../../../../components/Poster/Poster';

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
            <span className="topNum">{i + 1}</span>
            <span className="moviePoster">
              <Poster item={item} />
            </span>
            <span className="titles">
              <MvInfoKrTit data={item} />
              <MvInfoOgTit data={item} />
            </span>
          </div>
        )}
      />
    </>
  );
};

export default RecommendKeyword;
