import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import SlideList from '../Slide/SlideList';

const SlideBox = ({ title, data, contentType, nav, dayCount, type, box }) => {
  const navigate = useNavigate();
  return (
    <article className="slideBox">
      {title && (
        <div className="slideBoxHead">
          <h1 className="contentTit">{title}</h1>
          <button className="fullList">
            <FontAwesomeIcon
              icon={faAngleRight}
              onClick={() =>
                navigate(`${nav}?title=${encodeURIComponent(title)}`, {
                  state: { contentType, title, type },
                })
              }
            />
          </button>
        </div>
      )}
      <SlideList
        data={data}
        contentType={contentType}
        dayCount={dayCount}
        nav={nav}
        box={box}
      />
    </article>
  );
};

export default SlideBox;
