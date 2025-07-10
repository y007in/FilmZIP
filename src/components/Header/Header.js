import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const Header = ({ movieData }) => {
  const navigate = useNavigate();

  return (
    <div className="titleHeader">
      <FontAwesomeIcon icon={faAngleLeft} onClick={() => navigate(-1)} />
      <span>{movieData.title || movieData.name}</span>
    </div>
  );
};

export default Header;
