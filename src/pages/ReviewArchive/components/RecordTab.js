import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import Badge from '../../../components/Badge/Badge';
import NoResult from '../../../components/NoResult/NoResult';
import MovieList from '../../../components/MovieList/MovieList';
import { WATCH_STATUS } from '../../../constants/formField';
import { getContentType } from '../../../utils/getContentType';
import { useRecordList } from '../../../hooks/useRecordList';

const RecordTab = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const { recordList, getLatestRecord, getNoDupRecordList } = useRecordList();
  const filteredList = recordList.filter(
    item => item.watchStatus === selectedStatus,
  );
  const noDupRecordLists =
    selectedStatus !== 'ALL'
      ? getNoDupRecordList(filteredList)
      : getLatestRecord();

  return (
    <div className="recordContainer">
      <ul className="statusBox">
        <li
          className={`statusBtn ${selectedStatus === 'ALL' ? 'active' : ''}`}
          onClick={() => setSelectedStatus('ALL')}
        >
          <Badge text={<FontAwesomeIcon icon={faList} />} badgeType={'brand'} />
          <span>전체보기</span>
        </li>
        {WATCH_STATUS.map(label => (
          <li
            key={label.label}
            className={`statusBtn ${selectedStatus === label.value ? 'active' : ''}`}
            onClick={() => setSelectedStatus(label.value)}
          >
            <Badge text={label.icon} badgeType={label.value} />
            <span>{label.label}</span>
          </li>
        ))}
      </ul>
      <div className="recordResult">
        {recordList.length !== 0 && (
          <>
            {noDupRecordLists.length !== 0 ? (
              <div className="recordList">
                <MovieList
                  list={noDupRecordLists}
                  date
                  onClick={item =>
                    navigate(
                      `/review/${getContentType(item, 'movie', 'tv')}/${item.movieId}`,
                    )
                  }
                />
              </div>
            ) : (
              <div className="noResult">
                <NoResult noResultData={'아직 저장된 작품이 없어요.'} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RecordTab;
