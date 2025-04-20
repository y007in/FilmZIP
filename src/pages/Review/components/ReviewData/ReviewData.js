import Banner from '../../../../components/Banner/Banner';
import { recordList } from '../../../../utils/recordList';

const ReviewData = ({ id }) => {
  const {
    watchStartDate,
    watchEndDate,
    watchPlace,
    watchWith,
    watchReview,
    watchComment,
  } = recordList(id);
  return (
    <section className="reviewData">
      <article className="viewSection viewDate">
        <span>관람일</span>
        <p>
          {watchStartDate === watchEndDate
            ? watchEndDate
            : `${watchStartDate} ~ ${watchEndDate}`}
        </p>
      </article>
      <article className="viewSection viewMeta">
        <p>{watchPlace}</p>
        <p>{watchWith}</p>
      </article>
      <article className="selection">
        {watchReview?.map((review, i) => (
          <Banner key={i} bannerType={'sub'} text={review} />
        ))}
      </article>
      {watchComment && (
        <article className="watchComment">{watchComment}</article>
      )}
    </section>
  );
};

export default ReviewData;
