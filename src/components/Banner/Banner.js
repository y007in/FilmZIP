const Banner = ({ text, bannerType }) => {
  const ban_type = [
    'brandSolid',
    'brand',
    'sub',
    'STOPPED',
    'REWATCHED',
    'FINISHED',
  ].includes(bannerType)
    ? bannerType
    : '';
  return <span className={[`banner ${ban_type}`]}>{text}</span>;
};

export default Banner;
