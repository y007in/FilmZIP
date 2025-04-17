import React from 'react';

const Poster = ({ item, onClick }) => {
  return (
    <article className="mvInfoImg" onClick={onClick}>
      {item.poster_path !== null ? (
        <img
          src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
          alt={item.title}
        />
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
