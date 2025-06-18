import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import Loading from '../Loading/Loading';
import Badge from '../Badge/Badge';
import { fetchGenre, fetchMovieRelease } from '../../api/api';

export const MvInfoImage = ({ data, path, setIsLoaded }) => {
  return (
    <img
      className="mvInfoImage"
      src={`https://image.tmdb.org/t/p/w1280${path}`}
      alt={`${data.title} 배경 이미지`}
      onLoad={() => setIsLoaded && setIsLoaded(true)}
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
    queryKey: ['movieGenre'],
    queryFn: fetchGenre,
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
  if (isLoading) return <span className="genre" />;
  if (error) return <p>Error: {error.message}</p>;
  const genreList = genre.genres ? genre.genres : [];
  return (
    <div className="mvInfoGenre">
      {data.slice(0, slice).map(item => {
        const genreId = typeof item === 'object' ? item.id : item;
        return (
          <Badge
            key={genreId}
            badgeType={'brandSolid'}
            text={genreList?.find(item => item.id === genreId)?.name}
          />
        );
      })}
    </div>
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
export const MvCertification = ({ id }) => {
  const {
    data: movieRelease,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['movieRelease', id],
    queryFn: ({ queryKey }) => fetchMovieRelease({ queryKey }),
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
  const age = movieRelease?.results?.find(r => r.iso_3166_1 === 'KR')
    ?.release_dates?.[0]?.certification;

  if (isLoading) return <div className="certification" />;
  if (error || !age) return null;

  const getAgeBadgeType = age => {
    const lowerAge = age?.toLowerCase();
    if (lowerAge === 'all') return { badgeType: 'age ageAll', label: 'ALL' };
    if (lowerAge === '12') return { badgeType: 'age age12', label: '12' };
    if (lowerAge === '15') return { badgeType: 'age age15', label: '15' };
    if (['19', '19+', '18', '청소년관람불가'].includes(lowerAge)) {
      return { badgeType: 'age age19', label: '19' };
    }
    return null;
  };

  const badgeType = getAgeBadgeType(age);

  return badgeType ? (
    <Badge text={badgeType.label} badgeType={badgeType.badgeType} />
  ) : null;
};
