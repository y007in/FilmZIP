const SearchResult = ({ searchResult }) => {
  return (
    <ul className="mvCard">
      {searchResult.map((item) => (
        <li className="mvInfo" key={item.id}>
          <img
            className="mvInfoImg"
            src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
            alt={item.title}
          />
          <div className="mvInfoTit">
            <p className="mvInfoKrTit">{item.title}</p>
            <p className="mvInfoOgTit">{item.original_title}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SearchResult;
