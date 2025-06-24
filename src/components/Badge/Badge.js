const Badge = ({ text, badgeType }) => {
  const bad_type = [
    'brandSolid',
    'brand',
    'sub',
    'solid',
    'STOPPED',
    'REWATCHED',
    'FINISHED',
    'age age12',
    'age age15',
    'age age19',
    'age ageAll',
  ].includes(badgeType)
    ? badgeType
    : '';
  return <div className={[`badge ${bad_type}`]}>{text}</div>;
};

export default Badge;
