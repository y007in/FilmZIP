import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

const Header = ({ header, back, rightBtn, handleRightBtn }) => {
  const navigate = useNavigate();

  return (
    <header className="pageTit">
      <span
        className={`headerBtn ${back ? '' : 'hidden'}`}
        onClick={back && (() => navigate(-1))}
      >
        {back && <FontAwesomeIcon icon={faAngleLeft} />}
      </span>
      <h2 className="title">{header}</h2>
      <span
        className={`headerBtn ${rightBtn ? '' : 'hidden'}`}
        onClick={rightBtn && handleRightBtn}
      >
        {rightBtn && <FontAwesomeIcon icon={faMagnifyingGlass} />}
      </span>
    </header>
  );
};

export default Header;
