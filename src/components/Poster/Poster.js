import React from 'react';
import { MvInfoKrTit } from '../MovieTitle/MovieTitle';

const Poster = ({ item, count, onClick }) => {
  return (
    <article className="mvInfoImg" onClick={onClick}>
      {item.poster_path !== null ? (
        <>
          <img
            src={`https://image.tmdb.org/t/p/w1280${item.poster_path}`}
            alt={item.title}
          />
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
