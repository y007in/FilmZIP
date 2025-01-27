import React from 'react';

const MovieList = ({ list }) => {
  return (
    <ul className="mvCard">
      {list.map(item => (
        <li className="mvInfo" key={item.id}>
          <article className="mvInfoImg">
            <img
              src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
              alt={item.title}
            />
          </article>
          <article className="mvInfoTit">
            <p className="mvInfoKrTit">{item.title}</p>
            <p className="mvInfoOgTit">{item.original_title}</p>
          </article>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
