import Banner from '../../../../components/Banner/Banner';
import { getRecordList } from '../../../../utils/recordList';
import { getWatchStatusLabel } from '../../../../constants/formField';

const ReviewData = ({ id }) => {
  const records = getRecordList(id);

  return (
    <section className="reviewData">
      {records.map((record, idx) => (
        <section className="reviewBox" key={idx}>
          <Banner
            text={getWatchStatusLabel(record.watchStatus)}
            bannerType={`${record.watchStatus}`}
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
