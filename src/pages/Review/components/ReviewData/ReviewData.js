import Banner from '../../../../components/Banner/Banner';
import { getRecordList } from '../../../../utils/recordList';

const ReviewData = ({ id }) => {
  const records = getRecordList(id);
  console.log(records);
  return (
    <section className="reviewData">
      {records.map((record, idx) => (
        <section className="reviewBox" key={idx}>
          <Banner text={record.watchStatus} bannerType={'brand'} />
          <article className="viewSection viewDate">
            <span>관람일</span>
            <p>
              {record.watchStartDate === record.watchEndDate
                ? record.watchEndDate
                : `${record.watchStartDate} ~ ${record.watchEndDate}`}
            </p>
          </article>
          <article className="viewSection viewMeta">
            <p>{record.watchPlace}</p>
            <p>{record.watchWith}</p>
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
  );
};

export default ReviewData;
