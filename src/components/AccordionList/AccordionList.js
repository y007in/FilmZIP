import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const AccordionList = ({ title, detail, detailCount, children, boolean }) => {
  const [show, setShow] = useState(boolean);

  const handleShowProduct = () => {
    setShow(!show);
  };
  return (
    <section className="AccordionList">
      <div className="AccordionTitle">
        <span>{title}</span>
        <span className="rightBtn">
          <p>
            {/* <div className="titEllipsis">{detail}</div> */}
            {/* <div className="nonEllipsis">{detailCount}</div> */}
          </p>
          <button onClick={handleShowProduct}>
            {show ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )}
          </button>
        </span>
      </div>
      <div className={`products ${show ? 'open' : ''}`}>{children}</div>
    </section>
  );
};

export default AccordionList;
