import { useQuery } from '@tanstack/react-query';

import Loading from '../Loading/Loading';
import Banner from '../Banner/Banner';
import { fetchGenre } from '../../api/api';

export const MvInfoImage = ({ data, path }) => {
  return (
    <img
      className="mvInfoImage"
      src={`https://image.tmdb.org/t/p/w1280${path}`}
      alt={`${data.title} 배경 이미지`}
    />
  );
};
export const MvInfoKrTit = ({ data }) => {
  return <p className="mvInfoKrTit">{data.title}</p>;
};
export const MvInfoOgTit = ({ data }) => {
  return <p className="mvInfoOgTit">{data.original_title}</p>;
};
export const MvInfoTagLine = ({ data }) => {
  return <p className="mvInfoTagLine">{data.tagline}</p>;
};
export const MvInfoOverview = ({ data }) => {
  return (
    <p className="mvInfoOverview">
      {data.overview ? data.overview : '설명 준비중'}
    </p>
  );
};
export const MvGenre = ({ data, slice }) => {
  const {
    data: genre,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['genre'],
    queryFn: fetchGenre,
  });
  if (isLoading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;
  const genreList = genre.genres ? genre.genres : [];
  return (
    <p className="mvInfoGenre">
      {data.slice(0, slice).map(item => {
        const genreId = typeof item === 'object' ? item.id : item;
        return (
          <Banner
            key={genreId}
            bannerType={'brandSolid'}
            text={genreList?.find(item => item.id === genreId)?.name}
          />
        );
      })}
    </p>
  );
};
export const MvCreditSection = ({ title, items }) => {
  return (
    <section className="mvCreditBlock">
      <h3>{title}</h3>
      <ul className="creditList">
        {items.map(person => (
          <li className="character" key={person.id || person.cast_id}>
            {person.original_name || person.name}
          </li>
        ))}
      </ul>
    </section>
  );
};
