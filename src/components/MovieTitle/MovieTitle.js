import { useQuery } from '@tanstack/react-query';

import Loading from '../Loading/Loading';
import Banner from '../Banner/Banner';
import { fetchGenre } from '../../api/api';

export const MvInfoKrTit = ({ data }) => {
  return <p className="mvInfoKrTit">{data.title}</p>;
};
export const MvInfoOgTit = ({ data }) => {
  return <p className="mvInfoOgTit">{data.original_title}</p>;
};
export const MvInfoOverview = ({ data }) => {
  return (
    <p className="mvInfoOverview">
      {data.overview ? data.overview : '설명 준비중'}
    </p>
  );
};

export const MvGenre = ({ data }) => {
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
      {data.map(item => {
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
