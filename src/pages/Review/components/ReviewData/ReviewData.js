import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from '../../../../components/Badge/Badge';
import { useRecordList } from '../../../../hooks/useRecordList';
import { setMovieRecords } from '../../../../utils/storage';
import { getWatchStatusLabel } from '../../../../constants/formField';
import AlertBox from '../../../../components/AlertBox/AlertBox';

const ReviewData = ({ id }) => {
  const [alertTargetId, setAlertTargetId] = useState(null);
  const { recordList, setRecordList, getRecordList } = useRecordList();
  const records = getRecordList(id);
  const navigate = useNavigate();
  const openAlert = id => setAlertTargetId(id);

  const handleDelMovie = createId => {
    const updatedRecords = recordList.filter(
      item => item.createId !== createId,
    );
    setMovieRecords(updatedRecords);
    setRecordList(updatedRecords);
    updatedRecords.filter(item => item.movieId === Number(id)).length === 0 &&
      navigate('/');
    setAlertTargetId(null);
  };

  return (
    <>
      <section className="reviewData">
        {records.map((record, idx) => (
          <section className="reviewBox" key={idx}>
            <div className="head">
              <Badge
                text={getWatchStatusLabel(record.watchStatus)}
                badgeType={`${record.watchStatus}`}
              />
              <article>
                <button
                  className="reviewBtn"
                  onClick={() => openAlert(record.createId)}
                >
                  삭제
                </button>
                {alertTargetId === record.createId && (
                  <AlertBox
                    alertText={'정말 삭제하시겠습니까?'}
                    submitText={'삭제'}
                    onSubmit={() => {
                      handleDelMovie(record.createId);
                    }}
                    onCancel={() => setAlertTargetId(null)}
                  />
                )}
              </article>
            </div>
            <article className="viewSection viewDate">
              <span>관람일</span>
              <p>
                {record.watchStartDate === record.watchEndDate
                  ? record.watchEndDate
                  : `${record.watchStartDate} ~ ${record.watchEndDate}`}
              </p>
            </article>
            <article className="viewSection viewMeta">
              <span>{record.watchPlace}</span>
              <span>
                {record.watchWith?.map((person, i) => (
                  <p key={i}>{person}</p>
                ))}
              </span>
            </article>
            <article className="selection">
              {record.watchReview?.map((review, i) => (
                <Badge key={i} badgeType={'sub'} text={review} />
              ))}
            </article>
            {record.watchComment && (
              <article className="watchComment">{record.watchComment}</article>
            )}
          </section>
        ))}
      </section>
    </>
  );
};

export default ReviewData;
