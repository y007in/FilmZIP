import { useQuery } from '@tanstack/react-query';
import Badge from '../Badge/Badge';
import {
  fetchMovieGenre,
  fetchTVGenre,
  fetchMovieRelease,
  fetchTvRelease,
} from '../../api/api';
import { getBoolContentType } from '../../utils/getContentType';
import { getContentType } from '../../utils/getContentType';

export const MvInfoImage = ({ data, path, setIsLoaded }) => {
  return (
    <img
      className="mvInfoImage"
      src={`https://image.tmdb.org/t/p/w1280${path}`}
      alt={`${data.title || data.name} 배경 이미지`}
      onLoad={() => setIsLoaded && setIsLoaded(true)}
    />
  );
};
export const MvInfoKrTit = ({ data }) => {
  return <p className="mvInfoKrTit">{data.title || data.name}</p>;
};
export const MvInfoOgTit = ({ data }) => {
  return (
    <p className="mvInfoOgTit">{data.original_title || data.original_name}</p>
  );
};
export const MvInfoTagLine = ({ data }) => {
  return data.tagline && <p className="mvInfoTagLine">{data.tagline}</p>;
};
export const MvInfoOverview = ({ data }) => {
  return (
    <p className="mvInfoOverview">
      {data.overview ? data.overview : '설명 준비중'}
    </p>
  );
};
export const MvGenre = ({ data, slice = 3, contentType }) => {
  const {
    data: genreData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['genreList', contentType],
    queryFn: () =>
      getBoolContentType(
        contentType,
        () => fetchMovieGenre(),
        () => fetchTVGenre(),
      )(),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <span className="genre" />;
  if (error || !genreData?.genres) return null;

  const genreList = genreData.genres;

  return (
    <div className="mvInfoGenre">
      {data.slice(0, slice).map(item => {
        const genreId = typeof item === 'object' ? item.id : item;
        const genreName = genreList.find(g => g.id === genreId)?.name;
        return genreName ? (
          <Badge key={genreId} badgeType="brandSolid" text={genreName} />
        ) : null;
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
export const MvCertification = ({ id, contentType }) => {
  const {
    data: contentRelease,
    releaseLoading,
    releaseError,
  } = useQuery({
    queryKey: [`${contentType}Release`, id],
    queryFn: () =>
      getBoolContentType(
        contentType,
        () => fetchMovieRelease({ queryKey: ['movieRelease', id] }),
        () => fetchTvRelease({ queryKey: ['tvRelease', id] }),
      )(),

    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });

  const krRelease = contentRelease?.results?.find(r => r.iso_3166_1 === 'KR');
  const age = getBoolContentType(
    contentType,
    krRelease?.release_dates?.[0]?.certification,
    krRelease?.rating,
  );

  if (releaseLoading) return <div className="certification" />;
  if (releaseError || !age) return null;

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

export const ContentType = ({ data }) => {
  return <p className="typeBadge">{getContentType(data, '영화', '시리즈')}</p>;
};
