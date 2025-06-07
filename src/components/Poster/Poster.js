import { MvInfoImage } from '../MovieTitle/MovieTitle';

const Poster = ({ item, count, onClick }) => {
  return (
    <article className="mvInfoImg" onClick={onClick}>
      {item.poster_path !== null ? (
        <>
          <MvInfoImage data={item} path={item.poster_path} />
          {count > 1 && <span className="countBadge">{count}</span>}
          {item.watchStatus === 'STOPPED' && (
            <span className="countBadge no">{'❌'}</span>
          )}
          {item.watchStatus}
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
