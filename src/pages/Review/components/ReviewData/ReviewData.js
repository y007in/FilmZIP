import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from '../../../../components/Banner/Banner';
import { getRecordList } from '../../../../utils/recordList';
import { setMovieRecords } from '../../../../utils/storage';
import { getWatchStatusLabel } from '../../../../constants/formField';
import AlertBox from '../../../../components/AlertBox/AlertBox';

const ReviewData = ({ id }) => {
  const [isAlert, setIsAlert] = useState(false);
  const records = getRecordList(id);
  const navigate = useNavigate();
  const handleAlert = () => {
    setIsAlert(true);
  };

  const handleDelMovie = targetCreateId => {
    const updatedRecords = records.filter(
      item => item.createId !== targetCreateId,
    );
    setMovieRecords(updatedRecords);
    if (updatedRecords.length === 0) {
      navigate('/');
    }
    setIsAlert(false);
    window.location.reload();
  };

  return (
    <>
      <section className="reviewData">
        {records.map((record, idx) => (
          <section className="reviewBox" key={idx}>
            <div className="head">
              <Banner
                text={getWatchStatusLabel(record.watchStatus)}
                bannerType={`${record.watchStatus}`}
              />
              <article>
                <button className="reviewBtn" onClick={handleAlert}>
                  삭제
                </button>
                {isAlert && (
                  <AlertBox
                    alertText={'정말 삭제하시겠습니까?'}
                    submitText={'확인'}
                    onSubmit={() => handleDelMovie(record.createId)}
                    onCancel={() => setIsAlert(false)}
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
                <Banner key={i} bannerType={'sub'} text={review} />
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
