import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import SlideList from './SlideList';

const SlideBox = ({ title, data, contentType, nav, dayCount }) => {
  const navigate = useNavigate();
  return (
    <article className="slideBox">
      <div className="slideBoxHead">
        <h1 className="contentTit">{title}</h1>
        {nav && (
          <button className="fullList">
            <FontAwesomeIcon
              icon={faAngleRight}
              onClick={() =>
                navigate(`${nav}?title=${encodeURIComponent(title)}`, {
                  state: { data, contentType, title },
                })
              }
            />
          </button>
        )}
      </div>

      <SlideList data={data} contentType={contentType} dayCount={dayCount} />
    </article>
  );
};

export default SlideBox;
