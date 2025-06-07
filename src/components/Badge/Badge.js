const Banner = ({ text, badgeType }) => {
  const bad_type = [
    'brandSolid',
    'brand',
    'sub',
    'STOPPED',
    'REWATCHED',
    'FINISHED',
    'age',
  ].includes(badgeType)
    ? badgeType
    : '';
  return <span className={[`banner ${bad_type}`]}>{text}</span>;
};

export default Banner;
