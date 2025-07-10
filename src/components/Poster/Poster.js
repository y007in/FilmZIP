import { MvCertification, MvInfoImage } from '../MovieTitle/MovieTitle';

const Poster = ({ item, age, contentType }) => {
  return (
    <article className="mvInfoImg">
      {item.poster_path !== null ? (
        <>
          <MvInfoImage data={item} path={item.poster_path} />
          {item.watchStatus}
          {age && (
            <div className="age">
              <MvCertification id={item.id} contentType={contentType} />
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
