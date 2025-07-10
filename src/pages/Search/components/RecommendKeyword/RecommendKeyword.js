import { useNavigate } from 'react-router-dom';
import List from '../../../../components/List/List';
import Poster from '../../../../components/Poster/Poster';
import {
  MvInfoKrTit,
  MvInfoOgTit,
} from '../../../../components/MovieTitle/MovieTitle';
import { TabType } from '../../../../constants/tabs';
import { getBoolContentType } from '../../../../utils/getContentType';

const RecommendKeyword = ({ data, contentType }) => {
  const movie = data?.results || [];
  const navigate = useNavigate();

  return (
    <>
      <List
        title={getBoolContentType(
          contentType,
          TabType.MOVIE_KEYWORD,
          TabType.TV_KEYWORD,
        )}
        data={movie.slice(0, 5)}
        onClick={item => navigate(`/detail/${contentType}/${item.id}`)}
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
