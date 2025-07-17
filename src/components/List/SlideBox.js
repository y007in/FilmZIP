import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import SlideList from './SlideList';
import { useNavigate } from 'react-router-dom';

const SlideBox = ({ title, data, contentType, nav }) => {
  const navigate = useNavigate();
  return (
    <article className="slideBox">
      <div className="slideBoxHead">
        <h1 className="contentTit">{title}</h1>
        <FontAwesomeIcon icon={faAngleRight} onClick={() => navigate(nav)} />
      </div>

      <SlideList data={data} contentType={contentType} />
    </article>
  );
};

export default SlideBox;
