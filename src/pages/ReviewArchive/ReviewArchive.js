import { useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import Page from '../../components/Page/Page';
import Header from '../../components/Header/Header';
import MovieList from '../../components/MovieList/MovieList';
import NoResult from '../../components/NoResult/NoResult';
import Badge from '../../components/Badge/Badge';
import { useRecordList } from '../../hooks/useRecordList';
import { WATCH_STATUS } from '../../constants/formField';
import { getContentType } from '../../utils/getContentType';

const ReviewArchive = () => {
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const { recordList, getLatestRecord, getNoDupRecordList } = useRecordList();
  const filteredList = recordList.filter(
    item => item.watchStatus === selectedStatus,
  );
  const navigate = useNavigate();
  const noDupRecordLists =
    selectedStatus !== 'ALL'
      ? getNoDupRecordList(filteredList)
      : getLatestRecord();

  const location = useLocation();
  const data = location.state?.data;
  const [params] = useSearchParams();
  const title = params.get('title');

  return (
    <div className="ReviewArchive">
      <Page header={<Header title={title} />}>
        {title === '나의 아카이빙' ? (
          <div className="recordContainer">
            <ul className="statusBox">
              <li
                className={`statusBtn ${selectedStatus === 'ALL' ? 'active' : ''}`}
                onClick={() => setSelectedStatus('ALL')}
              >
                <Badge
                  text={<FontAwesomeIcon icon={faList} />}
                  badgeType={'brand'}
                />
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
        ) : (
          <div className="rankContainer">
            <MovieList list={data} />
          </div>
        )}
      </Page>
    </div>
  );
};

export default ReviewArchive;
