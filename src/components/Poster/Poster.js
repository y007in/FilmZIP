import Badge from '../Badge/Badge';
import { MvCertification, MvInfoImage } from '../MovieTitle/MovieTitle';

const Poster = ({ item, age, contentType, dayCount }) => {
  const today = new Date();
  const releaseDate = new Date(item.release_date);

  const diff = releaseDate - today;
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const dDay = diffDays >= 0 ? `D-${diffDays}` : '';

  return (
    <article className="mvInfoImg">
      {item.poster_path !== null ? (
        <>
          <MvInfoImage data={item} path={item.poster_path} />
          {age && (
            <div className="age">
              <MvCertification id={item.id} contentType={contentType} />
            </div>
          )}
          {dayCount && (
            <div className="dDay">
              <Badge badgeType={'brand'} text={dDay} />
            </div>
          )}
        </>
      ) : (
        <div className="noImage">
          <span>이미지</span>
          <span>준비중</span>
        </div>
      )}
    </article>
  );
};

export default Poster;
