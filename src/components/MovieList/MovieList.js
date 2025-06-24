import { useNavigate } from 'react-router-dom';
import Poster from '../Poster/Poster';
import { MvGenre, MvInfoKrTit, MvInfoOgTit } from '../MovieTitle/MovieTitle';
import Badge from '../Badge/Badge';
import { getWatchStatusLabel, WATCH_STATUS } from '../../constants/formField';

const MovieList = ({ list, search, onClick }) => {
  const navigate = useNavigate();

  return (
    <ul className="mvCard">
      {list?.map(item => (
        <li
          className="mvInfo"
          key={item.createId}
          onClick={() => onClick(item)}
        >
          <aside className="imgBox">
            <Poster key={item.id} item={item} age />
          </aside>
          <aside className="mvInfoTit">
            <MvInfoKrTit data={item} />
            {search ? (
              <>
                <MvInfoOgTit data={item} />
                <MvGenre data={item.genre_ids} slice={3} />
              </>
            ) : (
              <div className="statusData">
                <Badge
                  text={getWatchStatusLabel(item.watchStatus, 'icon')}
                  badgeType={`${item.watchStatus}`}
                />

                {item.count > 1 && (
                  <Badge text={`+ ${item.count}`} badgeType={'solid'} />
                )}
              </div>
            )}
          </aside>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
