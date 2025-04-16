import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const Header = ({ movieData }) => {
  const navigate = useNavigate();

  return (
    <header className="titleHeader">
      <FontAwesomeIcon icon={faAngleLeft} onClick={() => navigate('/')} />
      <span>{movieData.title}</span>
    </header>
  );
};

export default Header;
