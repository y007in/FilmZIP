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
          <>
            <span className="topNum">{i + 1}</span>
            <span>{item.title}</span>
          </>
        )}
      />
    </>
  );
};

export default RecommendKeyword;
