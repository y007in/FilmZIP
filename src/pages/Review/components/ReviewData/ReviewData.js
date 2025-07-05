import Badge from '../../../../components/Badge/Badge';
import { useRecordList } from '../../../../hooks/useRecordList';

import ReviewAction from './ReviewAction';

const ReviewData = ({ id }) => {
  const { recordList, setRecordList, getRecordList } = useRecordList();
  const records = getRecordList(id);

  return (
    <>
      <section className="reviewData">
        {records.map(record => (
          <section className="reviewBox" key={record.createId}>
            <ReviewAction
              id={id}
              recordList={recordList}
              setRecordList={setRecordList}
              record={record}
            />
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
