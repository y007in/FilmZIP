import Poster from '../Poster/Poster';
import {
  ContentType,
  MvInfoKrTit,
  MvInfoOgTit,
} from '../MovieTitle/MovieTitle';
import Badge from '../Badge/Badge';
import { getWatchStatusLabel } from '../../constants/formField';
import { getContentType } from '../../utils/getContentType';

const MovieList = ({ list, date, search, onClick }) => {
  return (
    <ul className="mvCard">
      {list?.map(item => (
        <li
          className="mvInfo"
          key={item.id || item.createId}
          onClick={() => onClick(item)}
        >
          <aside className="imgBox">
            <Poster
              key={item.id}
              item={item}
              age
              contentType={getContentType(item, 'movie', 'tv')}
            />
          </aside>
          <aside className="mvInfoTit">
            <MvInfoKrTit data={item} />
            {search ? (
              <>
                <MvInfoOgTit data={item} />
                <ContentType data={item} />
              </>
            ) : (
              <div className="statusData">
                {date && (
                  <p className="date">
                    {item.watchStartDate === item.watchEndDate
                      ? item.watchEndDate
                      : `${item.watchStartDate} ~ ${item.watchEndDate}`}
                  </p>
                )}
                <div className="statusBadge">
                  <Badge
                    text={getWatchStatusLabel(item.watchStatus, 'icon')}
                    badgeType={`${item.watchStatus}`}
                  />
                  {item.count > 1 && (
                    <Badge text={`+ ${item.count}`} badgeType={'solid'} />
                  )}
                </div>
              </div>
            )}
          </aside>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
